export interface BranchInfo {
  id: string;
  name: string;
  address: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  phone1: string;
  phone2?: string;
  hours: string;
  images: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  image: string;
  price: string;
  oldPrice?: string;
  discount?: number;
  rating: number;
  ratingCount: number;
}

export interface Review {
  id: string;
  name: string;
  date: string;
  avatar: string;
  rating: number;
  comment: (branchName: string) => string;
}

export const BRANCH_DATA: Record<string, BranchInfo> = {
  ekbatan: {
    id: "ekbatan",
    name: "شعبه اکباتان",
    address: "شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم",
    addressLine1: "شهرک اکباتان، فاز ۳، مجتمع",
    addressLine2: "تجاری کوروش، طبقه سوم",
    phone: "۰۲۱-۳۳۵۳۵۳۵۴-۵۶",
    phone1: "۰۲۱-۳۳۵۳۵۳۵۴",
    phone2: "۰۲۱-۳۳۵۳۵۳۵۶",
    hours: "همه‌روزه از ساعت ۱۲ الی ۲۳",
    images: ["/branch-ekbatan.jpg", "/about-bg.jpg", "/slide-3.jpg"],
  },
  chalous: {
    id: "chalous",
    name: "شعبه چالوس",
    address: "چالوس، خیابان ۱۷ شهریور، بعد کوچه کوروش، جنب داروخانه دکتر میلانی",
    addressLine1: "چالوس، خیابان ۱۷ شهریور، بعد کوچه کوروش",
    addressLine2: "جنب داروخانه دکتر میلانی",
    phone: "۰۱۱-۳۳۵۳۵۳۵۲-۵۳",
    phone1: "۰۱۱-۳۳۵۳۵۳۵۲",
    phone2: "۰۱۱-۳۳۵۳۵۳۵۳",
    hours: "همه‌روزه از ساعت ۱۲ الی ۲۳",
    images: ["/branch-chalous.jpg", "/about-bg.jpg", "/slide-2.jpg"],
  },
  aqdasiyeh: {
    id: "aqdasiyeh",
    name: "شعبه اقدسیه",
    address: "خیابان اقدسیه ، نرسیده به میدان خیام، پلاک ۸",
    addressLine1: "خیابان اقدسیه ، نرسیده به میدان خیام",
    addressLine2: "پلاک ۸",
    phone: "۰۲۱-۳۳۵۳۵۳۵۴-۵۵",
    phone1: "۰۲۱-۳۳۵۳۵۳۵۴",
    phone2: "۰۲۱-۳۳۵۳۵۳۵۵",
    hours: "همه‌روزه از ساعت ۱۲ الی ۲۳",
    images: ["/branch-aqdasiyeh.jpg", "/about-bg.jpg", "/slide-1.jpg"],
  },
  vanak: {
    id: "vanak",
    name: "شعبه ونک",
    address: "میدان ونک، خیابان فردوسی، نبش کوچه نیلوفر، پلاک ۲۶",
    addressLine1: "میدان ونک، خیابان فردوسی",
    addressLine2: "نبش کوچه نیلوفر، پلاک ۲۶",
    phone: "۰۲۱-۳۳۵۳۵۳۵۶-۵۷",
    phone1: "۰۲۱-۳۳۵۳۵۳۵۶",
    phone2: "۰۲۱-۳۳۵۳۵۳۵۷",
    hours: "همه‌روزه از ساعت ۱۲ الی ۲۳",
    images: ["/branch-vanak.jpg", "/about-bg.jpg", "/slide-3.jpg"],
  },
};

export function getBranch(slug?: string): BranchInfo {
  if (!slug) return BRANCH_DATA.ekbatan;
  const key = slug.toLowerCase();
  if (key === "chaloos") return BRANCH_DATA.chalous;
  if (key === "aghdasieh") return BRANCH_DATA.aqdasiyeh;
  return BRANCH_DATA[key] || BRANCH_DATA.ekbatan;
}

