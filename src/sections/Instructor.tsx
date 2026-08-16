import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Instructor = {
  id: number;
  name: string;
  score: string;
  details: string;
  cert: string;
  experience: string;
};

const instructors: Instructor[] = [
  {
    id: 1,
    name: 'Nguyễn Hoàng Long',
    score: '8.5 IELTS',
    details: 'L8.5 • R8.0 • W8.0 • S8.0',
    cert: 'CELTA Certificate',
    experience: '6+ năm kinh nghiệm',
  },
  {
    id: 2,
    name: 'Trần Thu Hà',
    score: '8.5 IELTS',
    details: 'L8.5 • R8.5 • W8.0 • S8.0',
    cert: 'CELTA Certificate',
    experience: '5+ năm kinh nghiệm',
  },
  {
    id: 3,
    name: 'Lê Minh Khoa',
    score: '8.0 IELTS',
    details: 'L8.0 • R8.0 • W8.0 • S8.0',
    cert: 'TESOL Certificate',
    experience: '5+ năm kinh nghiệm',
  },
];

export default function Instructor() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('instructor-scroll');
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section id="gap-gop-giang-vien">
      {/* Desktop */}
      <div className="hidden md:flex self-stretch px-20 py-16 bg-white flex-col justify-start items-center gap-8">
        <h2 className="self-stretch text-center text-blue-800 text-3xl font-extrabold font-['Inter']">Đội ngũ giảng viên</h2>
        <div className="w-[1200px] inline-flex justify-start items-start gap-6">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="w-96 p-5 bg-white rounded-[20px] outline outline-1 outline-offset-[-1px] outline-slate-200 flex flex-col justify-start items-start gap-3.5">
              <div className="self-stretch h-44 bg-slate-200 rounded-2xl flex flex-col justify-center items-center">
                <div className="size-12 relative overflow-hidden">
                  <div className="w-7 h-9 left-[10px] top-[6px] absolute outline outline-2 outline-offset-[-1px] outline-slate-500" />
                </div>
              </div>
              <div className="self-stretch text-slate-900 text-lg font-extrabold font-['Inter']">{instructor.name}</div>
              <div className="self-stretch text-orange-600 text-base font-extrabold font-['Inter']">{instructor.score}</div>
              <div className="self-stretch text-slate-500 text-sm font-normal font-['Inter']">{instructor.details}</div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch text-slate-900 text-sm font-semibold font-['Inter']">• {instructor.cert}</div>
                <div className="self-stretch text-slate-900 text-sm font-semibold font-['Inter']">• {instructor.experience}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[1200px] inline-flex justify-between items-center">
          <button
            onClick={() => scroll('left')}
            className="size-11 bg-white rounded-3xl outline outline-1 outline-offset-[-1px] outline-slate-200 inline-flex flex-col justify-center items-center hover:bg-slate-50 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-blue-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="size-2 bg-blue-600 rounded-sm" />
            <div className="size-2 bg-slate-200 rounded-sm" />
            <div className="size-2 bg-slate-200 rounded-sm" />
          </div>
          <button
            onClick={() => scroll('right')}
            className="size-11 bg-white rounded-3xl outline outline-1 outline-offset-[-1px] outline-slate-200 inline-flex flex-col justify-center items-center hover:bg-slate-50 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-blue-600" />
          </button>
        </div>
        <div className="w-[1200px] text-center text-slate-500 text-sm font-normal font-['Inter']">Vuốt sang trái để xem thêm giảng viên</div>
      </div>

      {/* Desktop CTA Banner */}
      <div className="hidden md:flex self-stretch px-20 py-10 bg-indigo-900 justify-between items-center">
        <div className="flex-1 text-white text-xl font-extrabold font-['Inter']">Bắt band hiện tại, Nhận lộ trình phù hợp và target của bạn.</div>
        <div className="flex flex-col justify-start items-end gap-2">
          <div className="px-6 py-3 bg-orange-600 rounded-xl inline-flex justify-center items-center">
            <div className="text-white text-base font-bold font-['Inter']">Kiểm tra trình độ miễn phí</div>
          </div>
          <div className="text-white/80 text-sm font-normal font-['Inter']">Chỉ mất 60 giây</div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col justify-start items-start">
        <div className="self-stretch px-4 py-6 flex flex-col justify-start items-start gap-4">
          <h2 className="self-stretch text-blue-800 text-xl font-extrabold font-['Inter']">Đội ngũ giảng viên</h2>
          <div id="instructor-scroll" className="self-stretch flex gap-3 overflow-x-auto scrollbar-hide">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="w-28 p-3 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-slate-200 flex flex-col justify-start items-start gap-2.5 shrink-0">
                <img
                  className="self-stretch h-28 rounded-xl object-cover"
                  src="https://placehold.co/96x120"
                  alt={instructor.name}
                />
                <div className="self-stretch text-slate-900 text-xs font-bold font-['Inter']">{instructor.name}</div>
                <div className="self-stretch text-slate-500 text-xs font-normal font-['Inter']">{instructor.score}</div>
              </div>
            ))}
          </div>
          <div className="self-stretch text-center text-slate-500 text-xs font-normal font-['Inter']">Vuốt sang trái để xem thêm</div>
        </div>
      </div>
    </section>
  );
}
