import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/Accordion/Accordion";
  
interface Props {}

const PackageAccordion: React.FC<Props> = () => {
  return (
    <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Product Details</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 shrink">
              <p>
                Materials:Powder-coated aluminum frame. Marine grade Sunbrella
                fabric canopy. Protective cover included. Parasol base covers
                will display a slight color difference compared to the pole.
                This is in order to offer an improved resistance to scratching.
              </p>
              <p>
                Available Sizes and Finishes: 118" Meteor/Grey with 617lb Square
                Base, 118" White/Natural with 617lb Square Base, 157.5"
                Meteor/Grey with 617lb Square Base, 157.5" White/Natural with
                617lb Base
              </p>
              <p>
                Materials:Powder-coated aluminum frame. Marine grade Sunbrella
                fabric canopy. Protective cover included. Parasol base covers
                will display a slight color difference compared to the pole.
                This is in order to offer an improved resistance to scratching.
              </p>
              <p>
                Materials:Powder-coated aluminum frame. Marine grade Sunbrella
                fabric canopy. Protective cover included. Parasol base covers
                will display a slight color difference compared to the pole.
                This is in order to offer an improved resistance to scratching.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Technical Information</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 shrink">
              <p>Available Sizes:</p>
              <p>W 118" x D 118" x H 102"</p>
              <p>W 157.5" x D 157.5" x H 110.5"</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  )
}

export default PackageAccordion