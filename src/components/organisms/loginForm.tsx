"use client";
import { signIn } from "@/services/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if(res.error) {
        setError(res.error?.message || "An error occurred during login");
      } else {
        router.push("/");
      }

    } catch (err: unknown) {
      console.error(err);
      console.log(err);
      setError("An error occurred during login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-green-500 p-2 w-1/2"
    >
      {error && (
        <div className="text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
