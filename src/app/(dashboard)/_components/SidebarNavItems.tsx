"use client"

import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname()

  return (
    <SidebarGroup className="">
      <SidebarMenu className={`flex flex-col ${open ? "items-start gap-5" : "items-center gap-[30px]"}`}>

        { 
          open ? projects.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.url;
            return (
            <SidebarMenuItem className='w-full' key={item.name}>
              <SidebarMenuButton className='w-full' asChild>
                <Link 
                  href={item.url} 
                  className={`
                    flex flex-row gap-[10px] items-center
                    ${isActive ? `
                      relative
                      before:content-["("]
                      before:absolute before:-left-3
                      after:content-[")"]
                      after:absolute after:-right-3
                      font-mono
                      bg-gray-100
                      dark:bg-gray-800
                      text-primaryAppearance
                      px-4
                      py-1
                      rounded-md
                    ` : 'text-muted-foreground hover:text-primary'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className='w-full ml-3'>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}) 
          : 
          projects.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.url;
            return (
              <TooltipProvider key={item.name}>
                <Tooltip>
                  <TooltipTrigger className='w-full flex justify-center'>
                    <Link 
                      href={item.url} 
                      className={`
                        ${isActive ? `
                          border-x-4 px-2 border-x-primaryAppearance
                          relative
                          dark:bg-gray-800
                          font-mono
                        ` : 'text-muted-foreground hover:text-primary'}
                      `}
                      // before:content-["("]
                      //   before:absolute before:-left-3
                      //   after:content-[")"]
                      //   after:absolute after:-right-3
                      //   after:-top-0
                    >
                      <Icon color={` ${ isActive ? "#7B18CC" : "black" }`} className="w-[30px] h-[30px]" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })
        }
      </SidebarMenu>
    </SidebarGroup>
  )
}













// "use client"

// import { type LucideIcon } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation'; // Add this import

// import {
//   SidebarGroup,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from '@/components/ui/sidebar';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';

// export function SidebarNavItems({
//   projects,
// }: {
//   projects: {
//     name: string
//     url: string
//     icon: LucideIcon | React.FC
//   }[]
// }) {
//   const { open } = useSidebar()
//   const pathname = usePathname() // Get current path

//   return (
//     <SidebarGroup className="">
//       <SidebarMenu className={`flex flex-col  ${ open ? "items-start gap-5" : "items-cente gap-[30px]" } `}>

//         { 
//           open ? projects.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname === item.url; // Check if current path matches item URL
//             return (
//             <SidebarMenuItem className='w-full' key={item.name}>
//               <SidebarMenuButton className='w-full' asChild>
//                 <Link 
//                   href={item.url} 
//                   className={`flex flex-row gap-[10px] ${isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary'}`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className='w-full ml-3'>{item.name}</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           )}) 
//           : 
//           projects.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname === item.url; // Check if current path matches item URL
//             return (
//               <TooltipProvider key={item.name}>
//                 <Tooltip>
//                   <TooltipTrigger className='w-full flex justify-center'>
//                     <Link href={item.url} className={isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}>
//                       <Icon className="w-[30px] h-[30px]" />
//                     </Link>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>{item.name}</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             )
//           })
//         }
//       </SidebarMenu>
//     </SidebarGroup>
//   )
// }










// "use client"

// import { type LucideIcon } from 'lucide-react';
// import Link from 'next/link';

// import {
//   SidebarGroup,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from '@/components/ui/sidebar';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';

// export function SidebarNavItems({
//   projects,
// }: {
//   projects: {
//     name: string
//     url: string
//     icon: LucideIcon | React.FC
//   }[]
// }) {
//   const { open } = useSidebar()

//   return (
//     <SidebarGroup className="">
//       {/* group-data-[collapsible=icon]:hidden */}
//       {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
//       <SidebarMenu className={`flex flex-col  ${ open ? "items-start gap-5" : "items-cente gap-[30px]" } `}>

//         { 
//           open ? projects.map((item) => {
//             const Icon = item.icon; // Treat it as a React component
//             return (
//             <SidebarMenuItem className='w-full' key={item.name}>
//               <SidebarMenuButton className=' w-full' asChild>
//                 <Link href={item.url} className='flex flex-row gap-[10px]'>
//                   {/* <item.icon /> */}
//                   <Icon className="w-5 h-5" /> {/* Render icon properly */}
//                   <span className=' w-full ml-3'>{item.name}</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           )}) 
//           : 
//           projects.map((item) => {
//             const Icon = item.icon; // Treat it as a React component
//             return (
//               // </SidebarMenuItem>
//               <TooltipProvider  key={item.name}>
//                   <Tooltip>
//                     <TooltipTrigger className=' w-full flex justify-center'>
//                         <a href={item.url}>
//                           <Icon className="w-[30px] h-[30px]" /> {/* Render icon properly */}
//                         </a>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>{ item.name }</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>
//             )
//           })
//         }
//       </SidebarMenu>
//     </SidebarGroup>
//   )
// }
