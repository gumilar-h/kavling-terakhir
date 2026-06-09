import Link from "next/link";

const CTABanner = () => {
  return (
    <div className="flex w-full items-center justify-between gap-3 bg-brand-emerald px-4 py-2 text-white">
      <p className="text-xs font-medium leading-snug">
        Bingung cari lahan pemakaman? Lihat cara kami membantu Anda.
      </p>
      <Link
        href="/mengapa-kami"
        className="shrink-0 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[10px] font-bold tracking-wide text-brand-emerald shadow-sm transition-colors hover:bg-brand-sage"
      >
        Pelajari →
      </Link>
    </div>
  );
};

export default CTABanner;
