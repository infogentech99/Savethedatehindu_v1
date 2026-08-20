"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Carousel() {
  const testimonial = [
    {
      img: "/assets/image1.webp",
    },

    {
      img: "/assets/image2.png",
    },

    {
      img: "/assets/image3.png",
    },

    {
      img: "/assets/image4.webp",
    },

    {
      img: "/assets/image5.png",
    },
  ];
  return (
    <div
      className="bg-[url('/assets/save_bg.webp')]
    bg-cover bg-no-repeat bg-top md:bg-center w-full overflow-hidden relative md:pb-30 md:pt-30 pt-20 pb-20"
    >
      <h2 className="text-[#A25000] md:text-2xl text-[17px] text-center font-jacques-francois  mt-8">
        From Our Hearts
      </h2>
      <h2 className="text-[#A25000] md:text-2xl text-[17px] text-center font-jacques-francois  mt-8">
        Your presence on our special day would mean the world to us. We can’t
        wait to celebrate love, <br /> laughter, and beautiful memories together
        with all of you.
      </h2>
      <div className="md:mt-20 mt-26 flex justify-center items-center">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          centeredSlides={true}
          pagination={{ clickable: true }}
          className="w-full py-12 overflow-visible"
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {testimonial.map((item, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src={item.img}
                alt=""
                className="w-full lg:h-full h-120 object-cover rounded-[60px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex  gap-4 justify-center items-center mt-20">
        <a href="https://www.instagram.com/theinvitearc/" target="_blank">
          <img
            src="/assets/instagram.png"
            alt=""
            className="w-7.5 h-7.5 md:w-10 md:h-10 lg:w-12 lg:h-12"
          />
        </a>
      </div>
      <p className="font-jacques-francois font-medium text-xs md:text-sm lg:text-base text-[#A25000] mt-2 text-center">
        ©{" "}
        <a href="https://invitearc.com/" target="_blank">
          InviteArc
        </a>
        2026
      </p>
    </div>
  );
}