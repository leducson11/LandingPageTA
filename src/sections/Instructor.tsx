import { BadgeCheck, Building, Quote } from 'lucide-react';
import thayHuyImg from '../assets/ThayHuy1-removebg.png';

type Mentor = {
  id: number;
  name: string;
  title: string;
  portrait?: string;
};

const mentors: Mentor[] = [
  { id: 1, name: 'Nguyễn Mai', title: 'Giảng viên IELTS Cao cấp', portrait: '' },
  { id: 2, name: 'Trần Hồng', title: 'Huấn luyện viên Kỹ năng Nói', portrait: '' },
  { id: 3, name: 'Lê Thu', title: 'Chuyên gia Kỹ năng Nghe', portrait: '' },
  { id: 4, name: 'Phạm Anh', title: 'Chuyên gia Kỹ năng Viết', portrait: '' },
];

export default function Instructor() {
  return (
    <section id="gap-gop-giang-vien" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(135deg, #f5f3ff 0%, #ffffff 50%, #ede9fe 100%),
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 90 Q 30 60 50 80 T 90 70' stroke='%23b8c4d1' stroke-width='0.5' fill='none' opacity='0.4'/%3E%3Cpath d='M5 80 Q 25 50 45 70 T 85 60' stroke='%23c8d4e1' stroke-width='0.3' fill='none' opacity='0.3'/%3E%3C/svg%3E")
          `
        }}
      />

      <div className="max-w-7xl mx-auto container-px relative">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="pill-label inline-block px-4 py-1.5 rounded-full text-sm font-semibold">
            Gặp gỡ giảng viên
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            Ai sẽ hướng dẫn bạn?
          </h2>
        </div>

        {/* Instructor card */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
          {/* Left side - Image with decorative circle */}
          <div className="relative flex justify-center">
            {/* Decorative purple circle */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full opacity-60"
              style={{ background: 'linear-gradient(135deg, #a78bfa, #6d28d9)' }}
            />
            
            {/* Instructor image */}
            <div className="relative z-10">
              <img
                src={thayHuyImg}
                alt="Thầy Lưu Tiến Huy"
                className="w-full max-w-[360px] h-auto mx-auto object-contain rounded-[20px] shadow-2xl"
              />
            </div>
          </div>

          {/* Right side - Information */}
          <div className="text-left">
            <h3 className="text-4xl lg:text-5xl font-extrabold text-ink-900 mb-8">
              Thầy Lưu Tiến Huy
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 text-lg mb-1">Chứng chỉ</h4>
                  <p className="text-ink-600 leading-relaxed">
                    IELTS 8.5 (Reading & Listening 9.0), TOEIC 990/990
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 text-lg mb-1">Vị trí</h4>
                  <p className="text-ink-600 leading-relaxed">
                    Nhà sáng lập Huyway English
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg">
                  <Quote className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 text-lg mb-1">Châm ngôn</h4>
                  <p className="text-ink-600 leading-relaxed">
                    "Hãy học tiếng Anh như một ngôn ngữ sống, không chỉ để thi cử. Mỗi câu nói sai hôm nay là một bước tiến để ngày mai bạn tự tin chinh phục thế giới."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mentor team */}
        <div className="mt-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h3 className="text-3xl font-extrabold text-ink-900 tracking-tight">Đội ngũ giảng viên</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {mentors.map((m) => (
              <article key={m.id} className="relative group rounded-[20px] border border-ink-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  {m.portrait ? (
                    <img src={m.portrait} alt={m.name} className="w-full h-64 object-cover rounded-lg" />
                  ) : (
                    <div className="w-full h-64 rounded-lg border-2 border-dashed border-slate-200 bg-white flex items-center justify-center">
                      <span className="text-slate-300">Chưa có ảnh</span>
                    </div>
                  )}
                  <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white">
                    GIẢNG VIÊN
                  </div>
                </div>

                <header className="mt-4">
                  <h3 className="text-lg font-bold text-ink-900">{m.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{m.title}</p>
                </header>

                <div className="mt-6 relative h-0">
                  <div
                    className="absolute left-0 right-0 bottom-0 transform translate-y-full opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300"
                  >
                    <div className="rounded-b-xl border-t border-slate-100 bg-white p-4 shadow-lg">
                      <p className="text-sm text-slate-600">Kinh nghiệm: 5+ năm giảng dạy · Chuyên môn: {m.title}</p>
                      <p className="mt-2 text-xs text-slate-500">Phương pháp: cá nhân hoá, luyện tập thực tế và phản hồi trực tiếp.</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
