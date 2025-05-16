
// Import Lucide icons
import { CreditCard, Building, Banknote } from "lucide-react";

// Format card number with spaces every 4 digits
export const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0; i < match.length; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};

// Payment icon components
export const PaymentIcon = ({ method }: { method: string }) => {
  switch (method) {
    case "creditCard":
      return <CreditCard className="h-5 w-5" />;
    case "paypal":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.12 4.15C18.47 4.85 19 6.32 19 8.37c0 4.41-3.3 8.22-8 8.22h-2l-1 5.66h-2l-1-5.66H4l2-11.95h5.5c2.6 0 4.34.4 5.62 1.5z" fill="#3b7bbf" stroke="#3b7bbf"/><path d="M21.12 8.08C22.47 8.78 23 10.25 23 12.3c0 4.41-3.3 8.22-8 8.22h-2l-1 5.66h-2l-1-5.66H8l2-11.95h5.5c2.6 0 4.34.4 5.62 1.5z" fill="#ffffff" stroke="#253b80"/></svg>
      );
    case "googlePay":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 186 189"><path d="M93 0C41.6 0 0 41.6 0 93c0 51.3 41.6 93 93 93 51.3 0 93-41.6 93-93C186 41.6 144.4 0 93 0zm33.9 134.5c-9.8 0-16.9-7.2-16.9-16.9 0-9.8 7.1-17 16.9-17 9.7 0 16.9 7.2 16.9 17 0 9.7-7.2 16.9-16.9 16.9zm-67.8 0c-9.8 0-16.9-7.2-16.9-16.9 0-9.8 7.1-17 16.9-17 9.7 0 16.9 7.2 16.9 17 0 9.7-7.2 16.9-16.9 16.9z" fill="#4285F4"/></svg>
      );
    case "applePay":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 170 170"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51z" fill="#333"/></svg>
      );
    case "bankTransfer":
      return <Building className="h-5 w-5" />;
    case "cash":
      return <Banknote className="h-5 w-5" />;
    default:
      return <CreditCard className="h-5 w-5" />;
  }
};
