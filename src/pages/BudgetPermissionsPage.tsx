import { useState, type FormEvent } from "react";
import { Check, KeyRound, Lock, Minus, Pencil, Plus, ShieldCheck, Trash2, Unlock, Wallet, X } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FormField, SelectField, TextField } from "@/components/shared/FormField";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/use-auth";
import { NAV_PERMISSIONS, ROLE_LABEL } from "@/data/mockAuth";
import { CHANNEL_BUDGETS } from "@/data/mockAdmin";
import type { PermissionLevel } from "@/types/admin";
import type { Role } from "@/types/auth";

function formatVnd(amount: number) {
  return (amount / 1_000_000).toFixed(1).replace(/\.0$/, "") + "tr";
}

const PERMISSION_META: Record<PermissionLevel, { icon: typeof Check; className: string; label: string }> = {
  full: { icon: Check, className: "bg-emerald-100 text-emerald-600", label: "Toàn quyền" },
  edit: { icon: Pencil, className: "bg-blue-100 text-blue-600", label: "Chỉnh sửa" },
  view: { icon: Minus, className: "bg-amber-100 text-amber-600", label: "Chỉ xem" },
  none: { icon: X, className: "bg-gray-100 text-gray-400", label: "Không có quyền" },
};

function PermissionCell({ level }: { level: PermissionLevel }) {
  const meta = PERMISSION_META[level];
  const Icon = meta.icon;
  return (
    <span title={meta.label} className={cn("mx-auto flex h-7 w-7 items-center justify-center rounded-full", meta.className)}>
      <Icon className="h-3.5 w-3.5" />
    </span>
  );
}

function initials(name: string) {
  const parts = name.trim().split(" ");
  return (parts[0]?.[0] ?? "").concat(parts[parts.length - 1]?.[0] ?? "").toUpperCase();
}

const EMPTY_FORM = { name: "", email: "", password: "", role: "cskh" as Role };

