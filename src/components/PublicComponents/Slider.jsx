import React, { useState } from 'react'
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/effect-coverflow";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/grid";



const Slider= (
    { images}
) => {
  const [activeThumb, setActiveThumb] = useState(null);
  return (
    <div className="lg:mx-auto max-w-5xl mx-[1.5rem]">
          <div
            className="border-8 bg-white h-auto border-white
            "
          >
            <Swiper
              modules={[Navigation, Thumbs]}
              loop={true}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              grabCursor={true}
              navigation={true}
              thumbs={{
                swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
              }}
              className="thumbShow"
            >
              {images.map((p, index) => {
                return (
                  <SwiperSlide
                    className="flex justify-center items-center"
                    key={index}
                  >
                    <img className="object-contain w-[400px] h-[400px]" src={p} alt="" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Swiper
              onSwiper={setActiveThumb}
              loop={false}
              grabCursor={true}
              spaceBetween={10}
              slidesPerView={4}
              modules={[Navigation, Thumbs]}
              className="thumbBtn mt-5"
            >
              {images.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="">
                    <img src={item} alt="product images" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
  )
}

export default Slider