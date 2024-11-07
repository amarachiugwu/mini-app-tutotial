"use client";

import { Hamster, Info, Settings } from "@/components/icons/ui";
import { levelNames } from "@/modules/dasboard/exchange/data";
import {
  calculateProgress,
  calculateTimeLeft,
  formatProfitPerHour,
} from "@/modules/dasboard/exchange/lib";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(22749365);
  const profitPerHour = 126420;
  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");
  const pointsToAdd = 11;
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${
      -y / 10
    }deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = "";
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints + pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [profitPerHour]);

  return (
    <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
      <div className="px-4 z-10">
        <div className="flex items-center space-x-2 pt-4">
          <div className="p-1 rounded-lg bg-[#1d2025]">
            <Hamster size={24} className="text-[#d4d4d4]" />
          </div>
          <div>
            <p className="text-sm">Amarachi (CEO)</p>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-4 mt-1">
          <div className="flex items-center w-1/3">
            <div className="w-full">
              <div className="flex justify-between">
                <p className="text-sm">{levelNames[levelIndex]}</p>
                <p className="text-sm">
                  {levelIndex + 1}{" "}
                  <span className="text-[#95908a]">/ {levelNames.length}</span>
                </p>
              </div>

              <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                  <div
                    className="progress-gradient h-2 rounded-full"
                    style={{
                      width: `${calculateProgress(levelIndex, points)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
            <Image
              src={"/images/binance-logo.png"}
              alt="Exchange"
              className="w-8 h-8"
              width={32}
              height={32}
            />
            <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
            <div className="flex-1 text-center">
              <p className="text-xs text-[#85827d] font-medium">
                Profit per hour
              </p>
              <div className="flex items-center justify-center space-x-1">
                <Image
                  src={"/images/dollar-coin.png"}
                  alt="Dollar Coin"
                  className="w-[18px] h-[18px]"
                  width={18}
                  height={18}
                />
                <p className="text-sm">{formatProfitPerHour(profitPerHour)}</p>
                <Info size={20} className="text-[#43433b]" />
              </div>
            </div>
            <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
            <Settings className="text-white" />
          </div>
        </div>
      </div>

      <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
        <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
          <div className="px-4 mt-6 flex justify-between gap-2">
            <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
              <div className="dot"></div>
              <Image
                src={"/images/daily-reward.png"}
                alt="Daily Reward"
                className="mx-auto w-12 h-12"
                width={48}
                height={48}
              />
              <p className="text-[10px] text-center text-white mt-1">
                Daily reward
              </p>
              <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                {dailyRewardTimeLeft}
              </p>
            </div>
            <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
              <div className="dot"></div>
              <Image
                src={"/images/daily-cipher.png"}
                alt="Daily Cipher"
                className="mx-auto w-12 h-12"
                width={48}
                height={48}
              />
              <p className="text-[10px] text-center text-white mt-1">
                Daily cipher
              </p>
              <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                {dailyCipherTimeLeft}
              </p>
            </div>
            <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
              <div className="dot"></div>
              <Image
                src={"/images/daily-combo.png"}
                alt="Daily Combo"
                className="mx-auto w-12 h-12"
                width={48}
                height={48}
              />
              <p className="text-[10px] text-center text-white mt-1">
                Daily combo
              </p>
              <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                {dailyComboTimeLeft}
              </p>
            </div>
          </div>

          <div className="px-4 mt-4 flex justify-center">
            <div className="px-4 py-2 flex items-center space-x-2">
              <Image
                src={"/images/dollar-coin.png"}
                alt="Dollar Coin"
                className="w-10 h-10"
                width={40}
                height={40}
              />
              <p className="text-4xl text-white">{points.toLocaleString()}</p>
            </div>
          </div>

          <div className="px-4 mt-4 flex justify-center">
            <div
              className="w-80 h-80 p-4 rounded-full circle-outer"
              onClick={handleCardClick}
            >
              <div className="w-full h-full rounded-full circle-inner">
                <Image
                  src={"/images/main-character.png"}
                  alt="Main Character"
                  className="w-full h-full"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
    </div>
  );
}
