
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAllBanks,
  getAllStates,
  getDistricts,
  getBranches,
  getIFSCByBankDetails,
} from "@/services/bankService";
import { BankSearchParams, BankDetails } from "@/types/bank";
import { Loader2, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const BankDetailsLookup = () => {
  const [banks, setBanks] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  
  const [searchParams, setSearchParams] = useState<BankSearchParams>({});
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  
  const { toast } = useToast();

  useEffect(() => {
    // Fetch initial dropdown options
    const fetchInitialOptions = async () => {
      setLoadingOptions(true);
      try {
        const [banksList, statesList] = await Promise.all([
          getAllBanks(),
          getAllStates(),
        ]);
        
        setBanks(banksList);
        setStates(statesList);
      } catch (err) {
        console.error("Error fetching initial options:", err);
      } finally {
        setLoadingOptions(false);
      }
    };
    
    fetchInitialOptions();
  }, []);

  useEffect(() => {
    // Reset districts when state changes
    if (searchParams.state) {
      const fetchDistricts = async () => {
        setLoadingOptions(true);
        try {
          const districtsList = await getDistricts(searchParams.state!);
          setDistricts(districtsList);
          // Reset district selection and branches list
          setSearchParams(prev => ({ ...prev, district: undefined, branch: undefined }));
          setBranches([]);
        } catch (err) {
          console.error("Error fetching districts:", err);
        } finally {
          setLoadingOptions(false);
        }
      };
      
      fetchDistricts();
    } else {
      setDistricts([]);
      setBranches([]);
    }
  }, [searchParams.state]);

  useEffect(() => {
    // Reset branches when district changes
    if (searchParams.district) {
      const fetchBranches = async () => {
        setLoadingOptions(true);
        try {
          const branchesList = await getBranches(searchParams.district!);
          setBranches(branchesList);
          // Reset branch selection
          setSearchParams(prev => ({ ...prev, branch: undefined }));
        } catch (err) {
          console.error("Error fetching branches:", err);
        } finally {
          setLoadingOptions(false);
        }
      };
      
      fetchBranches();
    } else {
      setBranches([]);
    }
  }, [searchParams.district]);

  const handleSearch = async () => {
    // Clear previous results
    setBankDetails(null);
    setError(null);
    
    // Validate that all required fields are selected
    if (!searchParams.bank) {
      setError("Please select a bank");
      return;
    }
    
    if (!searchParams.state) {
      setError("Please select a state");
      return;
    }
    
    if (!searchParams.district) {
      setError("Please select a district");
      return;
    }
    
    if (!searchParams.branch) {
      setError("Please select a branch");
      return;
    }
    
    setLoading(true);
    
    try {
      const details = await getIFSCByBankDetails(searchParams);
      
      if (details) {
        setBankDetails(details);
      } else {
        setError("No IFSC code found matching the selected bank details.");
      }
    } catch (err) {
      setError("Failed to fetch IFSC code. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: `${field} has been copied to clipboard.`,
      duration: 2000,
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const updateSearchParam = (key: keyof BankSearchParams, value: string) => {
    setSearchParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          disabled={loadingOptions || banks.length === 0}
          value={searchParams.bank}
          onValueChange={(value) => updateSearchParam('bank', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Bank" />
          </SelectTrigger>
          <SelectContent>
            {banks.map((bank) => (
              <SelectItem key={bank} value={bank}>{bank}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          disabled={loadingOptions || states.length === 0}
          value={searchParams.state}
          onValueChange={(value) => updateSearchParam('state', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          disabled={loadingOptions || districts.length === 0}
          value={searchParams.district}
          onValueChange={(value) => updateSearchParam('district', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>{district}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          disabled={loadingOptions || branches.length === 0}
          value={searchParams.branch}
          onValueChange={(value) => updateSearchParam('branch', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((branch) => (
              <SelectItem key={branch} value={branch}>{branch}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={handleSearch} 
          disabled={loading || !searchParams.bank || !searchParams.state || !searchParams.district || !searchParams.branch}
          className="btn-bank min-w-[200px]"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Searching...
            </>
          ) : "Find IFSC Code"}
        </Button>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
          {error}
        </div>
      )}
      
      {bankDetails && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-bank-700 text-white p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">IFSC Code Found</h3>
                  <p className="text-bank-100">{bankDetails.BANK} - {bankDetails.BRANCH}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-bank-600"
                  onClick={() => copyToClipboard(bankDetails.IFSC, "IFSC Code")}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex flex-col items-center justify-center my-4">
                <div className="text-sm text-muted-foreground">IFSC Code</div>
                <div className="text-3xl font-bold text-bank-800 mt-1">{bankDetails.IFSC}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t border-gray-200 pt-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">MICR</h4>
                  <p className="font-medium">{bankDetails.MICR || "N/A"}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Contact</h4>
                  <p>{bankDetails.CONTACT || "N/A"}</p>
                </div>
                
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                  <p>{bankDetails.ADDRESS}</p>
                </div>
                
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Payment Methods Supported</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {bankDetails.NEFT && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        NEFT
                      </span>
                    )}
                    
                    {bankDetails.RTGS && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        RTGS
                      </span>
                    )}
                    
                    {bankDetails.IMPS && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                        IMPS
                      </span>
                    )}
                    
                    {bankDetails.UPI && (
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded">
                        UPI
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BankDetailsLookup;
