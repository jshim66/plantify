import React, { useState, useEffect } from "react";
import UploadForm from "../components/UploadForm";
import ResultModal from "../components/ResultModal";
import type { PlantResult } from "../types/plant";

function HomePage() {
    const [plantResult, setPlantResult] = useState<PlantResult | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resultImageUrl, setResultImageUrl] = useState("");

    const handleIdentifySuccess = (result: PlantResult, imageUrl: string) => {
        console.log("Plant identified successfully!", result);
        setPlantResult(result);
        setIsModalOpen(true);
        setResultImageUrl(imageUrl)
    }

    useEffect(() => {
        if (plantResult) {
            console.log("New plant result:", plantResult);
        }
    }   , [plantResult]);

  return (
    <main>
      <h1>Plantify</h1>
      <p>Upload a plant photo to identify it.</p>

      <UploadForm onIdentifySuccess={handleIdentifySuccess} />
      <ResultModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} result={plantResult} imageUrl={resultImageUrl}/>
    </main>
  );
}

export default HomePage;