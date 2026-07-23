"use client";

import { useEffect, useMemo, useRef } from "react";

import "./SoftAurora.css";

function hexToRgb(hex) {
  const h = hex.replace("#", "");

  if (h.length !== 6) {
    return "255, 255, 255";
  }

  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ].join(", ");
}

export default function SoftAurora({
  speed = 0.6,
  scale = 1.5,
  brightness = 1.0,
  color1 = "#f7f7f7",
  color2 = "#e100ff",
  noiseFrequency = 2.5,
  noiseAmplitude = 1.0,
  bandHeight = 0.5,
  bandSpread = 1.0,
  octaveDecay = 0.1,
  layerOffset = 0,
  colorSpeed = 1.0,
  enableMouseInteraction = true,
  mouseInfluence = 0.25,
}) {
  const containerRef = useRef(null);

  const style = useMemo(
    () => ({
      "--aurora-speed": `${Math.max(8, 28 / Math.max(speed, 0.05))}s`,
      "--aurora-color-speed": `${Math.max(8, 22 / Math.max(colorSpeed, 0.05))}s`,
      "--aurora-scale": Math.max(0.25, scale),
      "--aurora-brightness": Math.max(0.1, brightness),
      "--aurora-color-1": color1,
      "--aurora-color-2": color2,
      "--aurora-color-1-rgb": hexToRgb(color1),
      "--aurora-color-2-rgb": hexToRgb(color2),
      "--aurora-noise-size": `${Math.max(8, noiseFrequency * 8)}px`,
      "--aurora-noise-opacity": Math.min(
        0.28,
        Math.max(0.03, noiseAmplitude * 0.08)
      ),
      "--aurora-band-height": `${Math.min(90, Math.max(18, bandHeight * 100))}%`,
      "--aurora-band-spread": Math.max(0.45, bandSpread),
      "--aurora-octave-opacity": Math.min(0.45, Math.max(0.04, octaveDecay)),
      "--aurora-layer-offset": `${layerOffset * 18}%`,
      "--aurora-mouse-x": "50%",
      "--aurora-mouse-y": "35%",
    }),
    [
      speed,
      scale,
      brightness,
      color1,
      color2,
      noiseFrequency,
      noiseAmplitude,
      bandHeight,
      bandSpread,
      octaveDecay,
      layerOffset,
      colorSpeed,
    ]
  );

  useEffect(() => {
    if (!enableMouseInteraction) return;

    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = ((event.clientX - rect.left) / rect.width - 0.5) * mouseInfluence;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * mouseInfluence;

      container.style.setProperty("--aurora-mouse-x", `${50 + x * 100}%`);
      container.style.setProperty("--aurora-mouse-y", `${35 + y * 100}%`);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enableMouseInteraction, mouseInfluence]);

  return (
    <div
      ref={containerRef}
      className="soft-aurora-container"
      style={style}
      aria-hidden="true"
    >
      <div className="soft-aurora-layer soft-aurora-layer-primary" />
      <div className="soft-aurora-layer soft-aurora-layer-secondary" />
      <div className="soft-aurora-noise" />
    </div>
  );
}
