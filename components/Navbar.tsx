"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HambergerMenu,
  SearchNormal1,
  ShoppingCart,
  User,
  ArrowDown2,
  Home2,
  MenuBoard,
  HomeHashtag,
  Profile2User,
  Call,
  CloseCircle,
  Bank,
  Logout,
} from "iconsax-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toPersianDigits } from "@/lib/utils";
import { useCart, useAuth, useProfile } from "@/lib/siteStorage";
import LogoutModal from "@/components/LogoutModal";
import { AuthModal } from "@/components/AuthModal";

const BRANCHES = [
  { id: "ekbatan", name: "شعبه اکباتان", href: "/branch/ekbatan" },
  { id: "chalous", name: "شعبه چالوس", href: "/branch/chalous" },
  { id: "aqdasiyeh", name: "شعبه اقدسیه", href: "/branch/aqdasiyeh" },
  { id: "vanak", name: "شعبه ونک", href: "/branch/vanak" },
];

const MENU_CATEGORIES = [
  { id: "main", name: "غذای اصلی", href: "/menu#main" },
  { id: "appetizer", name: "پیش‌غذا", href: "/menu#appetizer" },
  { id: "dessert", name: "دسر", href: "/menu#dessert" },
  { id: "drink", name: "نوشیدنی", href: "/menu#drink" },
];

const STATIC_LINKS = [
  { name: "اعطای نمایندگی", href: "/representation" },
  { name: "درباره ما", href: "/about" },
  { name: "تماس با ما", href: "/contact" },
];

