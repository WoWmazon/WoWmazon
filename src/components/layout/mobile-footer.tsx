import Image from "next/image";
import MobileBottom from "@/assets/images/mobile-bottom.png";

const MobileFooter = () => {
  return (
    <Image src={MobileBottom} alt="mobile-bottom" width={375} height={30} />
  );
};
export default MobileFooter;
