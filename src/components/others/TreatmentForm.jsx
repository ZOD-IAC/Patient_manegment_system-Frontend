import React, { useState } from "react";

const TreatmentForm = ({ id, treatments }) => {
  const baseUrl = import.meta.env.VITE_API_KEY || "http://localhost:5173";
  const [treatment, setTreatment] = useState({
    patientId: id,
    date: "",
    process: "",
    amount: "",
    treatedBy: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTreatment({ ...treatment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/api/patients/addTreatment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure proper headers
        },
        body: JSON.stringify(treatment),
      });

      if (!response.ok) {
        // Check if the backend sends error details
        const errorData = await response.json();
        console.error(errorData, "Error Details");
        setError(errorData.message || "Something went wrong");
        return; // Exit early if the response is not OK
      }
      const data = await response.json();
      //clear form on submit successfully
      setTreatment({
        patientId: id, // Keep the patientId if needed
        date: "",
        process: "",
        amount: "",
        treatedBy: "",
      });

      // Show success message or perform further actions
      setMessage("Treatment added successfully!");
    } catch (error) {
      console.log(error, "Catch Block");
      setError("Some problem occurred");
    }
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 2000);
  };

  return (
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
      <form
        className="flex flex-col items-start gap-5 columns-4 w-full"
        onSubmit={(e) => handleSubmit(e)}
        method="POST"
      >
        <div className="inline-block justify-between gap-2 columns-4 w-full">
          <label className="flex flex-col w-full gap-3">
            Date :
            <input
              onChange={handleChange}
              value={treatment.date}
              className="bg-[--baseColor] outline-none h-10 rounded p-2 font-mono"
              type="date"
              name="date"
              required
            />
          </label>

          <label className="flex flex-col w-full gap-3">
            Treatment :
            <input
              onChange={handleChange}
              value={treatment.process}
              className="bg-[--baseColor] outline-none h-10 rounded p-2"
              type="text"
              name="process"
              required
            />
          </label>

          <label className="flex flex-col w-full gap-3 ">
            Amount :
            <input
              onChange={handleChange}
              value={treatment.amount}
              className="bg-[--baseColor] outline-none h-10 rounded p-2 font-mono"
              type="number"
              name="amount"
              min={0}
              required
            />
          </label>

          <label className="flex flex-col gap-3 w-full">
            Treated by :
            <select
              className="bg-[--baseColor] outline-none h-10 rounded p-2"
              name="treatedBy"
              onChange={handleChange}
              value={treatment.treatedBy}
              required
            >
              <option value="" disabled>
                choose doctor
              </option>
              <option value="Dr. Pramod">Dr. Pramod</option>
              <option value="Dr. Ravinder">Dr. Ravinder</option>
              <option value="Dr. Uma">Dr. Uma</option>
            </select>
          </label>
        </div>
        <button className="bg-blue-500 px-5 py-2 rounded" type="submit">
          Add
        </button>
      </form>
      <table className="mt-10 w-full text-center">
        <thead>
          <tr className="bg-stone-950 h-10 border-2 rounded-t-full">
            <td className="text-[--textHeadColor]">Date</td>
            <td className="text-[--textHeadColor]">Treatment</td>
            <td className="text-[--textHeadColor]">Amount</td>
            <td className="text-[--textHeadColor]">Treated by </td>
          </tr>
        </thead>
        <tbody>
          {treatment &&
            treatments.map((treat, idx) => {
              return (
                <tr
                  className="font-mono h-10 border-b-[1px] bg-[--SecondaryBase] border-gray-400 hover:bg-[--baseColor] "
                  key={idx}
                >
                  <td>{new Date(treat.date).toLocaleDateString("sv-SE")}</td>
                  <td>{treat.process}</td>
                  <td>{treat.amount}</td>
                  <td>{treat.treated_by}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TreatmentForm;
