import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Sứ mệnh và Tầm nhìn',
    desc: 'Huyway English giúp học viên học tiếng Anh theo hướng ứng dụng thực tế, tự tin giao tiếp và sẵn sàng chinh phục mục tiêu cá nhân.',
    image: 'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1000',
    badge: 'Định hướng dài hạn',
  },
  {
    title: 'Giá trị cốt lõi',
    desc: 'Từ tư duy hệ thống, thực hành thực tế đến cá nhân hóa lộ trình, Huyway English luôn đặt chất lượng và trải nghiệm học viên lên hàng đầu.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000',
    badge: 'Học tập hiệu quả',
  },
  {
    title: 'Mô hình lớp học nhỏ',
    desc: 'Lớp học chỉ 4-8 học viên, giáo viên 8.0+ IELTS kèm cặp 1-1, đảm bảo mỗi học viên đều được quan tâm và chữa lỗi chi tiết.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1000',
    badge: 'Chất lượng cao',
  },
  {
    title: 'Tư duy hệ thống',
    desc: 'Phương pháp học không chỉ dạy kiến thức mà còn rèn tư duy phân tích, kỹ năng tự học bền vững sau này.',
    image: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1000',
    badge: 'Phương pháp độc quyền',
  },
  {
    title: 'Hỗ trợ du học',
    desc: 'Tư vấn chọn trường, soạn hồ sơ, luyện phỏng vấn visa — đồng hành từ lộ trình học đến khi bạn đặt chân ra nước ngoài.',
    image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=1000',
    badge: 'Đồng hành toàn diện',
  },
  {
    title: 'Giáo viên kèm học viên 1-1',
    desc: 'Giáo viên 8.0+ IELTS trực tiếp chữa bài, phản hồi chi tiết từng lỗi sai và kèm cặp bạn suốt quá trình học.',
    image: 'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1000',
    badge: 'Kết quả thực tế',
  },
];

export default function CenterCardCarousel() {
  return (
    <section id="ve-huyway" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto container-px">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold">
            Về Huyway English
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            Điều gì làm nên sự khác biệt?
          </h2>
          <p className="mt-4 text-ink-600 text-lg leading-relaxed">
            Khám phá 6 giá trị cốt lõi giúp hàng nghìn học viên đạt mục tiêu IELTS & TOEIC mỗi năm.
          </p>
        </div>

        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          navigation
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="w-[672px] max-w-[90vw]">
              <div className="relative w-full h-[480px] rounded-[24px] shadow-lg overflow-hidden group">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                    {slide.badge}
                  </span>
                  <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight">
                    {slide.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed max-w-lg">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
