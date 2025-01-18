import * as React from 'react';
import {
  BookOpen,
  Frame,
  Map,
  PieChart,
  Settings2,
  ShoppingCart,
  UsersRound,
} from 'lucide-react';

import { NavMain } from '@/components/layout/nav-main.layout';
import { NavProjects } from '@/components/layout/nav-projects.layout';
import { NavUser } from '@/components/layout/nav-user.layout';
import { TeamSwitcher } from '@/components/layout/team-switcher.layout';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAppSelector } from '@/hooks/redux.hook';
import { selectLoggedInUser } from '@/store/slices/loggedInUser.slice';
import { webRoutes } from '@/routes/web.route';

const data = {
  navMain: [
    {
      title: 'Users',
      url: '#',
      icon: UsersRound,
      items: [
        {
          title: 'All Users',
          url: webRoutes.users,
        },
      ],
    },
    {
      title: 'Products',
      url: '#',
      icon: ShoppingCart,
      items: [
        {
          title: 'All Products',
          url: webRoutes.products,
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector(selectLoggedInUser);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
