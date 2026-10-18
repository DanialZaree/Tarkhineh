import Image from "next/image";
import Link from "next/link";
import { User, HomeWifi, Diagram, MenuBoard, ArrowLeft2 } from "iconsax-react";

const FEATURES = [
  {
    id: "staff",
    title: "پرسنلی مجرب و حرفه‌ای",
    icon: User,
  },
  {
    id: "quality",
    title: "کیفیت بالای غذاها",
    icon: Diagram,
  },
  {
    id: "ambiance",
    title: "محیطی دلنشین و آرام",
    icon: HomeWifi,
  },
  {
    id: "menu",
    title: "منوی متنوع",
    icon: MenuBoard,
  },
];

export default function AboutSection() {
  return (
    <section dir="rtl" className="relative w-full overflow-hidden bg-neutral-900 text-white font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/about-bg.jpg"
          alt="رستوران‌های زنجیره‌ای ترخینه"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/75 md:bg-black/70" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
              رستوران‌های زنجیره‌ای ترخینه
            </h2>
            <p className="text-divider text-xs sm:text-sm md:text-base leading-relaxed text-justify mb-6 sm:mb-8 font-light">
              مهمان‌نوازی یکی از مهم‌ترین مشخصه‌های ایرانیان است و باعث افتخار ماست که بیش از ۲۰ سال است خدمت‌گزار مردم شریف ایران هستیم. ما در رستوران‌های زنجیره‌ای ترخینه همواره تلاش کردیم که در محیطی اصیل بر پایه معماری و طراحی مدرن در کنار طبیعتی دلنواز، غذایی سالم و درخور شان شما عزیزان ارائه دهیم.
            </p>
            <div className="flex justify-end">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-md border border-white text-white text-xs sm:text-sm font-medium hover:bg-white hover:text-tarkhineh-dark active:scale-95 transition-all duration-200"
              >
                <span>اطلاعات بیشتر</span>
                <ArrowLeft2 size={16} color="currentColor" variant="Linear" className="transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-8 sm:gap-y-10 pt-4 lg:pt-0">
            {FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex flex-col items-center justify-center text-center group cursor-default">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-2.5 sm:mb-3 text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon size={38} color="currentColor" variant="Linear" />
                  </div>
                  <span className="text-xs sm:text-sm text-white font-medium whitespace-nowrap">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
