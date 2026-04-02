import "./ResultModal.css";
import type { PlantResult } from "../types/plant";

type ResultModalProps = {
  isOpen: boolean;
  onClose: () => void;
  result: PlantResult | null;
  imageUrl: string
};


function ResultModal({ isOpen, onClose, result, imageUrl }: ResultModalProps) {
  if (!isOpen || !result) return null;
  
  const isLowConfidence = result.confidence < 0.7;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Plant Identified</h2>
        {imageUrl && (
          <img src={imageUrl} alt="Uploaded plant" className="modal-plant-image"/>
        )}
        <p>
          <strong>Common Name:</strong> {result.commonName}
        </p>
        <p>
          <strong>Scientific Name:</strong> {result.scientificName}
        </p>
        <p className= {isLowConfidence ? "confidence-text low" : "confidence-text"}>
          <strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%
        </p>

        {isLowConfidence && (
          <div className="confidence-warning">
            This result may be uncertain. Try using a clearer photo with better lighting or a closer view of the plant.
          </div>
        )}

        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ResultModal;