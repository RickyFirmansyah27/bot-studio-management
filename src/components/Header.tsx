
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBotContext } from '@/contexts/BotContext';
import { Crown, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const { userTier, botConfig } = useBotContext();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Bot Studio</h1>
          <Badge variant={userTier.plan === 'premium' ? 'default' : 'secondary'}>
            {userTier.plan === 'premium' ? (
              <>
                <Crown className="w-4 h-4 mr-1" />
                Premium
              </>
            ) : (
              'Free Tier'
            )}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Bot: <span className="font-medium">{botConfig.name}</span>
          </span>
          
          {userTier.plan === 'free' && (
            <div className="flex space-x-2 text-xs text-gray-500">
              <span>Messages: {userTier.monthlyMessagesUsed}/30</span>
              <span>URLs: {userTier.urlPagesUsed}/10</span>
            </div>
          )}
          
          <Button size="sm" variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
