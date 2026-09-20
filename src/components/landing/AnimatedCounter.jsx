import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

// Bengali digit map for Bengali locale
const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export const toBnNumber = (numStr) => {
  return String(numStr).replace(/\d/g, (d) => bnDigits[Number(d)] || d);
};

export default function AnimatedCounter({
  target = 0,
  duration = 1600,
  decimals = 0,
  prefix = '',
  suffix = '',
  isBn = false,
  className = ''
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '80px 0px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startVal = 0;
    const endVal = Number(target) || 0;
    const startTime = Date.now();

    // Smooth exponential ease-out
    const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = startVal + (endVal - startVal) * eased;

      setDisplayValue(current);

      if (progress >= 1) {
        clearInterval(timer);
        setDisplayValue(endVal);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  const formattedNum = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toLocaleString('en-US');

  const finalString = isBn ? toBnNumber(formattedNum) : formattedNum;

  return (
    <span ref={ref} className={`font-mono tabular-nums inline-block ${className}`}>
      {prefix}
      {finalString}
      {suffix}
    </span>
  );
}
