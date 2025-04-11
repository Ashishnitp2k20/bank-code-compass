
export interface BankDetails {
  BANK: string;
  IFSC: string;
  BRANCH: string;
  ADDRESS: string;
  CITY: string;
  DISTRICT: string;
  STATE: string;
  MICR?: string;
  CONTACT?: string;
  UPI?: boolean;
  RTGS?: boolean;
  NEFT?: boolean;
  IMPS?: boolean;
}

export interface BankSearchParams {
  bank?: string;
  state?: string;
  district?: string;
  branch?: string;
}
