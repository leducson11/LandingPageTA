import { useState } from "react";
import { Clock, BrainCircuit, CalendarX2, TrendingDown } from "lucide-react";

const pains = [
  {
    icon: Clock,
    title: "Học mãi không lên band",
  },
  {
    icon: BrainCircuit,
    title: "Không biết bắt đầu từ đâu",
  },
  {
    icon: CalendarX2,
    title: "Học nhiều mà không hiệu quả",
  },
  {
    icon: TrendingDown,
    title: "Cần lộ trình tiết kiệm thời gian",
  },
];

export default function PainPoints() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-white">
      {/* Desktop */}
      <div className="hidden md:flex self-stretch px-20 py-16 flex-col justify-start items-center gap-10">
        <h2 className="self-stretch text-center text-indigo-900 text-3xl font-extrabold font-['Inter']">Bạn đang gặp vấn đề nào?</h2>
        <div className="w-[1200px] inline-flex justify-start items-start gap-6">
          {pains.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="w-72 p-6 bg-white rounded-[20px] outline outline-1 outline-offset-[-1px] outline-slate-200 flex flex-col justify-start items-start gap-3">
                <div className="size-12 bg-indigo-900 rounded-3xl flex flex-col justify-center items-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="self-stretch text-slate-900 text-base font-bold font-['Inter']">{p.title}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Blue banner - Desktop */}
      <div className="hidden md:flex self-stretch px-20 py-12 bg-blue-50 rounded-3xl outline outline-1 outline-offset-[-1px] outline-blue-100 flex-col justify-start items-center">
        <div className="w-[1200px] inline-flex justify-start items-center gap-3">
          <div className="size-5 flex justify-center items-center">
            <div className="size-3 bg-indigo-900 rounded-full" />
          </div>
          <div className="flex-1 text-indigo-900 text-lg font-bold font-['Inter']">→ Hãy để chuyên gia xây dựng lộ trình cho bạn.</div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col justify-start items-start gap-3.5 px-4 py-6">
        <h2 className="self-stretch text-blue-800 text-xl font-extrabold font-['Inter']">Bạn đang gặp vấn đề nào?</h2>
        <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
          {pains.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="size-8 bg-blue-50 rounded-[10px] flex justify-center items-center">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 text-slate-900 text-sm font-semibold font-['Inter']">{p.title}</div>
              </div>
            );
          })}
        </div>
        <div className="self-stretch text-center text-blue-600 text-sm font-bold font-['Inter']">→ Hãy để chuyên gia xây dựng lộ trình cho bạn</div>
      </div>
    </section>
  );
}
