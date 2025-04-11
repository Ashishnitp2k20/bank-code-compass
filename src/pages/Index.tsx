import IFSCLookup from "@/components/IFSCLookup";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ChevronRight, Shield, Zap, Clock, Globe, ChevronDown, ChevronUp, Sun, Moon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [showFAQs, setShowFAQs] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-bank-600 to-bank-800 bg-clip-text text-transparent">
              Bank Code Compass
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
              Your trusted companion for accurate bank details and IFSC codes
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span>Secure & Reliable</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span>All Indian Banks</span>
              </div>
            </div>
          </div>

          <Alert className="mb-6 sm:mb-8 dark:bg-gray-800 dark:border-gray-700">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Notice</AlertTitle>
            <AlertDescription>
              The Bank to IFSC Code feature is currently unavailable due to technical issues. We are working to resolve this and will restore the functionality soon.
            </AlertDescription>
          </Alert>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
            <IFSCLookup />
          </div>

          {/* FAQs Section */}
          <section id="faqs" className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 dark:text-white">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold mb-2 dark:text-white">What is an IFSC code?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  IFSC (Indian Financial System Code) is an 11-digit alphanumeric code that uniquely identifies a bank branch participating in the NEFT, RTGS, and IMPS systems.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold mb-2 dark:text-white">How do I find my bank's IFSC code?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  You can find your bank's IFSC code on your cheque book, passbook, or by using our IFSC lookup tool above. Simply enter the IFSC code to get complete bank details.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold mb-2 dark:text-white">What payment services do banks offer?</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="text-gray-600 dark:text-gray-300">Banks offer various payment services to facilitate money transfers:</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>NEFT (National Electronic Funds Transfer)</li>
                    <li>RTGS (Real Time Gross Settlement)</li>
                    <li>IMPS (Immediate Payment Service)</li>
                    <li>UPI (Unified Payments Interface)</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold mb-2 dark:text-white">What are the key features of these payment services?</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>NEFT: No minimum amount, available 24x7</li>
                    <li>RTGS: Minimum ₹2 lakh, real-time settlement</li>
                    <li>IMPS: Instant transfer, available 24x7</li>
                    <li>UPI: Instant transfer, QR code payments</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold mb-2 dark:text-white">How can I contact bank customer support?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Each bank provides multiple channels for customer support:
                </p>
                <ul className="list-disc pl-4 mt-2 space-y-1 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  <li>Customer care phone numbers</li>
                  <li>Email support</li>
                  <li>Branch visits</li>
                  <li>Online chat support</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold mb-2 dark:text-white">Is this service free to use?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Yes, our IFSC code lookup service is completely free to use. You can search for bank details as many times as you need without any charges.
                </p>
              </div>
            </div>
          </section>

          {/* Online Banking Awareness Section */}
          <section id="online-banking-awareness" className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 dark:text-white">Online Banking Awareness</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold mb-2 dark:text-white">Official Banking Websites</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="text-gray-600 dark:text-gray-300">Always use official banking websites:</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>RBI: <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">www.rbi.org.in</a></li>
                    <li>SBI: <a href="https://www.onlinesbi.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">www.onlinesbi.com</a></li>
                    <li>Always verify website URLs before entering credentials</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold mb-2 dark:text-white">Common Online Banking Frauds</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Phishing emails and fake websites</li>
                    <li>SIM swap frauds</li>
                    <li>UPI frauds and fake payment requests</li>
                    <li>Malware and keyloggers</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold mb-2 dark:text-white">Security Best Practices</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Use strong, unique passwords</li>
                    <li>Enable two-factor authentication</li>
                    <li>Never share OTPs or passwords</li>
                    <li>Regularly monitor account activity</li>
                    <li>Keep banking apps updated</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold mb-2 dark:text-white">What to Do If You're a Victim</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Immediately contact your bank</li>
                    <li>Block your cards and accounts</li>
                    <li>File a police complaint</li>
                    <li>Report to RBI's cyber fraud helpline</li>
                    <li>Change all passwords</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <p className="text-red-600 dark:text-red-400 text-sm sm:text-base">
                <strong>Important:</strong> Never share your banking credentials, OTPs, or personal information with anyone. Banks will never ask for such details over phone, email, or SMS.
              </p>
            </div>
          </section>

          {/* Use Cases Section */}
          <section id="use-cases" className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 dark:text-white">Use Cases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="font-semibold mb-2 dark:text-white">Online Money Transfers</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">
                  Use our tool to quickly find IFSC codes when making NEFT, RTGS, or IMPS transfers to ensure your money reaches the correct bank branch.
                </p>
                <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer text-sm">
                  <span>Learn more</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="font-semibold mb-2 dark:text-white">Business Transactions</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">
                  Businesses can use our service to verify bank details before processing payments or setting up new vendor accounts.
                </p>
                <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer text-sm">
                  <span>Learn more</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="font-semibold mb-2 dark:text-white">Account Verification</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">
                  Verify bank account details by checking the IFSC code and bank branch information before initiating any financial transactions.
                </p>
                <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer text-sm">
                  <span>Learn more</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="font-semibold mb-2 dark:text-white">Financial Documentation</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">
                  Use our service to fill out financial forms and documents that require accurate bank branch details and IFSC codes.
                </p>
                <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer text-sm">
                  <span>Learn more</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
