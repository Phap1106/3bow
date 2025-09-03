// src/components/common/LogoutButton.tsx
"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/authApi";

export default function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function onClick() {
    setLoading(true);
    try {
      await logout();                 // gọi BE xoá cookie
      router.replace("/login");       // về trang login
    } catch (e: any) {
      alert(e?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`h-9 px-3 border rounded-xl flex items-center gap-2 ${className}`}
      title="Đăng xuất"
    >
      <LogOut size={16} />
      {loading ? "Đang đăng xuất…" : "Đăng xuất"}
    </button>
  );
}
