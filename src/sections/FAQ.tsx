
const faqs = [
  {
    q: 'Kiểm tra trình độ có mất phí không?',
  },
  {
    q: 'Lộ trình có thay đổi khi trình độ nâng lên không?',
  },
  {
    q: 'Bao lâu nhận lộ trình?',
  },
  {
    q: 'Học online có hiệu quả không?',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative bg-white">
      {/* Desktop */}
      <div className="hidden md:flex self-stretch px-20 pt-16 pb-20 flex-col justify-start items-center gap-8">
        <h2 className="self-stretch text-center text-blue-800 text-3xl font-extrabold font-['Inter']">Câu hỏi thường gặp</h2>
        <div className="w-[1200px] flex flex-col justify-start items-start gap-6">
          <div className="self-stretch inline-flex justify-start items-start gap-6">
            {faqs.slice(0, 2).map((f) => (
              <div key={f.q} className="flex-1 px-5 py-4 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-slate-200 flex justify-between items-center">
                <div className="flex-1 text-slate-900 text-base font-semibold font-['Inter']">{f.q}</div>
                <div className="size-5 relative overflow-hidden">
                  <div className="size-3 left-[4.17px] top-[4.17px] absolute outline outline-2 outline-offset-[-1px] outline-slate-500" />
                </div>
              </div>
            ))}
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-6">
            {faqs.slice(2, 4).map((f) => (
              <div key={f.q} className="flex-1 px-5 py-4 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-slate-200 flex justify-between items-center">
                <div className="flex-1 text-slate-900 text-base font-semibold font-['Inter']">{f.q}</div>
                <div className="size-5 relative overflow-hidden">
                  <div className="size-3 left-[4.17px] top-[4.17px] absolute outline outline-2 outline-offset-[-1px] outline-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col justify-start items-start">
        <div className="self-stretch px-4 py-6 flex flex-col justify-start items-start gap-3.5">
          <h2 className="self-stretch text-blue-800 text-xl font-extrabold font-['Inter']">Câu hỏi thường gặp</h2>
          <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
            {faqs.map((f) => (
              <div key={f.q} className="self-stretch p-3.5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-slate-200 inline-flex justify-between items-center">
                <div className="flex-1 text-slate-900 text-sm font-semibold font-['Inter']">{f.q}</div>
                <div className="size-4 relative overflow-hidden">
                  <div className="size-2.5 left-[3.75px] top-[3.75px] absolute outline outline-2 outline-offset-[-1px] outline-blue-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="self-stretch h-16 px-4 bg-indigo-900 inline-flex justify-between items-center">
          <div className="flex flex-col justify-start items-start gap-0.5">
            <div className="text-white text-sm font-bold font-['Inter']">Kiểm tra trình độ miễn phí</div>
            <div className="text-white/80 text-xs font-normal font-['Inter']">Chỉ mất 60 giây</div>
          </div>
          <div className="h-10 px-4 bg-white rounded-xl flex justify-center items-center">
            <div className="text-indigo-900 text-xs font-extrabold font-['Inter']">Bắt đầu</div>
          </div>
        </div>
      </div>
    </section>
  );
}
