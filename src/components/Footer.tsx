import { GraduationCap, Phone, Mail, MapPin, Facebook, Youtube, Instagram, Send } from 'lucide-react';

const cols = [
  {
    title: 'Khóa học',
    links: ['IELTS Foundation', 'IELTS Skill Building', 'IELTS Intensive', 'IELTS Combo 1-1', 'Toeic Cơ bản'],
  },
  {
    title: 'Huyway English',
    links: ['Về chúng tôi', 'Đội ngũ giáo viên', 'Tuyển dụng', 'Câu chuyện học viên', 'Báo chí nói về Huyway English'],
  },
  {
    title: 'Hỗ trợ',
    links: ['Câu hỏi thường gặp', 'Chính sách bảo mật', 'Điều khoản sử dụng', 'Chính sách hoàn tiền', 'Liên hệ'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="max-w-7xl mx-auto container-px py-14 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white">
                <GraduationCap className="w-6 h-6" />
              </span>
              <span className="font-extrabold text-lg text-white">
                Huyway <span className="text-brand-400">English</span>
              </span>
            </a>
            <p className="mt-1.5 text-xs font-semibold text-brand-400 uppercase tracking-wider">
              English to go far.
            </p>
            <p className="mt-4 text-sm text-ink-400 leading-relaxed max-w-sm">
              Nền tảng học IELTS online hàng đầu Việt Nam — kết hợp giáo viên 8.0+ IELTS và AI chấm chữa,
              cam kết đầu ra cho mọi học viên.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a href="tel:19001234" className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-400" /> Hotline: 1900 1234 (8h - 21h)
              </a>
              <a href="mailto:hello@huyway.vn" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-400" /> hello@huyway.vn
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                <span>58B Võ Văn Dũng, Hà Nội</span>
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Youtube, Instagram, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid place-items-center w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-600 text-ink-300 hover:text-white transition-colors"
                  aria-label="social"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="font-bold text-white text-sm uppercase tracking-wider">{c.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-ink-400 hover:text-white transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-500">
          <p>© 2025 Huyway English. Doanh nghiệp hoạt động minh bạch, rõ ràng.</p>
          <p>Mã số doanh nghiệp: 0123456789 — Sở KH&amp;ĐT TP. HCM cấp ngày 01/01/2025</p>
        </div>
      </div>
    </footer>
  );
}
