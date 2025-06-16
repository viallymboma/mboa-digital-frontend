"use client"

import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { notify } from '@/components/utilities/helper';
import useGetLocalStorage from '@/hooks/useGetLocalStorage';
import { useLogout } from '@/hooks/useLogout';
import { UserType } from '@/types/auth';

export function NavProfile({
  user,
}: {
  user: UserType
}) {
  const { isMobile } = useSidebar()
  const { logout } = useLogout();
  const { getLocalStorage } = useGetLocalStorage ()
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogout = async () => {
    notify.loading(t('loading.logout.ongoing'));
    try {
      await logout();
      notify.dismiss();
      notify.success(t('loading.logout.success'));
      router.push('/login');
    } catch (error) {
      notify.success(t('loading.logout.error'));
      console.error('Logout failed:', error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback className="rounded-lg">
                  { user?.username?.split("")[0] } { user?.username?.split("")[1] }
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.username}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">{ user?.username?.split("")[0] } { user?.username?.split("")[1] }</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.username}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                <Link href={"/profile"}>Account</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {
              getLocalStorage("user")?.role === "SUPER_ADMIN" ? 
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      <Link href={"/clients"}>Clients</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </>
                : 
                ""
            }
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
