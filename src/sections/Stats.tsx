import { useState } from 'react';
import { Users, CheckCircle2, Award, Clock, User, Phone } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '1,200+',
    label: 'Học viên mỗi tháng',
  },
  {
    icon: CheckCircle2,
    value: '95%',
    label: 'Học viên hài lòng',
  },
  {
    icon: Award,
    value: '8.0+',
    label: 'GV 8.0+ IELTS',
  },
  {
    icon: Clock,
    value: '5 năm',
    label: 'Kinh nghiệm',
  },
];

export default function Stats() {
  const [form, setForm] = useState({ name: '', phone: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section>
      {/* Desktop Stats Bar */}
      <div className="hidden md:flex self-stretch px-20 py-10 bg-slate-100 justify-start items-center gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex-1 flex justify-start items-center gap-3">
              <div className="grid place-items-center w-11 h-11 rounded-3xl bg-blue-50 outline outline-1 outline-offset-[-1px] outline-blue-100 text-indigo-900">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col justify-start items-start gap-0.5">
                <div className="text-indigo-900 text-xl font-extrabold font-['Inter']">{stat.value}</div>
                <div className="text-slate-500 text-xs font-normal font-['Inter']">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Form + Stats */}
      <div className="md:hidden flex flex-col justify-start items-start">
        <div className="self-stretch px-4 py-6 flex flex-col justify-start items-start gap-3.5">
          <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
            <h2 className="self-stretch text-blue-800 text-xl font-extrabold font-['Inter']">Nhận lộ trình IELTS miễn phí</h2>
            <p className="self-stretch text-slate-600 text-xs font-semibold font-['Inter']">Chỉ trong 60 giây</p>
          </div>
          <form onSubmit={onSubmit} className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch h-12 px-3.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-slate-200 flex justify-start items-center gap-2.5">
              <User className="w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Họ và tên của bạn"
                className="flex-1 bg-transparent text-slate-500 text-sm font-normal font-['Inter'] outline-none placeholder:text-slate-500"
              />
            </div>
            <div className="self-stretch h-12 px-3.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-slate-200 flex justify-start items-center gap-2.5">
              <Phone className="w-4 h-4 text-slate-500" />
              <span className="text-slate-900 text-sm font-bold font-['Inter']">+84</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Số điện thoại"
                className="flex-1 bg-transparent text-slate-500 text-sm font-normal font-['Inter'] outline-none placeholder:text-slate-500"
              />
            </div>
            <button
              type="submit"
              className="self-stretch px-6 py-3.5 bg-orange-600 rounded-xl shadow-[0px_6px_12px_0px_rgba(253,95,7,0.25)] flex justify-center items-center"
            >
              <span className="text-white text-base font-bold font-['Inter']">Kiểm tra trình độ miễn phí</span>
            </button>
          </form>
          <p className="self-stretch text-center text-slate-500 text-xs font-normal font-['Inter']">🔒 100% miễn phí • Bảo mật thông tin</p>
        </div>

        <div className="self-stretch px-4 py-5 inline-flex justify-start items-start gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex-1 p-3 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-slate-200 flex flex-col justify-start items-start gap-1">
              <div className="text-blue-800 text-lg font-extrabold font-['Inter']">{stat.value}</div>
              <div className="text-slate-500 text-xs font-normal font-['Inter']">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
