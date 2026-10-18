"use client";

import { useState } from "react";
import Image from "next/image";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "features",
    title: (
      <>
        <span className="hidden md:inline">ترخینه چه امکانات متفاوتی داره؟</span>
        <span className="inline md:hidden">امکانات ترخینه</span>
      </>
    ),
    content: (
      <p>
        وبسایت سفارش غذای رستوران‌های زنجیره‌ای ترخینه با اتصال مستقیم به نرم افزار اتوماسیون شعبات رستوران، امکان اشتباهات هنگام ثبت سفارش آنلاین غذا و همچنین زمان مورد نیاز برای آماده سازی و تحویل آن را به حداقل ممکن می رسونه.
      </p>
    ),
  },
  {
    id: "account",
    title: (
      <>
        <span className="hidden md:inline">چطور می تونم در ترخینه حساب کاربری ایجاد کنم؟</span>
        <span className="inline md:hidden">حساب کاربری در ترخینه</span>
      </>
    ),
    content: (
      <p>
        خیلی ساده، پس از انتخاب غذای مورد علاقه تان از منوی رستوران، هنگام ثبت سفارش با وارد کردن شماره تلفن همراه یک پیامک حاوی کد تایید برای شما ارسال و با وارد کردن کد تایید، ثبت نام شما تکمیل می شه. یا می تونید در صفحه اصلی سایت روی گزینه ورود کلیک کنید.
      </p>
    ),
  },
  {
    id: "history",
    title: (
      <>
        <span className="hidden md:inline">سابقه و لیست خریدهای قبلی ام رو کجا ببینم؟</span>
        <span className="inline md:hidden">سابقه خرید</span>
      </>
    ),
    content: (
      <p>
        با ورود به حساب کاربری و کلیک روی گزینه سفارشات قبلی سابقه تمام خریدهای شما نمایش داده می شه.
      </p>
    ),
  },
  {
    id: "payment",
    title: (
      <>
        <span className="hidden md:inline">چه راه هایی برای پرداخت دارم؟</span>
        <span className="inline md:hidden">راه‌های پرداخت</span>
      </>
    ),
    content: (
      <p>
        هنگام ثبت سفارش غذا می تونید روش پرداخت دلخواه خودتون رو انتخاب کنید. آنلاین و یا نقدی در هنگام تحویل سفارش بصورت حضوری.
      </p>
    ),
  },
  {
    id: "pricing",
    title: (
      <>
        <span className="hidden md:inline">آیا قیمت در منوی وبسایت ترخینه با قیمت منوی شعبات یکسان است؟</span>
        <span className="inline md:hidden">تفاوت قیمت در منو شعبات و منو وبسایت</span>
      </>
    ),
    content: (
      <p>
        بله . قیمت منوی وبسایت ترخینه دقیقاً مطابق با قیمت منوی شعب رستوران است و در صورت تغییر قیمت از طرف رستوران این تغییر در وبسایت ترخینه بلافاصله قابل مشاهده است.
      </p>
    ),
  },
  {
    id: "discount",
    title: (
      <>
        <span className="hidden md:inline">چطور می تونم از اعتبار هدیه و تخفیف استفاده کنم؟</span>
        <span className="inline md:hidden">هدیه و تخفیف</span>
      </>
    ),
    content: (
      <p>
        برای استفاده از کد تخفیف میتونید به سادگی کد رو در سبد خرید، در قسمت مشخص شده وارد کنید. اعتبار هدیه هنگام انتخاب روش پرداخت برای شما نمایش داده میشه و در صورت تمایل میتونید ازش استفاده کنید.
      </p>
    ),
  },
];

