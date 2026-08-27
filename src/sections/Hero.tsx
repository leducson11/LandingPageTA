import { CheckCircle2, User, Phone } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { scrollToHash } from '@/hooks/useSmoothScroll';

const benefits = [
  {
    icon: CheckCircle2,
    title: 'Giảng viên 8.0+ IELTS',
  },
  {
    icon: CheckCircle2,
    title: 'Lộ trình cá nhân hóa',
  },
  {
    icon: CheckCircle2,
    title: 'Học online linh hoạt',
  },
];

export default function Hero() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      alert('Vui lòng nhập đầy đủ Họ tên và Số điện thoại!');
      return;
    }

    setLoading(true);

    try {
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([{ name, phone, status: 'new' }]);

      if (supabaseError) {
        console.error('Supabase báo lỗi 401/Cấu hình .env chưa đúng:', supabaseError.message);
      }

      alert('🎉 Đăng ký thành công! Thông tin của bạn đã được lưu lại.');
      setName('');
      setPhone('');

    } catch (err: any) {
      console.error('Lỗi kết nối mạng:', err.message);
      alert('Đăng ký thất bại, vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="top" className="relative bg-slate-50 pt-24 md:pt-32">
      {/* Desktop */}
      <div className="hidden md:block self-stretch p-20">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-12">
          {/* Left content */}
          <div className="w-[660px] flex flex-col justify-start items-start gap-5">
            <h1 className="self-stretch text-indigo-900 text-4xl font-extrabold font-['Inter'] leading-[48px]">
              Chưa biết nên bắt đầu IELTS từ đâu?
            </h1>
            <p className="self-stretch text-slate-500 text-base font-normal font-['Inter'] leading-6">
              Kiểm tra trình độ và nhận tư vấn lộ trình phù hợp với bạn.
            </p>
            <p className="self-stretch text-indigo-900 text-sm font-bold font-['Inter']">
              Hơn 10,000+ học viên đã đạt mục tiêu IELTS
            </p>
            <div className="flex flex-wrap justify-start items-center gap-6">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex justify-start items-center gap-2.5">
                    <span className="grid place-items-center w-8 h-8 rounded-2xl bg-blue-50 outline outline-1 outline-offset-[-1px] outline-blue-100 text-indigo-900">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-slate-900 text-sm font-semibold font-['Inter']">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right form card */}
          <form onSubmit={handleSubmit} className="w-[492px] p-8 bg-white rounded-[20px] shadow-[0px_12px_24px_-8px_rgba(15,23,42,0.08)] outline outline-1 outline-offset-[-1px] outline-slate-200 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
              <h2 className="self-stretch text-indigo-900 text-xl font-extrabold font-['Inter']">Nhận lộ trình IELTS miễn phí</h2>
              <p className="self-stretch text-slate-500 text-sm font-normal font-['Inter']">Chỉ trong 60 giây</p>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch h-12 px-3.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-slate-200 flex justify-start items-center gap-2.5">
                <User className="w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Họ và tên của bạn"
                  className="flex-1 bg-transparent text-slate-500 text-sm font-normal font-['Inter'] outline-none placeholder:text-slate-500"
                />
              </div>
              <div className="self-stretch h-12 px-3.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-slate-200 flex justify-start items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500" />
                <span className="text-slate-900 text-sm font-bold font-['Inter']">+84</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Số điện thoại"
                  className="flex-1 bg-transparent text-slate-500 text-sm font-normal font-['Inter'] outline-none placeholder:text-slate-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="self-stretch h-12 bg-orange-500 rounded-xl shadow-[0px_8px_16px_0px_rgba(246,140,31,0.25)] flex justify-center items-center"
              >
                <span className="text-white text-base font-bold font-['Inter']">{loading ? 'Đang gửi thông tin...' : 'Kiểm tra trình độ miễn phí'}</span>
              </button>

            <p className="self-stretch text-slate-500 text-xs font-normal font-['Inter']">🔒 100% miễn phí • Bảo mật thông tin</p>
          </div>
           </form>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col justify-start items-start">
        <div className="self-stretch h-14 px-4 bg-indigo-900 inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <div className="grid place-items-center w-7 h-7 rounded-lg bg-white">
              <div className="w-4 h-4 bg-indigo-900" />
            </div>
            <span className="text-white text-base font-extrabold font-['Inter']">HuyWayEnglish</span>
          </div>
          <button
            onClick={() => scrollToHash('#dang-ky')}
            className="h-9 px-3.5 bg-white rounded-[10px] flex justify-center items-center"
          >
            <span className="text-indigo-900 text-xs font-bold font-['Inter']">Tư vấn</span>
          </button>
        </div>
        <div className="self-stretch px-4 py-6 flex flex-col justify-start items-start gap-3">
          <h1 className="self-stretch text-blue-800 text-3xl font-extrabold font-['Inter'] leading-8">
            Chưa biết nên bắt đầu IELTS từ đâu?
          </h1>
          <p className="self-stretch text-slate-600 text-sm font-medium font-['Inter'] leading-5">
            Kiểm tra trình độ và nhận tư vấn lộ trình phù hợp với bạn. Hơn 10,000+ học viên đã đạt mục tiêu IELTS
          </p>
        </div>
      </div>
    </section>
  );
}
