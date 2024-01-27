import React, { useState } from "react";
import styles from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { counterSelector } from "./slice/selector";
import { addAmount, decrease, increase } from "./slice";
import { columns, data } from "../../components/ui/Table/column";
import { DataTable } from "@/components/ui/Table";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
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

import { productDetail } from "../products/data";

interface Props {
  // define your props here
}

const Demo: React.FC<Props> = () => {
  const [activeThumb, setActiveThumb] = useState<null | boolean>(null);
  const images = productDetail.src;

  const [ammount, setAmmount] = useState<number>(0);
  const { count } = useSelector(counterSelector);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(increase());
  };
  const handleDecreaseMent = () => {
    dispatch(decrease());
  };
  const handleAmmountIncreasement = () => {
    dispatch(addAmount(ammount));
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div className={styles.row}>
            <button
              className={styles.button}
              aria-label="Increment value"
              onClick={handleIncrement}
            >
              +
            </button>
            <span className={styles.value}>{count}</span>
            <button className={styles.button} onClick={handleDecreaseMent}>
              -
            </button>
          </div>
          <div className={styles.row}>
            <input
              className={styles.textbox}
              aria-label="Set increment amount"
              value={ammount}
              onChange={(e) => setAmmount(Number(e.target.value))}
            />
            <button
              className={styles.button}
              onClick={handleAmmountIncreasement}
            >
              Add Amount
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>

      <section className="pt-[7rem] pb-[2rem] bg-indigo-100">
        <div className="lg:mx-auto max-w-5xl mx-[1.5rem]">
          <div
            className="border-8 bg-white h-auto border-white ring-1 ring-black
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
                    <img className="object-cover" src={p} alt="" />
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
      </section>
    </div>
  );
};

export default Demo;
