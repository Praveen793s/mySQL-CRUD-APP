"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser, updateUser } from "../services/api";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateUser(editId, form);
        setEditId(null);
      } else {
        await createUser(form);
      }

      setForm({ name: "", email: "" });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  // Edit user
  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
    });
    setEditId(user.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          User Management System
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-3 mb-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
            required
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="submit"
            className={`px-6 py-2 text-white rounded-lg font-semibold ${
              editId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading users...</p>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-4 text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{user.id}</td>

                    <td className="p-3">{user.name}</td>

                    <td className="p-3">{user.email}</td>

                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}
