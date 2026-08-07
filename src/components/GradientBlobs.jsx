const variants = {
  hero: [
    'absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-float',
    'absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-3xl animate-float-delay',
  ],
  section: [
    'absolute -top-16 left-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-float',
    'absolute -bottom-16 right-1/4 h-72 w-72 rounded-full bg-accent/15 blur-3xl animate-float-delay',
  ],
  cta: [
    'absolute -top-10 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl',
    'absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl',
  ],
};

export default function GradientBlobs({ variant = 'section' }) {
  const blobs = variants[variant] || variants.section;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {blobs.map((cls, i) => (
        <span key={i} className={cls} />
      ))}
    </div>
  );
}
