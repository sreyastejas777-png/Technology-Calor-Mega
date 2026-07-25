import { applications } from '../data/applications';

export default function TrustMarquee() {
  const track = [...applications, ...applications];

  return (
    <div className="overflow-hidden border-y border-primary/10 dark:border-white/10 bg-white dark:bg-white/[0.03] py-8">
      <div className="marquee-track">
        {track.map((item, i) => (
          <div
            key={i}
            className="mx-5 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/5 dark:bg-white/5 text-4xl text-secondary dark:text-accent transition-colors sm:h-24 sm:w-24 sm:text-5xl"
            title={item.title}
          >
            <item.icon />
          </div>
        ))}
      </div>
    </div>
  );
}
