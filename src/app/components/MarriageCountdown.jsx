"use client";
import { useEffect, useState } from "react";

export default function MarriageCountdown() {
  const TARGET_DATE = new Date("2026-11-26").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 12,
    minutes: 28,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );

      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* <div className="bg-[url('/assets/countdown_bg.jpg')] bg-cover bg-no-repeat pb-12"> */}
      <div className="bg-[url('/assets/countdown_savebg.png')] bg-cover bg-no-repeat pb-10 md:pt-0 pt-10 ">
        <div className="min-h-50 lg:min-h-100 h-50">
          <h2 className="lg:text-[60px] text-4xl text-center text-[#F8F8F8] lg:pt-30 pt-12 font-jacques-francois ">
            countdown
          </h2>

         

          <h2 className="lg:text-[60px] text-2xl text-center text-[#F8F8F8] font-jacques-francois">
            {" "}
            {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M{" "}
            {timeLeft.seconds}S
          </h2>

           <p className="lg:text-[22px] text-[20px] text-[#F8F8F8] mt-6 text-center lg:px-100 md:px-25 px-10 font-jacques-francois">
           Until the big day
          </p>
        </div>
      </div>
    </>
  );
}
8;
