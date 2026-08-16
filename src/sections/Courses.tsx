import { BookOpen, Target, TrendingUp, Check } from 'lucide-react';

const levels = [
  {
    icon: BookOpen,
    title: 'Foundation',
    range: '3.5 – 4.5',
    desc: 'Bắt đầu từ nền tảng',
  },
  {
    icon: Target,
    title: 'Intermediate',
    range: '5.0 – 6.0',
    desc: 'Tăng tốc đạt target',
    isPopular: true,
  },
  {
    icon: TrendingUp,
    title: 'Advanced',
    range: '6.5 – 7.5+',
    desc: 'Chinh phục band cao',
  },
];

export default function Courses() {
  return (
    <section id="cac-khoa-hoc">
      {/* Desktop */}
      <div className="hidden md:flex self-stretch px-20 pt-12 pb-20 bg-white flex-col justify-start items-center gap-12">
        <h2 className="self-stretch text-center text-blue-800 text-3xl font-extrabold font-['Inter']">Lộ trình phù hợp mọi trình độ</h2>
        <div className="flex items-center justify-start gap-6">
          {levels.map((level) => (
            <div
              key={level.title}
              className={`w-80 h-72 rounded-[20px] inline-flex flex-col justify-center items-center overflow-hidden ${
                level.isPopular
                  ? 'shadow-[0px_12px_24px_0px_rgba(37,99,235,0.10)] outline outline-2 outline-offset-[-2px] outline-blue-600'
                  : 'bg-white outline outline-1 outline-offset-[-1px] outline-slate-200'
              }`}
            >
              {level.isPopular && (
                <div className="self-stretch px-4 py-2 bg-blue-600 inline-flex justify-center items-center gap-1.5">
                  <Check className="w-3 h-3 text-white" />
                  <span className="text-white text-xs font-bold font-['Inter']">Phổ biến nhất</span>
                </div>
              )}
              <div className="flex-1 w-full p-8 flex flex-col justify-center items-center gap-4">
                <div className="self-stretch text-center text-slate-500 text-lg font-medium font-['Inter']">{level.title}</div>
                <div className="self-stretch text-center text-blue-800 text-4xl font-extrabold font-['Inter']">{level.range}</div>
                <div className="self-stretch text-center text-slate-600 text-sm font-semibold font-['Inter']">{level.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[1200px] flex flex-col justify-start items-center">
          <div className="text-center text-orange-600 text-lg font-bold font-['Inter']">Chưa biết trình độ? Kiểm tra miễn phí để được xếp lộ trình phù hợp</div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col justify-start items-center">
        <div className="self-stretch px-4 pt-3 pb-6">
          <div className="p-5 bg-blue-50 rounded-[20px] outline outline-1 outline-offset-[-1px] outline-blue-100 flex flex-col justify-start items-start gap-4">
            <div className="flex justify-start items-center gap-4">
              <div className="size-12 bg-amber-100 rounded-xl flex justify-center items-center">
                <div className="size-7 relative overflow-hidden">
                  <div className="size-6 left-[2.33px] top-[2.33px] absolute bg-amber-600 rounded-full" />
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-0.5">
                <div className="text-blue-600 text-xs font-semibold font-['Inter']">Học viên HuyWayEnglish đạt target</div>
                <div className="text-blue-800 text-2xl font-extrabold font-['Inter']">5.5 → 7.5 IELTS</div>
                <div className="text-slate-500 text-xs font-medium font-['Inter']">sau 3 tháng</div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch px-4 pt-8 pb-10 flex flex-col justify-start items-center gap-6">
          <h2 className="self-stretch text-center text-blue-800 text-2xl font-extrabold font-['Inter'] leading-8">Lộ trình tối ưu mọi band điểm</h2>
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            {levels.map((level) => (
              <div
                key={level.title}
                className={`self-stretch rounded-2xl flex flex-col justify-start items-start overflow-hidden ${
                  level.isPopular
                    ? 'bg-white shadow-[0px_8px_16px_0px_rgba(37,99,235,0.10)] outline outline-2 outline-offset-[-2px] outline-blue-600'
                    : 'p-5 bg-white outline outline-1 outline-offset-[-1px] outline-slate-200'
                }`}
              >
                {level.isPopular && (
                  <div className="self-stretch px-4 py-1.5 bg-blue-600 inline-flex justify-center items-center gap-1.5">
                    <Check className="w-3 h-3 text-white" />
                    <span className="text-white text-xs font-bold font-['Inter']">Phổ biến nhất</span>
                  </div>
                )}
                <div className="p-5 flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch text-slate-500 text-sm font-medium font-['Inter']">{level.title}</div>
                  <div className="self-stretch text-blue-800 text-3xl font-extrabold font-['Inter']">{level.range}</div>
                  <div className="self-stretch text-slate-600 text-xs font-semibold font-['Inter']">{level.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="self-stretch text-center text-blue-600 text-sm font-bold font-['Inter']">
            Chưa biết trình độ?<br />Kiểm tra miễn phí để được xếp lộ trình phù hợp
          </div>
        </div>
      </div>
    </section>
  );
}
