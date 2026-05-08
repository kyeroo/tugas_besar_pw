import {
  useEffect,
  useState,
} from "react";

export default function MyBookings() {

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    const fetchBookings =
      async () => {

        const user =
          JSON.parse(
            localStorage.getItem("user")
          );

        const res = await fetch(
          `http://localhost:3000/api/bookings/user/${user.id}`
        );

        const data =
          await res.json();

        setBookings(data);
      };

    fetchBookings();

  }, []);

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold mb-5">
        My Bookings
      </h1>

      <div className="space-y-4">

        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="border p-4 rounded"
          >

            <h2 className="font-bold">
              {booking.vehicle.name}
            </h2>

            <p>
              Status:
              {" "}
              {booking.status}
            </p>

            <p>
              Payment:
              {" "}
              {booking.paymentStatus}
            </p>

            <p>
              Total:
              {" "}
              Rp
              {booking.totalPrice}
            </p>

            <p>
              Start:
              {" "}
              {new Date(
                booking.startDate
              ).toLocaleDateString()}
            </p>

            <p>
              End:
              {" "}
              {new Date(
                booking.endDate
              ).toLocaleDateString()}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}