export function BudgetPermissionsPage() {
  const { currentUser, accounts, addAccount, updateAccountRole, toggleAccountStatus, removeAccount } = useAuth();
  const isSuperAdmin = currentUser?.role === "super-admin";
  const [tab, setTab] = useState<"budget" | "permissions" | "accounts">("budget");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState<string | null>(null);

  const totalBudget = CHANNEL_BUDGETS.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = CHANNEL_BUDGETS.reduce((sum, c) => sum + c.spent, 0);
  const remaining = totalBudget - totalSpent;
  const usageRate = Math.round((totalSpent / totalBudget) * 100);

  function openAddModal() {
    setForm(EMPTY_FORM);
    setFormError(null);
    setIsModalOpen(true);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setFormError("Vui lòng nhập đầy đủ họ tên, email và mật khẩu.");
      return;
    }
    if (accounts.some((a) => a.email.toLowerCase() === form.email.trim().toLowerCase())) {
      setFormError("Email này đã tồn tại trong hệ thống.");
      return;
    }
    addAccount({ name: form.name.trim(), email: form.email.trim(), password: form.password, role: form.role });
    setIsModalOpen(false);
  }

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <PageHeader
        title="Quản lý Ngân sách & Quyền"
        subtitle="Theo dõi ngân sách Marketing, phân quyền truy cập và quản lý tài khoản đăng nhập hệ thống."
      />

      <div className="flex w-fit flex-wrap rounded-[var(--radius-control)] bg-gray-100 p-1">
        {(
          [
            { key: "budget", label: "Ngân sách Marketing", icon: Wallet },
            { key: "permissions", label: "Phân quyền", icon: ShieldCheck },
            { key: "accounts", label: "Tài khoản đăng nhập", icon: KeyRound },
          ] as const
        ).map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-[6px] px-3.5 py-1.5 text-[13px] font-medium transition-colors",
              tab === item.key ? "bg-white text-[var(--color-primary)] shadow-sm" : "text-[var(--color-text-secondary)]",
            )}
          >
            <item.icon className="h-3.5 w-3.5" />
            {item.label}
          </button>
        ))}
      </div>

      {tab === "budget" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <KpiCard kpi={{ id: "budget", title: "Tổng ngân sách", value: formatVnd(totalBudget), description: "Phân bổ tháng này", icon: Wallet, tone: "default" }} />
            <KpiCard kpi={{ id: "spent", title: "Đã chi tiêu", value: formatVnd(totalSpent), description: `${usageRate}% ngân sách`, icon: Wallet, tone: "default" }} />
            <KpiCard kpi={{ id: "remaining", title: "Còn lại", value: formatVnd(remaining), description: "Có thể phân bổ thêm", icon: Wallet, tone: remaining < totalBudget * 0.15 ? "danger" : "default" }} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ngân sách theo kênh Marketing</CardTitle>
              <CardDescription>Theo dõi mức chi tiêu thực tế so với ngân sách được duyệt</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {CHANNEL_BUDGETS.map((channel) => {
                const pct = Math.round((channel.spent / channel.budget) * 100);
                const isOver = pct >= 90;
                return (
                  <div key={channel.id}>
                    <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-[13px] font-medium text-[var(--color-text)]">{channel.channel}</p>
                      <p className="text-[13px] font-semibold text-[var(--color-text)]">
                        {formatVnd(channel.spent)} / {formatVnd(channel.budget)}{" "}
                        <span className={cn(isOver ? "text-red-500" : "text-[var(--color-text-secondary)]")}>({pct}%)</span>
                      </p>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={cn("h-full rounded-full transition-[width] duration-500", isOver ? "bg-red-500" : "bg-[var(--color-primary)]")}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "permissions" && (
        <Card>
          <CardHeader>
            <CardTitle>Ma trận phân quyền theo vai trò</CardTitle>
            <CardDescription>Quyền truy cập từng module theo 3 cấp vai trò trong hệ thống</CardDescription>
          </CardHeader>
          <div className="overflow-x-auto p-5 pt-4">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-[11px] uppercase tracking-wide text-[var(--color-text-secondary)]">
                  <th scope="col" className="pb-2 font-semibold">Module</th>
                  <th scope="col" className="pb-2 text-center font-semibold">Super Admin</th>
                  <th scope="col" className="pb-2 text-center font-semibold">Marketing</th>
                  <th scope="col" className="pb-2 text-center font-semibold">CSKH</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(NAV_PERMISSIONS).map(([id, entry]) => (
                  <tr key={id} className="border-b border-[var(--color-border)] text-[13px] last:border-0 hover:bg-gray-50">
                    <td className="py-3 font-medium text-[var(--color-text)]">{entry.label}</td>
                    <td className="py-3 text-center"><PermissionCell level={entry.superAdmin} /></td>
                    <td className="py-3 text-center"><PermissionCell level={entry.marketing} /></td>
                    <td className="py-3 text-center"><PermissionCell level={entry.cskh} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-4 border-t border-[var(--color-border)] px-5 py-3 text-[12px] text-[var(--color-text-secondary)]">
            {(Object.keys(PERMISSION_META) as PermissionLevel[]).map((level) => (
              <div key={level} className="flex items-center gap-1.5">
                <PermissionCell level={level} />
                {PERMISSION_META[level].label}
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "accounts" && (
        <Card>
          <div className="flex flex-col gap-3 border-b border-[var(--color-border)] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[15px] font-semibold text-[var(--color-text)]">Tài khoản đăng nhập CMS</h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {isSuperAdmin ? "Chỉ Super Admin có thể tạo, đổi vai trò hoặc khóa tài khoản." : "Chỉ Super Admin mới có quyền chỉnh sửa tài khoản."}
              </p>
            </div>
            {isSuperAdmin && (
              <Button size="sm" onClick={openAddModal}>
                <Plus className="h-3.5 w-3.5" />
                Thêm tài khoản
              </Button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-[11px] uppercase tracking-wide text-[var(--color-text-secondary)]">
                  <th scope="col" className="px-5 py-3 font-semibold">Tài khoản</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Vai trò</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Trạng thái</th>
                  {isSuperAdmin && <th scope="col" className="px-3 py-3 font-semibold text-right">Hành động</th>}
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id} className="border-b border-[var(--color-border)] text-[13px] last:border-0 hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[11px] font-semibold text-[var(--color-primary-dark)]">
                          {initials(account.name)}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--color-text)]">
                            {account.name}
                            {account.id === currentUser?.id && (
                              <span className="ml-1.5 text-[11px] font-normal text-[var(--color-text-secondary)]">(bạn)</span>
                            )}
                          </p>
                          <p className="text-[12px] text-[var(--color-text-secondary)]">{account.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      {isSuperAdmin ? (
                        <SelectField
                          value={account.role}
                          onChange={(e) => updateAccountRole(account.id, e.target.value as Role)}
                          className="w-40"
                          aria-label={`Vai trò của ${account.name}`}
                        >
                          <option value="super-admin">Super Admin</option>
                          <option value="marketing">Marketing</option>
                          <option value="cskh">CSKH</option>
                        </SelectField>
                      ) : (
                        <span className="text-[var(--color-text)]">{ROLE_LABEL[account.role]}</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <Badge tone={account.status === "active" ? "success" : "danger"}>
                        {account.status === "active" ? "Đang hoạt động" : "Đã khóa"}
                      </Badge>
                    </td>
                    {isSuperAdmin && (
                      <td className="px-3 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => toggleAccountStatus(account.id)}
                            title={account.status === "active" ? "Khóa tài khoản" : "Mở khóa"}
                            className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-text-secondary)] hover:bg-gray-100"
                          >
                            {account.status === "active" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => removeAccount(account.id)}
                            disabled={account.id === currentUser?.id}
                            title="Xóa tài khoản"
                            className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] text-red-500 hover:bg-red-50 disabled:pointer-events-none disabled:opacity-30"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thêm tài khoản đăng nhập"
        description="Tài khoản mới có thể đăng nhập ngay bằng email và mật khẩu bên dưới."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button size="sm" onClick={handleSubmit}>Tạo tài khoản</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {formError && (
            <div className="rounded-[var(--radius-control)] border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">
              {formError}
            </div>
          )}
          <FormField label="Họ và tên" required>
            <TextField value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Nguyễn Văn A" />
          </FormField>
          <FormField label="Email đăng nhập" required>
            <TextField type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="ten@huyway.edu.vn" />
          </FormField>
          <FormField label="Mật khẩu" required>
            <TextField type="text" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} placeholder="Mật khẩu tạm thời" />
          </FormField>
          <FormField label="Vai trò" required>
            <SelectField value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as Role }))}>
              <option value="super-admin">Super Admin</option>
              <option value="marketing">Marketing</option>
              <option value="cskh">CSKH</option>
            </SelectField>
          </FormField>
        </form>
      </Dialog>
    </div>
  );
}
