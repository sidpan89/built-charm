interface WavePathProps {
  pathD: string;
  isDrawn: boolean;
  pathLength: number;
}

const WavePath = ({ pathD, isDrawn, pathLength }: WavePathProps) => {
  return (
    <>
      {/* We draw two paths from center - one going left, one going right */}
      <path
        d={pathD}
        fill="none"
        stroke="hsl(var(--charcoal) / 0.55)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: isDrawn ? 0 : 1,
          transition: "stroke-dashoffset 1000ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </>
  );
};

export default WavePath;
