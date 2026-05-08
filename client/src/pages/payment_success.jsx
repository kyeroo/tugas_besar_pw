import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {

  const [searchParams] = useSearchParams();

  useEffect(() => {

    const invoice =
      searchParams.get("invoice");

    if (invoice) {

      const bookingId =
        invoice.replace("INV-", "");

      fetch(
        `http://localhost:3000/api/booking/${bookingId}/confirm`,
        {
          method: "PUT",
        }
      );

    }

  }, []);

  return (
    <div>
      Payment Success
    </div>
  );
}