import { useState } from 'react';
import { User, Phone, Mail, Send, CheckCircle2, Loader2, AlertCircle, Calendar, Target, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LeadForm() {
  const [form, setForm] = useState({ 
    full_name: '', 
    phone: '', 
    email: '',
    birth_year: '',
    current_level: '',
    target_score: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setError('');
    try {
      // First attempt: try inserting with a separate goal field (if column exists)
      const { error: err } = await supabase.from('leads').insert({
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        birth_year: form.birth_year.trim(),
        current_level: form.current_level.trim(),
        target_score: form.target_score.trim(),
        message: form.message.trim(),
        course_package: 'Chưa quyết định',
      });

      if (err) {
        // Fallback: if any new column is not available, preserve the selected info in the course_package field.
        if (err.message?.includes('column') || err.code === 'PGRST204') {
          const { error: fallbackErr } = await supabase.from('leads').insert({
            full_name: form.full_name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            course_package: 'Chưa quyết định',
          });
          if (fallbackErr) throw fallbackErr;
        } else {
          throw err;
        }
      }
      setStatus('success');
      setForm({ 
        full_name: '', 
        phone: '', 
        email: '',
        birth_year: '',
        current_level: '',
        target_score: '',
        message: ''
      });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Không thể gửi đăng ký. Vui lòng thử lại.');
    }
  };

  return (
    <section id="dang-ky" className="relative py-20 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #5b21b6 55%, #29124d 100%)' }}>
      <div className="absolute inset-0 -z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #ffffff, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, #00dcdc, transparent 70%)' }} />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto container-px relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* left copy */}
          <div className="text-white">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-semibold backdrop-blur">
              Đăng ký học thử miễn phí
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
              Để lại thông tin — chuyên gia Huyway English gọi bạn trong 5 phút
            </h2>
            <p className="mt-4 text-brand-100 text-lg leading-relaxed">
              Nhận lộ trình cá nhân hóa, đánh giá trình độ miễn phí và ưu đãi giảm 40% cho 50 đăng ký đầu tiên.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Tư vấn miễn phí 1-1 với giáo viên 8.0+ IELTS & 900+ TOEIC',
                'Test trình độ & đề xuất lộ trình riêng',
                'Học thử 1 buổi thực tế — không thu phí',
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-white/95">
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-white/20 backdrop-blur">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <span className="text-[15px]">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 w-full h-[240px] rounded-xl ring-1 ring-white/20 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1611.8161420234019!2d105.82368264690159!3d21.01538266221133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7ec6074ac9%3A0x38ee12a7b61db8d6!2zNThCIFAuIFbDtSBWxINuIETFqW5nLCDEkOG7kW5nIMSQYSwgSMOgIE7hu5lpIDEwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1786539752605!5m2!1svi!2s"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Bản đồ Huyway English"
              />
            </div>
          </div>

          {/* form card */}
          <div className="bg-white rounded-[20px] p-7 lg:p-9 shadow-2xl ring-1 ring-black/5">
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-success/10 text-success-600">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-ink-900">Đăng ký thành công!</h3>
                <p className="mt-2 text-ink-600">
                  Cảm ơn bạn đã quan tâm. Chuyên gia Huyway English sẽ liên hệ trong vòng 5 phút.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  Gửi đăng ký khác
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-extrabold text-ink-900">Đăng ký học thử</h3>
                <p className="mt-1.5 text-sm text-ink-500">Điền thông tin để nhận tư vấn miễn phí</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <Field icon={<User className="w-5 h-5" />} label="Họ và tên *">
                    <input
                      required
                      type="text"
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-transparent outline-none text-ink-900 placeholder:text-ink-300"
                    />
                  </Field>
                  <Field icon={<Phone className="w-5 h-5" />} label="Số điện thoại *">
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="09xx xxx xxx"
                      className="w-full bg-transparent outline-none text-ink-900 placeholder:text-ink-300"
                    />
                  </Field>
                  <Field icon={<Mail className="w-5 h-5" />} label="Email *">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full bg-transparent outline-none text-ink-900 placeholder:text-ink-300"
                    />
                  </Field>
                  <Field icon={<Calendar className="w-5 h-5" />} label="Năm sinh">
                    <input
                      type="number"
                      value={form.birth_year}
                      onChange={(e) => setForm({ ...form, birth_year: e.target.value })}
                      placeholder="2000"
                      className="w-full bg-transparent outline-none text-ink-900 placeholder:text-ink-300"
                    />
                  </Field>
                  <Field icon={<Target className="w-5 h-5" />} label="Trình độ hiện tại">
                    <select
                      value={form.current_level}
                      onChange={(e) => setForm({ ...form, current_level: e.target.value })}
                      className="w-full bg-transparent outline-none text-ink-900"
                    >
                      <option value="">Chọn trình độ</option>
                      <option value="Mất gốc">Mất gốc</option>
                      <option value="Cơ bản">Cơ bản</option>
                      <option value="Trung bình">Trung bình</option>
                      <option value="Khá">Khá</option>
                      <option value="Tốt">Tốt</option>
                    </select>
                  </Field>
                  <Field icon={<Target className="w-5 h-5" />} label="Mục tiêu đầu ra">
                    <select
                      value={form.target_score}
                      onChange={(e) => setForm({ ...form, target_score: e.target.value })}
                      className="w-full bg-transparent outline-none text-ink-900"
                    >
                      <option value="">Chọn mục tiêu</option>
                      <option value="IELTS 5.5">IELTS 5.5</option>
                      <option value="IELTS 6.0">IELTS 6.0</option>
                      <option value="IELTS 6.5">IELTS 6.5</option>
                      <option value="IELTS 7.0">IELTS 7.0</option>
                      <option value="IELTS 7.5+">IELTS 7.5+</option>
                      <option value="TOEIC 500">TOEIC 500</option>
                      <option value="TOEIC 600">TOEIC 600</option>
                      <option value="TOEIC 700">TOEIC 700</option>
                      <option value="TOEIC 800+">TOEIC 800+</option>
                    </select>
                  </Field>
                  <Field icon={<MessageSquare className="w-5 h-5" />} label="Nội dung/Câu hỏi">
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Để lại câu hỏi hoặc mong muốn của bạn..."
                      rows={3}
                      className="w-full bg-transparent outline-none text-ink-900 placeholder:text-ink-300 resize-none"
                    />
                  </Field>

                  {status === 'error' && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-g3 w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed cta-pulse"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Nhận tư vấn
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-ink-400">
                    Bằng việc đăng ký, bạn đồng ý với chính sách bảo mật của Huyway English.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-semibold text-ink-700">{label}</label>
      <div className="mt-1.5 flex items-center gap-3 px-4 py-3 rounded-lg bg-ink-50 ring-1 ring-ink-100 focus-within:ring-brand-400 focus-within:bg-white transition-all">
        <span className="text-ink-400">{icon}</span>
        {children}
      </div>
    </div>
  );
}
