"use client";

import Image, { ImageProps } from "next/image";

interface CustomImageProps extends Omit<ImageProps, "src" | "alt" | "fill"> {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CustomImage({
  src,
  alt,
  style,
  className,
  ...rest
}: CustomImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      style={style}
      className={`${className ?? ""} absolute top-0 left-0 object-cover -z-10`}
      {...rest}
    />
  );
}
