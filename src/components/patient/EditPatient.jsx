import React, { useState, useEffect } from "react";

const EditPatient = ({ patient }) => {
  const baseUrl = import.meta.env.VITE_API_KEY || "http://localhost:5173";
  const [formData, setFormData] = useState({
    name: patient?.name || "",
    DOB: patient?.DOB || "",
    mobile: patient?.mobile || "",
    gender: patient?.gender || "",
    email: patient?.email || "",
    address: patient?.address || "",
  });
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const conditions = [
    "Diabetes",
    "Dizziness",
    "Jaundice",
    "Cancer",
    "HIV",
    "Sinusitis",
    "High Blood Pressure",
    "Heart disease",
    "Rheumatic Fever",
    "Pregnancy",
    "Tuberculosis",
    "Kidney disease",
    "Liver Disease",
    "Head Aches",
    "Neck Aches",
    "Ear Aches",
    "Allergies",
    "Asthma",
    "Bleeding Gums",
    "Treated by Physician",
    "Abnormal Bleeding",
    "Anaemia",
    "Reaction to Penicillin",
    "Reaction to Local Anaesthetic",
    "Taking any Medicine",
    "Short of Breath",
    "Cracking, Clicking in Jaw",
    "Low Blood Pressure",
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${baseUrl}/api/patients/editPatient/${patient.patient_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setError("");
        setMessage("Patient Updated successfully!");
        setFormData({
          name: "",
          DOB: "",
          mobile: "",
          gender: "",
          email: "",
          address: "",
        });
        setSelectedConditions([]);
      } else {
        setError(result.error || "Error updating patient.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Something went wrong while updating the patient.");
    }
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <div className="fixed w-full flex justify-center top-14 left-1/2 transform -translate-x-1/2">
        {message && (
          <p className="text-lg py-4 px-3 rounded bg-green-600 text-white ">
            {message}
          </p>
        )}
        {error && (
          <p className=" text-lg py-4 px-3 rounded bg-red-500 text-white">
            {error}
          </p>
        )}
      </div>
      <h2 className="text-4xl mb-10">Update Patient Details</h2>
      <form
        className="flex flex-col justify-around gap-5 w-full"
        onSubmit={(e) => handleSubmit(e)}
        method="PUT"
      >
        <div className="flex items-center gap-10">
          <label className="w-24 flex justify-between">
            Name <span>:</span>
          </label>
          <input
            className="outline-none w-1/2 bg-[--baseColor] border rounded px-5 py-3 font-mono text-md"
            type="text"
            name="name"
            onChange={handleChange}
            defaultValue={patient.name}
            placeholder="Enter Name"
            required
          />
        </div>
        <div className="flex items-center gap-10">
          <label className="w-24 flex justify-between">
            Mobile <span>:</span>
          </label>
          <input
            className="outline-none w-1/2 bg-[--baseColor] border rounded px-5 py-3 font-mono text-md"
            type="text"
            name="mobile"
            defaultValue={patient.mobile}
            onChange={handleChange}
            placeholder="Enter Mobile number"
            required
          />
        </div>
        <div className="flex items-center gap-10">
          <label className="w-24 flex justify-between">
            D.O.B <span>:</span>
          </label>
          <input
            className="outline-none w-1/2 bg-[--baseColor] border rounded px-5 py-3 font-mono text-md marker:color-white"
            type="Date"
            name="DOB"
            defaultValue={new Date(patient.DOB).toLocaleDateString("sv-SE")}
            onChange={handleChange}
            placeholder="Enter Date of birth"
            required
          />
        </div>
        <div className="flex items-center gap-10">
          <label className="w-24 flex justify-between">
            Address <span>:</span>
          </label>
          <input
            className="outline-none w-1/2 bg-[--baseColor] border rounded px-5 py-3 font-mono text-md marker:color-white"
            type="text"
            name="address"
            defaultValue={patient.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />
        </div>
        <div className="flex items-center gap-10">
          <label className="w-24 flex justify-between">
            Gender <span>:</span>
          </label>
          <select
            name="gender"
            defaultValue={patient.gender}
            onChange={handleChange}
            className="outline-none w-1/2 bg-[--baseColor] border rounded px-5 py-3 font-mono text-md"
          >
            <option className="bg-[--SecondaryBase]" disabled>
              Select Gender
            </option>
            <option className="bg-[--SecondaryBase]" value="Other">
              Other
            </option>
            <option className="bg-[--SecondaryBase]" value="Male">
              Male
            </option>
            <option className="bg-[--SecondaryBase]" value="Female">
              Female
            </option>
          </select>
        </div>
        <div className="flex items-center gap-10">
          <label className="w-24 flex justify-between">
            Email <span>:</span>
          </label>
          <input
            className="outline-none w-1/2 bg-[--baseColor] border rounded px-5 py-3 font-mono text-md"
            type="text"
            name="email"
            defaultValue={patient.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
        </div>
        <button
          className=" self-start mt-5 outline-none w-32 bg-blue-500 rounded-md px-5 py-3"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPatient;
