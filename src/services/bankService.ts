import { BankDetails, BankSearchParams } from "@/types/bank";

// Base URL for the Razorpay IFSC API
const RAZORPAY_API_BASE = "https://ifsc.razorpay.com/";

/**
 * Get bank details for a given IFSC code
 */
export const getBankDetailsByIFSC = async (ifscCode: string): Promise<BankDetails | null> => {
  try {
    const response = await fetch(`${RAZORPAY_API_BASE}${ifscCode}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the API response to match our BankDetails interface
    return {
      BANK: data.BANK || data.bank,
      IFSC: data.IFSC || data.ifsc,
      BRANCH: data.BRANCH || data.branch,
      ADDRESS: data.ADDRESS || data.address,
      CITY: data.CITY || data.city,
      DISTRICT: data.DISTRICT || data.district,
      STATE: data.STATE || data.state,
      MICR: data.MICR || data.micr,
      CONTACT: data.CONTACT || data.contact,
      UPI: data.UPI || true, // Most banks support UPI now
      RTGS: data.RTGS || true, // Most banks support RTGS
      NEFT: data.NEFT || true, // Most banks support NEFT
      IMPS: data.IMPS || true // Most banks support IMPS
    };
  } catch (error) {
    console.error("Error fetching bank details:", error);
    return null;
  }
};

/**
 * Get IFSC code based on bank details
 * Note: This is a simplified implementation as the Razorpay API doesn't support this directly
 * In a production environment, you would need to maintain your own database or use a different API
 */
export const getIFSCByBankDetails = async (params: BankSearchParams): Promise<BankDetails | null> => {
  try {
    // This is a placeholder implementation
    // In a real application, you would need to:
    // 1. Maintain your own database of IFSC codes
    // 2. Use a different API that supports this functionality
    // 3. Or implement a search service that can handle this query
    
    return null;
  } catch (error) {
    console.error("Error searching for IFSC code:", error);
    return null;
  }
};

/**
 * Get all available bank names
 * Note: This would need to be implemented with a proper database or API
 */
export const getAllBanks = async (): Promise<string[]> => {
  // This would need to be implemented with a proper database or API
  return [];
};

/**
 * Get all states
 * Note: This would need to be implemented with a proper database or API
 */
export const getAllStates = async (): Promise<string[]> => {
  // This would need to be implemented with a proper database or API
  return [];
};

/**
 * Get districts based on state
 * Note: This would need to be implemented with a proper database or API
 */
export const getDistricts = async (state: string): Promise<string[]> => {
  // This would need to be implemented with a proper database or API
  return [];
};

/**
 * Get branches based on district
 * Note: This would need to be implemented with a proper database or API
 */
export const getBranches = async (district: string): Promise<string[]> => {
  // This would need to be implemented with a proper database or API
  return [];
};

export const validateIFSC = (ifsc: string): boolean => {
  // Basic IFSC validation: 11 characters, first 4 alphabets, 5th char is 0, and last 6 are alphanumeric
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc);
};
