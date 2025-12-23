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
          className="absolute rounded-full bg-charcoal/40"
          style={{
            left: `${(dot.x / viewBoxWidth) * 100}%`,
            top: `${(dot.y / viewBoxHeight) * 100}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            transform: "translate(-50%, -50%)",
            opacity: isDrawn ? 0.5 : 0,
            transition: `opacity 400ms ease ${0.8 + idx * 0.05}s`,
          }}
        />
      ))}
    </>
  );
};

export default AccentDots;
