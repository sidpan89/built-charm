interface WavePathProps {
  pathD: string;
  isDrawn: boolean;
}

const WavePath = ({ pathD, isDrawn }: WavePathProps) => {
  return (
    <>
      <path
        d={pathD}
        fill="none"
        stroke="hsl(var(--charcoal) / 0.5)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isDrawn ? "wave-animate" : "wave-hidden"}
      />
      <style>{`
        .wave-hidden {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
        }
        .wave-animate {
          stroke-dasharray: 2000;
          animation: 
            sketchWave 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards,
            waveBreathe 3.5s ease-in-out 1.3s infinite;
        }
        @keyframes sketchWave {
          from { stroke-dashoffset: 2000; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes waveBreathe {
          0%, 100% {
            opacity: 0.5;
            stroke-width: 2;
          }
          50% {
            opacity: 0.7;
            stroke-width: 2.3;
          }
        }
      `}</style>
    </>
  );
};

export default WavePath;
