import StoreIcon from '@mui/icons-material/Store';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ScaleIcon from '@mui/icons-material/Scale';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/PersonPinSharp';
import LayersIcon from '@mui/icons-material/Layers';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HistoryIcon from '@mui/icons-material/History';

import reg from "../../assets/LeftRegistrionimage.png";
import set from "../../assets/LeftSettingImage.png";
import man from "../../assets/PurchaseImage.png";

export const imageMap: { [key: string]: string } = {
  '/register/material': reg,
  '/register/product': reg,
  '/setting/unit': set,
  '/setting/category': set,
  '/setting/supplier': set,
  '/setting/variants': set,
  '/manufacture/purchase': man,
  '/manufacture/history': man,
};

export const panelItems: {
  [key: string]: { to: string; icon: JSX.Element; text: string }[];
} = {
  Register: [
    { to: "/register/material", icon: <StoreIcon />, text: "Raw Material" },
    { to: "/register/product", icon: <AssignmentIcon />, text: "Products" },
  ],
  Setting: [
    { to: "/setting/unit", icon: <ScaleIcon />, text: "Units" },
    { to: "/setting/category", icon: <CategoryIcon />, text: "Category" },
    { to: "/setting/supplier", icon: <LocalShippingIcon />, text: "Suppliers" },
    { to: "/setting/variants", icon: <LayersIcon />, text: "Variants" },
  ],
  Manufacture: [
    { to: "/manufacture/purchase", icon: <AddShoppingCartIcon />, text: "Purchase Raw Material" },
    { to: "/manufacture/history", icon: <HistoryIcon />, text: "Purchase History" },
  ],
};
