// components/VideoCarousel.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface Props {
  videos: string[];
}

export default function VideoCarousel({ videos }: Props) {
  return (
    <div className='relative flex justify-center w-lg'>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={{
          nextEl: ".video-next",
          prevEl: ".video-prev",
        }}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className='max-w-[90%] sm:max-w-2xl'
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div className='overflow-hidden rounded-lg shadow-lg aspect-video'>
              <iframe
                src={video}
                className='h-full w-xl'
                title={`testimonial-video-${index}`}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Flechas afuera del carrusel */}
      <button
        className='video-prev absolute left-[-2rem] top-1/2 transform -translate-y-1/2 z-20 text-white bg-gray-700 hover:bg-gray-900 p-2 rounded-full shadow-lg'
        aria-label='Previous'
      >
        ◀
      </button>
      <button
        className='video-next absolute right-[-2rem] top-1/2 transform -translate-y-1/2 z-20 text-white bg-gray-700 hover:bg-gray-900 p-2 rounded-full shadow-lg'
        aria-label='Next'
      >
        ▶
      </button>
    </div>
  );
}
