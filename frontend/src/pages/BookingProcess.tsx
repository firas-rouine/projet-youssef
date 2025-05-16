
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  BookingSteps,
  BookingSidePanel,
  DateSelectionStep,
  OptionsSelectionStep,
  PaymentStep,
  CarNotFoundSection,
  BookingRecap
} from "@/components/booking-process";
import { LocationSelectionStep } from "@/components/booking-process/LocationSelectionStep";
import { useBookingProcess } from "@/hooks/useBookingProcess";
import { BookingProcessLayout } from "@/components/booking-process/BookingProcessLayout";

export default function BookingProcess() {
  const {
    car,
    loading,
    step,
    bookingData,
    date,
    handleDateChange,
    handleCheckboxChange,
    handleInsuranceChange,
    handlePaymentMethodChange,
    handlePickupLocationChange,
    handleDropoffLocationChange,
    handleSameLocationChange,
    formatPrice,
    handleNextStep,
    handlePreviousStep,
    handleSubmitBooking,
    navigate
  } = useBookingProcess();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8">
        <BookingProcessLayout 
          step={step}
          navigate={navigate}
        >
          {loading ? (
            <div className="text-center py-12">
              <p>Chargement en cours...</p>
            </div>
          ) : car ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {step === 1 && (
                  <DateSelectionStep 
                    date={date} 
                    setDate={handleDateChange}
                    handleNextStep={handleNextStep} 
                  />
                )}
                
                {step === 2 && (
                  <LocationSelectionStep
                    pickupLocation={bookingData.pickupLocation}
                    dropoffLocation={bookingData.dropoffLocation}
                    sameLocation={bookingData.sameReturnLocation}
                    onPickupChange={handlePickupLocationChange}
                    onDropoffChange={handleDropoffLocationChange}
                    onSameLocationChange={handleSameLocationChange}
                    handleNextStep={handleNextStep}
                    handlePreviousStep={handlePreviousStep}
                  />
                )}
                
                {step === 3 && (
                  <OptionsSelectionStep
                    bookingData={bookingData}
                    handleCheckboxChange={handleCheckboxChange}
                    handleInsuranceChange={handleInsuranceChange}
                    handleNextStep={handleNextStep}
                    handlePreviousStep={handlePreviousStep}
                  />
                )}
                
                {step === 4 && (
                  <PaymentStep
                    paymentMethod={bookingData.paymentMethod}
                    handlePaymentMethodChange={handlePaymentMethodChange}
                    handleSubmitBooking={handleSubmitBooking}
                    handlePreviousStep={handlePreviousStep}
                  />
                )}
              </div>
              
              <BookingSidePanel 
                car={car} 
                bookingData={bookingData} 
                formatPrice={formatPrice} 
              />
            </div>
          ) : (
            <CarNotFoundSection />
          )}
        </BookingProcessLayout>
      </main>
      <Footer />
    </div>
  );
}
