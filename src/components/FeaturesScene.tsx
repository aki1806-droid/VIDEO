import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

const features = [
  "8 ore di formazione intensiva",
  "Esercitazioni pratiche e role-play",
  "Materiale didattico completo",
  "Attestato di partecipazione",
  "Supporto post-corso",
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 1600,
          gap: 80,
        }}
      >
        {/* Left side - Title */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: headerOpacity,
          }}
        >
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 28,
              color: "#e94560",
              letterSpacing: 4,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            IL CORSO INCLUDE
          </p>
          <h2
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 64,
              fontWeight: 800,
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Tutto ciò di cui
            <br />
            hai bisogno
          </h2>
        </div>

        {/* Right side - Features list */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 25,
            justifyContent: "center",
          }}
        >
          {features.map((feature, index) => {
            const delay = index * 12;
            const itemOpacity = interpolate(
              frame,
              [15 + delay, 30 + delay],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const checkScale = spring({
              frame: frame - 20 - delay,
              fps,
              config: {
                damping: 100,
                stiffness: 200,
              },
            });

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  opacity: itemOpacity,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: `scale(${Math.max(0, checkScale)})`,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: "#1a1a2e", fontSize: 24, fontWeight: 800 }}>✓</span>
                </div>
                <span
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: 32,
                    color: "#ffffff",
                    fontWeight: 500,
                  }}
                >
                  {feature}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
