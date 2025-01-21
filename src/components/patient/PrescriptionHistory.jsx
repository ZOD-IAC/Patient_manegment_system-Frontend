import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";

const PrescriptionHistory = ({ patientId }) => {
  const baseUrl = import.meta.env.VITE_API_KEY || "http://localhost:5173";
  const [patientImages, setPatientImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/patients/getImages/${patientId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setPatientImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (patientId) {
      fetchData();
    }
  }, []);

  const handleImageUpload = async (patientId, files) => {
    const formData = new FormData();

    // Append multiple files to FormData
    files.forEach((file) => {
      formData.append("prescriptionImages", file);
    });

    try {
      const response = await fetch(
        `${baseUrl}/api/patients/addImages/${patientId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      console.log(result, "RESULT");

      if (response.ok) {
        setUploadStatus("Images uploaded successfully!");
        // setPatientImages((prev) => [...prev, ...result.images]);
      } else {
        setUploadStatus(result.error || "Error adding images.");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      setUploadStatus("Failed to upload images.");
    }

    // Clear upload status after 3 seconds
    setTimeout(() => setUploadStatus(""), 3000);
  };

  return (
    <div className="min-h-screen">
      <h2 className="text-4xl mb-10">Prescription History</h2>

      {/* Display uploaded images */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {patientImages.map((image, index) => (
          <InnerImageZoom
            src={`${baseUrl}/${image.image_path}`}
            zoomSrc={`${baseUrl}/${image.image_path}`}
            alt={`Prescription ${index + 1}`}
            className="w-full h-auto rounded-md shadow-md contrast-100"
          />
        ))}
      </div>

      {/* Image upload form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (files.length === 0) {
            setUploadStatus("Please select at least one image.");
            return;
          }
          handleImageUpload(patientId, files);
        }}
      >
        <input
          type="file"
          name="prescriptionImages"
          className="outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-200 file:text-violet-700 hover:file:bg-violet-100"
          multiple
          accept="image/*"
          onChange={(e) => setFiles(Array.from(e.target.files))} // Ensure proper conversion
        />
        <button
          className="bg-blue-600 px-3 py-2 rounded-md text-white mt-4"
          type="submit"
        >
          Upload Images
        </button>
      </form>

      {/* Upload status message */}
      {uploadStatus && (
        <p className="mt-4 text-center text-red-500">{uploadStatus}</p>
      )}
    </div>
  );
};

export default PrescriptionHistory;
