interface WavePathProps {
  pathD: string;
  isDrawn: boolean;
}

const WavePath = ({ pathD, isDrawn }: WavePathProps) => {
  return (
    <path
      d={pathD}
      fill="none"
      stroke="hsl(var(--muted-foreground))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        strokeDasharray: 2000,
        strokeDashoffset: isDrawn ? 0 : 2000,
        transition: isDrawn ? "stroke-dashoffset 1.3s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
      }}
    />
  );
};

export default WavePath;
