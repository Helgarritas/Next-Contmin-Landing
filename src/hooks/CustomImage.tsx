"use client";

import Image from "next/image";

interface Props {
  width: number;
  height: number;
  src: string;
  alt: string;
  style?: {[key: string]: any};
  className?: string;
}

export default function CustomImage({ width, height, src, style, className }: Props) {
  return (
    <>
      <Image
        width={width}
        height={height}
        src={src}
        alt={src}
        style={style}
        className={`${className} w-full h-full absolute top-0 left-0 object-cover -z-10`}
      />
    </>
  )
}
