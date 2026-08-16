import { FileText, ClipboardList, FileCheck2 } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    number: '1.',
    title: 'Điền thông tin',
    desc: 'Chỉ cần 60 giây.',
  },
  {
    icon: ClipboardList,
    number: '2.',
    title: 'Làm bài test + tư vấn',
    desc: 'Test chuẩn & chuyên sâu',
  },
  {
    icon: FileCheck2,
    number: '3.',
    title: 'Nhận đánh giá & lộ trình',
    desc: 'Trong 24h',
  },
];

export default function Steps() {
  return (
    <section>
      {/* Desktop */}
      <div className="hidden md:flex self-stretch px-20 py-16 bg-white flex-col justify-start items-center gap-12">
        <div className="flex items-center justify-start gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex items-center justify-start gap-10">
                <div className="w-60 flex flex-col justify-start items-center gap-4">
                  <div className="size-16 bg-blue-50 rounded-[36px] outline outline-1 outline-offset-[-1px] outline-blue-600 flex justify-center items-center">
                    <Icon className="w-7 h-5 text-blue-600" />
                  </div>
                  <div className="flex flex-col justify-start items-center gap-1.5">
                    <div className="text-slate-900 text-base font-bold font-['Inter']">{step.number} {step.title}</div>
                    <div className="text-slate-600 text-sm font-normal font-['Inter']">{step.desc}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-1 h-2 relative overflow-hidden">
                    <div className="w-1 h-2 left-[6px] top-[4px] absolute outline outline-2 outline-offset-[-1px] outline-blue-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="px-12 py-4 bg-orange-600 rounded-xl shadow-[0px_8px_16px_0px_rgba(253,95,7,0.25)] flex justify-start items-start">
          <div className="text-white text-lg font-bold font-['Inter']">Kiểm tra trình độ miễn phí</div>
        </div>
      </div>

      {/* Desktop Testimonial Card */}
      <div className="hidden md:flex self-stretch px-44 py-8 bg-white flex-col justify-start items-center">
        <div className="w-96 p-8 bg-blue-50 rounded-3xl outline outline-1 outline-offset-[-1px] outline-blue-100 flex justify-start items-center gap-10">
          <div className="flex justify-start items-center gap-6">
            <div className="size-16 bg-amber-100 rounded-2xl flex justify-center items-center">
              <div className="size-7 flex justify-center items-center">
                <div className="size-7 bg-amber-500 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <div className="text-blue-600 text-base font-semibold font-['Inter']">Học viên HuyWayEnglish đạt target</div>
              <div className="text-blue-800 text-3xl font-extrabold font-['Inter']">5.5 → 7.5 IELTS</div>
              <div className="text-slate-500 text-sm font-medium font-['Inter']">sau 3 tháng</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col justify-start items-center gap-7 px-4 py-8 bg-white">
        <div className="flex flex-col justify-start items-center gap-2">
          <h2 className="text-blue-800 text-2xl font-extrabold font-['Inter'] leading-8">Đánh giá trình độ miễn phí</h2>
          <p className="text-slate-600 text-sm font-medium font-['Inter'] leading-5">Nhận ngay lộ trình cá nhân hóa trong 3 bước đơn giản</p>
        </div>
        <div className="flex flex-col justify-start items-start gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="p-3 bg-slate-50 rounded-xl inline-flex justify-start items-center gap-4">
                <div className="size-12 bg-blue-50 rounded-3xl outline outline-1 outline-offset-[-1px] outline-blue-600 flex justify-center items-center">
                  <Icon className="size-5 text-blue-600" />
                </div>
                <div className="flex flex-col justify-start items-start gap-0.5">
                  <div className="text-slate-900 text-base font-bold font-['Inter']">{step.number} {step.title}</div>
                  <div className="text-slate-600 text-xs font-normal font-['Inter']">{step.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-6 py-3.5 bg-orange-600 rounded-xl shadow-[0px_6px_12px_0px_rgba(253,95,7,0.25)] flex justify-center items-center">
          <div className="text-center text-white text-base font-bold font-['Inter']">Kiểm tra trình độ miễn phí</div>
        </div>
      </div>
    </section>
  );
}
