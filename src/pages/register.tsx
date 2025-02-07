import { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormRegister((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;

  const validate = () => {
    if (!emailRegex.test(formRegister.email)) {
      alert("Invalid email format! Please use a valid email format");
      return false;
    }

    if (!passwordRegex.test(formRegister.password)) {
      alert(
        "Invalid password! Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return false;
    }
    return true;
  };

  const createUser = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Register error", error);
      throw error;
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }
    try {
      const data = await createUser(
        formRegister.name,
        formRegister.email,
        formRegister.password
      );
      localStorage.setItem("token", data.token);
      alert("Registration successful!");
      router.push("/login");
    } catch (error) {
      alert("Registration Failed!");
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm mx-auto">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="name"
            className="text-2xl font-semibold text-gray-700 text-center mb-6"
          >
            Nama
          </label>
          <input
            className="block w-full bg-transparent border border-black rounded-md py-2 px-4 mb-4"
            type="text"
            onChange={handleChange}
            value={formRegister.name}
            name="name"
            placeholder="Ketik namamu disini"
            required
          />
          <label
            htmlFor="email"
            className="text-2xl font-semibold text-gray-700 text-center mb-6"
          >
            Email
          </label>
          <input
            className="block w-full bg-transparent border border-black rounded-md py-2 px-4 mb-4"
            type="email"
            onChange={handleChange}
            value={formRegister.email}
            name="email"
            placeholder="Ketik emailmu disini"
            required
          />
          <label
            htmlFor="password"
            className="text-2xl font-semibold text-gray-700 text-center mb-6"
          >
            Password
          </label>
          <input
            className="block w-full bg-transparent border border-black rounded-md py-2 px-4 mb-4"
            type="password"
            onChange={handleChange}
            value={formRegister.password}
            name="password"
            placeholder="Masukan password"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;