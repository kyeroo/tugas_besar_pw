import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ArrowRight } from "lucide-react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";


import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  // state untuk form pencarian
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // state untuk data kendaraan dan lokasi
  const [vehicles, setVehicles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // mengambil data lokasi
    const fetchLocations = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/locations");

        const data = await res.json();

        const formatted = data.map((loc) => ({
          value: loc.slug,
          label: loc.name,
        }));

        setLocations(formatted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocations();

    // mengambil data kendaraan
    const fetchVehicles = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/vehicles");

        const data = await res.json();

        setVehicles(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVehicles();
  }, []);

  const handleSearch = () => {
    if (!selectedLocation) return;

    navigate(`/search/vehicles/${selectedLocation.value}`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-6">

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/10 blur-[140px] rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full">

          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>

              <span className="text-sm text-gray-300">
                Platform rental kendaraan modern
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">

              Rental kendaraan
              <span className="block text-white/60">
                untuk perjalanan modern
              </span>

            </h1>

            <p className="mt-8 text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Cari kendaraan premium dengan proses booking cepat,
              harga transparan, dan pengalaman rental yang effortless.
            </p>
          </div>

          {/* SEARCH FORM */}
          <div className="mt-16 max-w-5xl mx-auto">

            <div className="grid lg:grid-cols-4 gap-5 p-5 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

              {/* Location */}
              <div className="flex flex-col justify-center rounded-2xl bg-white/5 border border-white/10 px-5 py-4 hover:bg-white/[0.08] transition">

                <label className="text-sm text-gray-400 mb-2">
                  Lokasi Pickup
                </label>

                <Select
                options={locations}
                value={selectedLocation}
                onChange={setSelectedLocation}
                placeholder="Pilih lokasi"
                className="text-black"
                styles={{
                  control: (base) => ({
                    ...base,
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                    minHeight: "auto",
                  }),

                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#111827",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }),

                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "rgba(255,255,255,0.1)"
                      : "#111827",
                    color: "white",
                    cursor: "pointer",
                  }),

                  singleValue: (base) => ({
                    ...base,
                    color: "white",
                  }),

                  input: (base) => ({
                    ...base,
                    color: "white",
                  }),

                  placeholder: (base) => ({
                    ...base,
                    color: "#6b7280",
                  }),
                }}
              />
              </div>

              {/* Start Date */}
              <div className="flex flex-col justify-center rounded-2xl bg-white/5 border border-white/10 px-5 py-4 hover:bg-white/[0.08] transition">

                <label className="text-sm text-gray-400 mb-2">
                  Tanggal Rental
                </label>

                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="bg-transparent outline-none text-white text-lg w-full"
                />
              </div>

              {/* End Date */}
              <div className="flex flex-col justify-center rounded-2xl bg-white/5 border border-white/10 px-5 py-4 hover:bg-white/[0.08] transition">

                <label className="text-sm text-gray-400 mb-2">
                  Tanggal Kembali
                </label>

                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="bg-transparent outline-none text-white text-lg w-full"
                />
              </div>

              {/* Button */}
              <button onClick={handleSearch} className="group rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-300 text-lg font-semibold shadow-lg flex items-center justify-center gap-2">

                Cari Kendaraan

                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition"
                />
              </button>

            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-20 flex flex-wrap justify-center gap-12 text-center">

            <div>
              <h2 className="text-3xl font-bold">500+</h2>
              <p className="text-gray-400 mt-2">
                Customer
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">120+</h2>
              <p className="text-gray-400 mt-2">
                Kendaraan
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">24/7</h2>
              <p className="text-gray-400 mt-2">
                Support
              </p>
            </div>

          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

  {vehicles.map((car) => (
    <div
      key={car.id}
      className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:-translate-y-2 transition duration-500"
    >

      <div className="overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      <div className="p-6">

        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">
            {car.name}
          </h3>

          <span className="text-blue-400 font-medium">
            Rp {car.pricePerDay?.toLocaleString("id-ID")}
          </span>
        </div>

        <p className="mt-4 text-gray-400">
          {car.brand} • {car.transmission} • {car.seats} seats
        </p>

        <p className="mt-2 text-gray-500 text-sm">
          {car.location?.name}
        </p>

        <button className="mt-6 w-full py-3 rounded-2xl bg-white text-black font-semibold hover:bg-gray-200 transition">
          Sewa Sekarang
        </button>

      </div>
    </div>
  ))}

</div>
    </div>
  );
}