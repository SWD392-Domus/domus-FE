import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion/Accordion";

import React from "react";

interface Props {
  title: string;
  sizes?: string[];
}

const ProductAccordion: React.FC<Props> = ({
  title,
  sizes,
}) => {
  return (
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Product Details</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 shrink">
              {title? <p>{title}</p> : "No product name available"}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Technical Information</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 shrink">
              <p>Available Sizes:</p>
              {sizes ? sizes.map((size) => (
                <p>{size}</p>
              )) : "No sizes available"}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  );
};

export default ProductAccordion;
