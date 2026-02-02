import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

const benefits = [
  { icon: "🎯", title: "Obiettivi chiari", desc: "Esprimi i tuoi bisogni con precisione" },
  { icon: "🤝", title: "Relazioni migliori", desc: "Costruisci rapporti basati sul rispetto" },
  { icon: "💪", title: "Autostima", desc: "Rafforza la fiducia in te stesso" },
  { icon: "⚖️", title: "Equilibrio", desc: "Bilancia le tue esigenze con quelle degli altri" },
];

export const BenefitsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        padding: 80,
      }}
    >
      <h2
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 56,
          fontWeight: 700,
          color: "#ffffff",
          opacity: titleOpacity,
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        Cosa imparerai
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {benefits.map((benefit, index) => {
          const delay = index * 15;
          const cardScale = spring({
            frame: frame - 20 - delay,
            fps,
            config: {
              damping: 150,
              stiffness: 100,
            },
          });
          const cardOpacity = interpolate(
            frame,
            [20 + delay, 40 + delay],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={index}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                borderRadius: 20,
                padding: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                opacity: cardOpacity,
                transform: `scale(${Math.max(0.5, cardScale)})`,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span style={{ fontSize: 60, marginBottom: 20 }}>{benefit.icon}</span>
              <h3
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#00d9ff",
                  margin: 0,
                  marginBottom: 10,
                }}
              >
                {benefit.title}
              </h3>
              <p
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 24,
                  color: "#a0a0a0",
                  margin: 0,
                }}
              >
                {benefit.desc}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
