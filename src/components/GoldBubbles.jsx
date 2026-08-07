import { useEffect, useState } from 'react';

export default function GoldBubbles() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Generate bubbles on mount to ensure server-side and client-side consistency
    const generated = Array.from({ length: 22 }, (_, i) => {
      const size = 10 + ((i * 13) % 22); // Sizes: 10px to 32px
      const left = (i * 41) % 96;        // Horizontal coordinates: 0% to 95%
      const duration = 12 + ((i * 7) % 18); // Durations: 12s to 30s
      const delay = -((i * 11) % 25);    // Pre-distributes heights instantly on mount
      const opacity = 0.35 + ((i * 3) % 4) * 0.09; // Opacities: 0.35 to 0.71

      return {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          '--bubble-duration': `${duration}s`,
          '--bubble-delay': `${delay}s`,
          '--bubble-opacity': opacity,
        },
      };
    });
    setBubbles(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {bubbles.map((b) => (
        <span key={b.id} className="gold-bubble" style={b.style} />
      ))}
    </div>
  );
}
