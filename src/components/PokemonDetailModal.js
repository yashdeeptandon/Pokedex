import React from "react";
import "./PokemonDetailModal.css"; // Import the styles

function PokemonDetailModal({ pokemon, show, onHide }) {
  if (!pokemon) return null;

  const { name, stats } = pokemon;

  // Function to get the percentage value for each stat
  const calculatePercentage = (baseStat) => {
    return `${(baseStat / 255) * 100}%`;
  };

  // Sorting stats in descending order for the leaderboard
  const sortedStats = stats.sort((a, b) => b.base_stat - a.base_stat);

  return (
    <div className={`pokemon-detail-modal ${show ? "visible" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{name}</h3>
        </div>
        <div className="modal-body">
          <div className="stats-container">
            {sortedStats.map((stat) => (
              <div key={stat.stat.name} className="stat-item">
                <p>{stat.stat.name}</p>
                <div className="stat-bar">
                  <div
                    className="bar-fill"
                    style={{
                      width: calculatePercentage(stat.base_stat),
                      backgroundColor: `rgba(0, 123, 255, ${
                        stat.base_stat / 255
                      })`,
                    }}
                  ></div>
                </div>
                <p>{stat.base_stat}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onHide}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailModal;
