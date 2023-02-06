import React from "react";

const puckColors = ["FC440F", "1EFFBC", "7C9299", "1F01B9", "B4E33D"];

interface PuckProps {
  index: number;
}

const Puck: React.FC<PuckProps> = ({ index }) => {
  return (
    <div
      className="puck"
      style={{
        width: 20 * index,
        backgroundColor: "#" + puckColors[index - 1],
        borderRadius: 20,
        marginTop: 10,
      }}>
      {index}
    </div>
  );
};

export default Puck;
