// routes.ts (or routes.tsx)
import { ProductsIcon } from "@/components/icons/sidebar/products-icon";
import {
  LayoutDashboard,
  UserRoundCog,
  Columns4,
  CalendarSearch,
  ChartSpline,
  PackageSearch,
  User,
  ShoppingCart,
  Home,
  LayoutGrid,
  Users,
  CreditCard,
  Settings,
  Banknote,
} from "lucide-react";

export const routes = [
  {
    title: "Home",
    icon: Home,
    href: "/dashboard",
    admin: false,
  },
  {
    title: "Daily Tasks",
    icon: LayoutGrid,
    href: "/dashboard/1",
    admin: false,
  },
  {
    title: "Team Members",
    icon: Users,
    href: "/dashboard/accounts",
    admin: false,
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/5",
    admin: false,
  },
  // {
  //   title: "User Management",
  //   icon: User,
  //   href: "/dashboard/accounts",
  //   admin: false,
  // },

];
