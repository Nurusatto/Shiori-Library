"use client";

import { BookInf } from "@/entities/book";
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
      <section className={styles.SliderSection} id="covers">
        <div className={styles.Slider__title}>
          <div className={styles.SliderLine}></div>
          <h1>Gallery of Covers</h1>
          <div className={styles.Slider__line}></div>
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
          className={styles.SliderInner}
        >
          {bookObj?.covers?.map((cover) => (
            <SwiperSlide key={cover}>
              <div className={styles.SliderSlide}>
                <Image
                  width={128}
                  height={190}
                  quality={90}
                  alt="Book cover"
                  className={styles.SliderCover}
                  src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.SliderArrows}>
          <button id="prevSlide" className={styles.SliderArrow}>
            <ArrowBigLeft className={styles.SliderArrowIcon} />
          </button>
          <button id="nextSlide" className={styles.SliderArrow}>
            <ArrowBigRight className={styles.SliderArrowIcon} />
          </button>
        </div>
      </section>
    </>
  );
};
