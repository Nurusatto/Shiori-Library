"use client";

import { BookInf } from "@/entities/book";
import { cn } from "@/shared/lib/cn";
import Image from "next/image";
import styles from "./style.module.scss";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//icons
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

type Prop = {
  bookObj: BookInf;
};

export const BookSlider = ({ bookObj }: Prop) => {
  if (!(bookObj?.covers?.length > 0)) return null;
  return (
    <>
      <section className={cn(styles, "Slider__section")} id="covers">
        <div className={cn(styles, "Slider__title")}>
          <div className={cn(styles, "Slider__line")}></div>
          <h1>Gallery of Covers</h1>
          <div className={cn(styles, "Slider__line")}></div>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 30 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          navigation={{
            nextEl: "#nextSlide",
            prevEl: "#prevSlide",
          }}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          className={cn(styles, "Slider__inner")}
        >
          {bookObj?.covers?.map((cover) => (
            <SwiperSlide key={cover}>
              <div className={cn(styles, "Slider__slide")}>
                <Image
                  width={128}
                  height={190}
                  quality={90}
                  alt="Book cover"
                  className={cn(styles, "Slider__cover")}
                  src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={cn(styles, "Slider__arrows")}>
          <button id="prevSlide" className={cn(styles, "Slider__arrow")}>
            <ArrowBigLeft className={cn(styles, "Slider__arrow-icon")} />
          </button>
          <button id="nextSlide" className={cn(styles, "Slider__arrow")}>
            <ArrowBigRight className={cn(styles, "Slider__arrow-icon")} />
          </button>
        </div>
      </section>
    </>
  );
};
