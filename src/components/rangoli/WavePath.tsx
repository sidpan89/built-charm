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
        stroke="hsl(var(--charcoal) / 0.55)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isDrawn ? "wave-draw" : "wave-initial"}
      />
      <style>{`
        .wave-initial {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
        }
        .wave-draw {
          stroke-dasharray: 2000;
          animation: drawLine 1.3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 2000; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </>
  );
};

export default WavePath;
