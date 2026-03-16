import React, { useState, useEffect } from "react";

type PlantResult = {
  commonName: string;
  scientificName: string;
  confidence: number;
};

type UploadFormProps = {
  onIdentifySuccess: (result: PlantResult) => void;
};

function UploadForm({ onIdentifySuccess }: UploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);

    if (file) {
      setErrorMessage("");
    }

    console.log("File Selected:", file);
  };

  const handleClick = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select an image before continuing.");
      console.error("No file selected");
      return;

    }

    setErrorMessage("");
    console.log("Button Clicked");

    const formData = new FormData();
    formData.append("image", selectedFile)
    try {     
        const response = await fetch("http://localhost:4000/api/identify", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Response from server:", data);

      onIdentifySuccess(data.result);
    } 
    catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Failed to upload image. Please try again.");
    }

    // testForm();
  };

  useEffect(() => {
    console.log("SelectedFile state updated:", selectedFile);
  }, [selectedFile]);

  return (
    <section>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button
        type="button"
        onClick={handleClick}
        style={{
          marginTop: "12px",
          padding: "10px 16px",
          borderRadius: "6px",
          border: errorMessage ? "2px solid red" : "1px solid #ccc",
          outline: "none",
          backgroundColor: selectedFile ? "#4f46e5" : "#9ca3af",
          color: "white",
          cursor: selectedFile ? "pointer" : "not-allowed"
        }}
      >
        Identify Plant
      </button>

      {errorMessage && (
        <p style={{ color: "red", marginTop: "8px" }}>
          {errorMessage}
        </p>
      )}
    </section>
  );
}


export default UploadForm;