import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BranchPageContent from "@/components/BranchPageContent";
import { getBranch } from "@/lib/branchData";

export function generateStaticParams() {
  return [
    { slug: "ekbatan" },
    { slug: "chalous" },
    { slug: "chaloos" },
    { slug: "aqdasiyeh" },
    { slug: "aghdasieh" },
    { slug: "vanak" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranch(slug);
  return {
    title: `${branch.name} | رستوران‌های زنجیره‌ای ترخینه`,
    description: `منو، آدرس و اطلاعات تماس ${branch.name} رستوران‌های زنجیره‌ای ترخینه.`,
  };
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const branch = getBranch(slug);

  return (
    <div className="min-h-screen bg-page flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        <BranchPageContent branch={branch} />
      </main>
      <Footer />
    </div>
  );
}
