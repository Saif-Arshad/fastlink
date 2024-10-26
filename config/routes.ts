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
  History,
} from "lucide-react";

export const routes = [
  {
    title: "Home",
    icon: Home,
    href: "/dashboard",
    admin: true,
  },
  {
    title: "Team Members",
    icon: Users,
    href: "/dashboard/accounts",
    admin: true,
  },
  {
    title: "Daily Tasks",
    icon: LayoutGrid,
    href: "/dashboard/1",
    admin: true,
  },
  {
    title: "My Tasks",
    icon: LayoutGrid,
    href: "/dashboard/my-task",
    admin: false,
  },
  {
    title: "Login History",
    icon: History,
    href: "/dashboard/my-history",
    admin: false,
  },

  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/5",
    admin: true,
  },


];