const RULES_ITEMS: AccordionItem[] = [
  {
    id: "min-order",
    title: "حداقل سفارش",
    content: (
      <p>
        حداقل سفارشات در رستوران‌های ترخینه، مبلغ ۵۰,۰۰۰ تومان است. برای ثبت، پردازش و ارسال سفارشات، باید حداقل، این مبلغ سفارش داده شود در غیر اینصورت سفارشات، ثبت نخواهد شد.
      </p>
    ),
  },
  {
    id: "delivery-distance",
    title: "فاصله تحویل",
    content: (
      <p>
        ترخینه در ارسال سفارشات به نقاط دور محدودیت دارد و حداکثر فاصله از رستوران‌های زنجیره‌ای ترخینه برای ارسال کالا، ۶ کیلومتر است. لطفا قبل از ثبت سفارش، نزدیک‌ترین شعبه به محل ارسال را انتخاب کنید و از رعایت کردن حداکثر فاصله برای ارسال سفارشات اطمینان حاصل فرمایید.
      </p>
    ),
  },
  {
    id: "delivery-time",
    title: "زمان تحویل",
    content: (
      <p>
        جدول زمانی تخمینی تحویل در زمان ثبت سفارش به اطلاع شما خواهد رسید. این ممکن است تحت تأثیر عوامل زیادی مانند ترافیک، آب و هوا، دوره‌های شلوغ رستوران و غیره باشد، بنابراین در صورت تأخیر لطفا صبور باشید.
      </p>
    ),
  },
  {
    id: "payment-options",
    title: "گزینه‌های پرداخت",
    content: (
      <p>
        ما گزینه‌های پرداخت مختلفی را می‌پذیریم، از جمله پرداخت اینترنتی، کارت‌های اعتباری یا پول نقد. لطفا قبل از تکمیل سفارش، روش پرداختی را که ترجیح می‌دهید، تأیید کنید.
      </p>
    ),
  },
  {
    id: "order-accuracy",
    title: "دقت سفارش",
    content: (
      <p>
        لطفا قبل از ارسال، از دقیق بودن تمام جزئیات سفارش خود، از جمله موارد منو، دستورالعمل‌های خاص و جزئیات سفارش خود اطمینان حاصل کنید تا اختلالی در فرایند پردازش و تحویل سفارشات شما ایجاد نشود و سفارشات شما در سریع‌ترین زمان ممکن به دست‌تان برسد.
      </p>
    ),
  },
  {
    id: "order-cancellation",
    title: "شرایط لغو سفارش",
    content: (
      <p>
        شما می‌توانید با تماس مستقیم با هر شعبه از رستوران‌های زنجیره‌ای ترخینه، سفارش خود را لغو کنید. لطفا توجه داشته باشید که ممکن است محدودیت زمانی برای لغو وجود داشته باشد، زیرا ممکن است غذا از قبل آماده شده باشد و در اینصورت متاسفانه امکان لغو سفارش وجود ندارد.
      </p>
    ),
  },
  {
    id: "order-return",
    title: "شرایط بازگشت سفارش",
    content: (
      <p>
        اگر سفارش شما انتظارات شما را برآورده نمی‌کند، لطفا بلافاصله از طریق تماس تلفنی با ما تماس بگیرید؛ ما در اسرع وقت به دنبال حل مشکل شما خواهیم بود.
      </p>
    ),
  },
  {
    id: "discounts",
    title: "تخفیفات",
    content: (
      <p>
        هرگونه تخفیف یا برنامه‌های وفاداری ممکن است قوانین و شرایط خاصی داشته باشد که به وضوح در وب سایت مشخص می‌شود.
      </p>
    ),
  },
];

