import { useState } from "react";

export default function ResultModal({
  winner,
  resetGame,
}: {
  winner: string | null;
  resetGame: () => void;
}) {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  const handleMouseEnter = () => {
    // generate random values for top and left
    const randomTop = Math.floor(Math.random() * 80) + 10; // random top value (10% to 90%)
    const randomLeft = Math.floor(Math.random() * 80) + 10; // random left value (10% to 90%)
    setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="backdrop-blur-2xl bg-white/30 p-6 rounded-lg shadow-lg text-center"
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          // smooth transition for top and left
          transition: "top 0.5s ease, left 0.5s ease",
        }}
        // trigger random movement when hovered
        onMouseEnter={handleMouseEnter}
      >
        <p className="text-lg font-bold">Kết quả: {winner}</p>
        <p className="mt-4">Bạn có muốn chơi lại không?</p>
        <div className="mt-6">
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-gradient-to-r from-purple-800 to-indigo-700 text-white rounded hover:bg-green-600"
          >
            Chơi lại
          </button>
        </div>
      </div>
    </div>
  );
}
