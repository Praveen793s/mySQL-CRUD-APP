"use client";

import { useState } from "react";
import { createUser } from "../../services/api";
import { useRouter } from "next/navigation";

export default function CreateUser() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createUser({ name, email });
      router.push("/");
    } catch (err) {
      console.error("Failed to create user:", err);
      setError("Failed to create user. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>Create User</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">
        Create
      </button>

    </form>
  );
}
