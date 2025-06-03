
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBotContext } from '@/contexts/BotContext';
import { Crown, MessageSquare, Globe, Bot } from 'lucide-react';

const UsageLimits: React.FC = () => {
  const { userTier } = useBotContext();

  const limits = {
    urlPages: { used: userTier.urlPagesUsed, max: 10 },
    monthlyMessages: { used: userTier.monthlyMessagesUsed, max: 30 },
    bots: { used: userTier.botsCreated, max: 1 },
  };

  if (userTier.plan === 'premium') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="w-5 h-5 mr-2 text-yellow-500" />
            Premium Plan
          </CardTitle>
          <CardDescription>
            You have unlimited access to all features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6">
            <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Unlimited Everything!</p>
            <p className="text-sm text-gray-600">
              Enjoy unlimited messages, URL pages, and multiple bots.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Free Tier Usage</CardTitle>
            <CardDescription>
              Monitor your current usage and limits
            </CardDescription>
          </div>
          <Badge variant="secondary">Free Plan</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm font-medium">Monthly Messages</span>
              </div>
              <span className="text-sm text-gray-600">
                {limits.monthlyMessages.used} / {limits.monthlyMessages.max}
              </span>
            </div>
            <Progress 
              value={(limits.monthlyMessages.used / limits.monthlyMessages.max) * 100} 
              className="h-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm font-medium">URL Pages Trained</span>
              </div>
              <span className="text-sm text-gray-600">
                {limits.urlPages.used} / {limits.urlPages.max}
              </span>
            </div>
            <Progress 
              value={(limits.urlPages.used / limits.urlPages.max) * 100} 
              className="h-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Bot className="w-4 h-4 mr-2 text-purple-500" />
                <span className="text-sm font-medium">Bots Created</span>
              </div>
              <span className="text-sm text-gray-600">
                {limits.bots.used} / {limits.bots.max}
              </span>
            </div>
            <Progress 
              value={(limits.bots.used / limits.bots.max) * 100} 
              className="h-2"
            />
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            Upgrade to Premium
          </h4>
          <p className="text-xs text-yellow-700 mb-3">
            Get unlimited messages, URL pages, and create multiple bots with advanced features.
          </p>
          <Button size="sm" className="w-full">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageLimits;
