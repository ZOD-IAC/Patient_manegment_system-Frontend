import React from "react";
import { Routes, Route } from "react-router-dom";
import ShowDetails from "./pages/ShowDetails";
import FindPatient from "./pages/FindPatient";
import AddPatient from "./pages/AddPatient";
import DeletePatient from "./pages/DeletePatient";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<LoginForm />} /> */}
      <Route path="/" element={<FindPatient />} />
      <Route path="/addPatient" element={<AddPatient />} />
      <Route path="/deletePatient" element={<DeletePatient />} />
      <Route path="/patient/showDetails/:id" element={<ShowDetails />} />
    </Routes>
  );
};

export default App;
