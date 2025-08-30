"use client";
import React from 'react';

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/app/_components/LanguageSwitcher';
import {
  ContactSvgIcon,
  DashboardSvgIcon,
  GroupSvgIcon,
  HistorySvgIcon,
  HomeSvgIcon,
  MessagingSvgIcon,
  NotificationSvgIcon,
  RechargesSvgIcon,
  SchoolsSvgIcon,
  SvgIconsLogo,
  SvgLogoIcon,
} from '@/app/svg_components/SvgIcons';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { useUser } from '@/hooks/useAuth.hook';

import { NavProfile } from './NavProfile';
import { SidebarNavItems } from './SidebarNavItems';
import ThemeSwitcher from './ThemeSwitcher';

const data = {
  teams: [
    { name: 'Acme Inc', logo: GalleryVerticalEnd, plan: 'Enterprise' },
    { name: 'Acme Corp.', logo: AudioWaveform, plan: 'Startup' },
    { name: 'Evil Corp.', logo: Command, plan: 'Free' },
  ],
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: 'History', url: '#' },
        { title: 'Starred', url: '#' },
        { title: 'Settings', url: '#' },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        { title: 'Genesis', url: '#' },
        { title: 'Explorer', url: '#' },
        { title: 'Quantum', url: '#' },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        { title: 'Introduction', url: '#' },
        { title: 'Get Started', url: '#' },
        { title: 'Tutorials', url: '#' },
        { title: 'Changelog', url: '#' },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        { title: 'General', url: '#' },
        { title: 'Team', url: '#' },
        { title: 'Billing', url: '#' },
        { title: 'Limits', url: '#' },
      ],
    },
  ],
  projects: [
    { name: 'general.navigation.dashboard', url: '/dashboard', icon: DashboardSvgIcon },
    { name: 'general.navigation.contacts', url: '/contacts', icon: ContactSvgIcon },
    { name: 'general.navigation.groups', url: '/groups', icon: GroupSvgIcon },
    { name: 'general.navigation.histories', url: '/histories', icon: HistorySvgIcon },
    { name: 'general.navigation.recharges', url: '/recharges', icon: RechargesSvgIcon },
    { name: 'general.navigation.users', url: '/clients', icon: SchoolsSvgIcon },
    { name: 'general.navigation.companies', url: '/companies', icon: SchoolsSvgIcon },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, isMobile } = useSidebar();
  const t = useTranslations();
  const { userNow } = useUser();
  const isSuperAdmin = userNow?.role === 'SUPER_ADMIN';
  const isAdmin = userNow?.role === 'ADMIN_USER';

  const filteredProjects = data.projects.map(project => ({
    ...project,
    name: t(project.name)
  })).filter(project => 
    (project.url === '/companies' ? isSuperAdmin : true) && 
    (project.url === '/clients' ? isSuperAdmin || isAdmin : true)
  );

  return (
    <Sidebar className="dark:bg-gray-800" collapsible="icon" {...props}>
      <SidebarHeader className="flex justify-center items-center">
        {open ? <SvgIconsLogo /> : <SvgLogoIcon width="42" />}
      </SidebarHeader>
      <SidebarContent className={`flex ${isMobile ? 'justify-start' : 'justify-center'}`}>
        <SidebarNavItems projects={filteredProjects} />
        {isMobile ? (
          <div className="flex flex-col gap-3 px-4">
            <Button className="bg-primaryAppearance flex flex-row gap-2 rounded-[20px] p-3">
              <MessagingSvgIcon />
              <span>{userNow?.enterprise?.smsCredit} SMS</span>
              {t('register.remainingSMS')}
            </Button>
            <Button className="bg-transparent">
              <HomeSvgIcon />
            </Button>
            <Button className="bg-transparent">
              <NotificationSvgIcon />
            </Button>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        ) : null}
      </SidebarContent>
      <SidebarFooter>
        <NavProfile user={userNow} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// 'use client';

// import * as React from 'react';

// import {
//   AudioWaveform,
//   BookOpen,
//   Bot,
//   Command,
//   GalleryVerticalEnd,
//   Settings2,
//   SquareTerminal,
// } from 'lucide-react';
// import { useTranslation } from 'react-i18next';

// import LanguageSwitcher from '@/app/_components/LanguageSwitcher';
// import {
//   ContactSvgIcon,
//   DashboardSvgIcon,
//   GroupSvgIcon,
//   HistorySvgIcon,
//   HomeSvgIcon,
//   MessagingSvgIcon,
//   NotificationSvgIcon,
//   RechargesSvgIcon,
//   SchoolsSvgIcon,
//   SvgIconsLogo,
//   SvgLogoIcon,
// } from '@/app/svg_components/SvgIcons';
// import { Button } from '@/components/ui/button';
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
//   useSidebar,
// } from '@/components/ui/sidebar';
// import { useUser } from '@/hooks/useAuth.hook';

// import { NavProfile } from './NavProfile';
// import { SidebarNavItems } from './SidebarNavItems';
// import ThemeSwitcher from './ThemeSwitcher';

// const data = {
//   teams: [
//     {
//       name: 'Acme Inc',
//       logo: GalleryVerticalEnd,
//       plan: 'Enterprise',
//     },
//     {
//       name: 'Acme Corp.',
//       logo: AudioWaveform,
//       plan: 'Startup',
//     },
//     {
//       name: 'Evil Corp.',
//       logo: Command,
//       plan: 'Free',
//     },
//   ],
//   navMain: [
//     {
//       title: 'Playground',
//       url: '#',
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         { title: 'History', url: '#' },
//         { title: 'Starred', url: '#' },
//         { title: 'Settings', url: '#' },
//       ],
//     },
//     {
//       title: 'Models',
//       url: '#',
//       icon: Bot,
//       items: [
//         { title: 'Genesis', url: '#' },
//         { title: 'Explorer', url: '#' },
//         { title: 'Quantum', url: '#' },
//       ],
//     },
//     {
//       title: 'Documentation',
//       url: '#',
//       icon: BookOpen,
//       items: [
//         { title: 'Introduction', url: '#' },
//         { title: 'Get Started', url: '#' },
//         { title: 'Tutorials', url: '#' },
//         { title: 'Changelog', url: '#' },
//       ],
//     },
//     {
//       title: 'Settings',
//       url: '#',
//       icon: Settings2,
//       items: [
//         { title: 'General', url: '#' },
//         { title: 'Team', url: '#' },
//         { title: 'Billing', url: '#' },
//         { title: 'Limits', url: '#' },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Dashboard",
//       url: "/dashboard",
//       icon: DashboardSvgIcon,
//     },
//     {
//       name: "Contacts",
//       url: "/contacts",
//       icon: ContactSvgIcon,
//     },
//     {
//       name: "Groups",
//       url: "/groups",
//       icon: GroupSvgIcon,
//     },
//     {
//       name: "Histories",
//       url: "/histories",
//       icon: HistorySvgIcon,
//     },
//     {
//       name: "Recharges",
//       url: "/recharges",
//       icon: RechargesSvgIcon,
//     },
//     {
//       name: "Utilisateurs",
//       url: "/clients",
//       icon: SchoolsSvgIcon,
//     },
//     {
//       name: "Companies",
//       url: "/companies",
//       icon: SchoolsSvgIcon,
//     },
//   ],
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const { open, isMobile } = useSidebar();
//   const { t } = useTranslation();
//   const { userNow } = useUser();
//   const isSuperAdmin = userNow?.role === 'SUPER_ADMIN';
//   const isAdmin = userNow?.role === 'ADMIN_USER';

//   // Filter projects to hide Companies for non-SUPER_ADMIN users
//   const filteredProjects = data.projects.filter((project) =>
//     (project.url === '/companies' ? isSuperAdmin : true) && (project?.url === '/clients' ? isSuperAdmin || isAdmin : true )
//   );

//   return (
//     <Sidebar className="dark:bg-gray-800" collapsible="icon" {...props}>
//       <SidebarHeader className="flex justify-center items-center">
//         {open ? <SvgIconsLogo /> : <SvgLogoIcon width="42" />}
//       </SidebarHeader>
//       <SidebarContent className={`flex ${isMobile ? 'justify-start' : 'justify-center'}`}>
//         <SidebarNavItems projects={filteredProjects} />
//         {isMobile ? (
//           <div className="flex flex-col gap-3 px-4">
//             <Button className="bg-primaryAppearance flex flex-row gap-2 rounded-[20px] p-3">
//               <MessagingSvgIcon />
//               <span>1.3K SMS</span>
//               {t('register.remainingSMS')}
//             </Button>
//             <Button className="bg-transparent">
//               <HomeSvgIcon />
//             </Button>
//             <Button className="bg-transparent">
//               <NotificationSvgIcon />
//             </Button>
//             <LanguageSwitcher />
//             <ThemeSwitcher />
//           </div>
//         ) : null}
//       </SidebarContent>
//       <SidebarFooter>
//         <NavProfile user={userNow} />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }
