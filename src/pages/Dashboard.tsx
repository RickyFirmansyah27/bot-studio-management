
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BotConfiguration from '@/components/BotConfiguration';
import ChatInterface from '@/components/ChatInterface';
import UsageLimits from '@/components/UsageLimits';
import { Settings, MessageSquare, BarChart3 } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <Tabs defaultValue="configuration" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="configuration" className="flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Configuration
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Test Chat
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Usage & Limits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BotConfiguration />
            </div>
            <div>
              <UsageLimits />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-[600px]">
                <ChatInterface />
              </div>
            </div>
            <div>
              <UsageLimits />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UsageLimits />
            <div className="space-y-4">
              {/* Additional usage analytics can be added here */}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
