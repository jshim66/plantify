import { useState, useEffect } from "react";
import UploadForm from "../components/UploadForm";
import ResultModal from "../components/ResultModal";
import type { PlantResult } from "../types/plant";
import "./HomePage.css";

function HomePage() {
  const [plantResult, setPlantResult] = useState<PlantResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState("");

  const handleIdentifySuccess = (result: PlantResult, imageUrl: string) => {
    console.log("Plant identified successfully!", result);
    setPlantResult(result);
    setIsModalOpen(true);
    setResultImageUrl(imageUrl);
  };

  useEffect(() => {
    if (plantResult) {
      console.log("New plant result:", plantResult);
    }
  }, [plantResult]);

  return (
    <main className="home-page">
      <section className="page-intro">
        <h1>Plantify</h1>
        <p>
          Upload a plant photo to identify leaves, flowers, and houseplants
          with a clear result and confidence score.
        </p>
      </section>

      <section className="workspace-section">
        <div className="workspace-copy">
          <span className="section-eyebrow">How to scan</span>

          <div className="scan-steps">
            <article className="scan-step">
              <span className="scan-step-number">1</span>
              <div>
                <h3>Choose a clear photo</h3>
                <p>Use a bright image where the leaf, flower, or full plant is easy to see.</p>
              </div>
            </article>

            <article className="scan-step">
              <span className="scan-step-number">2</span>
              <div>
                <h3>Review the result</h3>
                <p>Check the confidence score and try another photo if the match looks uncertain.</p>
              </div>
            </article>
          </div>

          <div className="scan-tip">
            <span className="scan-tip-label">Tip:</span>
            <p>Keep the plant centered and avoid cluttered backgrounds for a more accurate scan.</p>
          </div>
        </div>

        <UploadForm onIdentifySuccess={handleIdentifySuccess} />
      </section>

      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        result={plantResult}
        imageUrl={resultImageUrl}
      />
    </main>
  );
}

export default HomePage;
