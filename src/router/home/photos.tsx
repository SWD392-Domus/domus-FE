import { AspectRatio } from "@/components/ui/AspectRadio";
import React from "react";

interface Props {
  src: string;
  ratio?: number;
}

const Photo: React.FC<Props> = ({
  src,
  ratio
}) => {
  return (
    <AspectRatio ratio={ratio} className="rounded-md bg-black">
      <img className="rounded-md object-cover" src={src} />
    </AspectRatio>
  );
};

export default Photo;
