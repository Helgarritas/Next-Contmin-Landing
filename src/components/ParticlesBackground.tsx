"use client";

import dynamic from "next/dynamic";

const Particles = dynamic(
  () => import("@/components/magicui/particles").then(mod => ({ default: mod.Particles })),
  { ssr: false }
);

export default function ParticlesBackground() {
  return (
    <Particles className="absolute top-0 left-0 w-full h-full -z-10" quantity={30} />
  );
}
