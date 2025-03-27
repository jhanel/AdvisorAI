import React, { useEffect } from "react";
import "./ClassInputCSS.css";

function FallingLeaves() {
  const [leaves, setLeaves] = React.useState<Array<{ id: number; style: any }>>([]);

  useEffect(() => {
    const generateLeaves = () => {
      let newLeaves = [];
      for (let i = 0; i < 15; i++) { 
        newLeaves.push({
          id: i,
          style: {
            left: `${Math.random() * 100}vw`,
            animationDuration: `${5 + Math.random() * 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          },
        });
      }
      setLeaves(newLeaves);
    };

    generateLeaves();
  }, []);

  return (
    <div className="falling-leaves">
      {leaves.map((leaf) => (
        <div key={leaf.id} className="leaf" style={leaf.style}>🍃</div>
      ))}
    </div>
  );
}

export default FallingLeaves;
