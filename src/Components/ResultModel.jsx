// src/Components/ResultModal.jsx
import React from "react";
import "../Styles/ResultModal.css";

const ResultModal = ({ wpm, cpm, mistakes, onRetry }) => {
  return (
    <div className="result-modal">
      <div className="result-content">
        <h2>⏱ Test Completed</h2>
        <p><strong>WPM:</strong> {wpm}</p>
        <p><strong>CPM:</strong> {cpm}</p>
        <p><strong>Mistakes:</strong> {mistakes}</p>
        <button onClick={onRetry}>🔁 Try Again</button>
      </div>
    </div>
  );
};

export default ResultModal;
