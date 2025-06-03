
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useBotContext } from '@/contexts/BotContext';
import { Bot, Plus, Trash2, Power, Settings, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BotManagement: React.FC = () => {
  const { 
    allBots, 
    botConfig, 
    userTier, 
    createNewBot, 
    switchBot, 
    deleteBot, 
    canCreateBot, 
    getMaxBots 
  } = useBotContext();
  const { toast } = useToast();
  const [newBotName, setNewBotName] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateBot = () => {
    if (!newBotName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a bot name",
        variant: "destructive",
      });
      return;
    }

    const success = createNewBot(newBotName.trim());
    if (success) {
      toast({
        title: "Success",
        description: `Bot "${newBotName}" created successfully!`,
      });
      setNewBotName('');
      setIsCreateDialogOpen(false);
    } else {
      toast({
        title: "Error", 
        description: `You have reached the maximum number of bots (${getMaxBots()}) for your plan`,
        variant: "destructive",
      });
    }
  };

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
      description: `Bot "${botName}" has been deleted`,
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Bot</DialogTitle>
                <DialogDescription>
                  Give your new chatbot a name. You can configure its settings after creation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newBotName}
                    onChange={(e) => setNewBotName(e.target.value)}
                    placeholder="Enter bot name"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateBot}>
                  Create Bot
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage Limits</CardTitle>
            <CardDescription>Your current bot usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Bots Created</span>
              <span className="text-sm text-gray-600">
                {userTier.botsCreated} / {getMaxBots()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(userTier.botsCreated / getMaxBots()) * 100}%` }}
              ></div>
            </div>
            {userTier.plan === 'free' && (
              <p className="text-xs text-gray-500 mt-2">
                Upgrade to Premium to create up to 5 bots
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBots.map((bot) => (
          <Card key={bot.id} className={`relative ${bot.id === botConfig.id ? 'ring-2 ring-blue-500' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  {bot.name}
                </CardTitle>
                {bot.id === botConfig.id && (
                  <Badge variant="default">Active</Badge>
                )}
              </div>
              <CardDescription>
                Created: {new Date(bot.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Welcome Message:</p>
                  <p className="text-sm text-gray-600 truncate">{bot.welcomeMessage}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Tone:</p>
                  <Badge variant="outline" className="text-xs">
                    {bot.tone}
                  </Badge>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  {bot.id !== botConfig.id && (
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
                  
                  {bot.id === botConfig.id && (
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
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteBot(bot.id, bot.name)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BotManagement;
