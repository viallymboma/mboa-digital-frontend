"use client"

import * as React from 'react';

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from '@/app/_components/LanguageSwitcher';
import {
  ContactSvgIcon,
  DashboardSvgIcon,
  GroupSvgIcon,
  HistorySvgIcon,
  HomeSvgIcon,
  MessagingSvgIcon,
  NotificationSvgIcon,
  PaymentsSvgIcon,
  RechargesSvgIcon,
  SvgIconsLogo,
  SvgLogoIcon,
} from '@/app/svg_components/SvgIcons';
import { Button } from '@/components/ui/button';
// import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';

// import ThemeSwitcher from '../dashboard/_components/ThemeSwitcher';
import { NavUser } from './NavUser';
import { SidebarNavItems } from './SidebarNavItems';
import ThemeSwitcher from './ThemeSwitcher';

// import { SidebarNavItems } from './SidebarNavItems';

// This is sample data.
const data = {
  user: {
    name: "Biteb Stephane",
    email: "biteb.st@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: DashboardSvgIcon,
    },
    {
      name: "Contacts",
      url: "/contacts",
      icon: ContactSvgIcon,
    },
    {
      name: "Groups",
      url: "/groups",
      icon: GroupSvgIcon,
    },
    {
      name: "Histories",
      url: "/histories",
      icon: HistorySvgIcon,
    },
    {
      name: "Recharges",
      url: "/recharges",
      icon: RechargesSvgIcon,
    },
    {
      name: "Payments",
      url: "/payments",
      icon: PaymentsSvgIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, isMobile } = useSidebar(); 
  const { t } = useTranslation();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className='flex justify-center items-center'>
        {/* <TeamSwitcher teams={data.teams} /> */}
        {
          open ? 
          <SvgIconsLogo />
          :
          <SvgLogoIcon width='42' />

        }
      </SidebarHeader>
      <SidebarContent className={`flex ${ isMobile ? "justify-start" : "justify-center" } `}>
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
        <SidebarNavItems projects={data.projects} />
        {
          isMobile ? 
            <div className='flex flex-col gap-3 px-4'>
              <Button className='bg-primaryAppearance flex flex-row gap-2 rounded-[20px] p-3'>
                  <MessagingSvgIcon />
                  <span>1.3K SMS</span>
                  {t('remainingSMS')}
              </Button>
              <Button className='bg-transparent'>
                  <HomeSvgIcon />
              </Button>
              <Button className='bg-transparent'>
                  <NotificationSvgIcon />
              </Button>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
            :
            ""
        }
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
