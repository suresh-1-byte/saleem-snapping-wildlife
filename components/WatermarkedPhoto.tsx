import AdaptiveWatermarkImage from "@/components/AdaptiveWatermarkImage";

interface WatermarkedPhotoProps {
  src: string;
  alt: string;
  className?: string;
  watermarkClassName?: string;
  fill?: boolean;
}

export default function WatermarkedPhoto({
  src,
  alt,
  className = "",
  watermarkClassName = "w-16 md:w-20",
  fill = false,
}: WatermarkedPhotoProps) {
  return (
    <AdaptiveWatermarkImage
      src={src}
      alt={alt}
      imageClassName={className}
      watermarkClassName={watermarkClassName}
      fill={fill}
    />
  );
}
