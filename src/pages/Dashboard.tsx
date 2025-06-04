
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BotConfiguration from '@/components/BotConfiguration';
import ChatInterface from '@/components/ChatInterface';
import UsageLimits from '@/components/UsageLimits';
import { Settings, MessageSquare, BarChart3, Bot, Plus } from 'lucide-react';
import { useBotContext } from '@/contexts/BotContext';

const Dashboard: React.FC = () => {
  const { allBots, botConfig } = useBotContext();
  const navigate = useNavigate();

  // Jika belum ada bot, tampilkan halaman welcome
  if (allBots.length === 0) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-16">
          <Bot className="w-24 h-24 mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Selamat Datang di Bot Studio!</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Anda belum memiliki bot. Mari mulai dengan membuat bot pertama Anda untuk memulai perjalanan chatbot yang menakjubkan.
          </p>
          <Button onClick={() => navigate('/bot-management')} size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Buat Bot Pertama Saya
          </Button>
        </div>
      </div>
    );
  }

  // Jika tidak ada bot yang aktif
  if (!botConfig) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-16">
          <Settings className="w-24 h-24 mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Pilih Bot untuk Dikonfigurasi</h1>
          <p className="text-gray-600 mb-8">
            Anda memiliki {allBots.length} bot, tetapi belum ada yang aktif. Silakan pilih bot di halaman Bot Management.
          </p>
          <Button onClick={() => navigate('/bot-management')} size="lg">
            <Settings className="w-5 h-5 mr-2" />
            Kelola Bot Saya
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Mengelola bot: <span className="font-medium">{botConfig.name}</span>
        </p>
      </div>

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
