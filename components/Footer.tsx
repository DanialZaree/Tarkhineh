"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send2, Instagram } from "iconsax-react";
import { FiTwitter } from "react-icons/fi";

export default function Footer() {
  const [message, setMessage] = useState("");
  const maxLength = 200;

  return (
    <footer dir="rtl" className="relative w-full overflow-hidden text-white font-sans mt-auto">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/footer-bg.jpg"
          alt="رستوران ترخینه"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/80 to-black/75" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12 md:py-14">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-14">
          <div className="w-full lg:w-auto flex justify-between sm:justify-start sm:gap-20 md:gap-28 lg:gap-20">
            <div className="flex flex-col">
              <h3 className="font-bold text-base sm:text-lg text-white mb-4 sm:mb-5">
                دسترسی آسان
              </h3>
              <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-sm text-tarkhineh-border">
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    پرسش‌های متداول
                  </Link>
                </li>
                <li>
                  <Link href="/rules" className="hover:text-white transition-colors">
                    قوانین ترخینه
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    حریم خصوصی
                  </Link>
                </li>
              </ul>

              <div className="flex items-center gap-3.5 mt-5 sm:mt-6 text-tarkhineh-border">
                <a
                  href="https://t.me/danialzaree0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:scale-110 active:scale-95 transition-all"
                  aria-label="تلگرام"
                >
                  <Send2 size={24} color="currentColor" variant="Linear" />
                </a>

                <a
                  href="https://instagram.com/danialzaree_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:scale-110 active:scale-95 transition-all"
                  aria-label="اینستاگرام"
                >
                  <Instagram size={24} color="currentColor" variant="Linear" />
                </a>

                <a
                  href="https://x.com/danialzaree"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:scale-110 active:scale-95 transition-all"
                  aria-label="توییتر"
                >
                  <FiTwitter size={22} />
                </a>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="font-bold text-base sm:text-lg text-white mb-4 sm:mb-5">
                شعبه‌های ترخینه
              </h3>
              <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-sm text-tarkhineh-border">
                <li>
                  <Link href="/branch/ekbatan" className="hover:text-white transition-colors">
                    شعبه اکباتان
                  </Link>
                </li>
                <li>
                  <Link href="/branch/chalous" className="hover:text-white transition-colors">
                    شعبه چالوس
                  </Link>
                </li>
                <li>
                  <Link href="/branch/aqdasiyeh" className="hover:text-white transition-colors">
                    شعبه اقدسیه
                  </Link>
                </li>
                <li>
                  <Link href="/branch/vanak" className="hover:text-white transition-colors">
                    شعبه ونک
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:block w-full max-w-xl">
            <h3 className="font-bold text-base sm:text-lg text-white mb-4 sm:mb-5">
              پیام به ترخینه
            </h3>
            
            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  className="w-full bg-transparent border border-tarkhineh-muted focus:border-white text-white placeholder:text-tarkhineh-border rounded px-3 py-2 text-xs focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="شماره تماس"
                  className="w-full bg-transparent border border-tarkhineh-muted focus:border-white text-white placeholder:text-tarkhineh-border rounded px-3 py-2 text-xs focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="آدرس ایمیل (اختیاری)"
                  className="w-full bg-transparent border border-tarkhineh-muted focus:border-white text-white placeholder:text-tarkhineh-border rounded px-3 py-2 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col justify-between">
                <textarea
                  rows={4}
                  maxLength={maxLength}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="پیام شما"
                  className="w-full h-29 bg-transparent border border-tarkhineh-muted focus:border-white text-white placeholder:text-tarkhineh-border rounded p-3 text-xs focus:outline-none transition-colors resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-tarkhineh-subtle dir-ltr">
                    {message.length}/{maxLength}
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-1.5 rounded border border-tarkhineh-muted hover:border-white text-tarkhineh-border hover:text-white text-xs font-medium transition-all active:scale-95 cursor-pointer"
                  >
                    ارسال پیام
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </footer>
  );
}
