// MODULE 7: LỘ TRÌNH KHÓA HỌC — port 1:1 từ docs/design export/code.html.
export default function Courses() {
  return (
    <section className="w-full bg-surface-slate py-space-64 border-y border-hairline" id="lo-trinh-hoc">
      <div className="max-w-[1240px] mx-auto px-space-20 md:px-space-32">
        <div className="flex flex-col items-center text-center mb-space-48 max-w-2xl mx-auto">
          <span className="px-space-16 py-space-4 rounded-full bg-indigo-wash text-primary font-label-sm text-label-sm font-semibold mb-space-12 border border-primary/20">
            Lộ trình theo trình độ
          </span>
          <h2 className="font-headline text-headline text-ink font-bold">Chọn lộ trình phù hợp với band điểm của bạn</h2>
          <p className="font-body-md text-body-md text-ink-body mt-space-8">
            Chưa chắc trình độ hiện tại?{' '}
            <a className="text-primary font-semibold hover:underline" href="#dang-ky">Kiểm tra trình độ miễn phí ngay</a>
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-24 items-stretch">
          {/* Card 1: Nền tảng */}
          <div className="bg-surface rounded-3xl p-space-32 border border-hairline shadow-xs flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-space-8 px-space-12 py-space-4 rounded-full bg-surface-slate border border-hairline text-on-surface-variant font-label-sm text-label-sm font-semibold mb-space-16">
                Band 3.0 – 5.0
              </div>
              <h3 className="font-headline text-title-lg text-ink font-bold mb-space-8">Khóa Nền tảng (Foundation)</h3>
              <p className="font-body-sm text-body-sm text-ink-muted mb-space-20 text-justify">
                Dành cho học viên mất gốc tiếng Anh hoặc bắt đầu tìm hiểu về định dạng đề thi IELTS từ số không.
              </p>
              <ul className="space-y-space-12 font-body-sm text-body-sm text-ink-body mb-space-24">
                {[
                  'Chuẩn hóa ngữ âm quốc tế IPA, đọc chuẩn từ căn bản',
                  'Lấy lại 12 thì nòng cốt và các cấu trúc câu ghép học thuật',
                  'Làm quen cấu trúc đề thi IELTS 4 kỹ năng chuẩn Cambridge',
                  'Thời lượng: 3 tháng • 3 buổi/tuần • Trợ giảng kèm cặp 1-1',
                ].map((li) => (
                  <li key={li} className="flex items-start gap-space-8 text-justify">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 flex-shrink-0">check_circle</span>
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              className="w-full h-12 rounded-xl bg-primary text-on-primary hover:bg-indigo-hover font-label-lg text-label-lg transition-colors flex items-center justify-center shadow-xs"
              href="#dang-ky"
            >
              Nhận tư vấn khóa này
            </a>
          </div>
          {/* Card 2: Trung cấp (nổi bật) */}
          <div className="bg-surface rounded-3xl p-space-32 border-2 border-primary-container shadow-lg flex flex-col justify-between relative transform lg:-translate-y-2 h-full">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-space-16 py-space-4 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold tracking-wide uppercase shadow-sm">
              Phổ biến nhất
            </div>
            <div>
              <div className="inline-flex items-center gap-space-8 px-space-12 py-space-4 rounded-full bg-indigo-wash text-primary font-label-sm text-label-sm font-semibold mb-space-16 mt-2">
                Band 5.0 – 6.5
              </div>
              <h3 className="font-headline text-title-lg text-primary font-bold mb-space-8">Khóa Trung cấp (Intermediate)</h3>
              <p className="font-body-sm text-body-sm text-ink-muted mb-space-20 text-justify">
                Dành cho học viên đã có nền tảng cơ bản, cần bứt phá điểm số phục vụ xét tuyển Đại học và hồ sơ du học.
              </p>
              <ul className="space-y-space-12 font-body-sm text-body-sm text-ink-body mb-space-24">
                {[
                  'Chiến thuật xử lý từng dạng bài Listening & Reading chuyên sâu',
                  'Rèn luyện tư duy phản biện và cấu trúc bài luận Writing Task 1 & 2',
                  'Luyện phản xạ tự nhiên cho Speaking Part 1, 2, 3 chuẩn tiêu chí Fluency',
                  'Thời lượng: 3.5 tháng • Chấm chữa bài Writing không giới hạn',
                ].map((li) => (
                  <li key={li} className="flex items-start gap-space-8 text-justify">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 flex-shrink-0">check_circle</span>
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              className="w-full h-12 rounded-xl bg-primary-container text-on-primary hover:bg-indigo-hover font-label-lg text-label-lg transition-colors flex items-center justify-center shadow-sm"
              href="#dang-ky"
            >
              Nhận tư vấn khóa này
            </a>
          </div>
          {/* Card 3: Nâng cao */}
          <div className="bg-surface rounded-3xl p-space-32 border border-hairline shadow-xs flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-space-8 px-space-12 py-space-4 rounded-full bg-surface-slate border border-hairline text-on-surface-variant font-label-sm text-label-sm font-semibold mb-space-16">
                Band 7.0 – 7.5+
              </div>
              <h3 className="font-headline text-title-lg text-ink font-bold mb-space-8">Khóa Nâng cao (Advanced)</h3>
              <p className="font-body-sm text-body-sm text-ink-muted mb-space-20 text-justify">
                Dành cho học viên đặt mục tiêu săn học bổng toàn phần, định cư hoặc giảng dạy tiếng Anh chuyên nghiệp.
              </p>
              <ul className="space-y-space-12 font-body-sm text-body-sm text-ink-body mb-space-24">
                {[
                  'Nâng cấp vốn từ C1-C2, Collocations tự nhiên và Idiomatic expressions',
                  'Chiến thuật tối ưu điểm Lexical Resource & Grammatical Range Writing',
                  'Thi thử mô phỏng áp lực phòng thi thật với giám khảo bản xứ',
                  'Thời lượng: 2.5 tháng • Sửa bài 1-1 chuyên sâu trực tiếp cùng GV 8.5',
                ].map((li) => (
                  <li key={li} className="flex items-start gap-space-8 text-justify">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 flex-shrink-0">check_circle</span>
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              className="w-full h-12 rounded-xl bg-primary text-on-primary hover:bg-indigo-hover font-label-lg text-label-lg transition-colors flex items-center justify-center shadow-xs"
              href="#dang-ky"
            >
              Nhận tư vấn khóa này
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
