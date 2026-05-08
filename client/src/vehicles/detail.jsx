import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {

  const { slug } = useParams();

  const [vehicle, setVehicle] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const token = localStorage.getItem("token");

if (!token) {

  alert("Please login first");

  window.location.href =
    "/login";

  return;
}

  const handleBooking = async () => {

  try {

    // create booking
    const res = await fetch(
      "http://localhost:3000/api/booking",
      {
        method: "POST",

        headers: {
        "Content-Type":
            "application/json",

        Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          vehicleId: vehicle.id,
          startDate,
          endDate,
        }),
      }
    );

    const booking = await res.json();
    // console.log(booking);

    // create payment
    const paymentRes = await fetch(
      `http://localhost:3000/api/booking/${booking.id}/pay`
    );


    const payment = await paymentRes.json();

    // redirect DOKU
    if (payment?.response?.payment?.url) {

        window.location.href =
        payment.response.payment.url;

    } else {

    console.log(payment);

    }

  } catch (error) {

  console.error(error);

}
};


  useEffect(() => {

    const fetchVehicle = async () => {

      try {

        const res = await fetch(
          `http://localhost:3000/api/vehicles/${slug}`
        );

        const data = await res.json();

        setVehicle(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchVehicle();

  }, [slug]);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }
  

  

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-32 pb-20">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.5fr_500px] gap-12">

        {/* LEFT */}
        <div>

          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-[520px] object-cover rounded-3xl"
          />

          <div className="mt-10">

            <p className="uppercase tracking-[0.2em] text-blue-400 text-sm">
              {vehicle.brand}
            </p>

            <h1 className="text-6xl font-bold mt-3">
              {vehicle.name}
            </h1>

            <p className="text-gray-400 mt-8 leading-relaxed text-lg">
              {vehicle.description}
            </p>

          </div>

          {/* SPECS */}
          <div className="grid grid-cols-3 gap-6 mt-12">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400 text-sm">
                Transmission
              </p>

              <h3 className="text-2xl font-semibold mt-2">
                {vehicle.transmission}
              </h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400 text-sm">
                Seats
              </p>

              <h3 className="text-2xl font-semibold mt-2">
                {vehicle.seats}
              </h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400 text-sm">
                Location
              </p>

              <h3 className="text-2xl font-semibold mt-2">
                {vehicle.location?.name}
              </h3>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div>

          <div className="sticky top-28 bg-white text-black rounded-[32px] p-8">

            <h2 className="text-5xl font-bold text-black">
              Rp {vehicle.pricePerDay?.toLocaleString("id-ID")}
            </h2>

            <p className="text-gray-500 mt-2">
              per hari
            </p>

            {/* FORM */}
            <div className="mt-10 space-y-6">

              <div>
                <label className="text-sm font-medium">
                  Pickup Date
                </label>

                <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full mt-2 border rounded-2xl px-4 py-4"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Return Date
                </label>

                <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full mt-2 border rounded-2xl px-4 py-4"
                />
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition"
                >
                Booking Sekarang
                </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}