import React, { useEffect, useState, useRef } from 'react';

// Bengali digit map for Bengali locale
const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export const toBnNumber = (numStr) => {
  return String(numStr).replace(/\d/g, (d) => bnDigits[Number(d)] || d);
};

export default function AnimatedCounter({
  target = 0,
  duration = 1400,
  decimals = 0,
  prefix = '',
  suffix = '',
  isBn = false,
  className = ''
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer;
    const startVal = 0;
    const endVal = Number(target) || 0;
    const startTime = Date.now();
    const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      timer = setInterval(() => {
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
    };

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        });
      },
      { rootMargin: '120px 0px', threshold: 0.01 }
    );

    observer.observe(el);

    // Safety fallback: if not intersected within 3 seconds, show target value
    const fallbackTimeout = setTimeout(() => {
      if (!hasAnimated.current) {
        setDisplayValue(endVal);
      }
    }, 2800);

    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
      clearTimeout(fallbackTimeout);
    };
  }, [target, duration]);

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
