import { Facebook, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900">
      {/* Desktop */}
      <div className="hidden md:flex self-stretch px-20 pt-16 pb-10 flex-col justify-start items-start gap-10">
        <div className="self-stretch inline-flex justify-between items-start">
          <div className="w-96 flex flex-col justify-start items-start gap-4">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="text-white text-2xl font-extrabold font-['Inter']">HuyWay</span>
              <span className="text-orange-600 text-2xl font-extrabold font-['Inter']">English</span>
            </a>
            <p className="self-stretch text-slate-500 text-sm font-normal font-['Inter'] leading-6">
              Hệ thống đào tạo tiếng Anh chuẩn quốc tế giúp người Việt tự tin chinh phục mục tiêu IELTS trong thời gian ngắn nhất.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="grid place-items-center w-10 h-10 rounded-[20px] bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="grid place-items-center w-10 h-10 rounded-[20px] bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Youtube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="grid place-items-center w-10 h-10 rounded-[20px] bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-3">
            <div className="text-white text-base font-bold font-['Inter']">Chương Trình</div>
            <a href="#l-tr-n-hoc" className="text-slate-500 text-sm font-normal font-['Inter'] hover:text-white transition-colors">Lộ Trình Foundation</a>
            <a href="#l-tr-n-hoc" className="text-slate-500 text-sm font-normal font-['Inter'] hover:text-white transition-colors">Lộ Trình Intermediate</a>
            <a href="#l-tr-n-hoc" className="text-slate-500 text-sm font-normal font-['Inter'] hover:text-white transition-colors">Lộ Trình Advanced</a>
          </div>
          <div className="flex flex-col justify-start items-start gap-3">
            <div className="text-white text-base font-bold font-['Inter']">Liên Hệ</div>
            <a href="tel:0963073488" className="text-slate-500 text-sm font-normal font-['Inter'] hover:text-white transition-colors">Hotline: 0963 073 488</a>
            <a href="mailto:contact@huywayenglish.edu.vn" className="text-slate-500 text-sm font-normal font-['Inter'] hover:text-white transition-colors">Email: contact@huywayenglish.edu.vn</a>
            <p className="text-slate-500 text-sm font-normal font-['Inter']">Địa chỉ: Số 9 LK11 Tổng Cục V, Yên Xá, Thanh Liệt, Thanh Trì</p>
          </div>
        </div>
        <div className="self-stretch h-0 border border-slate-700"></div>
        <div className="self-stretch text-center text-slate-500 text-sm font-normal font-['Inter']">
          © 2025 HuyWayEnglish. Đồng hành cùng bạn chinh phục IELTS
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col justify-start items-start px-5 py-8 gap-7">
        <div className="flex flex-col justify-start items-start gap-3">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="text-white text-xl font-extrabold font-['Inter']">HuyWay</span>
            <span className="text-orange-600 text-xl font-extrabold font-['Inter']">English</span>
          </a>
          <p className="text-slate-500 text-xs font-normal font-['Inter'] leading-5">
            Hệ thống đào tạo tiếng Anh chuẩn quốc tế giúp người Việt tự tin bứt phá điểm số IELTS tối ưu trong thời gian ngắn nhất.
          </p>
        </div>
        <div className="self-stretch h-0 border border-slate-700"></div>
        <div className="flex flex-col justify-start items-start gap-5">
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="text-white text-sm font-bold font-['Inter']">Chương Trình Học</div>
            <a href="#l-tr-n-hoc" className="text-slate-500 text-xs font-normal font-['Inter'] hover:text-white transition-colors">Lộ Trình Foundation (3.5 - 4.5)</a>
            <a href="#l-tr-n-hoc" className="text-slate-500 text-xs font-normal font-['Inter'] hover:text-white transition-colors">Lộ Trình Intermediate (5.0 - 6.0)</a>
            <a href="#l-tr-n-hoc" className="text-slate-500 text-xs font-normal font-['Inter'] hover:text-white transition-colors">Lộ Trình Advanced (6.5 - 7.5+)</a>
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="text-white text-sm font-bold font-['Inter']">Liên Hệ</div>
            <a href="tel:0963073488" className="text-slate-500 text-xs font-normal font-['Inter'] hover:text-white transition-colors">Hotline: 0963 073 488</a>
            <a href="mailto:contact@huywayenglish.edu.vn" className="text-slate-500 text-xs font-normal font-['Inter'] hover:text-white transition-colors">Email: contact@huywayenglish.edu.vn</a>
            <p className="text-slate-500 text-xs font-normal font-['Inter']">Địa chỉ: Số 9 LK11 Tổng Cục V, Yên Xá, Thanh Liệt, Thanh Trì</p>
          </div>
        </div>
        <div className="self-stretch h-0 border border-slate-700"></div>
        <div className="self-stretch text-center text-slate-500 text-xs font-normal font-['Inter']">
          © 2025 HuyWayEnglish. Đồng hành cùng bạn chinh phục IELTS
        </div>
      </div>
    </footer>
  );
}
