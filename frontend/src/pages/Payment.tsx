
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { usePayment } from "@/hooks/payment";
import {
  PaymentStatus,
  PaymentRecap,
  Breadcrumbs,
  PaymentSkeleton,
  NotFoundMessage
} from "@/components/payment";

export default function Payment() {
  const {
    reservation,
    car,
    loading,
    paymentStatus,
    setPaymentStatus,
    id
  } = usePayment();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <PaymentSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (!reservation || !car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <NotFoundMessage />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto max-w-3xl px-4">
          <Breadcrumbs />
          
          <PaymentStatus 
            status={paymentStatus} 
            reservationId={id} 
            setPaymentStatus={setPaymentStatus} 
          />
          
          {/* Récapitulatif de la réservation */}
          <PaymentRecap reservation={reservation} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
