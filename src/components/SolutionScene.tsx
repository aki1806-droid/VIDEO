import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const revealProgress = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textScale = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 150,
      stiffness: 100,
    },
  });

  const subtitleOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f3460 0%, #16213e 50%, #1a1a2e 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated background element */}
      <div
        style={{
          position: "absolute",
          width: "150%",
          height: 8,
          background: "linear-gradient(90deg, transparent, #00d9ff, transparent)",
          transform: `translateX(${interpolate(frame, [0, 120], [-100, 100])}%)`,
          top: "30%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "150%",
          height: 8,
          background: "linear-gradient(90deg, transparent, #e94560, transparent)",
          transform: `translateX(${interpolate(frame, [0, 120], [100, -100])}%)`,
          bottom: "30%",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 36,
            color: "#00d9ff",
            opacity: revealProgress,
            marginBottom: 20,
            letterSpacing: 6,
            fontWeight: 600,
          }}
        >
          LA SOLUZIONE
        </p>

        <h2
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 80,
            fontWeight: 800,
            color: "#ffffff",
            opacity: textOpacity,
            transform: `scale(${Math.max(0.8, textScale)})`,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          Impara a comunicare
          <br />
          con{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            sicurezza
          </span>{" "}
          e{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            rispetto
          </span>
        </h2>

        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 32,
            color: "#a0a0a0",
            opacity: subtitleOpacity,
            marginTop: 40,
            maxWidth: 900,
          }}
        >
          Senza aggressività, senza passività
        </p>
      </div>
    </AbsoluteFill>
  );
};
