import { Signal, Battery } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 self-stretch h-11 px-5 bg-white inline-flex justify-between items-center md:h-14 md:px-20 md:bg-orange-500">
      <div className="text-slate-900 text-sm font-semibold font-['Inter'] md:text-white md:font-bold">
        <span className="md:hidden">9:41</span>
        <span className="hidden md:inline">Đồng hành cùng bạn chinh phục IELTS - Cam kết đầu ra bằng văn bản</span>
      </div>
      <div className="flex items-center gap-1.5 md:hidden">
        <Signal className="w-5 h-5 text-slate-900" />
        <Battery className="w-5 h-5 text-slate-900" />
      </div>
      <div className="hidden md:block text-white text-sm font-bold font-['Inter']">
        Hotline: 0963 073 488
      </div>
    </div>
  );
}
