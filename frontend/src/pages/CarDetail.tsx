
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CarDetailContainer } from "@/components/car-detail/CarDetailContainer";
import { CarDetailBreadcrumbs } from "@/components/car-detail/CarDetailBreadcrumbs";
import { CarContent } from "@/components/car-detail/CarContent";
import { BookingSummaryCard } from "@/components/car-detail/BookingSummaryCard";

export default function CarDetail() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8">
        <CarDetailContainer>
          {({ 
            car, 
            isFavorite, 
            selectedDates, 
            handleToggleFavorite, 
            handleDateSelect, 
            handleBookNow, 
            formatPrice, 
            calculateTotalPrice, 
            bookedDates 
          }) => (
            <div className="container mx-auto px-4 max-w-7xl">
              <CarDetailBreadcrumbs brand={car.brand} model={car.model} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Car Details */}
                <div className="lg:col-span-2">
                  <CarContent 
                    car={car}
                    isFavorite={isFavorite}
                    onToggleFavorite={handleToggleFavorite}
                    formatPrice={formatPrice}
                    onDateSelect={handleDateSelect}
                    bookedDates={bookedDates}
                  />
                </div>

                {/* Booking Summary */}
                <div className="lg:col-span-1">
                  <BookingSummaryCard
                    carBrand={car.brand}
                    carModel={car.model}
                    carId={car.id}
                    dailyPrice={car.dailyPrice}
                    selectedDates={selectedDates}
                    totalPrice={calculateTotalPrice()}
                    onBookNow={handleBookNow}
                    formatPrice={formatPrice}
                  />
                </div>
              </div>
            </div>
          )}
        </CarDetailContainer>
      </main>
      <Footer />
    </div>
  );
}
