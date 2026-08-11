import { GraduationCap, Award, Globe, BookOpen, Users, Target } from 'lucide-react';

export default function Instructor() {
  return (
    <section id="gap-gop-giang-vien" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background - Chinese ink painting style */}
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image with decorative circle */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Decorative orange circle */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 rounded-full opacity-60"
              style={{ background: 'linear-gradient(135deg, #a78bfa, #6d28d9)' }}
            />
            
            {/* Instructor image */}
            <div className="relative z-10">
              <img
                src="/src/assets/ThayHuy.jpg"
                alt="Thầy Huy"
                className="w-72 h-72 lg:w-96 lg:h-96 object-cover rounded-[20px] shadow-2xl"
              />
            </div>
          </div>

          {/* Right side - Information */}
          <div className="text-left">
            <h3 className="text-4xl lg:text-5xl font-extrabold text-ink-900 mb-8">
              Thầy Huy
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 text-lg mb-1">Học vấn</h4>
                  <p className="text-ink-600 leading-relaxed">
                    Tốt nghiệp Đại học Ngoại ngữ - ĐHQG Hà Nội
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 text-lg mb-1">Chứng chỉ</h4>
                  <p className="text-ink-600 leading-relaxed">
                    TOEIC 990/990, IELTS 8.5, C1 Advanced
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 text-lg mb-1">Kinh nghiệm</h4>
                  <p className="text-ink-600 leading-relaxed">
                    10+ năm giảng dạy tiếng Anh, đã đào tạo 2000+ học viên
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 text-lg mb-1">Phương pháp</h4>
                  <p className="text-ink-600 leading-relaxed">
                    Tập trung vào tư duy ngôn ngữ và phản xạ thực tế
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 text-lg mb-1">Du học</h4>
                  <p className="text-ink-600 leading-relaxed">
                    Từng học tập và làm việc tại Mỹ, Úc
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 text-lg mb-1">Tài liệu</h4>
                  <p className="text-ink-600 leading-relaxed">
                    Tác giả bộ tài liệu luyện thi TOEIC/IELTS chuyên sâu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
