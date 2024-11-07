"use client";

import React from "react";
import { DashboardFooterMenu } from "../data";
import Link from "next/link";
import { isActivePath } from "../lib/utils";
import { usePathname } from "next/navigation";

const DashboardLayout = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
      {DashboardFooterMenu.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          className={`text-center text-[#85827d] w-1/5 ${
            isActivePath(item.href, pathname as string)
              ? "bg-[#1c1f24] text-white m-1 p-2 rounded-2xl"
              : ""
          }`}
        >
          <div className="w-8 h-8 mx-auto"> {item.icon} </div>

          <p className="mt-1">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default DashboardLayout;
