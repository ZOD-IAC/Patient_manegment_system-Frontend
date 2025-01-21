import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditPatient from "../components/patient/EditPatient";
import PrescriptionHistory from "../components/patient/PrescriptionHistory";
import PatientDetails from "../components/patient/PatientDetails";

const ShowDetails = ({ children }) => {
  const base_key = {
    apiKey: import.meta.env.VITE_API_KEY,
  };
  const { id } = useParams();
  const [patient, setPatient] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [option, setOption] = useState("Patient Details");

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(
          `${base_key.apiKey}/api/patients/getPatientTreatment/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setPatient(data);
        } else {
          setError(data.error || "Failed to fetch patient details.");
        }
      } catch (err) {
        setError("Something went wrong.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="h-full w-full flex ">
      <div className=" min-h-full w-1/4 bg-[--baseColor]">
        <div className=" flex gap-2 h-20 text-3xl bg-[--SecondaryBase] border-[1px] border-black items-center justify-center px-2 py-1 m-10  rounded-full ">
          <img
            src="/public/images/favicon.png"
            className="object-cover h-full w-max "
          />
          <div>
            <h2>Dental Facets </h2>
          </div>
        </div>
        <div className="p-10">
          <h3 className="text-4xl mb-5 ">OPTIONS :</h3>
          <ul className=" ml-5 p-2">
            <li
              className={`py-3 px-2 rounded-md ${
                option == "Patient Details" ? "navLink" : ""
              }`}
              onClick={() => setOption("Patient Details")}
            >
              Patient Details &#8594;
            </li>
            <li
              className={`py-3 px-2 rounded-md ${
                option == "Edit Patient" ? "navLink" : ""
              }`}
              onClick={() => setOption("Edit Patient")}
            >
              Edit Patient &#8594;
            </li>
            <li
              className={`py-3 px-2 rounded-md ${
                option == "History Images" ? "navLink" : ""
              }`}
              onClick={() => setOption("History Images")}
            >
              Prescription History &#8594;
            </li>
          </ul>
        </div>
      </div>
      <div className="h-full w-3/4  bg-[--bgColor]">
        <div className="w-full h-20 flex items-center justify-between p-10 text-2xl bg-[--SecondaryBase]">
          <h3>Patient Management System</h3>
          <Link
            to={"/"}
            className="text-sm bg-red-500 px-2 py-3 rounded text-[--textHeadColor] hover:bg-red-700 transition duration-200"
          >
            Dashboard
          </Link>
        </div>
        <div className=" p-16 ">
          {option === "Patient Details" && <PatientDetails patient={patient} />}
          {option === "Edit Patient" && (
            <EditPatient patient={patient} patient_id={id} />
          )}
          {option === "History Images" && (
            <PrescriptionHistory patientId={id} />
          )}
        </div>
      </div>
    </div>
    // <div className="h-screen w-full">
    //   <div className="sticky top-0 bg-zinc-900 h-20 px-6 py-2 text-2xl text-white flex items-center justify-between">
    //     Patient Management System
    //     <div className="flex gap-3 h-full p-2">
    //       <img src="../../../public/images/favicon.png" />
    //     </div>
    //   </div>
    //   <div className="h-full flex text-white">
    //     <div className="h-full p-10 w-3/12 bg-[#2e2e2e] flex flex-col gap-5 items-start justify-start ">
    //       <Link
    //         to={"/"}
    //         className="text-sm text-blue-400 underline underline-offset-4 hover:text-blue-600"
    //       >
    //         back to Dashboard
    //       </Link>
    //       <h3 className=" text-3xl">OPTIONS</h3>
    //       <ul className="flex flex-col gap-3 ml-7">
    //         <li
    //           className="hover:underline underline-offset-2 w-full"
    //           onClick={() => setOption("Patient Details")}
    //         >
    //           Patient Details &#8594;
    //         </li>
    //         <li
    //           className="hover:underline underline-offset-2 w-full"
    //           onClick={() => setOption("Edit Patient")}
    //         >
    //           Edit details &#8594;
    //         </li>
    //         <li
    //           className="hover:underline underline-offset-2 w-full "
    //           onClick={() => setOption("History Images")}
    //         >
    //           Prescription History &#8594;
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="h-full w-full p-16 ">
    //       {option === "Patient Details" && <PatientDetails patient={patient} />}
    //       {option === "Edit Patient" && (
    //         <EditPatient patient={patient} patient_id={id} />
    //       )}
    //       {option === "History Images" && (
    //         <PrescriptionHistory patientId={id} />
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default ShowDetails;
