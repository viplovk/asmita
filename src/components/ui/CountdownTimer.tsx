import React, { useEffect, useState } from 'react';
import { EVENT_DETAILS } from '../../config/eventData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const targetDate = new Date(EVENT_DETAILS.dateISO).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsLive(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-1.5 sm:gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B08A45] animate-pulse" />
        <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#C08A32] uppercase">
          {isLive ? 'GATHERING COMMENCED' : 'COUNTDOWN TO THE CELEBRATION'}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        {timeUnits.map((unit, idx) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center">
              <div className="relative min-w-[56px] sm:min-w-[70px] md:min-w-[80px] h-16 sm:h-20 bg-gradient-to-b from-[#3A241B] to-[#241711] border border-[#B08A45]/40 rounded-lg flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.4)] overflow-hidden paper-grain-texture">
                {/* Horizontal card crease */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#B08A45]/20" />
                <span className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-[#F3EBDD] tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="mt-1.5 text-[9px] sm:text-[10px] font-cinzel tracking-[0.2em] text-[#D8C19A] opacity-80">
                {unit.label}
              </span>
            </div>
            {idx < timeUnits.length - 1 && (
              <span className="text-xl sm:text-2xl text-[#B08A45]/60 font-serif pb-5">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
