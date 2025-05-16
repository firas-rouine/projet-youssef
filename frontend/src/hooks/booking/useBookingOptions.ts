
import { calculateTotalPrice, BookingData } from "./useBookingState";

type BookingOptionsSetter = React.Dispatch<React.SetStateAction<BookingData>>;

export function useBookingOptions(
  bookingData: BookingData,
  setBookingData: BookingOptionsSetter,
  basePrice: number
) {
  // Handle checkbox change
  const handleCheckboxChange = (option: string) => {
    const updatedData = { ...bookingData };
    
    switch (option) {
      case "driver":
        updatedData.driverIncluded = !updatedData.driverIncluded;
        break;
      case "childSeat":
        updatedData.childSeat = !updatedData.childSeat;
        break;
      case "gps":
        updatedData.gps = !updatedData.gps;
        break;
      case "additionalDriver":
        updatedData.additionalDriver = !updatedData.additionalDriver;
        break;
      case "wifiHotspot":
        updatedData.wifiHotspot = !updatedData.wifiHotspot;
        break;
      default:
        break;
    }
    
    // Update total price
    updatedData.totalPrice = calculateTotalPrice(
      basePrice,
      updatedData.totalDays,
      updatedData.driverIncluded,
      updatedData.carInsurance,
      updatedData.childSeat,
      updatedData.gps,
      updatedData.additionalDriver,
      updatedData.wifiHotspot
    );
    
    setBookingData(updatedData);
  };
  
  // Handle insurance change
  const handleInsuranceChange = (insurance: string) => {
    const updatedData = { ...bookingData, carInsurance: insurance };
    
    // Update total price
    updatedData.totalPrice = calculateTotalPrice(
      basePrice,
      updatedData.totalDays,
      updatedData.driverIncluded,
      insurance,
      updatedData.childSeat,
      updatedData.gps,
      updatedData.additionalDriver,
      updatedData.wifiHotspot
    );
    
    setBookingData(updatedData);
  };
  
  // Handle payment method change
  const handlePaymentMethodChange = (method: string) => {
    setBookingData({ ...bookingData, paymentMethod: method });
  };
  
  // Handle pickup location change
  const handlePickupLocationChange = (location: string) => {
    const updatedData = { ...bookingData, pickupLocation: location };
    
    // If same return location is checked, update dropoff location as well
    if (bookingData.sameReturnLocation) {
      updatedData.dropoffLocation = location;
    }
    
    setBookingData(updatedData);
  };
  
  // Handle dropoff location change
  const handleDropoffLocationChange = (location: string) => {
    setBookingData({ ...bookingData, dropoffLocation: location });
  };
  
  // Handle same location toggle
  const handleSameLocationChange = (same: boolean) => {
    const updatedData = { 
      ...bookingData, 
      sameReturnLocation: same 
    };
    
    // If same location is checked, set dropoff to pickup
    if (same) {
      updatedData.dropoffLocation = bookingData.pickupLocation;
    }
    
    setBookingData(updatedData);
  };
  
  return {
    handleCheckboxChange,
    handleInsuranceChange,
    handlePaymentMethodChange,
    handlePickupLocationChange,
    handleDropoffLocationChange,
    handleSameLocationChange
  };
}
