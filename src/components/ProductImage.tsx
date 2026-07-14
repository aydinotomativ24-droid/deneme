type Props = {
  color: string;
  label?: string;
  className?: string;
};

// Generated illustration of a wall-mounted air conditioning unit.
// Avoids using any third-party product photography.
export default function ProductImage({ color, label, className }: Props) {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={label ?? "Illustration climatiseur"}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`bg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor={color} stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id={`unit-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eef2f6" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#bg-${color})`} />

      {/* Cold air flow */}
      <g stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.55">
        <path d="M120 205 q10 22 -6 40" fill="none" />
        <path d="M175 205 q10 26 -4 46" fill="none" />
        <path d="M230 205 q10 22 -6 40" fill="none" />
        <path d="M285 205 q10 26 -4 46" fill="none" />
      </g>

      {/* AC unit body */}
      <rect
        x="70"
        y="120"
        width="260"
        height="80"
        rx="16"
        fill={`url(#unit-${color})`}
        stroke={color}
        strokeWidth="3"
      />
      {/* Louvre */}
      <rect x="86" y="182" width="228" height="10" rx="5" fill={color} opacity="0.8" />
      {/* Display */}
      <rect x="250" y="138" width="60" height="20" rx="6" fill={color} opacity="0.15" />
      <circle cx="300" cy="148" r="4" fill={color} />
      {/* Vents */}
      <g stroke={color} strokeWidth="2" opacity="0.35">
        <line x1="90" y1="140" x2="230" y2="140" />
        <line x1="90" y1="150" x2="230" y2="150" />
        <line x1="90" y1="160" x2="230" y2="160" />
      </g>

      {label ? (
        <text
          x="200"
          y="285"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="15"
          fontWeight="600"
          fill={color}
        >
          {label}
        </text>
      ) : null}
    </svg>
  );
}
