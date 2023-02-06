import React from "react";

const puckColors = [
  "F94144",
  "F3722C",
  "F8961E",
  "F9844A",
  "F9C74F",
  "90BE6D",
  "43AA8B",
  "4D908E",
  "577590",
  "277DA1",
  "FC440F",
  "1EFFBC",
  "7C9299",
  "1F01B9",
  "B4E33D",
];

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
      &nbsp;{/* {index} */}
    </div>
  );
};

export default Puck;
