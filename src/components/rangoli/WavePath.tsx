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
        stroke="hsl(var(--charcoal) / 0.6)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isDrawn ? "wave-draw" : ""}
        style={{
          strokeDasharray: 2000,
          strokeDashoffset: isDrawn ? 0 : 2000,
        }}
      />
      <style>{`
        .wave-draw {
          animation: drawWave 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        @keyframes drawWave {
          from { stroke-dashoffset: 2000; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </>
  );
};

export default WavePath;
