// frontend/src/lib/menuData.js
// Nguồn dữ liệu menu demo (12 món) dùng chung cho Menu & Product Detail

import croissantImg from "../assets/menu/croissant.jpg";
import tiramisuImg from "../assets/menu/tiramisu.jpg";
import traSuaImg from "../assets/menu/tra-sua-sweet-heaven.jpg";
import mousseDauImg from "../assets/menu/mousse-dau.jpg";
import cheesecakeImg from "../assets/menu/cheesecake.jpg";
import suKemImg from "../assets/menu/su-kem.jpg";
import macaronImg from "../assets/menu/macaron.jpg";
import banhMiBoToiImg from "../assets/menu/banh-mi-bo-toi.jpg";
import donutImg from "../assets/menu/donut.jpg";
import traDaoCamSaImg from "../assets/menu/tra-dao-cam-sa.jpg";
import caPheSuaImg from "../assets/menu/ca-phe-sua-coldbrew.jpg";
import matchaLatteImg from "../assets/menu/matcha-latte.jpg";

export const DEMO_MENU_ITEMS = [
  {
    id: 1,
    name: "Croissant bơ",
    price: 32000,
    description:
      "Bánh croissant bơ Pháp, lớp vỏ giòn, ruột bông, thơm mùi bơ.",
    image: croissantImg,
  },
  {
    id: 2,
    name: "Tiramisu cacao",
    price: 45000,
    description:
      "Bánh lạnh vị cà phê & cacao, ngọt vừa, ăn kèm cacao rắc.",
    image: tiramisuImg,
  },
  {
    id: 3,
    name: "Trà sữa Sweet Heaven",
    price: 39000,
    description:
      "Trà sữa với phương châm thơm trà béo sữa ít ngọt, phù hợp cho những bạn thích uống ít ngọt.",
    image: traSuaImg,
  },
  {
    id: 4,
    name: "Bánh mousse dâu",
    price: 49000,
    description:
      "Mousse dâu tây chua nhẹ, béo nhưng không ngấy, ai ăn cũng thích mê.",
    image: mousseDauImg,
  },
  {
    id: 5,
    name: "Bánh phô mai nướng",
    price: 52000,
    description:
      "Cheesecake nướng kiểu Nhật, mềm mịn, cùng mùi thơm phô mai ngào ngạt.",
    image: cheesecakeImg,
  },
  {
    id: 6,
    name: "Bánh su kem",
    price: 18000,
    description:
      "Vỏ su mềm mịn, bên trong ngập ngụa nhân kem vanilla lạnh mát.",
    image: suKemImg,
  },
  {
    id: 7,
    name: "Macaron mix vị",
    price: 55000,
    description:
      "Set 4 chiếc macaron đủ vị: dâu, chanh dây, trà xanh, cacao.",
    image: macaronImg,
  },
  {
    id: 8,
    name: "Bánh mì bơ tỏi",
    price: 28000,
    description:
      "Bánh mì mềm, cùng sốt bơ tỏi béo thơm, ăn cùng topping phô mai béo ngậy bên trên.",
    image: banhMiBoToiImg,
  },
  {
    id: 9,
    name: "Bánh donut đường",
    price: 19000,
    description:
      "Donut chiên phủ đường, không gắt dầu, thích hợp nhâm nhi cùng trà nóng.",
    image: donutImg,
  },
  {
    id: 10,
    name: "Trà đào cam sả",
    price: 39000,
    description: "Trà đào cam sả mát lạnh, vị trái cây tươi.",
    image: traDaoCamSaImg,
  },
  {
    id: 11,
    name: "Cà phê sữa coldbrew",
    price: 30000,
    description: "Cà phê sữa đá kiểu Việt Nam, đậm nhưng dễ uống.",
    image: caPheSuaImg,
  },
  {
    id: 12,
    name: "Matcha latte",
    price: 42000,
    description:
      "Sữa matcha thơm dịu, vị ngọt thanh, béo sữa, được lòng mọi lứa tuổi.",
    image: matchaLatteImg,
  },
];

// Helper: tìm món theo id (dùng cho Product Detail)
export function getMenuItemById(id) {
  const numericId = Number(id);
  return DEMO_MENU_ITEMS.find((item) => item.id === numericId) || null;
}
