interface WavePathProps {
  pathD: string;
  isDrawn: boolean;
}

const WavePath = ({ pathD, isDrawn }: WavePathProps) => {
  return (
    <path
      d={pathD}
      fill="none"
      stroke="hsl(var(--charcoal) / 0.65)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        opacity: isDrawn ? 1 : 0,
        transition: "opacity 800ms ease-out",
      }}
    />
  );
};

export default WavePath;
