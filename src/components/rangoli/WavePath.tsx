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
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 2000,
          strokeDashoffset: isDrawn ? 0 : 2000,
          transition: isDrawn ? "stroke-dashoffset 1.2s cubic-bezier(0.65, 0, 0.35, 1)" : "none",
        }}
      />
    </>
  );
};

export default WavePath;
