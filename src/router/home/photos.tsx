import { AspectRatio } from "@/components/ui/AspectRadio";
import React from "react";

interface Props {
  src: string;
  ratio?: number;
  width?: number;
  height?: number;
}

const Photo: React.FC<Props> = ({
  src,
  ratio,
  width,
  height
}) => {
  // className={`${widthClass} ${heightClass}`}
  const widthClass = width ? `w-[${width}px]` : '';
  const heightClass = height ? `h-[${height}px]` : '';
  console.log(widthClass, heightClass);
  return (
      <AspectRatio ratio={ratio} className="rounded-md bg-black">
        <div className={`${widthClass} ${heightClass}`}>
          <img className="rounded-md object-cover" src={src} />
        </div>   
    </AspectRatio>
  );
};

export default Photo;
