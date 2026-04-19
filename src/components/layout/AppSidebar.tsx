import * as React from "react";
import {
  Compass,
  Info,
  Smartphone,
  Puzzle,
  Settings,
  House,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./TeamSwitcher";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import Logo from "/CHYR_Logo.png";

// This is sample data.
const data = {
  user: {
    name: "Ahsan",
    email: "ahsan@softvence.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: {
    name: "BLYVO",
    logo: Logo,
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: House,
    },
    {
      title: "About",
      url: "/dashboard/about",
      icon: Info,
    },
    {
      title: "Business",
      url: "/dashboard/business",
      icon: Compass,
    },
    {
      title: "Phone",
      url: "/dashboard/phone",
      icon: Smartphone,
    },
    {
      title: "Integrations",
      url: "/dashboard/integrations",
      icon: Puzzle,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-black! text-white">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-black! text-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-black! text-white">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
