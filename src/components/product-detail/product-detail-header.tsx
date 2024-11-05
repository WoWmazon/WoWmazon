"use client";

import headerArrow from "@/assets/icons/header_arrow.svg";
import detailExport from "@/assets/icons/detail_export.svg";
import detailTrash from "@/assets/icons/detail_trash.svg";
import IconButton from "../common/custom-icon-button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProductDetailHeader = ({ isFavorite }: { isFavorite: boolean }) => {
  const router = useRouter();
  const [currentURL, setCurrentURL] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed top-0 w-full max-w-[375px] h-[66px] p-4 border border-ELSE-EC bg-SYSTEM-white">
      <div className="grid grid-cols-[32px_auto_80px] items-center h-8 gap-[6px]">
        <IconButton
          icon={headerArrow}
          size={32}
          alt="arrow-icon"
          isActive={isActive}
          onClick={() => router.back()}
          className="justify-self-end rounded-md hover:bg-ELSE-F5"
        />
        <p className="text-xl justify-center content-center text-center font-bold ml-10">
          상품 상세
        </p>
        <div className="justify-self-end">
          <IconButton
            icon={detailExport}
            size={32}
            alt="arrow-icon"
            isActive={isActive}
            onClick={() => handleCopyClipBoard(currentURL)}
            className="rounded-md hover:bg-ELSE-F5"
          />
          {isFavorite && (
            <IconButton
              icon={detailTrash}
              size={32}
              alt="arrow-icon"
              isActive={isActive}
              onClick={() => setIsActive(false)}
              className="ml-4 rounded-md hover:bg-ELSE-F5"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetailHeader;
