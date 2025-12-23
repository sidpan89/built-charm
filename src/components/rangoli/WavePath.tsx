interface WavePathProps {
  leftPathD: string;
  rightPathD: string;
  isDrawn: boolean;
}

const WavePath = ({ leftPathD, rightPathD, isDrawn }: WavePathProps) => {
  return (
    <>
      {/* Left half - draws from center to left */}
      <path
        d={leftPathD}
        fill="none"
        stroke="hsl(var(--charcoal) / 0.55)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isDrawn ? "wave-draw-animation wave-breathe" : ""}
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: isDrawn ? 0 : 1000,
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
        className={isDrawn ? "wave-draw-animation wave-breathe" : ""}
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: isDrawn ? 0 : 1000,
        }}
      />

      <style>{`
        .wave-draw-animation {
          animation: waveDrawIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes waveDrawIn {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        .wave-breathe {
          animation: waveDrawIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards,
                     waveBreathe 4s ease-in-out 1s infinite;
        }
        
        @keyframes waveBreathe {
          0%, 100% {
            opacity: 0.55;
            stroke-width: 2;
          }
          50% {
            opacity: 0.75;
            stroke-width: 2.2;
          }
        }
      `}</style>
    </>
  );
};

export default WavePath;
