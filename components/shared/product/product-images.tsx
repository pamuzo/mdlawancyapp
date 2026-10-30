"use client";
import { useState } from "react";
import Image from "next/image";

type ProductImagesProps = {
  images: string[];
};

const ProductImages = ({ images }: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const activeImage = images?.[currentImage];

  return (
    <div className="space-y-4">
      <Image
        src={activeImage}
        alt="product Image "
        width={1000}
        height={500}
        className="min-h-64 max-h-[32rem] w-full rounded-lg object-cover object-center"
      />
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`border ${
              currentImage === index ? "border-[#00425a]" : "border-gray-300"
            } h-16 w-16 shrink-0 cursor-pointer rounded-md p-1 hover:border-[#00425a]`}
          >
            <Image
              src={image}
              alt={`Product ${index}`}
              width={100}
              height={100}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      {/* {images.map((image, index) => (
        <div key={index} className="w-full h-64 bg-gray-200 rounded-lg">
          <Image
            src={image}
            alt={`Product ${index}`}
            className="w-full h-full object-cover rounded-lg"
          /> */}
      {/* </div>
      ))} */}
    </div>
  );
};
export default ProductImages;
