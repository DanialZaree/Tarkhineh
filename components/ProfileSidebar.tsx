"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Wallet2, Heart, Location, Logout } from "iconsax-react";
import LogoutModal from "@/components/LogoutModal";
import { cn, toPersianDigits } from "@/lib/utils";
import { useProfile, useAuth } from "@/lib/siteStorage";

const NAV_ITEMS = [
  { href: "/profile", label: "پروفایل", icon: User },
  { href: "/orders", label: "پیگیری سفارشات", icon: Wallet2 },
  { href: "/favorites", label: "علاقمندی‌ها", icon: Heart },
  { href: "/addresses", label: "آدرس‌های من", icon: Location },
];

interface ProfileSidebarProps {
  userName?: string;
  userPhone?: string;
}

export default function ProfileSidebar({
  userName,
  userPhone,
}: ProfileSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const { profile } = useProfile();
  const { auth, logout } = useAuth();

  const currentName = userName || profile.displayName || (profile.firstName ? `${profile.firstName} ${profile.lastName}` : "کاربر ترخینه");
  const currentPhone = userPhone || auth.phone || profile.phone || "۰۹۱۴ ۸۶۴ ۳۳۵۰";

  return (
    <>
      <aside className="hidden lg:block lg:col-span-4 bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full border border-neutral-300 bg-neutral-100/80 flex items-center justify-center text-neutral-400 shadow-2xs">
            <User size={40} color="currentColor" variant="Linear" />
          </div>
          <h3 className="font-bold text-base text-tarkhineh-dark mt-3.5">{userName || currentName}</h3>
          <p dir="ltr" className="text-xs text-neutral-500 mt-1 font-sans">{toPersianDigits(userPhone || currentPhone)}</p>
        </div>

        <div className="border-t border-neutral-200 my-5" />

        <nav className="space-y-1 text-sm font-medium">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname === `/profile${href}`;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer relative",
                  active
                    ? "text-primary font-bold pr-4"
                    : "text-neutral-600 hover:text-primary hover:bg-neutral-50"
                )}
              >
                {active && (
                  <span className="absolute right-0 top-1.5 bottom-1.5 w-0.75 bg-primary rounded-l" />
                )}
                <Icon
                  size={20}
                  color="currentColor"
                  variant={active ? "Bold" : "Linear"}
                  className={active ? "text-primary" : "text-neutral-500"}
                />
                <span>{label}</span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setIsLogoutOpen(true)}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-sm font-medium mt-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50/50"
          >
            <Logout size={20} color="currentColor" variant="Linear" className="text-rose-600" />
            <span>خروج</span>
          </button>
        </nav>
      </aside>

      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          logout();
          setIsLogoutOpen(false);
          router.push("/");
        }}
      />
    </>
  );
}
