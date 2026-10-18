export { cn } from "cn";

export function toPersianDigits(n: number | string | undefined | null): string {
  if (n === undefined || n === null) return "";
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
}

export function toEnglishDigits(input: string | number | undefined | null): string {
  if (input === undefined || input === null) return "";
  const faDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arDigits = "٠١٢٣٤٥٦٧٨٩";
  return input
    .toString()
    .replace(/[۰-۹]/g, (d) => String(faDigits.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(arDigits.indexOf(d)));
}

export function safeImageSrc(src?: string | null): string {
  if (!src) return "/food/pasta.png";
  const s = String(src).trim();
  if (!s) return "/food/pasta.png";
  if (s.startsWith("/")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) {
    try {
      new URL(s);
      return s;
    } catch {
      return "/food/pasta.png";
    }
  }
  return `/${s}`;
}

export const fa = toPersianDigits;
export const en = toEnglishDigits;
