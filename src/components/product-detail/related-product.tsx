"use client";

import { useState } from "react";
import Image from "next/image";
import IconButton from "../common/custom-icon-button";
import arrowUp from "@/assets/icons/badge_arrow_up.svg";
import Badge from "../common/badge";

// 비슷한 상품 구현 필요

const RelatedProduct = async () => {
  return (
    <div className="bg-SYSTEM-white">
      <div className="px-4 py-[30px]">
        <p className="font-bold mb-2">해당 상품과 비슷한 상품</p>
        <div>상품상품</div>
      </div>
    </div>
  );
};
export default RelatedProduct;
