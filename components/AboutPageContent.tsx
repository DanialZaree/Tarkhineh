import Image from "next/image";
import { User, Diagram, HomeWifi, MenuBoard } from "iconsax-react";

const FEATURES = [
  { id: "staff", title: "پرسنلی مجرب و حرفه‌ای", icon: User },
  { id: "quality", title: "کیفیت بالای غذاها", icon: Diagram },
  { id: "ambiance", title: "محیطی دلنشین و آرام", icon: HomeWifi },
  { id: "menu", title: "منوی متنوع", icon: MenuBoard },
];

const STORY_PARAGRAPHS = [
  "رستوران‌های زنجیره‌ای ترخینه در سال ۱۳۶۸ افتتاح گردیده‌اند و در طی این سال‌ها همواره با ارائه غذاهای باکیفیت و سرویس سریع و به موقع در تلاش برای جلب رضایت مشتریان خود بوده‌اند. در طی این سال‌ها اولویت جلب رضایت مشتریان بوده است.",
  "دراین خصوص ترخینه همیشه در تلاش بوده تا در طی این زمان‌ها کیفیت غذاهای خود را در بهترین حالت نگه داشته و حتی با نوسانات قیمت‌های مواد اولیه در بازار قیمت خود را ثابت نگه داشته است. ترخینه شعبات خودرا افتتاح کرده که بسیار شیک و مدرن می‌باشند و برای برگزاری جشن‌های کوچک و بزرگ شما مشتریان عزیز توانایی پذیرایی با کیفیت بالا را دارند. سالن پذیرایی شعبات در دو طبقه مجزا به همراه راه پله مدرن و آسانسور برای افراد کم‌توان و سالخورده آماده ارائه سرویس به شما عزیزان می‌باشند.",
  "چشم انداز: در آینده ای نزدیک تالار پذیرایی شعبات راه اندازی شده و آماده برگزاری جشن‌ها و مراسم‌های بزرگ شما خواهند بود . به امید آن روز که همه ایرانیان سالم و سلامت باشند.",
];

export default function AboutPageContent() {
  return (
    <div dir="rtl" className="w-full font-sans bg-white">
      <section className="relative w-full h-45 sm:h-60 md:h-75 lg:h-84 flex items-center justify-center overflow-hidden">
        <Image
          src="/about-us.png"
          alt="درباره ترخینه بیشتر بدانید!"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white text-center px-4 leading-relaxed drop-shadow-md">
          درباره ترخینه بیشتر بدانید!
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <div className="hidden lg:grid grid-cols-12 gap-10 xl:gap-14 items-center">
          <div className="col-span-7 text-right">
            <h2 className="text-2xl md:text-3xl font-bold text-tarkhineh-dark mb-5">
              درباره ما
            </h2>
            <div className="text-sm md:text-[15px] text-neutral-700 leading-loose text-justify space-y-4 font-normal">
              {STORY_PARAGRAPHS.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <div className="col-span-5">
            <div className="relative w-full h-90 xl:h-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-xs border border-neutral-200/70 group">
              <Image
                src="/about-restaurant.png"
                alt="فضای داخلی رستوران ترخینه"
                fill
                unoptimized
                sizes="(max-width: 1280px) 45vw, 500px"
                className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:hidden text-right">
          <h2 className="text-xl sm:text-2xl font-bold text-tarkhineh-dark mb-4">
            درباره ما
          </h2>
          <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed sm:leading-loose text-justify space-y-3.5 font-normal">
            <div>
              <div className="float-left ms-3.5 mb-2 w-36.25 sm:w-47.5 rounded-xl overflow-hidden shadow-2xs border border-neutral-200/70">
                <Image
                  src="/about-restaurant.png"
                  alt="فضای داخلی رستوران ترخینه"
                  width={385}
                  height={315}
                  className="w-full h-auto object-cover"
                />
              </div>
              <p>{STORY_PARAGRAPHS[0]}</p>
            </div>
            <p className="clear-left">{STORY_PARAGRAPHS[1]}</p>
            <p>{STORY_PARAGRAPHS[2]}</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f8f9fa] border-t border-neutral-200/60 py-8 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 md:divide-x md:divide-x-reverse md:divide-neutral-200 items-center gap-1.5 sm:gap-2 md:gap-0">
            {FEATURES.map(({ id, title, icon: Icon }) => (
              <div
                key={id}
                className="flex flex-col items-center justify-center text-center px-1 sm:px-4 py-1 sm:py-2 group cursor-default"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-1.5 md:mb-3 text-neutral-700 group-hover:text-primary transition-colors">
                  <Icon size={36} color="currentColor" variant="Linear" />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-medium text-neutral-700 group-hover:text-primary transition-colors leading-tight">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
