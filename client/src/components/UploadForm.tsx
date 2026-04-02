import React, { useState, useEffect } from "react";
import "./UploadForm.css";

type PlantResult = {
  commonName: string;
  scientificName: string;
  confidence: number;
};

type UploadFormProps = {
  onIdentifySuccess: (result: PlantResult, imageUrl: string) => void;
};

function UploadForm({ onIdentifySuccess }: UploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);

    if (file) {
      setErrorMessage("");
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else{
      setPreviewUrl("")
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
    setIsLoading(true);
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

      onIdentifySuccess(data.result, previewUrl);
    } 
    catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Failed to upload image. Please try again.");
    } finally{
      setIsLoading(false)
    }

    // testForm();
  };

  useEffect(() => {
    console.log("SelectedFile state updated:", selectedFile);
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <section className="upload-form">
      <div className="upload-controls">
        <label htmlFor="plant-image-upload" className={`file-upload-button ${isLoading ? "file-upload-button-disabled" : ""}`}>
          Select File
        </label>
        <input id="plant-image-upload" type="file" accept="image/*" onChange={handleFileChange} disabled={isLoading} className="file-upload-input"/>

      
        <button
          type="button"
          onClick={handleClick}
          disabled={isLoading}
          className={`identify-button ${errorMessage ? "identify-button-error": ""}`}
        >
        {isLoading ? "Identifying plant..." : "Identify Plant"}
        </button>
      </div>
      
       {previewUrl && (
        <div className = "upload-preview-wrapper">
          <img src = {previewUrl} alt ="Selected preview" className="upload-preview-image"/>
        

          {selectedFile && (
            <p className="selected-file-name">
              {selectedFile.name}
            </p>
          )}
        </div>
      )}
      {errorMessage && (
        <p style={{ color: "red", marginTop: "8px" }}>
          {errorMessage}
        </p>
      )}
    </section>
  );
}


export default UploadForm;