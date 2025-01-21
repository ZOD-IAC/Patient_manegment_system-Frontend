import React from "react";
import { Link } from "react-router-dom";
const TableRow = ({ data }) => {
  const handleClick = (e) => {
    console.log(e);
  };
  return (
    <tr className="h-10 border-b-[1px] hover:bg-[--baseColor] ">
      <td>{data?.patient_id}</td>
      <td>{data?.name}</td>
      <td>{data.gender}</td>
      <td>{data?.mobile}</td>
      <td>{new Date(data.DOB).toLocaleDateString("sv-SE")}</td>
      <td className="text-blue-700 hover:underline underline-offset-2">
        <Link to={`/patient/showDetails/${data.patient_id}`}>details</Link>
      </td>
    </tr>
  );
};

export default TableRow;