export const SPECIAL_OFFERS: MenuItem[] = [
  {
    id: "dolme-barg",
    name: "دلمه برگ کلم",
    image: "/food/dolme-barg.png",
    price: "۲۰۹,۰۰۰",
    oldPrice: "۲۴۰,۰۰۰",
    discount: 8,
    rating: 5,
    ratingCount: 52,
  },
  {
    id: "bademjan",
    name: "بادمجان شکم‌پر",
    image: "/food/bademjan.png",
    price: "۱۳۶,۰۰۰",
    oldPrice: "۱۵۰,۰۰۰",
    discount: 18,
    rating: 4,
    ratingCount: 32,
  },
  {
    id: "kalzoneh",
    name: "کالزونه اسفناج",
    image: "/food/kalzoneh.png",
    price: "۱۷۷,۰۰۰",
    oldPrice: "۱۹۰,۰۰۰",
    discount: 17,
    rating: 5,
    ratingCount: 62,
  },
  {
    id: "mushroom-pizza",
    name: "پیتزا قارچ",
    image: "/food/mushroom-pizza.png",
    price: "۱۷۵,۰۰۰",
    oldPrice: "۲۱۵,۰۰۰",
    discount: 25,
    rating: 3,
    ratingCount: 33,
  },
  {
    id: "borani",
    name: "بورانی بادمجان",
    image: "/food/borani.png",
    price: "۱۴۸,۰۰۰",
    oldPrice: "۱۷۰,۰۰۰",
    discount: 12,
    rating: 5,
    ratingCount: 50,
  },
  {
    id: "lazania",
    name: "لازانیا",
    image: "/food/lazania.png",
    price: "۱۵۰,۰۰۰",
    oldPrice: "۱۸۰,۰۰۰",
    discount: 15,
    rating: 4,
    ratingCount: 45,
  },
];

export const POPULAR_FOODS: MenuItem[] = [
  {
    id: "panini",
    name: "پنینی اسفناج",
    image: "/food/panini.png",
    price: "۱۹۰,۰۰۰",
    oldPrice: "۲۱۰,۰۰۰",
    discount: 10,
    rating: 3,
    ratingCount: 41,
  },
  {
    id: "pepperoni-pizza",
    name: "پیتزا پپرونی",
    image: "/food/pepperoni-pizza.png",
    price: "۱۰۰,۰۰۰",
    rating: 4,
    ratingCount: 48,
  },
  {
    id: "ratatui",
    name: "راتاتویی",
    image: "/food/ratatui.png",
    price: "۹۵,۰۰۰",
    oldPrice: "۱۸۰,۰۰۰",
    discount: 45,
    rating: 4,
    ratingCount: 60,
  },
  {
    id: "borani-pop",
    name: "بورانی بادمجان",
    image: "/food/borani.png",
    price: "۱۴۸,۰۰۰",
    oldPrice: "۱۷۰,۰۰۰",
    discount: 12,
    rating: 5,
    ratingCount: 62,
  },
  {
    id: "dolme-barg-pop",
    name: "دلمه برگ کلم",
    image: "/food/dolme-barg.png",
    price: "۲۰۹,۰۰۰",
    oldPrice: "۲۴۰,۰۰۰",
    discount: 8,
    rating: 5,
    ratingCount: 52,
  },
  {
    id: "bademjan-pop",
    name: "بادمجان شکم‌پر",
    image: "/food/bademjan.png",
    price: "۱۳۶,۰۰۰",
    oldPrice: "۱۵۰,۰۰۰",
    discount: 18,
    rating: 4,
    ratingCount: 32,
  },
];

