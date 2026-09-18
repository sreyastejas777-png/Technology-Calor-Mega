import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import ApplicationCard from './ApplicationCard';
import { FaArrowRight } from 'react-icons/fa';

export default function MobileApplicationsCarousel({ displayedCrops, onSelect }) {
  const navigate = useNavigate();

  return (
    <div className="w-full py-6 overflow-visible relative mobile-app-carousel">
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.6}
        spaceBetween={20}
        className="w-full overflow-visible"
      >
        {displayedCrops.map((app, index) => (
          <SwiperSlide key={app.title} className="mobile-app-slide transition-all duration-500 rounded-2xl flex items-stretch">
            <div className="w-full h-[150px] [&>div]:h-full">
              <ApplicationCard 
                application={app} 
                index={index} 
                onSelect={onSelect} 
                disableEntranceAnimation={true}
                disableLayoutAnimation={true}
              />
            </div>
          </SwiperSlide>
        ))}

        {/* View More Slide */}
        <SwiperSlide className="mobile-app-slide transition-all duration-500 rounded-2xl flex items-stretch">
          <div 
            onClick={() => navigate('/technology#applications')}
            className="relative w-full h-[150px] overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/90 to-secondary/90 p-3 sm:p-4 text-center text-white shadow-soft flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-accent/40 hover:bg-accent/10 transition-colors"
          >
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-3xl text-accent shrink-0 transition-transform hover:scale-110">
              <FaArrowRight />
            </div>
            <h3 className="text-sm sm:text-base font-semibold tracking-tight">View All Crops</h3>
            <p className="text-[10px] sm:text-[11px] leading-snug text-white/75 mt-1">Explore full directory</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
