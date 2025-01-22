import React from "react";
import TreatmentForm from "../others/TreatmentForm";

const PatientDetails = ({ patient }) => {
  return (
    <div className="min-h-screen">
      <h2 className="text-4xl mb-5">Patient Details</h2>
      <table className="flex text-md w-full gap-10 ">
        <thead>
          <tr className="flex flex-col font-extralight ">
            <td>Name:</td>
            <td>DOB:</td>
            <td>Gender:</td>
            <td>Email:</td>
            <td>Address:</td>
            <td>Mobile:</td>
            <td>Condition:</td>
          </tr>
        </thead>
        <tbody className="font-light ">
          <tr className="flex flex-col">
            <td className="font-light text-stone-600">{patient?.name}</td>
            <td className="font-light text-stone-600 font-mono">
              {new Date(patient?.DOB).toLocaleDateString("sv-SE")}
            </td>
            <td className="font-light text-stone-600">{patient?.gender}</td>
            <td className="font-light text-stone-600">
              {patient?.email ? (
                patient?.email
              ) : (
                <p className="text-amber-700">null</p>
              )}
            </td>
            <td className="font-light text-stone-600">
              {patient?.address ? (
                patient?.address
              ) : (
                <p className="text-amber-700">null</p>
              )}
            </td>
            <td className="font-light text-stone-600 font-mono">
              {patient?.mobile ? (
                patient?.mobile
              ) : (
                <p className="text-amber-700">null</p>
              )}
            </td>
            <td className="font-light text-stone-600">
              {patient?.conditions ? (
                patient?.conditions
              ) : (
                <p className="text-amber-700">null</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <h2 className="text-4xl mt-10">Treatment History </h2>
        <TreatmentForm
          id={patient.patient_id}
          treatments={patient.treatments}
        />
      </div>
    </div>
  );
};

export default PatientDetails;
