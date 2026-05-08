import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  SlidersHorizontal,
  Users,
  Gauge,
} from "lucide-react";

export default function Vehicles() {
  const { slug } = useParams();

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        let url = "http://localhost:3000/api/vehicles";

        if (slug) {
          url += `?slug=${slug}`;
        }

        const res = await fetch(url);

        const data = await res.json();

        setVehicles(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVehicles();
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#030712] text-white px-6 py-32">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">

          <div>

            <p className="text-blue-400 text-sm mb-3 uppercase tracking-[0.2em]">
              Search Result
            </p>

            <h1 className="text-5xl font-bold capitalize">
              Rental Mobil {slug}
            </h1>

            <p className="mt-4 text-gray-400 max-w-2xl">
              Temukan kendaraan terbaik dengan harga transparan
              dan pengalaman rental premium.
            </p>

          </div>

          <div className="px-5 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

            <p className="text-gray-400 text-sm">
              Total Kendaraan
            </p>

            <h2 className="text-3xl font-bold mt-1">
              {vehicles.length}
            </h2>

          </div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">

          {/* FILTER */}
          <div className="h-fit sticky top-28 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

            <div className="flex items-center gap-3 mb-8">

              <SlidersHorizontal size={20} />

              <h2 className="text-xl font-semibold">
                Filter
              </h2>
            </div>

            {/* Price */}
            <div className="mb-8">

              <h3 className="font-medium mb-4">
                Harga
              </h3>

              <div className="space-y-3 text-gray-400">

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" />
                  <span>Dibawah 500rb</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" />
                  <span>500rb - 1jt</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" />
                  <span>Diatas 1jt</span>
                </label>

              </div>
            </div>

            {/* Transmission */}
            <div>

              <h3 className="font-medium mb-4">
                Transmisi
              </h3>

              <div className="space-y-3 text-gray-400">

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" />
                  <span>Automatic</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" />
                  <span>Manual</span>
                </label>

              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {vehicles.map((car) => (
              <div
                key={car.id}
                className="group rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-2 transition duration-500"
              >

                {/* IMAGE */}
                <Link to={`/vehicles/${car.slug}`}>

                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-sm">
                    {car.brand}
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-6">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h3 className="text-2xl font-semibold">
                        {car.name}
                      </h3>

                      <p className="text-gray-500 mt-2 text-sm">
                        {car.location?.name}
                      </p>

                    </div>

                    <div className="text-right">

                      <h4 className="text-blue-400 font-bold text-xl">
                        Rp {car.pricePerDay?.toLocaleString("id-ID")}
                      </h4>

                      <p className="text-gray-500 text-sm">
                        / hari
                      </p>

                    </div>
                  </div>

                  {/* SPECS */}
                  <div className="flex items-center gap-6 mt-6 text-gray-400 text-sm">

                    <div className="flex items-center gap-2">
                      <Gauge size={16} />
                      {car.transmission}
                    </div>

                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      {car.seats} seats
                    </div>

                  </div>

                  {/* BUTTON */}
                  <button className="mt-8 w-full py-3 rounded-2xl bg-white text-black font-semibold hover:bg-gray-200 transition">
                    Sewa Sekarang
                  </button>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}