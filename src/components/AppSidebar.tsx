
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Filter, 
  Users, 
  Activity, 
  MessageSquare,
  Settings,
  Bot,
  Cog
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

const mainMenuItems = [
  {
    title: 'Bot Studio',
    url: '/',
    icon: Bot,
  },
  {
    title: 'Bot Management',
    url: '/bot-management',
    icon: Cog,
  },
];

const chatManagementItems = [
  {
    title: 'Admin Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Search History',
    url: '/search-history',
    icon: Search,
  },
  {
    title: 'Conversation Filters',
    url: '/conversation-filters',
    icon: Filter,
  },
];

const analyticsItems = [
  {
    title: 'Total Users',
    url: '/analytics/users',
    icon: Users,
  },
  {
    title: 'Active Sessions',
    url: '/analytics/sessions',
    icon: Activity,
  },
  {
    title: 'Message Volume',
    url: '/analytics/messages',
    icon: MessageSquare,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
      : 'hover:bg-sidebar-accent/50';

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-primary" />
          {!isCollapsed && (
            <span className="font-bold text-lg">Bot Studio</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName} end>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Chat Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Chat Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatManagementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics */}
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/settings" className={getNavClassName}>
                    <Settings className="h-4 w-4" />
                    {!isCollapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
