import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable";

interface Props {
  src: string[];
}

const BigCarousel: React.FC<Props> = ({ src }) => {
  return (
    <ResizablePanelGroup direction="vertical"
    className="min-h-[400px] max-w-[800px] rounded-lg border flex justify-center items-center"
    >
        <ResizablePanel defaultSize={35}>
        <div className="w-[200px] h-[180px]">
          <Carousel className="">
            <CarouselContent>
              {src.map((item, index) => (
                <CarouselItem key={index}>
                  <img
                    className="object-cover shrink
           w-auto h-auto py-2
          "
                    src={item}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </ResizablePanel>
      <ResizablePanel defaultSize={25}>
        <Carousel
        opts={{
            align: "start",
          }}
          orientation="horizontal"
          className=""
          >
          <CarouselContent>
            {src.map((item, index) => (
              <CarouselItem
              className="basis-1/3"
              key={index}>
                <img
                  className="object-cover shrink
           w-auto h-auto py-2
          "
                  src={item}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default BigCarousel;
