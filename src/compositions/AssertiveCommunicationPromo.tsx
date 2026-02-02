import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { IntroScene } from "../components/IntroScene";
import { ProblemScene } from "../components/ProblemScene";
import { SolutionScene } from "../components/SolutionScene";
import { BenefitsScene } from "../components/BenefitsScene";
import { FeaturesScene } from "../components/FeaturesScene";
import { CallToActionScene } from "../components/CallToActionScene";

// Transition component for fade effects between scenes
const Transition: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
}> = ({ children, durationInFrames }) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      {children}
    </AbsoluteFill>
  );
};

/**
 * Video promozionale per il corso di Comunicazione Assertiva
 *
 * Durata totale: 60 secondi (1800 frames @ 30fps)
 * Formato: 16:9 (1920x1080)
 *
 * Timeline delle scene:
 * - Intro:        0-240   (0-8 sec)
 * - Problem:    220-520   (7.3-17.3 sec)
 * - Solution:   500-800   (16.6-26.6 sec)
 * - Benefits:   780-1100  (26-36.6 sec)
 * - Features:  1080-1400  (36-46.6 sec)
 * - CTA:       1380-1800  (46-60 sec)
 */
export const AssertiveCommunicationPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e" }}>
      {/* Scene 1: Intro - Titolo del corso */}
      <Sequence from={0} durationInFrames={260}>
        <Transition durationInFrames={260}>
          <IntroScene />
        </Transition>
      </Sequence>

      {/* Scene 2: Problem - Le sfide della comunicazione */}
      <Sequence from={240} durationInFrames={300}>
        <Transition durationInFrames={300}>
          <ProblemScene />
        </Transition>
      </Sequence>

      {/* Scene 3: Solution - La soluzione assertiva */}
      <Sequence from={520} durationInFrames={300}>
        <Transition durationInFrames={300}>
          <SolutionScene />
        </Transition>
      </Sequence>

      {/* Scene 4: Benefits - I benefici del corso */}
      <Sequence from={800} durationInFrames={300}>
        <Transition durationInFrames={300}>
          <BenefitsScene />
        </Transition>
      </Sequence>

      {/* Scene 5: Features - Cosa include il corso */}
      <Sequence from={1080} durationInFrames={320}>
        <Transition durationInFrames={320}>
          <FeaturesScene />
        </Transition>
      </Sequence>

      {/* Scene 6: Call to Action - Iscrizione */}
      <Sequence from={1380} durationInFrames={420}>
        <Transition durationInFrames={420}>
          <CallToActionScene />
        </Transition>
      </Sequence>
    </AbsoluteFill>
  );
};
