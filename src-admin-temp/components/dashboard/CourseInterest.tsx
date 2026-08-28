import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { CourseInterest as CourseInterestType } from "@/types/dashboard";

export function CourseInterest({ courses }: { courses: CourseInterestType[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Khóa Học Được Quan Tâm Nhất</CardTitle>
        <CardDescription>Top 5 khóa học trong kỳ theo lượt đăng ký</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {courses.map((course) => (
          <div key={course.id} className="group">
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <p className="truncate text-[13px] font-medium text-[var(--color-text)]">
                {course.name}
              </p>
              <p className="shrink-0 text-[13px] font-semibold text-[var(--color-text)]">
                {course.count.toLocaleString("vi-VN")} lead{" "}
                <span className="text-[var(--color-text-secondary)]">({course.percentage}%)</span>
              </p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out group-hover:brightness-110"
                style={{ width: `${course.percentage}%`, backgroundColor: course.color }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
