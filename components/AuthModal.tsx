"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Add, ArrowRight2, Clock } from "iconsax-react";
import { PhoneInput } from "@/components/ui/phone-input";
import { OtpField } from "@/components/ui/otp-field";
import { toPersianDigits, cn } from "@/lib/utils";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (phone: string) => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(119);

  const handleClose = () => {
    setStep("phone");
    setOtp("");
    setError("");
    setTimer(119);
    onClose();
  };

  useEffect(() => {
    if (!isOpen || step !== "otp" || timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [isOpen, step, timer]);

  if (!isOpen) return null;

  const handleSendOtp = () => {
    if (!isValidPhone || phone.length !== 10) return;
    setStep("otp");
    setOtp("");
    setError("");
    setTimer(119);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 5) return;
    if (otp === "00000") {
      setError("");
      onSuccess?.(phone);
      handleClose();
    } else {
      setError("کد وارد شده صحیح نمی‌باشد.");
    }
  };

  const formatTimer = (s: number) => `${Math.floor(s / 60)}:${s % 60 < 10 ? "0" : ""}${s % 60}`;

  const formattedPhone = () => {
    const d = "0" + phone;
    return toPersianDigits(`${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 11)}`);
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-97.5 rounded-2xl bg-white p-6 sm:p-7 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute left-5 top-5 p-1 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
        >
          <Add size={22} color="currentColor" variant="Linear" className="rotate-45" />
        </button>

        {step === "otp" && (
          <button
            type="button"
            onClick={() => {
              setStep("phone");
              setError("");
            }}
            className="absolute right-5 top-5 p-1 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
          >
            <ArrowRight2 size={22} color="currentColor" variant="Linear" />
          </button>
        )}

        <div className="flex justify-center mb-3">
          <Image
            src="/logo-emblem.svg"
            alt="ترخینه"
            width={44}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </div>

        {step === "phone" ? (
          <div className="text-center">
            <h2 className="text-base font-bold text-neutral-800 mb-2">ورود / ثبت نام</h2>
            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
              با وارد کردن شماره موبایل کد تاییدی برای شما ارسال خواهد شد.
            </p>

            <PhoneInput
              value={phone}
              onChange={(digits, valid) => {
                setPhone(digits);
                setIsValidPhone(valid);
              }}
              autoFocus
            />

            <button
              type="button"
              disabled={!isValidPhone || phone.length !== 10}
              onClick={handleSendOtp}
              className={cn(
                "w-full h-11 rounded-lg text-sm font-medium transition-all my-4",
                isValidPhone && phone.length === 10
                  ? "bg-primary text-white hover:bg-primary-hover active:scale-[0.98] cursor-pointer shadow-xs"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              )}
            >
              تایید و ادامه
            </button>

            <p className="text-[11px] text-neutral-600 leading-normal">
              ورود و عضویت در ترخینه به منزله قبول{" "}
              <span className="text-primary font-medium cursor-pointer hover:underline">
                قوانین و مقررات
              </span>{" "}
              است.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-base font-bold text-neutral-800 mb-2">کد تایید</h2>
            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
              کد تایید پنج‌رقمی به شماره{" "}
              <span dir="ltr" className="inline-block font-medium">
                {formattedPhone()}
              </span>{" "}
              ارسال شد.
            </p>

            <div className="flex justify-center mb-3">
              <OtpField
                length={5}
                value={otp}
                onChange={(val) => {
                  setOtp(val);
                  if (error) setError("");
                }}
                onComplete={(val) => {
                  if (val === "00000") {
                    setError("");
                    onSuccess?.(phone);
                    onClose();
                  } else {
                    setError("کد وارد شده صحیح نمی‌باشد.");
                  }
                }}
                size="lg"
                className="w-full justify-between gap-2 sm:gap-3"
                inputClassName="flex-1 h-12 rounded-lg border-neutral-300 text-center font-bold text-lg text-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-between text-xs px-1 mb-2">
              {timer > 0 ? (
                <div className="flex items-center gap-1.5 text-neutral-500">
                  <span>{toPersianDigits(formatTimer(timer))} تا دریافت مجدد کد</span>
                  <Clock size={16} color="currentColor" variant="Linear" className="text-neutral-500" />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setTimer(119);
                    setError("");
                  }}
                  className="text-primary hover:underline cursor-pointer font-medium"
                >
                  ارسال مجدد کد
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setError("");
                }}
                className="text-primary hover:underline cursor-pointer font-medium"
              >
                ویرایش شماره
              </button>
            </div>

            {error && <p className="text-xs text-red-500 mb-2 font-medium">{error}</p>}

            <button
              type="button"
              disabled={otp.length !== 5}
              onClick={handleVerifyOtp}
              className={cn(
                "w-full h-11 rounded-lg text-sm font-medium transition-all mt-4",
                otp.length === 5
                  ? "bg-primary text-white hover:bg-primary-hover active:scale-[0.98] cursor-pointer shadow-xs"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              )}
            >
              ثبت کد
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
