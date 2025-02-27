"use client"

import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function SidebarNavItems({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon | React.FC
  }[]
}) {
  const { open } = useSidebar()

  return (
    <SidebarGroup className="">
      {/* group-data-[collapsible=icon]:hidden */}
      {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
      <SidebarMenu className={`flex flex-col  ${ open ? "items-start gap-5" : "items-cente gap-[30px]" } `}>

        { 
          open ? projects.map((item) => {
            const Icon = item.icon; // Treat it as a React component
            return (
            <SidebarMenuItem className='w-full' key={item.name}>
              <SidebarMenuButton className=' w-full' asChild>
                <Link href={item.url} className='flex flex-row gap-[10px]'>
                  {/* <item.icon /> */}
                  <Icon className="w-5 h-5" /> {/* Render icon properly */}
                  <span className=' w-full ml-3'>{item.name}</span>
                </Link>
              </SidebarMenuButton>
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </SidebarMenuItem>
          )}) 
          : 
          projects.map((item) => {
            const Icon = item.icon; // Treat it as a React component
            return (
              // <SidebarMenuItem className='bg-black w-full flex justify-center' key={item.name}>
              //   <TooltipProvider>
              //     <Tooltip>
              //       <TooltipTrigger>
              //         <SidebarMenuButton className='w-[100%] bg-slate-500' asChild>
              //           <a href={item.url}>
              //             <Icon className="w-[30px] h-[30px]" /> {/* Render icon properly */}
              //           </a>
              //         </SidebarMenuButton>
              //       </TooltipTrigger>
              //       <TooltipContent>
              //         <p>{ item.name }</p>
              //       </TooltipContent>
              //     </Tooltip>
              //   </TooltipProvider>

                
              // </SidebarMenuItem>
              <TooltipProvider  key={item.name}>
                  <Tooltip>
                    <TooltipTrigger className=' w-full flex justify-center'>
                      {/* <SidebarMenuButton className='w-[100%] bg-slate-500' asChild>
                      </SidebarMenuButton> */}
                        <a href={item.url}>
                          {/* <item.icon /> */}
                          <Icon className="w-[30px] h-[30px]" /> {/* Render icon properly */}
                        </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{ item.name }</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
            )
          })
        }
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  )
}
