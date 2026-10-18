"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Wallet2,
  Heart,
  Location,
  Logout,
  Edit2,
  ArrowRight2,
} from "iconsax-react";
import { Calendar } from "@/components/ui/calendar";
import { toGregorian, toJalali } from "@/lib/jalali";
import { toPersianDigits, cn } from "@/lib/utils";
import ProfileSidebar from "@/components/ProfileSidebar";
import LogoutModal from "@/components/LogoutModal";
import {
  useProfile,
  useAuth,
  type UserProfile,
  INITIAL_PROFILE,
} from "@/lib/siteStorage";

function NotchedField({
  label,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  onClick,
  placeholder,
  dir,
  type = "text",
}: {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  type?: string;
}) {
  return (
    <fieldset
      onClick={onClick}
      className={cn(
        "relative rounded-lg border bg-white px-3.5 pb-2 pt-0.5 transition-colors",
        disabled
          ? "border-neutral-200 bg-neutral-50/50"
          : "border-neutral-300 focus-within:border-primary hover:border-neutral-400",
        onClick && "cursor-pointer"
      )}
    >
      <legend className="px-1.5 text-[11px] sm:text-xs text-neutral-600 font-normal select-none leading-none">
        {label}
      </legend>
      <input
        type={type}
        dir={dir}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        className={cn(
          "h-7 w-full bg-transparent text-xs sm:text-sm text-tarkhineh-dark outline-none placeholder:text-neutral-400 font-sans",
          onClick && "cursor-pointer",
          dir === "ltr" && "text-left"
        )}
      />
    </fieldset>
  );
}

