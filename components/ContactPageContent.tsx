import Image from "next/image";
import Link from "next/link";
import { Gallery } from "iconsax-react";

const AZADI_TOWER_MAP_URL = "https://maps.google.com/?q=35.699722,51.338056";

const CONTACT_BRANCHES = [
  {
    id: "ekbatan",
    name: "شعبه اکباتان",
    address: "شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم",
    phone: "۰۲۱-۵۴۸۹۱۲۵۰-۵۱",
    hours: "ساعت کاری: همه‌روزه از ساعت ۱۲ تا ۲۳ بجز روزهای تعطیل",
    image: "/branch-ekbatan.jpg",
    mapUrl: AZADI_TOWER_MAP_URL,
  },
  {
    id: "chalous",
    name: "شعبه چالوس",
    address: "چالوس، خیابان ۱۷ شهریور، بعد کوچه کوروش، جنب داروخانه دکتر میلانی",
    phone: "۰۲۱-۵۴۸۹۱۲۵۲-۵۳",
    hours: "ساعت کاری: همه‌روزه از ساعت ۱۲ تا ۲۳ بجز روزهای تعطیل",
    image: "/branch-chalous.jpg",
    mapUrl: AZADI_TOWER_MAP_URL,
  },
  {
    id: "aqdasiyeh",
    name: "شعبه اقدسیه",
    address: "خیابان اقدسیه، نرسیده به میدان خیام، پلاک ۸",
    phone: "۰۲۱-۵۴۸۹۱۲۵۴-۵۵",
    hours: "ساعت کاری: همه‌روزه از ساعت ۱۲ تا ۲۳ بجز روزهای تعطیل",
    image: "/branch-aqdasiyeh.jpg",
    mapUrl: AZADI_TOWER_MAP_URL,
  },
  {
    id: "vanak",
    name: "شعبه ونک",
    address: "میدان ونک، خیابان فردوسی، نبش کوچه نیلوفر، پلاک ۲۶",
    phone: "۰۲۱-۵۴۸۹۱۲۵۶-۵۷",
    hours: "ساعت کاری: همه‌روزه از ساعت ۱۲ تا ۲۳ بجز روزهای تعطیل",
    image: "/branch-vanak.jpg",
    mapUrl: AZADI_TOWER_MAP_URL,
  },
];

export default function ContactPageContent() {
  return (
    <div dir="rtl" className="w-full font-sans bg-white pb-16 sm:pb-24">
      <section className="relative w-full h-45 sm:h-60 md:h-75 lg:h-84 flex items-center justify-center overflow-hidden">
        <Image
          src="/contact-us.png"
          alt="با ترخینه در تماس باشید"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 space-y-6 sm:space-y-8">
        {CONTACT_BRANCHES.map((branch) => (
          <div
            key={branch.id}
            className="group border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-2xs hover:shadow-lg hover:border-primary/40 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 items-stretch"
          >
            <Link
              href={`/branch/${branch.id}`}
              className="md:col-span-6 relative min-h-55 sm:min-h-65 md:min-h-70 overflow-hidden block"
            >
              <Image
                src={branch.image}
                alt={branch.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none transform-gpu">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-md transform-gpu backface-hidden transition-transform duration-300 ease-out group-hover:scale-100 scale-95">
                  <Gallery size={30} color="currentColor" variant="Linear" />
                </div>
              </div>
            </Link>

            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-tarkhineh-dark mb-3.5 group-hover:text-primary transition-colors">
                {branch.name}
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md">
                <p>آدرس: {branch.address}</p>
                <p>
                  شماره تماس: <span dir="ltr" className="inline-block">{branch.phone}</span>
                </p>
                <p>{branch.hours}</p>
              </div>

              <div className="flex items-center gap-3 mt-5 sm:mt-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <Link
                  href={`/branch/${branch.id}`}
                  className="px-5 sm:px-6 py-2 rounded-md border border-neutral-300 text-neutral-700 hover:border-primary hover:text-primary active:scale-95 text-xs sm:text-sm font-medium transition-all"
                >
                  صفحه شعبه
                </Link>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-6 py-2 rounded-md bg-primary hover:bg-primary-hover active:scale-95 text-white text-xs sm:text-sm font-medium transition-all shadow-xs"
                >
                  دیدن در نقشه
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
