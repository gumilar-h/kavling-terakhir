import { Eye, GitCompare, Heart, MessageCircle } from "lucide-react";

const VALUE_CARDS = [
  {
    icon: Eye,
    title: "Transparansi Penuh",
    description:
      "Informasi harga, agama, dan tipe kavling ditampilkan jelas sejak awal — tanpa biaya tersembunyi.",
  },
  {
    icon: GitCompare,
    title: "Perbandingan Praktis",
    description:
      "Bandingkan hingga 3 lokasi pemakaman sekaligus agar Anda bisa memutuskan dengan tenang.",
  },
  {
    icon: Heart,
    title: "Bebas Tekanan",
    description:
      "Tidak ada paksaan atau hard-selling. Anda mengendalikan kecepatan dan pilihan sendiri.",
  },
  {
    icon: MessageCircle,
    title: "Langsung Berkomunikasi",
    description:
      "Hubungi pengelola pemakaman langsung via WhatsApp kapan Anda siap bertanya.",
  },
] as const;

const MengapaKamiView = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="rounded-xl border border-neutral-muted bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold text-neutral-dark">
          Mengapa KavlingTerakhir?
        </h1>
        <p className="mt-2 text-sm font-medium leading-relaxed text-neutral-dark/80">
          Kami hadir untuk membantu keluarga di Jabodetabek menemukan lahan
          pemakaman dengan cara yang sederhana, jujur, dan mudah diakses.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {VALUE_CARDS.map(({ icon: Icon, title, description }) => (
          <article
            key={title}
            className="rounded-xl border border-neutral-muted bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-emerald text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h2 className="text-sm font-bold text-neutral-dark">{title}</h2>
                <p className="mt-1 text-sm font-medium leading-relaxed text-neutral-dark/80">
                  {description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default MengapaKamiView;
