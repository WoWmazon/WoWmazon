"use client";

import { useTranslation } from "@/utils/localization/client";
import { LocaleTypes } from "@/utils/localization/settings";
import { useParams } from "next/navigation";

const AllowAuthorization = () => {
  const { locale }: { locale: LocaleTypes } = useParams();
  const { t } = useTranslation(locale, "user");
  const getAuthorizationComment = (key: string) => {
    return t(`authorization.${key}`);
  };

  return (
    <div className="relative flex flex-col h-full gap-6">
      <div className="flex flex-col gap-1 mt-10">
        <p className="font-bold text-[26px] leading-[38px] text-SYSTEM-black">
          {getAuthorizationComment("title1")} <br />
          {getAuthorizationComment("title2")} <br />
          {getAuthorizationComment("title3")}
        </p>
      </div>
      <div className="flex flex-col gap-4 text-ELSE-29 leading-7">
        <div>
          <p className="font-bold">
            {getAuthorizationComment("sub-title1.title")}
            <strong className="text-SYSTEM-main">
              {getAuthorizationComment("required")}
            </strong>
          </p>
          <p className="text-ELSE-55">
            {getAuthorizationComment("sub-title1.description")}
          </p>
        </div>
        <div>
          <p className="font-bold">
            {getAuthorizationComment("sub-title2.title")}
            {getAuthorizationComment("optional")}
          </p>
          <p className="text-ELSE-55">
            {getAuthorizationComment("sub-title2.description")}
          </p>
        </div>
      </div>
      <div className="bg-ELSE-F5 px-2 py-3">
        <ul className="flex flex-col gap-2 text-md text-ELSE-76">
          <li className="flex flex-row gap-2">
            <span>∙</span>
            <p>{getAuthorizationComment("description1")}</p>
          </li>
          <li className="flex flex-row gap-2">
            <span>∙</span>
            <p>{getAuthorizationComment("description2")}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default AllowAuthorization;
