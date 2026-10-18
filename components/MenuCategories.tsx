import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    id: "main",
    title: "غذای اصلی",
    href: "/menu#main",
    image: "/menu-main.png",
    alt: "غذای اصلی ترخینه",
    isDrink: false,
  },
  {
    id: "appetizer",
    title: "پیش‌غذا",
    href: "/menu#appetizer",
    image: "/menu-appetizer.png",
    alt: "پیش‌غذای ترخینه",
    isDrink: false,
  },
  {
    id: "dessert",
    title: "دسر",
    href: "/menu#dessert",
    image: "/menu-dessert.png",
    alt: "دسر ترخینه",
    isDrink: false,
  },
  {
    id: "drink",
    title: "نوشیدنی",
    href: "/menu#drink",
    image: "/menu-drink.png",
    alt: "نوشیدنی ترخینه",
    isDrink: true,
  },
];

export default function MenuCategories() {
  return (
    <section dir="rtl" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-14 md:py-16 font-sans pb-8">
      <h2 className="text-center font-bold text-xl sm:text-2xl text-tarkhineh-dark mb-20 sm:mb-24 md:mb-28">
        منوی رستوران
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-20 sm:gap-y-28 lg:gap-y-20">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group relative bg-primary rounded-xl sm:rounded-2xl h-28 sm:h-36 md:h-40 flex flex-col items-center justify-end shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div
              className={`absolute left-1/2 -translate-x-1/2 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1.5 ${
                cat.isDrink
                  ? "-top-14 sm:-top-18 md:-top-20 w-20 h-36 sm:w-24 sm:h-44 md:w-28 md:h-48 drop-shadow-[0_10px_14px_rgba(0,0,0,0.3)]"
                  : "-top-12 sm:-top-16 md:-top-18 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 drop-shadow-[0_12px_16px_rgba(0,0,0,0.35)]"
              }`}
            >
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                sizes="(max-width: 640px) 45vw, 220px"
                className="object-contain"
                priority
              />
            </div>

            <span className="absolute -bottom-3.5 sm:-bottom-4 left-1/2 -translate-x-1/2 bg-surface text-tarkhineh-dark group-hover:text-primary font-medium text-xs sm:text-sm px-4 sm:px-6 py-1.5 sm:py-2 rounded shadow-md group-hover:shadow-lg transition-all duration-200 whitespace-nowrap active:scale-95">
              {cat.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
