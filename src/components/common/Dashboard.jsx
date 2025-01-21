import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Dashboard = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="h-full w-full flex ">
      <div className=" min-h-full w-1/4 bg-[--baseColor]">
        <div className=" flex gap-2 h-20 text-3xl bg-[--SecondaryBase] border-[1px] border-black items-center justify-center px-2 py-1 m-10 rounded-full ">
          <img
            src="/public/images/favicon.png"
            className=" object-cover h-full w-max "
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
                pathname == "/" ? "navLink" : ""
              }`}
            >
              <Link to={"/"}>Find Patient &#8594;</Link>
            </li>
            <li
              className={`py-3 px-2 rounded-md ${
                pathname == "/addPatient" ? "navLink" : ""
              }`}
            >
              <Link to={"/addPatient"}>Add Patient &#8594;</Link>
            </li>
            <li
              className={`py-3 px-2 rounded-md ${
                pathname == "/deletePatient" ? "navLink" : ""
              }`}
            >
              <Link to={"/deletePatient"}>Delete Patient &#8594;</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-full w-3/4  bg-[--bgColor]">
        <div className="w-full h-20 flex items-center p-10 text-2xl bg-[--SecondaryBase]">
          <h3>Patient Management System</h3>
        </div>
        <div className=" p-16 ">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
