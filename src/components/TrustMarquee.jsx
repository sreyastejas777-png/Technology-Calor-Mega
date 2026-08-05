import { applications } from '../data/applications';

export default function TrustMarquee() {
  const track = [...applications, ...applications];

  return (
    <div className="overflow-hidden border-y border-primary/10 dark:border-white/10 bg-white dark:bg-white/[0.03] py-6 sm:py-6">
      <div className="marquee-track">
        {track.map((item, i) => (
          <div
            key={i}
            className="mx-4 sm:mx-5 flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-2xl bg-primary/5 dark:bg-white/5 text-3xl text-secondary dark:text-accent transition-all sm:h-20 sm:w-20 sm:text-4xl hover:scale-105"
            title={item.title}
          >
            <item.icon />
          </div>
        ))}
      </div>
    </div>
  );
}
