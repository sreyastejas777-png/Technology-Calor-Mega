import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 z-[60] h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-secondary via-accent to-success transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
