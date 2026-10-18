"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Location,
  Add,
  AddCircle,
  Edit2,
  Trash,
  ArrowRight2,
} from "iconsax-react";
import { toPersianDigits } from "@/lib/utils";
import ProfileSidebar from "@/components/ProfileSidebar";
import {
  useAddresses,
  useProfile,
  useAuth,
  type AddressItem,
} from "@/lib/siteStorage";

const DEFAULT_ADDRESS = "ولیعصر، خیابان بزرگمهر، کوچه نسیم";

const INITIAL_FORM = {
  title: "",
  detail: DEFAULT_ADDRESS,
  isSelf: false,
  name: "",
  phone: "",
};

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-115 bg-white rounded-2xl p-5 sm:p-6 shadow-2xl font-sans">
        <div className="relative flex items-center justify-center pb-4">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-0 top-0 p-1 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <Add size={22} color="currentColor" variant="Linear" className="rotate-45" />
          </button>
          <h3 className="font-bold text-base sm:text-lg text-tarkhineh-dark">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AddressesPageContent() {
  const { addresses, upsertAddress, deleteAddress } = useAddresses();
  const { profile } = useProfile();
  const { auth } = useAuth();

  const [modalStep, setModalStep] = useState<"closed" | "map" | "form">("closed");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(INITIAL_FORM);

  const userName = profile.displayName || (profile.firstName ? `${profile.firstName} ${profile.lastName}` : "کاربر ترخینه");
  const userPhone = auth.phone || profile.phone || "";

  const openAdd = () => {
    setEditId(null);
    setForm(INITIAL_FORM);
    setModalStep("map");
  };

  const openEdit = (addr: AddressItem) => {
    setEditId(addr.id);
    setForm({
      title: addr.title,
      detail: addr.detail,
      isSelf: addr.isSelf ?? false,
      name: addr.recipientName || "",
      phone: addr.phone || userPhone,
    });
    setModalStep("form");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const item: AddressItem = {
      id: editId || `addr-${Date.now()}`,
      title: form.title.trim() || "خانه",
      detail: form.detail.trim() || DEFAULT_ADDRESS,
      phone: form.isSelf ? userPhone : form.phone.trim() || userPhone,
      recipientName: form.isSelf ? userName : form.name.trim(),
      isSelf: form.isSelf,
    };

    upsertAddress(item);
    setModalStep("closed");
  };

  const handleDelete = (id: string) => {
    deleteAddress(id);
  };

  return (
    <div dir="rtl" className="w-full font-sans bg-[#fafafa] min-h-[calc(100vh-160px)] py-4 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* mobile-header */}
        <div className="flex items-center justify-between pb-3 sm:hidden">
          <Link href="/profile" className="p-1 text-tarkhineh-dark hover:text-primary transition-colors cursor-pointer">
            <ArrowRight2 size={20} color="currentColor" variant="Linear" />
          </Link>
          <h1 className="text-base font-bold text-tarkhineh-dark text-center flex-1">آدرس‌های من</h1>
          <div className="w-7" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <ProfileSidebar />

          <main className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-4 sm:p-7 shadow-2xs min-h-115 flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-200">
              <h2 className="text-base sm:text-lg font-bold text-tarkhineh-dark">آدرس‌ها</h2>
              {addresses.length > 0 && (
                <button
                  type="button"
                  onClick={openAdd}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:opacity-85 transition-opacity cursor-pointer"
                >
                  <AddCircle size={18} color="currentColor" variant="Linear" />
                  <span>افزودن آدرس جدید</span>
                </button>
              )}
            </div>

            {addresses.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                <p className="text-xs sm:text-sm md:text-base font-medium text-neutral-600 mb-6 select-none">
                  شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!
                </p>
                <button
                  type="button"
                  onClick={openAdd}
                  className="border border-primary text-primary hover:bg-primary hover:text-white rounded-lg px-8 py-2.5 text-xs sm:text-sm font-medium transition-all shadow-2xs cursor-pointer"
                >
                  افزودن آدرس
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((item) => (
                  <div key={item.id} className="border border-neutral-200 rounded-xl p-4 bg-white hover:border-neutral-300 transition-all shadow-2xs flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">{item.detail}</p>
                      <div className="flex items-center gap-2 text-neutral-500 shrink-0">
                        <button type="button" onClick={() => openEdit(item)} className="hover:text-primary transition-colors cursor-pointer p-1" title="ویرایش آدرس">
                          <Edit2 size={18} color="currentColor" variant="Linear" />
                        </button>
                        <button type="button" onClick={() => handleDelete(item.id)} className="hover:text-rose-500 transition-colors cursor-pointer p-1" title="حذف آدرس">
                          <Trash size={18} color="currentColor" variant="Linear" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                      <span className="font-semibold text-neutral-700">{item.title}</span>
                      {item.recipientName && <span>{item.recipientName}</span>}
                      <span dir="ltr">{toPersianDigits(item.phone)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {modalStep === "map" && (
        <Modal title="افزودن آدرس" onClose={() => setModalStep("closed")}>
          <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 select-none">
            <iframe
              src="https://maps.google.com/maps?q=35.7005,51.3380&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              title="نقشه موقعیت مکانی"
            />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center -translate-y-3">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <Location size={20} color="currentColor" variant="Bold" />
                </div>
                <div className="w-2.5 h-1.5 rounded-full bg-black/30 blur-[1px] mt-0.5" />
              </div>
            </div>
            <div className="absolute bottom-3 inset-x-4 pointer-events-none">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-xs rounded-xl px-3.5 py-2 border border-neutral-200 shadow-md">
                <Location size={18} color="currentColor" variant="Linear" className="text-primary shrink-0" />
                <span className="text-xs sm:text-sm text-neutral-700 truncate font-medium">{form.detail}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setModalStep("form")}
            className="w-full mt-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            ثبت موقعیت
          </button>
        </Modal>
      )}

      {modalStep === "form" && (
        <Modal title="ثبت آدرس" onClose={() => setModalStep("closed")}>
          <form onSubmit={handleSave} className="space-y-3.5">
            <input
              type="text"
              placeholder="عنوان آدرس"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full h-11 px-3.5 rounded-lg border border-neutral-300 text-xs sm:text-sm text-tarkhineh-dark placeholder:text-neutral-400 focus:border-primary focus:outline-none transition-colors"
            />
            
            <label className="flex items-center gap-2 cursor-pointer select-none py-1 text-xs sm:text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={form.isSelf}
                onChange={(e) => setForm({ ...form, isSelf: e.target.checked })}
                className="w-4 h-4 rounded border-neutral-300 text-primary accent-primary cursor-pointer"
              />
              <span>تحویل گیرنده خودم هستم</span>
            </label>

            {!form.isSelf ? (
              <div className="space-y-3 animate-in fade-in duration-150">
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی تحویل گیرنده"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-lg border border-neutral-300 text-xs sm:text-sm text-tarkhineh-dark placeholder:text-neutral-400 focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  dir="ltr"
                  placeholder="شماره همراه تحویل گیرنده"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-lg border border-neutral-300 text-xs sm:text-sm text-tarkhineh-dark placeholder:text-neutral-400 focus:border-primary focus:outline-none transition-colors text-right placeholder:text-right"
                />
              </div>
            ) : (
              <fieldset className="relative rounded-lg border border-neutral-300 bg-white px-3.5 pb-2 pt-0.5 transition-colors focus-within:border-primary hover:border-neutral-400 animate-in fade-in duration-150">
                <legend className="px-1.5 text-[11px] sm:text-xs text-neutral-600 font-normal select-none leading-none">شماره همراه</legend>
                <input type="tel" dir="ltr" value={userPhone} readOnly className="h-7 w-full bg-transparent text-xs sm:text-sm text-tarkhineh-dark outline-none font-sans text-right" />
              </fieldset>
            )}

            <textarea
              rows={4}
              placeholder="آدرس دقیق شما"
              value={form.detail}
              onChange={(e) => setForm({ ...form, detail: e.target.value })}
              className="w-full p-3.5 rounded-lg border border-neutral-300 text-xs sm:text-sm text-tarkhineh-dark placeholder:text-neutral-400 focus:border-primary focus:outline-none resize-none transition-colors leading-relaxed"
            />

            <div className="flex items-center justify-between pt-3">
              <button type="button" onClick={() => setModalStep("map")} className="text-primary hover:opacity-80 text-xs sm:text-sm font-semibold transition-opacity cursor-pointer p-1">
                ویرایش آدرس انتخابی
              </button>
              <button type="submit" className="px-8 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-2xs">
                ثبت آدرس
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