const PRIVACY_ITEMS: AccordionItem[] = [
  {
    id: "privacy-intro",
    title: "حریم خصوصی",
    content: (
      <div className="space-y-3">
        <p>
          ترخینه متعهد می‌شود حریم خصوصی شما را حفظ کند و به آن احترام بگذارد. بخش «حریم خصوصی» روش‌های استفاده از اطلاعات شخصی کاربران در این وب سایت را شرح می‌دهد. اگر برای سفارش غذای خوب از خدمات ما استفاده می‌کنید، سیاست‌های حفظ حریم خصوصی وب‌سایت ترخینه، در مورد شما صدق می‌کند.
        </p>
        <p>
          پردازش و ارسال سفارش‌ها نیازمند اطلاعات دقیق کاربران است؛ برای این‌که بتوانیم خدمات مطلوب‌تری به شما ارائه دهیم، ممکن است به هنگام خرید، ثبت نظر و استفاده از برخی امکانات سایت، به اطلاعات شما نیاز داشته باشیم.
        </p>
      </div>
    ),
  },
  {
    id: "data-collected",
    title: "چه اطلاعاتی را گردآوری می‌کنیم؟",
    content: (
      <div className="space-y-2">
        <p>اطلاعاتی که درباره‌ی شما گردآوری و نگه‌داری می‌کنیم، ممکن است شامل موارد زیر باشد:</p>
        <ul className="list-disc list-inside space-y-1 pr-2 text-neutral-600">
          <li>نام و نام خانوادگی شما</li>
          <li>شماره تلفن همراه</li>
          <li>تاریخ تولد</li>
          <li>نشانی‌های مورد نظر برای تحویل سفارش‌ها</li>
        </ul>
      </div>
    ),
  },
  {
    id: "how-we-collect",
    title: "چگونه اطلاعات شما را گردآوری می‌کنیم؟",
    content: (
      <div className="space-y-2 leading-relaxed">
        <p>از شما تقاضا خواهیم کرد اطلاعات خود را در اختیار ما قرار دهید؛ هنگامی‌که به‌شکل کاربر مهمان غذا سفارش می‌دهید.</p>
        <p>در وب‌سایت ترخینه یک حساب کاربری ایجاد می‌کنید.</p>
        <p>در قسمت اعطای نمایندگی، فرم پر می‌کنید.</p>
      </div>
    ),
  },
  {
    id: "why-phone-number",
    title: "چرا به شماره تلفن شما نیاز داریم؟",
    content: (
      <p>
        شماره تلفن همراه شما برای تأیید هویت هنگام ثبت سفارش، ارسال کد یک‌بار مصرف، و اطلاع‌رسانی وضعیت ارسال غذا ضروری است.
      </p>
    ),
  },
  {
    id: "cookies-storage",
    title: "استفاده از کوکی‌ها و دستگاه‌های ذخیره‌سازی دیگر",
    content: (
      <p>
        کوکی‌ها فایل‌های اطلاعاتی هستند که روی کامپیوتر شما ذخیره می‌شوند تا به وب‌سایت‌ها کمک کنند شما را به خاطر بیاورند. ما از کوکی‌ها برای بهبود تجربه کاربری و نگهداری آخرین وضعیت سفارش شما استفاده می‌کنیم.
      </p>
    ),
  },
  {
    id: "more-information",
    title: "اطلاعات بیشتر",
    content: (
      <p>
        در مجموعه‌ی ترخینه، حفظ امنیت اطلاعات شخصی شما را امری بسیار جدی و مهم می‌دانیم و در وب‌سایت خود از سیاست‌های امنیتی و فناوری‌هایی استفاده می‌کنیم که برای محافظت از اطلاعات شخصی طراحی شده‌اند.
      </p>
    ),
  },
];

export type TabType = "faq" | "rules" | "privacy";

const TAB_CONFIG: Record<
  TabType,
  {
    label: string;
    href: string;
    title: string;
    heroImage: string;
    items: AccordionItem[];
  }
> = {
  faq: {
    label: "سوالات متداول",
    href: "/faq",
    title: "سوالات متداول از ترخینه",
    heroImage: "/q&a.png",
    items: FAQ_ITEMS,
  },
  rules: {
    label: "قوانین ترخینه",
    href: "/rules",
    title: "قوانین ترخینه",
    heroImage: "/rules-hero.jpg",
    items: RULES_ITEMS,
  },
  privacy: {
    label: "حریم خصوصی",
    href: "/privacy",
    title: "حریم شخصی کاربران",
    heroImage: "/privacy-hero.jpg",
    items: PRIVACY_ITEMS,
  },
};

const TABS: TabType[] = ["faq", "rules", "privacy"];

export default function FaqPageContent({
  initialTab = "faq",
}: {
  initialTab?: TabType;
}) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const current = TAB_CONFIG[activeTab];

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.history.pushState(null, "", TAB_CONFIG[tab].href);
  };

  return (
    <div dir="rtl" className="w-full font-sans bg-white pb-16 sm:pb-24">
      <section className="relative w-full h-45 sm:h-60 md:h-72.5 lg:h-84 flex items-center justify-center overflow-hidden">
        <Image
          src={current.heroImage}
          alt={current.title}
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center ${
            activeTab === "faq"
              ? "grayscale contrast-125 brightness-[0.32]"
              : "brightness-[0.45] contrast-110"
          }`}
        />
        <div className="absolute inset-0 bg-black/40" />

        <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white text-center px-4 leading-relaxed drop-shadow-md">
          {current.title}
        </h1>
      </section>

      <section className="w-full bg-[#f4f5f7] border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start gap-5 sm:gap-8 overflow-x-auto no-scrollbar">
            {TABS.map((tabKey) => {
              const tab = TAB_CONFIG[tabKey];
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => handleTabChange(tabKey)}
                  className={`relative py-3.5 sm:py-4 px-1 text-xs sm:text-sm md:text-base font-medium transition-colors cursor-pointer whitespace-nowrap outline-none ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <Accordion
          key={activeTab}
          items={current.items}
          multiple
          defaultOpen={[]}
          className="border-neutral-300 shadow-2xs"
        />
      </section>
    </div>
  );
}
