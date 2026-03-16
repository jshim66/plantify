import React, { useState, useEffect } from "react";
import UploadForm from "../components/UploadForm";
import ResultModal from "../components/ResultModal";

type PlantResult = {
  commonName: string;
  scientificName: string;
  confidence: number;
};

function HomePage() {
    const [plantResult, setPlantResult] = useState<PlantResult | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleIdentifySuccess = (result: PlantResult) => {
        console.log("Plant identified successfully!", result);
        setPlantResult(result);
        setIsModalOpen(true);
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
      <ResultModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} result={plantResult} />
    </main>
  );
}

export default HomePage;