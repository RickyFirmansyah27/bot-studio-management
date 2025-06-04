
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useBotContext } from '@/contexts/BotContext';
import { Bot, Plus, Trash2, Power, Settings, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CreateBotForm from '@/components/CreateBotForm';

const BotManagement: React.FC = () => {
  const { 
    allBots, 
    botConfig, 
    userTier, 
    switchBot, 
    deleteBot, 
    canCreateBot, 
    getMaxBots 
  } = useBotContext();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleSwitchBot = (botId: string) => {
    switchBot(botId);
    toast({
      title: "Bot Switched",
      description: "Active bot changed successfully",
    });
  };

  const handleDeleteBot = (botId: string, botName: string) => {
    if (allBots.length <= 1) {
      toast({
        title: "Cannot Delete",
        description: "You must have at least one bot",
        variant: "destructive",
      });
      return;
    }

    deleteBot(botId);
    toast({
      title: "Bot Deleted",
      description: `Bot "${botName}" has been deleted successfully`,
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bot Management</h1>
          <p className="text-gray-600 mt-1">Create and manage your chatbots</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant={userTier.plan === 'premium' ? 'default' : 'secondary'}>
            {userTier.plan === 'premium' ? (
              <>
                <Crown className="w-4 h-4 mr-1" />
                Premium Plan
              </>
            ) : (
              'Free Plan'
            )}
          </Badge>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={!canCreateBot()}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Bot
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <CreateBotForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Usage Limits Card */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage Limits</CardTitle>
            <CardDescription>Your current bot usage and limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Bots Created</span>
              <span className="text-sm text-gray-600">
                {userTier.botsCreated} / {getMaxBots()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(userTier.botsCreated / getMaxBots()) * 100}%` }}
              ></div>
            </div>
            {userTier.plan === 'free' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  💡 Upgrade to Premium to create up to 5 bots and unlock advanced features
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bot Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBots.map((bot) => (
          <Card key={bot.id} className={`relative transition-all duration-200 ${bot.id === botConfig?.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-blue-600" />
                  {bot.name}
                </CardTitle>
                {bot.id === botConfig?.id && (
                  <Badge variant="default" className="bg-green-500">
                    <Power className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>
              <CardDescription>
                Created: {new Date(bot.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Welcome Message:</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded text-wrap">
                    {bot.welcomeMessage}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Tone:</p>
                  <Badge variant="outline" className="text-xs capitalize">
                    {bot.tone}
                  </Badge>
                </div>
                
                <div className="flex space-x-2 pt-3 border-t">
                  {bot.id !== botConfig?.id && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSwitchBot(bot.id)}
                      className="flex-1"
                    >
                      <Power className="w-4 h-4 mr-1" />
                      Activate
                    </Button>
                  )}
                  
                  {bot.id === botConfig?.id && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                      disabled
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                  )}
                  
                  {allBots.length > 1 && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="px-3"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Bot</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "<strong>{bot.name}</strong>"? 
                            This action cannot be undone and all bot data will be permanently removed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteBot(bot.id, bot.name)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete Bot
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {allBots.length === 0 && (
        <div className="text-center py-12">
          <Bot className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bots created yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first chatbot</p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Bot
          </Button>
        </div>
      )}
    </div>
  );
};

export default BotManagement;
