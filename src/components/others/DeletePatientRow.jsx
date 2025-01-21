import React, { useState } from "react";

const DeletePatientRow = ({ data, handleMessage }) => {
  const baseurl = import.meta.env.VITE_API_KEY || "http://localhost:5173";

  const handleClick = async (e) => {
    const confirmation = confirm(
      "are you sure you want to delete this patient ?"
    );
    try {
      if (confirmation) {
        const response = await fetch(
          `${baseurl}/api/patients/deletePatient/${data.patient_id}`,
          { method: "delete" }
        );
        const result = await response.json();
        handleMessage(result.message);
      }
      console.log(confirmation, "HHHH");
    } catch (error) {
      console.log("error occurred : ", error);
      // return setError(error || "something went wrong");
    }
  };
  return (
    <tr className="h-10 border-b-[1px] hover:bg-[--baseColor] ">
      <td>{data?.patient_id}</td>
      <td>{data?.name}</td>
      <td>{data.gender}</td>
      <td>{data?.mobile}</td>
      <td>{new Date(data.DOB).toLocaleDateString("sv-SE")}</td>
      <td className="text-red-600 hover:underline underline-offset-2">
        <button onClick={handleClick}>Delete</button>
      </td>
    </tr>
  );
};

export default DeletePatientRow;
