import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token =
    localStorage.getItem("token");

    setIsLogin(!!token);

    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">

      <div
        className={`
          flex items-center w-full
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]

          ${scrolled
            ? "max-w-3xl mt-4 px-6 py-0.5 bg-white/80 backdrop-blur-md shadow-xl rounded-full -translate-y-1"
            : "max-w-full px-10 py-6 bg-transparent"}
        `}
      >

        {/* LOGO */}
        <h1 className={`font-bold text-lg transition-colors duration-300 ${
          scrolled ? "text-black" : "text-white"
        }`}>
          RentalKu
        </h1>

        {/* MENU */}
        <div className="flex items-center gap-8 ml-auto">
        {[
            { name: "Home", path: "/" },
            { name: "Product", path: "/vehicles" },
            { name: "Pricing", path: "/pricing" },
            { name: "Blog", path: "/blog" },
        ].map((item) => (
            <Link
            key={item.name}
            to={item.path}
            className={`transition-colors duration-300 ${
                scrolled
                ? "text-gray-700 hover:text-black"
                : "text-white/90 hover:text-white"
            }`}
            >
            {item.name}
            </Link>
        ))}
        </div>

        {/* RIGHT BUTTON */}
        <div
          className={`flex items-center gap-4 ml-6 transition-all duration-500 overflow-hidden ${
            scrolled
                ? "opacity-0 scale-95 w-0 pointer-events-none"
                : "opacity-100 scale-100 w-auto"
            }`}
        >
         <div
        className={`flex items-center gap-4 ml-6 transition-opacity duration-300 ${
            scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        >
        {isLogin ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setIsLogin(false);
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
                to="/login"
                className="text-white"
            >
                Login
            </Link>

            <Link
                to="/register"
                className="bg-white text-black px-4 py-2 rounded-full"
            >
                Sign Up
            </Link>
          </>
        )}
        </div>
        </div>

      </div>
    </div>
  );
}