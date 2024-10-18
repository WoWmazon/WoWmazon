"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

import HeaderRight from "@/assets/images/header-right.png";
import Image from "next/image";

const MobileHeader = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  });
  return (
    <div className="flex flex-row justify-between h-full px-4 items-center">
      <div>{format(time, "HH:mm")}</div>
      <Image
        src={HeaderRight}
        alt="network-wifi-battery"
        width={68}
        height={16}
      />
    </div>
  );
};
export default MobileHeader;
