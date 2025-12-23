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
  const centerX = viewBoxWidth / 2;

  return (
    <>
      {dots.map((dot, idx) => {
        // Delay based on distance from center - further = later
        const distanceFromCenter = Math.abs(dot.x - centerX) / centerX;
        const delay = 0.3 + distanceFromCenter * 0.5;

        return (
          <div
            key={`accent-${idx}`}
            className="absolute rounded-full bg-charcoal/40"
            style={{
              left: `${(dot.x / viewBoxWidth) * 100}%`,
              top: `${(dot.y / viewBoxHeight) * 100}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              transform: `translate(-50%, -50%) scale(${isDrawn ? 1 : 0})`,
              opacity: isDrawn ? 0.5 : 0,
              transition: `opacity 400ms ease ${delay}s, transform 400ms ease ${delay}s`,
            }}
          />
        );
      })}
    </>
  );
};

export default AccentDots;