export default function ProfilePageContent() {
  const router = useRouter();
  const { profile: storedProfile, updateProfile } = useProfile();
  const { logout } = useAuth();
  const [mobileView, setMobileView] = useState<"menu" | "info">("menu");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(storedProfile);
  const [backup, setBackup] = useState<UserProfile>(storedProfile);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setProfile(storedProfile);
      setBackup(storedProfile);
    }
  }, [storedProfile, isEditing]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(toGregorian(1381, 5, 1));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCalendarOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen]);

  const handleStartEdit = () => {
    setBackup({ ...profile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfile({ ...backup });
    setIsEditing(false);
    setIsCalendarOpen(false);
  };

  const handleSave = () => {
    updateProfile(profile);
    setBackup({ ...profile });
    setIsEditing(false);
    setIsCalendarOpen(false);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const j = toJalali(date);
    const formatted = `${toPersianDigits(j.jy)}/${toPersianDigits(
      String(j.jm).padStart(2, "0")
    )}/${toPersianDigits(String(j.jd).padStart(2, "0"))}`;
    setProfile((prev) => ({ ...prev, birthDate: formatted }));
    setIsCalendarOpen(false);
  };

  const fullName = profile.firstName ? `${profile.firstName} ${profile.lastName}` : "کاربر ترخینه";

  const renderForm = () => (
    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <NotchedField
          label="نام"
          value={profile.firstName}
          disabled={!isEditing}
          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        />
        <NotchedField
          label="نام خانوادگی"
          value={profile.lastName}
          disabled={!isEditing}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />

        <div className="order-3 sm:order-2">
          <NotchedField
            label="آدرس ایمیل"
            value={profile.email}
            disabled={!isEditing}
            dir="ltr"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <div className="order-4 sm:order-2">
          <NotchedField
            label="شماره همراه"
            value={profile.phone}
            disabled={!isEditing}
            dir="ltr"
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>

        <div className="order-5 sm:order-3 relative" ref={calendarRef}>
          <NotchedField
            label="تاریخ تولد (اختیاری)"
            value={profile.birthDate}
            disabled={!isEditing}
            readOnly
            onClick={isEditing ? () => setIsCalendarOpen((prev) => !prev) : undefined}
            dir="ltr"
          />

          {isCalendarOpen && isEditing && (
            <div className="absolute top-full mt-2 right-0 sm:right-auto sm:left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
              <Calendar
                value={selectedDate}
                onChange={handleDateSelect}
                className="shadow-2xl border-neutral-300"
              />
            </div>
          )}
        </div>

        <div className="order-6 sm:order-3">
          <NotchedField
            label="نام نمایشی"
            value={profile.displayName}
            disabled={!isEditing}
            placeholder="نام نمایشی"
            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-8 pt-2">
        {!isEditing ? (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleStartEdit}
              className="inline-flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary-tint/30 active:scale-95 rounded-lg px-8 py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-2xs"
            >
              <Edit2 size={18} color="currentColor" variant="Linear" />
              <span>ویرایش اطلاعات شخصی</span>
            </button>
          </div>
        ) : (
          <>
            <div className="hidden sm:flex items-center gap-4">
              <button
                type="button"
                onClick={handleSave}
                className="bg-primary hover:bg-primary-hover active:scale-95 text-white rounded-lg px-8 py-2.5 text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer"
              >
                ذخیره اطلاعات
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="border border-primary text-primary hover:bg-primary-tint/30 active:scale-95 rounded-lg px-8 py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                انصراف
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full sm:hidden">
              <button
                type="button"
                onClick={handleSave}
                className="bg-primary hover:bg-primary-hover active:scale-95 text-white rounded-lg py-2.5 text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer text-center"
              >
                ذخیره اطلاعات
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="border border-primary text-primary hover:bg-primary-tint/30 active:scale-95 rounded-lg py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer text-center"
              >
                انصراف
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );

  return (
    <div dir="rtl" className="w-full font-sans bg-[#fafafa] min-h-[calc(100vh-160px)] py-4 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* profile-mobile */}
        <div className="lg:hidden">
          {mobileView === "menu" ? (
            <div className="w-full max-w-md mx-auto pt-1 sm:pt-4">
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center gap-3.5 pb-4">
                  <div className="w-16 h-16 rounded-full border border-neutral-300 bg-neutral-100/90 flex items-center justify-center text-neutral-400 shadow-2xs shrink-0">
                    <User size={34} color="currentColor" variant="Linear" />
                  </div>
                  <div className="text-right">
                    <h2 className="text-base font-bold text-tarkhineh-dark">{fullName}</h2>
                    <p dir="ltr" className="text-xs text-neutral-500 mt-1 font-sans text-right">
                      {profile.phone}
                    </p>
                  </div>
                </div>

                <div className="border-b border-neutral-300 mb-2" />

                <nav className="divide-y divide-transparent">
                  <button
                    type="button"
                    onClick={() => setMobileView("info")}
                    className="w-full flex items-center gap-3 py-3.5 px-3 text-right cursor-pointer group relative"
                  >
                    <span className="absolute right-0 top-1.5 bottom-1.5 w-0.75 bg-primary rounded-l" />
                    <User size={22} color="currentColor" variant="Bold" className="text-primary shrink-0" />
                    <span className="text-primary font-bold text-base">پروفایل</span>
                  </button>

                  <Link
                    href="/orders"
                    className="flex items-center gap-3 py-3.5 px-3 text-right cursor-pointer group text-neutral-700 hover:text-primary transition-colors"
                  >
                    <Wallet2 size={22} color="currentColor" variant="Linear" className="text-neutral-700 group-hover:text-primary shrink-0" />
                    <span className="font-medium text-base">پیگیری سفارشات</span>
                  </Link>

                  <Link
                    href="/favorites"
                    className="flex items-center gap-3 py-3.5 px-3 text-right cursor-pointer group text-neutral-700 hover:text-primary transition-colors"
                  >
                    <Heart size={22} color="currentColor" variant="Linear" className="text-neutral-700 group-hover:text-primary shrink-0" />
                    <span className="font-medium text-base">علاقمندی‌ها</span>
                  </Link>

                  <Link
                    href="/addresses"
                    className="flex items-center gap-3 py-3.5 px-3 text-right cursor-pointer group text-neutral-700 hover:text-primary transition-colors"
                  >
                    <Location size={22} color="currentColor" variant="Linear" className="text-neutral-700 group-hover:text-primary shrink-0" />
                    <span className="font-medium text-base">آدرس‌های من</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setIsLogoutOpen(true)}
                    className="w-full flex items-center gap-3 py-3.5 px-3 text-right cursor-pointer group text-rose-600 hover:text-rose-700 transition-colors"
                  >
                    <Logout size={22} color="currentColor" variant="Linear" className="text-rose-600 shrink-0" />
                    <span className="font-medium text-base">خروج</span>
                  </button>
                </nav>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto pt-1 sm:pt-4">
              <div className="flex items-center justify-between pb-4">
                <button
                  type="button"
                  onClick={() => setMobileView("menu")}
                  className="p-1 text-tarkhineh-dark hover:text-primary transition-colors cursor-pointer"
                  aria-label="بازگشت"
                >
                  <ArrowRight2 size={20} color="currentColor" variant="Linear" />
                </button>
                <h1 className="text-base font-bold text-tarkhineh-dark text-center flex-1">
                  {isEditing ? "ویرایش اطلاعات شخصی" : "پروفایل"}
                </h1>
                <div className="w-7" />
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
                {renderForm()}
              </div>
            </div>
          )}
        </div>

        {/* profile-desktop */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <ProfileSidebar userName={fullName} userPhone={profile.phone} />

          <main className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <div className="pb-5 mb-6 border-b border-neutral-200">
              <h2 className="text-base sm:text-lg font-bold text-tarkhineh-dark">
                {isEditing ? "ویرایش اطلاعات شخصی" : "پروفایل"}
              </h2>
            </div>
            {renderForm()}
          </main>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          logout();
          setIsLogoutOpen(false);
          router.push("/");
        }}
      />
    </div>
  );
}
