interface AccentDot {
  x: number;
  y: number;
  size: number;
}

interface AccentDotsProps {
  dots: AccentDot[];
  viewBoxWidth: number;
  viewBoxHeight: number;
  isDrawn: boolean;
}

const AccentDots = ({ dots, viewBoxWidth, viewBoxHeight, isDrawn }: AccentDotsProps) => {
  return (
    <>
      {dots.map((dot, idx) => (
        <div
          key={`accent-${idx}`}
          className="absolute rounded-full bg-charcoal/30 hidden sm:block"
          style={{
            left: `${(dot.x / viewBoxWidth) * 100}%`,
            top: `${(dot.y / viewBoxHeight) * 100}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            transform: "translate(-50%, -50%)",
            opacity: isDrawn ? 0.35 : 0,
            transition: `opacity 400ms ease ${1.1 + idx * 0.04}s`,
            animation: isDrawn ? `rangoliSparkle ${2.4 + (idx % 6) * 0.25}s ease-in-out infinite` : "none",
            animationDelay: `${1.6 + (idx % 8) * 0.12}s`,
          }}
        />
      ))}
    </>
  );
};

export default AccentDots;
