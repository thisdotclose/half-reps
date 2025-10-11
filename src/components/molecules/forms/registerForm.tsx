"use client";
import { signUp } from "@/services/client/auth/auth-client";
import React, { useState } from "react";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      console.log(formData);
      await signUp.email({
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        password: formData.password,
      });
    } catch (err: unknown) {
      console.error(err);
      console.log(err);
      setError("An error occurred during sign in");
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
        type="text"
        placeholder="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
