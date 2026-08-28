type Mentor = {
  id: number;
  name: string;
  title: string;
  portrait?: string; // optional — nếu không có ảnh thì để trống
};

const mentors: Mentor[] = [
  { id: 1, name: 'Nguyễn Mai', title: 'Giảng viên IELTS Cao cấp', portrait: '' },
  { id: 2, name: 'Trần Hồng', title: 'Huấn luyện viên Kỹ năng Nói', portrait: '' },
  { id: 3, name: 'Lê Thu', title: 'Chuyên gia Kỹ năng Nghe', portrait: '' },
  { id: 4, name: 'Phạm Anh', title: 'Chuyên gia Kỹ năng Viết', portrait: '' },
];

export default function MentorTeam() {
  return (
    <section id="mentor-team" className="py-16 bg-white">
      <div className="container-px max-w-7xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="mt-3 text-3xl font-extrabold text-ink-900">Đội ngũ giảng viên</h2>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
    </section>
  );
}
