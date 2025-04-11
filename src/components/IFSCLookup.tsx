import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBankDetailsByIFSC, validateIFSC } from "@/services/bankService";
import { Loader2, Copy, CheckCircle, AlertTriangle, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { BankDetails } from "@/types/bank";
import { toast } from "sonner";

const IFSCLookup = () => {
  const [ifscCode, setIfscCode] = useState("");
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formatWarning, setFormatWarning] = useState<string | null>(null);
  const { toast } = useToast();
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      setSpeechSynthesis(synth);

      // Load available voices
      const loadVoices = () => {
        const voices = synth.getVoices();
        setAvailableVoices(voices);
        
        // Try to find a female voice
        const femaleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('female') || 
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('girl')
        );
        
        if (femaleVoice) {
          setSelectedVoice(femaleVoice);
        } else if (voices.length > 0) {
          setSelectedVoice(voices[0]);
        }
      };

      // Load voices when they become available
      if (synth.getVoices().length > 0) {
        loadVoices();
      } else {
        synth.addEventListener('voiceschanged', loadVoices);
        return () => {
          synth.removeEventListener('voiceschanged', loadVoices);
        };
      }
    }
  }, []);

  // Validate IFSC format while typing
  useEffect(() => {
    if (ifscCode.length > 0) {
      if (!validateIFSC(ifscCode)) {
        setFormatWarning("Invalid IFSC format. IFSC should be 11 characters (e.g., SBIN0001234).");
      } else {
        setFormatWarning(null);
      }
    } else {
      setFormatWarning(null);
    }
  }, [ifscCode]);

  const handleSearch = async () => {
    if (!ifscCode) {
      setError("Please enter an IFSC code");
      return;
    }

    if (!validateIFSC(ifscCode)) {
      setError("Please enter a valid IFSC code");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getBankDetailsByIFSC(ifscCode);
      setBankDetails(data);
    } catch (err) {
      setError("Failed to fetch bank details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
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

  const readBankDetails = (details: BankDetails) => {
    if (!speechSynthesis || !isAudioEnabled || !selectedVoice) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const text = `
      Bank: ${details.BANK}
      Branch: ${details.BRANCH}
      IFSC Code: ${details.IFSC}
      MICR: ${details.MICR || 'Not Available'}
      City: ${details.CITY}
      District: ${details.DISTRICT}
      State: ${details.STATE}
      Address: ${details.ADDRESS}
      Contact: ${details.CONTACT || 'Not Available'}
      Customer Support Email: ${getCustomerSupportEmail(details.BANK) || 'Not Available'}
      Payment Methods: ${[
        details.NEFT ? 'NEFT' : '',
        details.RTGS ? 'RTGS' : '',
        details.IMPS ? 'IMPS' : '',
        details.UPI ? 'UPI' : ''
      ].filter(Boolean).join(', ')}
    `;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.voice = selectedVoice;

    setCurrentUtterance(utterance);
    speechSynthesis.speak(utterance);
  };

  const replayAudio = () => {
    if (currentUtterance && speechSynthesis) {
      speechSynthesis.cancel();
      speechSynthesis.speak(currentUtterance);
    }
  };

  // Helper function to get customer support email based on bank name
  const getCustomerSupportEmail = (bankName: string): string | null => {
    const bankEmails: { [key: string]: string } = {
      "State Bank of India": "customercare@sbi.co.in",
      "HDFC Bank": "support@hdfcbank.com",
      "ICICI Bank": "customer.care@icicibank.com",
      "Axis Bank": "customer.service@axisbank.com",
      "Bank of Baroda": "customercare@bankofbaroda.com",
      "Punjab National Bank": "customercare@pnb.co.in",
      "Canara Bank": "customercare@canarabank.com",
      "Union Bank of India": "customercare@unionbankofindia.com",
      "Bank of India": "customercare@bankofindia.co.in",
      "IDBI Bank": "customercare@idbi.co.in",
      "Indian Bank": "customercare@indianbank.co.in",
      "Central Bank of India": "customercare@centralbank.co.in"
    };

    return bankEmails[bankName] || null;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter IFSC code (e.g., SBIN0001234)"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            className="w-full"
          />
        </div>
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Searching...
            </div>
          ) : (
            "Search"
          )}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {bankDetails && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-bank-700 text-white p-3 sm:p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">{bankDetails.BANK}</h3>
                  <p className="text-bank-100 text-sm sm:text-base">{bankDetails.BRANCH} Branch</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-bank-600"
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                    title={isAudioEnabled ? "Disable audio" : "Enable audio"}
                  >
                    {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  {isAudioEnabled && currentUtterance && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-white hover:bg-bank-600"
                      onClick={replayAudio}
                      title="Replay audio"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-bank-600"
                    onClick={() => copyToClipboard(bankDetails.IFSC, "IFSC Code")}
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">IFSC Code</h4>
                  <p className="font-medium text-sm sm:text-base">{bankDetails.IFSC}</p>
                </div>
                
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">MICR</h4>
                  <p className="font-medium text-sm sm:text-base">{bankDetails.MICR || "N/A"}</p>
                </div>
                
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">City</h4>
                  <p className="text-sm sm:text-base">{bankDetails.CITY}</p>
                </div>
                
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">District</h4>
                  <p className="text-sm sm:text-base">{bankDetails.DISTRICT}</p>
                </div>
                
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">State</h4>
                  <p className="text-sm sm:text-base">{bankDetails.STATE}</p>
                </div>
                
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Contact</h4>
                  <p className="text-sm sm:text-base">{bankDetails.CONTACT || "N/A"}</p>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Customer Support Email</h4>
                  <p className="text-sm sm:text-base">
                    {getCustomerSupportEmail(bankDetails.BANK) || "N/A"}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Address</h4>
                <p className="text-sm sm:text-base">{bankDetails.ADDRESS}</p>
              </div>
              
              <div>
                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Payment Methods Supported</h4>
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IFSCLookup; 