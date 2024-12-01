import Image from "next/image";
import heartIcon from "@/assets/icons/nav_wishList_gray.svg";
import { LocaleTypes } from "@/utils/localization/settings";
import { useParams } from "next/navigation";
import { useTranslation } from "@/utils/localization/client";

const WishListNoContents = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "wish-list");

  return (
    <div className="grid  place-items-center w-[343px] h-[478px]">
      <div className="grid  place-items-center w-[343px] h-[154px] ">
        <Image src={heartIcon} alt="heartIcon" width={80} height={80} />
        <div className="grid grid-cols-1 gap-[6px] text-center ">
          <p className="text-lg text-ELSE-55">{t("wishListNoContents")}</p>
          <p className="text-md text-ELSE-F8">
            {t("wishLostNoContentsDescription")}
          </p>
        </div>
      </div>
    </div>
  );
};
export default WishListNoContents;
