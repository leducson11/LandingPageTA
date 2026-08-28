// Social media icons - lucide-react doesn't have branded icons
// Using generic Share2 or external links instead
import { Share2 } from 'lucide-react';

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
              <a href="https://facebook.com/huywayenglish" target="_blank" rel="noopener noreferrer" className="grid place-items-center w-10 h-10 rounded-[20px] bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@huywayenglish" target="_blank" rel="noopener noreferrer" className="grid place-items-center w-10 h-10 rounded-[20px] bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Youtube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://instagram.com/huywayenglish" target="_blank" rel="noopener noreferrer" className="grid place-items-center w-10 h-10 rounded-[20px] bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
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
