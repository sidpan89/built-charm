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
        stroke="hsl(0 0% 45%)"
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
            drawWave 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards,
            waveBreathe 4s ease-in-out 1.4s infinite;
        }
        @keyframes drawWave {
          from { stroke-dashoffset: 2000; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes waveBreathe {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </>
  );
};

export default WavePath;
