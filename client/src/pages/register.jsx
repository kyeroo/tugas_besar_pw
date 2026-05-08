import { useState } from "react";

export default function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (res.ok) {

        alert("Register success");

        window.location.href =
          "/login";

      } else {

        alert(data.message);
      }

    } catch (error) {

      console.error(error);

      alert("Register failed");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Register
      </h1>

      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-3 max-w-sm"
      >

        <input
          type="text"
          placeholder="Name"
          className="border p-2"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
          Register
        </button>

      </form>
    </div>
  );
}