function NavDropdown({
  title,
  items,
  isActive = false,
}: {
  title: string;
  items: { id: string; name: string; href: string }[];
  isActive?: boolean;
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        openOnHover
        delay={0}
        closeDelay={200}
        className={`relative flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer outline-none ${
          isActive
            ? "text-primary font-bold"
            : "text-tarkhineh-muted hover:text-primary data-popup-open:text-primary"
        }`}
      >
        <span>{title}</span>
        <ArrowDown2
          size={15}
          color="currentColor"
          variant="Linear"
          className="transition-transform duration-200"
        />
        {isActive && (
          <span className="absolute -bottom-1.5 right-0 left-0 h-0.5 bg-primary rounded-full" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={8}
        className="min-w-44 bg-surface p-1.5 rounded-xl shadow-lg border border-divider text-right font-sans"
      >
        {items.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="cursor-pointer text-tarkhineh-dark hover:text-primary hover:bg-primary-tint/60 px-3 py-2 rounded-lg font-medium text-sm transition-colors text-right justify-start outline-none"
          >
            <Link href={item.href} className="w-full text-right">
              {item.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ActionBtn({
  children,
  onClick,
  href,
  className = "w-10 h-10",
  title,
  badge,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  title?: string;
  badge?: number | string;
}) {
  const base = `${className} relative rounded-lg bg-primary-tint text-primary hover:bg-primary-tint-hover active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-xs`;
  const content = (
    <>
      {children}
      {badge !== undefined && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white pointer-events-none">
          {toPersianDigits(badge)}
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={base} title={title}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={base} title={title}>
      {content}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAccordion, setOpenAccordion] = useState<"menu" | "branches" | null>(null);

  const { totalCount: cartCount } = useCart();
  const { auth, login, logout } = useAuth();
  const { profile } = useProfile();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const profileName = profile.displayName || (profile.firstName ? `${profile.firstName} ${profile.lastName}` : "کاربر ترخینه");

  const toggleAccordion = (type: "menu" | "branches") => {
    setOpenAccordion(openAccordion === type ? null : type);
  };

  const isHomeActive = pathname === "/";
  const isBranchActive = pathname.startsWith("/branch");
  const currentBranch = BRANCHES.find((b) => pathname === b.href || pathname.startsWith(b.href));
  const branchTitle = currentBranch ? currentBranch.name : "شعبه";

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full bg-surface border-b border-divider shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* navbar-desktop */}
        <div className="hidden md:flex items-center justify-between h-20">
          <Link
            href="/"
            className="shrink-0 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Image
              src="/Logo.svg"
              alt="ترخینه"
              width={155}
              height={51}
              className="h-10 sm:h-11 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="flex items-center gap-6 lg:gap-8 text-[15px] font-medium text-tarkhineh-muted">
            <Link
              href="/"
              className={`relative py-1.5 transition-colors ${
                isHomeActive
                  ? "text-primary font-bold"
                  : "text-tarkhineh-muted hover:text-primary"
              }`}
            >
              <span>صفحه اصلی</span>
              {isHomeActive && (
                <span className="absolute -bottom-1.5 right-0 left-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
            <NavDropdown title={branchTitle} items={BRANCHES} isActive={isBranchActive} />
            <NavDropdown title="منو" items={MENU_CATEGORIES} />
            {STATIC_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1.5 transition-colors ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-tarkhineh-muted hover:text-primary"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-1.5 right-0 left-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="relative">
              <ActionBtn onClick={() => setSearchOpen(!searchOpen)} title="جستجو">
                <SearchNormal1 size={20} color="currentColor" variant="Linear" />
              </ActionBtn>
              {searchOpen && (
                <div className="absolute top-12 left-0 w-72 bg-surface rounded-xl shadow-xl border border-divider p-3 z-50 animate-in fade-in zoom-in-95 font-sans">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="جستجوی غذا یا شعبه..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full text-sm py-2 pr-9 pl-3 rounded-lg bg-container border border-divider focus:border-primary focus:outline-none text-tarkhineh-dark placeholder:text-tarkhineh-subtle"
                    />
                    <SearchNormal1
                      size={16}
                      color="currentColor"
                      variant="Linear"
                      className="absolute right-3 pointer-events-none text-tarkhineh-muted"
                    />
                  </div>
                </div>
              )}
            </div>

            <ActionBtn href="/cart" title="سبد خرید" badge={mounted && cartCount > 0 ? cartCount : undefined}>
              <ShoppingCart size={20} color="currentColor" variant="Linear" />
            </ActionBtn>

            {mounted && auth.isLoggedIn ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger
                  openOnHover
                  delay={0}
                  closeDelay={200}
                  className="w-10 h-10 rounded-lg bg-primary-tint text-primary hover:bg-primary-tint-hover active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-xs outline-none"
                  title={profileName}
                >
                  <User size={20} color="currentColor" variant="Linear" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={8}
                  className="min-w-44 bg-surface p-1.5 rounded-xl shadow-lg border border-divider text-right font-sans"
                >
                  <div className="px-3 py-2 border-b border-divider mb-1">
                    <p className="text-xs font-bold text-tarkhineh-dark truncate">{profileName}</p>
                    {auth.phone && (
                      <p dir="ltr" className="text-[11px] text-tarkhineh-muted text-right font-sans mt-0.5">
                        {toPersianDigits(auth.phone)}
                      </p>
                    )}
                  </div>
                  <DropdownMenuItem className="cursor-pointer text-tarkhineh-dark hover:text-primary hover:bg-primary-tint/60 px-3 py-2 rounded-lg font-medium text-sm transition-colors text-right justify-start outline-none">
                    <Link href="/profile" className="w-full text-right">
                      پروفایل کاربری
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-tarkhineh-dark hover:text-primary hover:bg-primary-tint/60 px-3 py-2 rounded-lg font-medium text-sm transition-colors text-right justify-start outline-none">
                    <Link href="/orders" className="w-full text-right">
                      پیگیری سفارشات
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-tarkhineh-dark hover:text-primary hover:bg-primary-tint/60 px-3 py-2 rounded-lg font-medium text-sm transition-colors text-right justify-start outline-none">
                    <Link href="/favorites" className="w-full text-right">
                      علاقمندی‌ها
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-tarkhineh-dark hover:text-primary hover:bg-primary-tint/60 px-3 py-2 rounded-lg font-medium text-sm transition-colors text-right justify-start outline-none">
                    <Link href="/addresses" className="w-full text-right">
                      آدرس‌های من
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-tarkhineh-dark hover:text-primary hover:bg-primary-tint/60 px-3 py-2 rounded-lg font-medium text-sm transition-colors text-right justify-start outline-none">
                    <Link href="/admin" className="w-full text-right">
                      پنل مدیریت محصولات
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsLogoutOpen(true)}
                    className="cursor-pointer text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-lg font-medium text-sm transition-colors text-right justify-start outline-none border-t border-divider mt-1"
                  >
                    <span className="w-full text-right flex items-center justify-between">
                      <span>خروج از حساب</span>
                      <Logout size={16} color="currentColor" variant="Linear" />
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <ActionBtn
                onClick={() => setIsAuthModalOpen(true)}
                title="ورود / ثبت‌نام"
                className="w-10 h-10"
              >
                <User size={20} color="currentColor" variant="Linear" />
              </ActionBtn>
            )}
          </div>
        </div>

        {/* navbar-mobile */}
        <div className="flex md:hidden items-center justify-between h-16 relative">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 text-primary hover:text-primary-hover cursor-pointer"
            aria-label="منو"
          >
            <HambergerMenu size={28} color="currentColor" variant="Linear" />
          </button>

          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/Logo.svg"
              alt="ترخینه"
              width={120}
              height={40}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-2">
            <ActionBtn
              href="/cart"
              className="w-9 h-9"
              title="سبد خرید"
              badge={mounted && cartCount > 0 ? cartCount : undefined}
            >
              <ShoppingCart size={19} color="currentColor" variant="Linear" />
            </ActionBtn>
            {mounted && auth.isLoggedIn ? (
              pathname.startsWith("/profile") ||
              pathname === "/orders" ||
              pathname === "/favorites" ||
              pathname === "/addresses" ? (
                <Link
                  href="/profile"
                  className="h-9 px-2.5 rounded-lg bg-primary text-white flex items-center gap-1 shadow-xs active:scale-95 transition-all cursor-pointer"
                  title="حساب کاربری"
                >
                  <ArrowDown2 size={13} color="currentColor" variant="Linear" />
                  <User size={18} color="currentColor" variant="Linear" />
                </Link>
              ) : (
                <ActionBtn href="/profile" className="w-9 h-9" title="حساب کاربری">
                  <User size={19} color="currentColor" variant="Linear" />
                </ActionBtn>
              )
            ) : (
              <ActionBtn
                onClick={() => setIsAuthModalOpen(true)}
                className="w-9 h-9"
                title="ورود / ثبت‌نام"
              >
                <User size={19} color="currentColor" variant="Linear" />
              </ActionBtn>
            )}
          </div>
        </div>
      </div>

      {/* navbar-mobile-menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex" dir="rtl">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative mr-0 ml-auto w-[78%] max-w-xs h-full bg-surface shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250 font-sans overflow-hidden">
            <div className="relative w-full h-40 shrink-0 overflow-hidden">
              <Image
                src="/drawer-banner.jpg"
                alt="ترخینه"
                fill
                sizes="320px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/30" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 left-4 text-white hover:opacity-80 p-1 cursor-pointer z-10"
                aria-label="بستن"
              >
                <CloseCircle size={24} color="currentColor" variant="Linear" />
              </button>
              <div className="absolute bottom-4 right-4 z-10">
                <Image
                  src="/Logo.svg"
                  alt="ترخینه"
                  width={130}
                  height={42}
                  className="h-9 w-auto brightness-0 invert"
                  priority
                />
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto divide-y divide-divider bg-surface">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3.5 px-4 text-primary font-semibold text-[15px] hover:bg-container transition-colors"
              >
                <Home2 size={22} color="currentColor" variant="Linear" />
                <span>صفحه اصلی</span>
              </Link>

              {[
                {
                  type: "menu" as const,
                  title: "منو",
                  icon: MenuBoard,
                  items: MENU_CATEGORIES,
                },
                {
                  type: "branches" as const,
                  title: "شعبه",
                  icon: HomeHashtag,
                  items: BRANCHES,
                },
              ].map(({ type, title, icon: Icon, items }) => {
                const isOpen = openAccordion === type;
                return (
                  <div key={type}>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(type)}
                      className="flex items-center justify-between w-full py-3.5 px-4 text-tarkhineh-dark hover:text-primary hover:bg-container font-medium text-[15px] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={22} color="currentColor" variant="Linear" />
                        <span>{title}</span>
                      </div>
                      <ArrowDown2
                        size={16}
                        color="currentColor"
                        variant="Linear"
                        className={`transition-transform duration-200 text-tarkhineh-muted ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pr-12 pl-4 pb-2 space-y-2 text-sm text-tarkhineh-muted bg-container animate-in slide-in-from-top-1">
                        {items.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1.5 hover:text-primary transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                href="/representation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3.5 px-4 text-tarkhineh-dark hover:text-primary hover:bg-container font-medium text-[15px] transition-colors"
              >
                <Bank size={22} color="currentColor" variant="Linear" />
                <span>اعطای نمایندگی</span>
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3.5 px-4 text-tarkhineh-dark hover:text-primary hover:bg-container font-medium text-[15px] transition-colors"
              >
                <Profile2User size={22} color="currentColor" variant="Linear" />
                <span>درباره ما</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3.5 px-4 text-tarkhineh-dark hover:text-primary hover:bg-container font-medium text-[15px] transition-colors"
              >
                <Call size={22} color="currentColor" variant="Linear" />
                <span>تماس با ما</span>
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* navbar-modals */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          logout();
          setIsLogoutOpen(false);
        }}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(phone) => {
          login(phone);
          setIsAuthModalOpen(false);
        }}
      />
    </header>
  );
}
