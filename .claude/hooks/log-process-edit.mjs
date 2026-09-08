// PostToolUse(Edit|Write) hook — ghi lại file vừa sửa vào nhật ký process của module hiện tại.
// Nhận JSON trên stdin: { tool_name, tool_input: { file_path }, ... }
// Ghi 1 dòng vào docs/process/01-nen-tang-process.md theo format:
//   [YYYY-MM-DD HH:MM] - auto-edit - done - <đường-dẫn-tương-đối>
// Không bao giờ chặn tool (mọi lỗi đều nuốt). Cấu hình: .claude/settings.json

import fs from "node:fs";
import path from "node:path";

const LOG_REL = "docs/process/02-khung-chuyendoi-process.md";

// Bỏ qua các đường dẫn không phải mã nguồn dự án.
const IGNORE = [
  "node_modules/",
  "dist/",
  ".git/",
  "docs/process/", // tránh tự ghi đè lên chính nhật ký + file .md process khác
];

function readStdin() {
  return new Promise((resolve) => {
    let raw = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (c) => (raw += c));
    process.stdin.on("end", () => resolve(raw));
    // Nếu không có stdin (chạy tay), kết thúc sau 200ms.
    setTimeout(() => resolve(raw), 200);
  });
}

function stamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

const raw = await readStdin();
try {
  const input = JSON.parse(raw || "{}");
  const filePath = input?.tool_input?.file_path;
  if (!filePath) process.exit(0);

  const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const rel = path.relative(projectDir, filePath).split(path.sep).join("/");
  if (!rel || rel.startsWith("..")) process.exit(0);
  if (IGNORE.some((p) => rel.startsWith(p))) process.exit(0);

  const logPath = path.join(projectDir, LOG_REL);
  if (!fs.existsSync(logPath)) process.exit(0);

  fs.appendFileSync(logPath, `[${stamp()}] - auto-edit - done - ${rel}\n`);
} catch {
  /* im lặng */
}
process.exit(0);
