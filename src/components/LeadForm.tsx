import { useState } from 'react';
import { User, Phone, Mail, Package, Send, CheckCircle2, Loader2, AlertCircle, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const packages = ['Cơ bản', 'Nâng cao', 'Combo 1-1', 'Chưa quyết định'];
const studyTimes = ['Ca Sáng', 'Ca Chiều', 'Ca Tối', 'Cuối tuần'];

export default function LeadForm() {
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', course_package: 'Nâng cao', study_time: 'Ca Tối' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setError('');
    try {
      // First attempt: try inserting with a separate study_time field (if column exists)
      const { error: err } = await supabase.from('leads').insert({
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        course_package: form.course_package,
        study_time: form.study_time,
      });

      if (err) {
        // Fallback: if columns mismatch, store study_time inside course_package
        if (err.message?.includes('study_time') || err.message?.includes('column') || err.code === 'PGRST204') {
          const { error: fallbackErr } = await supabase.from('leads').insert({
            full_name: form.full_name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            course_package: `${form.course_package} (Thời gian học: ${form.study_time})`,
          });
          if (fallbackErr) throw fallbackErr;
        } else {
          throw err;
        }
      }
      setStatus('success');
      setForm({ full_name: '', phone: '', email: '', course_package: 'Nâng cao', study_time: 'Ca Tối' });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Không thể gửi đăng ký. Vui lòng thử lại.');
    }
  };

  return (
    <section id="dang-ky" className="relative py-20 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1045a4 0%, #448cfd 35%, #ff8720 70%, #ff8de4 100%)' }}>
      <div className="absolute inset-0 -z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #ffffff, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, #fff0fc, transparent 70%)' }} />
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
              Để lại thông tin — chuyên gia Huyway English gọi cho bạn trong 5 phút
            </h2>
            <p className="mt-4 text-brand-100 text-lg leading-relaxed">
              Bạn sẽ nhận được: lộ trình học cá nhân hóa, đánh giá trình độ miễn phí và ưu đãi giảm 40% chỉ dành cho 50 đăng ký đầu tiên.
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
          </div>

          {/* form card */}
          <div className="bg-white rounded-3xl p-7 lg:p-9 shadow-2xl ring-1 ring-black/5">
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
                <p className="mt-1.5 text-sm text-ink-500">Chỉ 3 thông tin — mất chưa tới 30 giây</p>

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

                  <div>
                    <label className="text-sm font-semibold text-ink-700 flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-ink-400" /> Gói khóa học quan tâm
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {packages.map((p) => (
                        <button
                          type="button"
                          key={p}
                          onClick={() => setForm({ ...form, course_package: p })}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            form.course_package === p
                              ? 'btn-g3 text-white shadow-md'
                              : 'bg-ink-50 text-ink-700 hover:bg-brand-50 hover:text-brand-600'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-ink-700 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-ink-400" /> Thời gian học mong muốn
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {studyTimes.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setForm({ ...form, study_time: t })}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            form.study_time === t
                              ? 'btn-g3 text-white shadow-md'
                              : 'bg-ink-50 text-ink-700 hover:bg-brand-50 hover:text-brand-600'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-g3 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed cta-pulse"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Gửi đăng ký ngay
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
      <div className="mt-1.5 flex items-center gap-3 px-4 py-3 rounded-xl bg-ink-50 ring-1 ring-ink-100 focus-within:ring-brand-400 focus-within:bg-white transition-all">
        <span className="text-ink-400">{icon}</span>
        {children}
      </div>
    </div>
  );
}