export const INTERNATIONAL_FOODS: MenuItem[] = [
  {
    id: "sushi",
    name: "سوشی",
    image: "/food/sushi.png",
    price: "۸۵,۰۰۰",
    oldPrice: "۱۰۰,۰۰۰",
    discount: 15,
    rating: 4,
    ratingCount: 52,
  },
  {
    id: "ratatui-intl",
    name: "راتاتویی",
    image: "/food/ratatui.png",
    price: "۹۵,۰۰۰",
    oldPrice: "۱۸۰,۰۰۰",
    discount: 45,
    rating: 4,
    ratingCount: 29,
  },
  {
    id: "pakora",
    name: "پاکورا سبزیجات",
    image: "/food/pakora.png",
    price: "۱۱۰,۰۰۰",
    oldPrice: "۱۳۰,۰۰۰",
    discount: 15,
    rating: 4,
    ratingCount: 39,
  },
  {
    id: "lazania-intl",
    name: "لازانیا",
    image: "/food/lazania.png",
    price: "۱۵۰,۰۰۰",
    oldPrice: "۱۶۰,۰۰۰",
    discount: 6,
    rating: 5,
    ratingCount: 38,
  },
  {
    id: "kalzoneh-intl",
    name: "کالزونه اسفناج",
    image: "/food/kalzoneh.png",
    price: "۱۷۷,۰۰۰",
    oldPrice: "۱۹۰,۰۰۰",
    discount: 17,
    rating: 5,
    ratingCount: 62,
  },
  {
    id: "mushroom-pizza-intl",
    name: "پیتزا قارچ",
    image: "/food/mushroom-pizza.png",
    price: "۱۷۵,۰۰۰",
    oldPrice: "۲۱۵,۰۰۰",
    discount: 25,
    rating: 3,
    ratingCount: 33,
  },
];

export const REVIEWS: Review[] = [
  {
    id: "1",
    name: "آرزو محمدعلیزاده",
    date: "۲۳ اسفند ۱۴۰۱",
    avatar: "/avatar/girl.png",
    rating: 4,
    comment: (branchName) =>
      `از با صفا بودن ${branchName} هر چی بگم کم گفتم. بهترین غذاهای گیاهی عمرمو اینجا خوردم. از مدیریت ${branchName} رستوران‌های ترخینه واقعا تشکر میکنم.`,
  },
  {
    id: "2",
    name: "سردار وظیفه",
    date: "۲۳ اسفند ۱۴۰۱",
    avatar: "/avatar/boy.png",
    rating: 4,
    comment: (branchName) =>
      `از با صفا بودن ${branchName} هر چی بگم کم گفتم. بهترین غذاهای گیاهی عمرمو اینجا خوردم. از مدیریت ${branchName} رستوران‌های ترخینه واقعا تشکر میکنم.`,
  },
  {
    id: "3",
    name: "سردار وحدتی",
    date: "۲۳ اسفند ۱۴۰۱",
    avatar: "/avatar/boy.png",
    rating: 4,
    comment: (branchName) =>
      `از با صفا بودن ${branchName} هر چی بگم کم گفتم. برخورد پرسنل عالی و کیفیت غذاها واقعا بی‌نظیر بود. فضای دلنشینی داره و حتما پیشنهادش میکنم.`,
  },
  {
    id: "4",
    name: "مریم رضایی",
    date: "۲۲ اسفند ۱۴۰۱",
    avatar: "/avatar/girl.png",
    rating: 5,
    comment: (_branchName) =>
      `محیط بسیار دلنشین و تمیز، سرویس‌دهی عالی و پرسنل بااخلاق. کیفیت غذاها واقعا عالی بود.`,
  },
    {
    id: "5",
    name: "مریم رضایی",
    date: "۲۲ اسفند ۱۴۰۱",
    avatar: "/avatar/girl.png",
    rating: 5,
    comment: (_branchName) =>
      `محیط بسیار دلنشین و تمیز، سرویس‌دهی عالی و پرسنل بااخلاق. کیفیت غذاها واقعا عالی بود.`,
  },
    {
    id: "6",
    name: "مریم رضایی",
    date: "۲۲ اسفند ۱۴۰۱",
    avatar: "/avatar/girl.png",
    rating: 5,
    comment: (_branchName) =>
      `محیط بسیار دلنشین و تمیز، سرویس‌دهی عالی و پرسنل بااخلاق. کیفیت غذاها واقعا عالی بود.`,
  },
];
