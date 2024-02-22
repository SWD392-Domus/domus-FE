
import React from "react";

interface Props {
  images: string[];
}

const EditCard: React.FC<Props> = ({ images }) => {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            className="w-[20%] h-[20%] object-contain"
          />
        ))}
      </div>
    </>
  );
};

export default EditCard;
