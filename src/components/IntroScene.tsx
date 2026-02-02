import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [30, 60], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const decorativeCircleScale = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 100,
      stiffness: 50,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)",
          opacity: 0.1,
          transform: `scale(${decorativeCircleScale}) translate(-200px, -200px)`,
          top: "20%",
          left: "10%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)",
          opacity: 0.1,
          transform: `scale(${decorativeCircleScale}) translate(100px, 100px)`,
          bottom: "10%",
          right: "15%",
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 90,
            fontWeight: 800,
            color: "#ffffff",
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            margin: 0,
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            lineHeight: 1.2,
          }}
        >
          COMUNICAZIONE
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ASSERTIVA
          </span>
        </h1>

        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 36,
            color: "#a0a0a0",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            marginTop: 40,
            letterSpacing: 4,
          }}
        >
          CORSO DI FORMAZIONE
        </p>
      </div>
    </AbsoluteFill>
  );
};
