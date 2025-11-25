import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPatient } from '../patient/patientsSlice';
import toast from 'react-hot-toast';

const CreatePatient = () => {
  const dispatch = useDispatch();
  const { createStatus, createError } = useSelector((state) => state.patients);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "Male",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPatient(formData));
  
    if (createStatus === "succeeded") {
      toast.success("Patient created successfully!", {
        style: {
          background: "#E8F9F0",
          color: "#1B5E20",
          border: "1px solid #A5D6A7",
        },
      });
      setFormData({
        name: "",
        phone: "",
        age: "",
        gender: "Male",
      });
    }

    if (createStatus === "failed") {
      toast.error(createError?.message || "Error creating patient", {
        style: {
          background: "#FDECEC",
          color: "#B71C1C",
          border: "1px solid #FFCDD2",
        },
      });
      console.error(createError);
    }};

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Patient</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">Phone</label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label htmlFor="age" className="block mb-1 font-medium">Age</label>
          <input
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            type="number"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block mb-1 font-medium">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <button
          disabled={createStatus === "loading"}
          className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded w-full"
        >
          {createStatus === "loading" ? "Creating..." : "Create Patient"}
        </button>

      </form>
    </div>
  );
};

export default CreatePatient;
