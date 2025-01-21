import { useState } from "react";
// import TableRow from "../components/others/TableRow";
import DeletePatientRow from "../components/others/DeletePatientRow";
import Dashboard from "../components/common/Dashboard";

const DeletePatient = () => {
  const baseurl = import.meta.env.VITE_API_KEY || "http://localhost:5173";
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!mobile) {
      setError("Please enter a valid mobile number.");
      return;
    }

    try {
      // Fetch data from the server
      const response = await fetch(
        `${baseurl}/api/patients/findPatient/${mobile}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        return setError("Patient not found");
      }

      const data = await response.json();
      setData(data); // Update the state with fetched data
      setError("");
    } catch (err) {
      console.error("Error:", err.message);
      setError("Something went wrong while fetching data.");
    }
  };

  const handleMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <Dashboard>
      <div className="h-full w-full ">
        <div className="fixed w-full flex justify-center top-14 left-1/2 transform -translate-x-1/2 ">
          {error && (
            <p className=" text-lg py-4 px-3 rounded bg-red-500 text-white">
              {error}
            </p>
          )}
          {message && (
            <p className="text-lg py-4 px-3 rounded bg-green-600 text-white ">
              {message}
            </p>
          )}
        </div>
        <h2 className="text-4xl">Delete Existing patient</h2>

        <form
          className="flex flex-col gap-5 items-start"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label className="mt-10">Enter Patient mobile Number</label>
          <input
            className="outline-none w-2/5 bg-[--baseColor] border rounded px-5 py-3 font-mono text-xl"
            type="text"
            name="mobile"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            required
            placeholder="Ex:987******0"
          />
          <button
            className="outline-none bg-blue-500 rounded-md px-5 py-3"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="mt-20 min-h-screen h-full w-full ">
          {data?.length > 0 ? (
            <table className="table w-full text-center ">
              <thead className="bg-[#2e2e2e]">
                <tr className="font-light h-10">
                  <th className="text-[--textHeadColor]">Patient Id</th>
                  <th className="text-[--textHeadColor]">Name</th>
                  <th className="text-[--textHeadColor]">Gender</th>
                  <th className="text-[--textHeadColor]">Mobile</th>
                  <th className="text-[--textHeadColor]">D.O.B</th>
                  <th className="text-[--textHeadColor]">More</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {data.message == "Patient not found"
                  ? setError(() => data.message)
                  : data.map((data, key) => {
                      return (
                        <DeletePatientRow
                          data={data}
                          key={key}
                          handleMessage={handleMessage}
                        />
                      );
                    })}
              </tbody>
            </table>
          ) : (
            <div className="w-full flex items justify-center h-[20rem] ">
              <img
                src="/images/undraw_no-data_ig65.png"
                alt="formality"
                className="mix-blend-multiply"
              />
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default DeletePatient;
