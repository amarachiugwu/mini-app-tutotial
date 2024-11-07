import { DashboardMenuItemProps } from "../types";
import { Coins, Friends, Hamster, Mine } from "@/components/icons/ui";

export const DashboardFooterMenu: DashboardMenuItemProps[] = [
  {
    name: "exchange",
    href: "/",
    icon: <Coins />,
  },
  {
    name: "mine",
    href: "/mine",
    icon: <Mine />,
  },
  {
    name: "friends",
    href: "/friends",
    icon: <Friends />,
  },
  {
    name: "earn",
    href: "/earn",
    icon: <Coins />,
  },
  {
    name: "airdrop",
    href: "/airdrop",
    icon: <Hamster />,
  },
];
