"use client";

import { useState } from "react";
import { updateUser } from "../../../services/api";
import { useRouter, useParams } from "next/navigation";

export default function EditUser() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await updateUser(params.id, { name, email });
      router.push("/");
    } catch (err) {
      console.error("Failed to update user:", err);
      setError("Failed to update user. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>Edit User</h2>

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
        Update
      </button>

    </form>
  );
}
