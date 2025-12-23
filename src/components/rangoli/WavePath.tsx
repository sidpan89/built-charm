import { cn } from "@/lib/utils";

interface WavePathProps {
  pathD: string;
  isDrawn: boolean;
}

const WavePath = ({ pathD, isDrawn }: WavePathProps) => {
  return (
    <path
      d={pathD}
      fill="none"
      stroke="hsl(var(--charcoal))"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      className={cn("transition-opacity duration-700", isDrawn ? "opacity-50" : "opacity-0")}
      style={{
        strokeDasharray: 1,
        strokeDashoffset: isDrawn ? 0 : 1,
        transition:
          "stroke-dashoffset 1400ms cubic-bezier(0.65, 0, 0.35, 1), opacity 500ms ease",
        animation: isDrawn ? "rangoliWaveBreath 3.6s ease-in-out infinite" : "none",
      }}
    />
  );
};

export default WavePath;
