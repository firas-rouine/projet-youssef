
import { Skeleton } from "@/components/ui/skeleton";

export function PaymentSkeleton() {
  return (
    <div className="container mx-auto max-w-3xl px-4">
      <div className="mb-8">
        <Skeleton className="h-6 w-64 mb-2" />
        <Skeleton className="h-4 w-40" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
        <div>
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>
      
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  );
}
