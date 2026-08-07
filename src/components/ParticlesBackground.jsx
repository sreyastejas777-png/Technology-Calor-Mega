const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 4 + ((i * 7) % 14),
  left: (i * 53) % 100,
  top: (i * 31) % 100,
  duration: 5 + (i % 6),
  delay: (i % 5) * 0.6,
}));

export default function ParticlesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-accent/30 animate-float"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
