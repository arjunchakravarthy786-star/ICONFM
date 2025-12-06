import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "../components/Footer";

export default function Registration() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "registrations"), form);
      setMessage("Registered successfully!");
      setForm({ name: "", email: "" });
    } catch (error) {
      console.error(error);
      setMessage("Error registering. Try again.");
    }
  };

  return (
    <div className="pt-24 max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Conference Registration</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">Register</button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
      <Footer />
    </div>
  );
}
