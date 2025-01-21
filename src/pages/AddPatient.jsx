import React, { useState } from "react";
import Dashboard from "../components/common/Dashboard";

const AddPatient = () => {
  const baseUrl = import.meta.env.VITE_API_KEY || "http://localhost:5173";
  const [formData, setFormData] = useState({
    name: "",
    DOB: "",
    mobile: "",
    gender: "",
    email: "",
    address: "",
    condition: "",
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (condition) => {
    setSelectedConditions(
      (prev) =>
        prev.includes(condition)
          ? prev.filter((item) => item !== condition) // Remove condition
          : [...prev, condition] // Add condition
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      condition: selectedConditions.join(","),
    };

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("DOB", formData.DOB);
    formDataObj.append("mobile", formData.mobile);
    formDataObj.append("gender", formData.gender);
    formDataObj.append("email", formData.email);
    formDataObj.append("address", formData.address);
    formDataObj.append("condition", updatedFormData.condition);

    for (let [key, value] of formDataObj.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(`${baseUrl}/api/patients/addPatient`, {
        method: "POST",
        body: formDataObj,
      });

      const result = await response.json();

      if (response.ok) {
        setError("");
        setMessage("Patient added successfully!");
        setFormData({
          name: "",
          DOB: "",
          mobile: "",
          gender: "",
          email: "",
          address: "",
          condition: "",
        });
        setSelectedConditions([]);
      } else {
        setError(result.error || "Error adding patient.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Something went wrong while adding the patient.");
    }
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 2000);
  };

  return (
    <Dashboard>
      <div>
        <div className="fixed w-full flex justify-center top-14 left-1/2 transform -translate-x-1/2 ">
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
        <h2 className="text-4xl mb-10">Add New Patient</h2>
        <form
          className="flex flex-col justify-around gap-5 w-full"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex items-center gap-10">
            <label className="w-24 font-base flex justify-between">
              Name <span>:</span>
            </label>
            <input
              className="outline-none w-1/2 bg-[--baseColor] border rounded px-5 py-3 font-mono text-md"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="flex items-center gap-10">
            <label className="w-24 font-base flex justify-between">
              Mobile <span>:</span>
            </label>
            <input
              className="outline-none w-1/2 bg-[--baseColor] border rounded px-5 py-3 font-mono text-md"
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter Mobile number"
              required
            />
          </div>
          <div className="flex items-center gap-10">
            <label className="w-24 font-base flex justify-between">
              D.O.B <span>:</span>
            </label>
            <input
              className="outline-none w-1/2 bg-[--baseColor] border rounded px-5 py-3 font-mono text-md marker:color-white"
              type="Date"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              placeholder="Enter Date of birth"
              required
            />
          </div>
          <div className="flex items-center gap-10">
            <label className="w-24 font-base flex justify-between">
              Address <span>:</span>
            </label>
            <input
              className="outline-none w-1/2 bg-[--baseColor] border rounded px-5 py-3 font-mono text-md marker:color-white"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>
          <div className="flex items-center gap-10">
            <label className="w-24 font-base flex justify-between">
              Gender <span>:</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="outline-none w-1/2 bg-[--baseColor] border rounded px-5 py-3 font-mono text-md"
              required
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
            <label className="w-24 font-base flex justify-between">
              Email <span>:</span>
            </label>
            <input
              className="outline-none w-1/2 bg-[--baseColor] border rounded px-5 py-3 font-mono text-md"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </div>
          <div className="flex flex-col items-start gap-10">
            <label className="w-24 font-base flex justify-between">
              Allergies <span>:</span>
            </label>
            <div className="flex flex-wrap justify-start gap-5">
              {conditions.map((condition, index) => (
                <label
                  className="flex items-center gap-2 justify-center"
                  key={index}
                >
                  <input
                    type="checkbox"
                    value={condition}
                    checked={selectedConditions.includes(condition)}
                    onChange={() => handleCheckboxChange(condition)}
                  />
                  {condition}
                </label>
              ))}
            </div>
          </div>

          <button
            className=" self-start mt-5 outline-none w-32 bg-blue-500 rounded-md px-5 py-3"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Dashboard>
  );
};

export default AddPatient;
