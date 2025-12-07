import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark"; // "light" means the logo is on a light background (so logo should be dark/colored)
}

export function Logo({ className = "w-12 h-12", variant = "light" }: LogoProps) {
  // On a light background (variant="light"), use dark details.
  // On a dark background (variant="dark"), use white details.
  const detailColor = variant === "light" ? "#1a1a1a" : "#FFFFFF"; 
  const saffron = "#FF9933";
  const red = "#D9381E";
  
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Glow - Subtle */}
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Mahakal Tripund (Three Horizontal Lines of Ash) - Iconic Ujjain Symbol */}
      <g transform="translate(50, 35) scale(1.1)">
        <path
          d="M-35,-10 Q0,5 35,-10"
          fill="none"
          stroke={detailColor}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="1"
        />
        <path
          d="M-35,0 Q0,15 35,0"
          fill="none"
          stroke={detailColor}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="1"
        />
        <path
          d="M-35,10 Q0,25 35,10"
          fill="none"
          stroke={detailColor}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="1"
        />
        {/* Red Dot (Bindi) */}
        <circle cx="0" cy="0" r="7" fill={red} />
      </g>

      {/* Trishul (Trident) - Central Element */}
      <g transform="scale(1.1) translate(-4.5, -5)">
        <path
            d="M50,15 L50,90" // Staff
            stroke={detailColor}
            strokeWidth="6"
            strokeLinecap="round"
        />
        {/* Left Fork */}
        <path
            d="M30,25 Q30,55 50,55"
            fill="none"
            stroke={detailColor}
            strokeWidth="6"
            strokeLinecap="round"
        />
        {/* Right Fork */}
        <path
            d="M70,25 Q70,55 50,55"
            fill="none"
            stroke={detailColor}
            strokeWidth="6"
            strokeLinecap="round"
        />
      </g>
      
      {/* Crescent Moon (Chand) */}
      <path
        d="M75,15 A10,10 0 1,1 75,25"
        fill={saffron}
        stroke="none"
        transform="rotate(-15, 75, 20) scale(1.4) translate(-10, 0)"
      />

      {/* Damru (Drum) attached to Trishul */}
      <g transform="translate(50, 65) scale(1.3)">
         <path 
           d="M-10,-8 L10,8 M10,-8 L-10,8" 
           stroke={saffron} 
           strokeWidth="3"
         />
         <path
           d="M-10,-8 Q0,-4 10,-8 L10,8 Q0,4 -10,8 Z"
           fill="none"
           stroke={detailColor}
           strokeWidth="3"
         />
      </g>

    </motion.svg>
  );
}
