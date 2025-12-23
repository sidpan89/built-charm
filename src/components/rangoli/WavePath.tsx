interface WavePathProps {
  leftPathD: string;
  rightPathD: string;
  isDrawn: boolean;
}

const WavePath = ({ leftPathD, rightPathD, isDrawn }: WavePathProps) => {
  return (
    <g className={isDrawn ? "animate-wave-breathe" : ""}>
      {/* Left half - draws from center to left */}
      <path
        d={leftPathD}
        fill="none"
        stroke="hsl(var(--charcoal) / 0.55)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: isDrawn ? 0 : 1,
          transition: "stroke-dashoffset 800ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {/* Right half - draws from center to right */}
      <path
        d={rightPathD}
        fill="none"
        stroke="hsl(var(--charcoal) / 0.55)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: isDrawn ? 0 : 1,
          transition: "stroke-dashoffset 800ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      <style>{`
        @keyframes waveBreathe {
          0%, 100% {
            opacity: 0.55;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.7;
            transform: scaleY(1.02);
          }
        }
        .animate-wave-breathe {
          animation: waveBreathe 4s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
    </g>
  );
};

export default WavePath;
