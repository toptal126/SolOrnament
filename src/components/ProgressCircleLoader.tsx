import React, { useEffect, useRef, useState } from "react";

interface ProgressCircleLoaderProps {
  duration: number; // in ms
  size?: number; // px
  strokeWidth?: number; // px
  color?: string;
  infinite?: boolean;
}

const ProgressCircleLoader: React.FC<ProgressCircleLoaderProps> = ({
  duration,
  size = 22,
  strokeWidth = 3,
  color = "#00d1b2",
  infinite = true,
}) => {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const reqRef = useRef<number | null>(null);

  useEffect(() => {
    setProgress(0);
    startTimeRef.current = performance.now();
    const animate = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      let prog = elapsed / duration;
      if (infinite) {
        prog = prog % 1;
        setProgress(prog);
        reqRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(Math.min(prog, 1));
        if (prog < 1) {
          reqRef.current = requestAnimationFrame(animate);
        }
      }
    };
    reqRef.current = requestAnimationFrame(animate);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [duration, infinite]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <svg
      width={size}
      height={size}
      className="inline-block align-middle"
      style={{ verticalAlign: "middle" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#23272f"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.1s linear" }}
      />
    </svg>
  );
};

export default ProgressCircleLoader;
