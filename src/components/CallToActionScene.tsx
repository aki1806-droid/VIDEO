import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const CallToActionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgPulse = interpolate(
    frame,
    [0, 60, 120, 180, 240],
    [1, 1.02, 1, 1.02, 1]
  );

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 150,
      stiffness: 80,
    },
  });

  const buttonOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonScale = spring({
    frame: frame - 40,
    fps,
    config: {
      damping: 100,
      stiffness: 150,
    },
  });

  const subtitleOpacity = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsating button effect
  const buttonPulse = interpolate(
    frame,
    [80, 100, 120, 140, 160, 180, 200, 220, 240],
    [1, 1.05, 1, 1.05, 1, 1.05, 1, 1.05, 1]
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${bgPulse})`,
      }}
    >
      {/* Animated gradient orbs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(233,69,96,0.2) 0%, transparent 70%)",
          top: "-10%",
          right: "-10%",
          transform: `rotate(${frame}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,217,255,0.2) 0%, transparent 70%)",
          bottom: "-10%",
          left: "-10%",
          transform: `rotate(${-frame}deg)`,
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
        <h2
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            margin: 0,
            marginBottom: 50,
            lineHeight: 1.3,
          }}
        >
          Inizia il tuo percorso
          <br />
          verso una comunicazione
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            più efficace
          </span>
        </h2>

        <div
          style={{
            opacity: buttonOpacity,
            transform: `scale(${Math.max(0.5, buttonScale) * buttonPulse})`,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)",
              padding: "25px 70px",
              borderRadius: 50,
              boxShadow: "0 10px 40px rgba(233,69,96,0.4)",
            }}
          >
            <span
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 36,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: 2,
              }}
            >
              ISCRIVITI ORA
            </span>
          </div>
        </div>

        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 28,
            color: "#a0a0a0",
            opacity: subtitleOpacity,
            marginTop: 40,
          }}
        >
          www.comunicazioneassertiva.it
        </p>
      </div>
    </AbsoluteFill>
  );
};
