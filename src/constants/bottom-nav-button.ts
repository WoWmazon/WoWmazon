import wish from "@/assets/icons/nav_wishList_gray.svg";
import wishActive from "@/assets/icons/nav_wishList_red.svg";
import product from "@/assets/icons/nav_productList_gray.svg";
import productActive from "@/assets/icons/nav_productList_red.svg";
import search from "@/assets/icons/nav_search_gray.svg";
import searchActive from "@/assets/icons/nav_search_red.svg";
import myPage from "@/assets/icons/nav_mypage_gray.svg";
import myPageActive from "@/assets/icons/nav_mypage_red.svg";
import add from "@/assets/icons/addProduct.svg";

const handleOpenBottomSheet = () => console.log("모달여는 로직");
export const iconButtons = [
  {
    icon: wish,
    activeIcon: wishActive,
    label: "찜한 상품",
    path: "/",
  },
  {
    icon: product,
    activeIcon: productActive,
    label: "상품",
    path: "/product-list",
  },
  {
    icon: add,
    label: "+",
    action: handleOpenBottomSheet,
  },
  {
    icon: search,
    activeIcon: searchActive,
    label: "검색",
    path: "/search",
  },
  {
    icon: myPage,
    activeIcon: myPageActive,
    label: "마이페이지",
    path: "/my-page",
  },
];
