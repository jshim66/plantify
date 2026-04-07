import { useState, useEffect, type ChangeEvent } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);

    if (file) {
      setErrorMessage("");
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl("");
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
    formData.append("image", selectedFile);
    try {
      const response = await fetch(`${apiBaseUrl}/api/identify`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Response from server:", data);

      onIdentifySuccess(data.result, previewUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
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
  }, [previewUrl, selectedFile]);

  return (
    <section className="upload-form">
      <input
        id="plant-image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isLoading}
        className="file-upload-input"
      />

      <label
        htmlFor="plant-image-upload"
        className={`upload-stage ${isLoading ? "upload-stage-disabled" : ""}`}
      >
        {previewUrl ? (
          <div className="upload-preview-wrapper">
            <img
              src={previewUrl}
              alt="Selected preview"
              className="upload-preview-image"
            />

            {selectedFile && (
              <p className="selected-file-name">
                Ready to scan: <span>{selectedFile.name}</span><br />
                Click on area again to choose different image
              </p>
            )}
          </div>
        ) : (
          <div className="upload-empty-state">
            <span className="upload-empty-icon" aria-hidden="true">
              +
            </span>
            <h3>Add a plant photo</h3>
            <p>Click anywhere in this area to choose an image.</p>
          </div>
        )}
      </label>

      <div className="upload-controls">
        <button
          type="button"
          onClick={handleClick}
          disabled={isLoading}
          className={`identify-button ${
            errorMessage ? "identify-button-error" : ""
          }`}
        >
          {isLoading ? "Identifying plant..." : "Identify Plant"}
        </button>
      </div>

      {errorMessage && (
        <p className="upload-error">{errorMessage}</p>
      )}
    </section>
  );
}

export default UploadForm;
