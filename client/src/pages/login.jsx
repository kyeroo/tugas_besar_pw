import { useState } from "react";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (data.token) {

        // simpan token
        localStorage.setItem(
          "token",
          data.token
        );

        // simpan user
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Login success");

        window.location.href = "/";
      } else {

        alert(data.message);
      }

    } catch (error) {

      console.error(error);

      alert("Login failed");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 max-w-sm"
      >

        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="bg-black text-white p-2"
        >
          Login
        </button>

      </form>
    </div>
  );
}