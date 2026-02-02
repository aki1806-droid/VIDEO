import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

const problems = [
  "Difficoltà a dire NO?",
  "Ti senti ignorato nelle riunioni?",
  "Conflitti sul lavoro?",
  "Paura di esprimere le tue opinioni?",
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #2d132c 0%, #4a1942 50%, #1a1a2e 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 60,
            fontWeight: 700,
            color: "#ff6b6b",
            opacity: titleOpacity,
            marginBottom: 60,
            textAlign: "center",
          }}
        >
          Ti riconosci in queste situazioni?
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
            width: "100%",
            maxWidth: 1200,
          }}
        >
          {problems.map((problem, index) => {
            const delay = index * 20;
            const itemOpacity = interpolate(
              frame,
              [20 + delay, 40 + delay],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const itemX = interpolate(
              frame,
              [20 + delay, 40 + delay],
              [-100, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  opacity: itemOpacity,
                  transform: `translateX(${itemX}px)`,
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#ff6b6b",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: 44,
                    color: "#ffffff",
                    fontWeight: 500,
                  }}
                >
                  {problem}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
