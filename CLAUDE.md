# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A [Remotion](https://www.remotion.dev/) project (React 19 + TypeScript) that renders a 60-second promotional video for an assertive communication course ("Comunicazione Assertiva"). Content text and scene comments are in Italian.

## Commands

```bash
npm install            # install dependencies
npm start              # open Remotion Studio (interactive preview/editor)
npm run build          # render the video to out/video.mp4
npx tsc --noEmit       # type-check (no test runner or linter is configured)
```

`npm run build` renders the `AssertiveCommunicationPromo` composition. To render a different composition or output, use `npx remotion render <CompositionId> <output-path>`.

## Architecture

Standard Remotion entry chain:

- `src/index.ts` — calls `registerRoot(RemotionRoot)`.
- `src/Root.tsx` — registers compositions via `<Composition>`. The single composition `AssertiveCommunicationPromo` is 1800 frames @ 30fps (60s), 1920x1080. Duration/fps/dimensions are defined here only — scenes derive timing from `useCurrentFrame()`/`useVideoConfig()`.
- `src/compositions/AssertiveCommunicationPromo.tsx` — the timeline. Lays out six scenes with `<Sequence from={...} durationInFrames={...}>` and wraps each in a local `Transition` component that fades in/out over 15 frames. Adjacent sequences deliberately overlap by ~20 frames so the cross-fades blend; if you change a scene's length, adjust the `from` of all later sequences and keep the overlaps.
- `src/components/*Scene.tsx` — one self-contained component per scene (Intro, Problem, Solution, Benefits, Features, CallToAction).

## Conventions

- Scenes are pure functions of the current frame: animate with `interpolate()` (almost always with `extrapolateLeft/Right: "clamp"`) and `spring({ frame, fps, ... })`. Stagger element entrances by offsetting the frame (e.g. `frame - 10`) or using later input ranges.
- All styling is inline `style` objects — no CSS files or styling libraries. Layout is built on `AbsoluteFill` with flexbox centering.
- Shared palette used across scenes: dark navy backgrounds (`#1a1a2e`, `#16213e`, `#0f3460`), red/pink accent gradient (`#e94560` → `#ff6b6b`), cyan accent (`#00d9ff`).
- Frame timings within a `<Sequence>` are relative to the sequence start, not the composition.
- `remotion.config.ts` sets JPEG frame format and overwrite-output for renders.
