
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface BotConfig {
  id: string;
  name: string;
  welcomeMessage: string;
  tone: 'friendly' | 'formal' | 'neutral';
  isActive: boolean;
  createdAt: string;
}

export interface UserTier {
  plan: 'free' | 'premium';
  urlPagesUsed: number;
  monthlyMessagesUsed: number;
  botsCreated: number;
}

interface BotContextType {
  botConfig: BotConfig | null;
  allBots: BotConfig[];
  userTier: UserTier;
  updateBotConfig: (config: Partial<BotConfig>) => void;
  createNewBot: (name: string) => boolean;
  switchBot: (botId: string) => void;
  deleteBot: (botId: string) => void;
  incrementMessageUsage: () => void;
  incrementUrlPages: (count: number) => void;
  canSendMessage: () => boolean;
  canAddUrlPages: (count: number) => boolean;
  canCreateBot: () => boolean;
  getMaxBots: () => number;
}

const BotContext = createContext<BotContextType | undefined>(undefined);

const FREE_TIER_LIMITS = {
  urlPages: 10,
  monthlyMessages: 30,
  maxBots: 1,
};

const PREMIUM_TIER_LIMITS = {
  maxBots: 5,
};

export const BotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [allBots, setAllBots] = useState<BotConfig[]>([]);
  const [activeBotId, setActiveBotId] = useState<string | null>(null);
  const [userTier, setUserTier] = useState<UserTier>({
    plan: 'free',
    urlPagesUsed: 0,
    monthlyMessagesUsed: 0,
    botsCreated: 0,
  });

  // Update user tier berdasarkan data user dari AuthContext
  useEffect(() => {
    if (user) {
      setUserTier(prev => ({
        ...prev,
        plan: user.plan,
      }));
    }
  }, [user]);

  const botConfig = allBots.find(bot => bot.id === activeBotId) || null;

  const getMaxBots = () => {
    return userTier.plan === 'premium' ? PREMIUM_TIER_LIMITS.maxBots : FREE_TIER_LIMITS.maxBots;
  };

  const updateBotConfig = (config: Partial<BotConfig>) => {
    if (!activeBotId) return;
    
    setAllBots(prev => prev.map(bot => 
      bot.id === activeBotId ? { ...bot, ...config } : bot
    ));
  };

  const createNewBot = (name: string): boolean => {
    if (!canCreateBot()) return false;

    const newBot: BotConfig = {
      id: Date.now().toString(),
      name,
      welcomeMessage: 'Hello! How can I help you today?',
      tone: 'friendly',
      isActive: false,
      createdAt: new Date().toISOString(),
    };

    setAllBots(prev => [...prev, newBot]);
    setUserTier(prev => ({ ...prev, botsCreated: prev.botsCreated + 1 }));
    
    // Set sebagai bot aktif jika ini bot pertama
    if (allBots.length === 0) {
      setActiveBotId(newBot.id);
      setAllBots(prev => prev.map(bot => ({
        ...bot,
        isActive: bot.id === newBot.id
      })));
    }
    
    return true;
  };

  const switchBot = (botId: string) => {
    setAllBots(prev => prev.map(bot => ({
      ...bot,
      isActive: bot.id === botId
    })));
    setActiveBotId(botId);
  };

  const deleteBot = (botId: string) => {
    if (allBots.length <= 1) return;
    
    setAllBots(prev => prev.filter(bot => bot.id !== botId));
    setUserTier(prev => ({ ...prev, botsCreated: Math.max(0, prev.botsCreated - 1) }));
    
    if (activeBotId === botId) {
      const remainingBots = allBots.filter(bot => bot.id !== botId);
      if (remainingBots.length > 0) {
        setActiveBotId(remainingBots[0].id);
        setAllBots(prev => prev.map(bot => ({
          ...bot,
          isActive: bot.id === remainingBots[0].id
        })));
      } else {
        setActiveBotId(null);
      }
    }
  };

  const incrementMessageUsage = () => {
    setUserTier(prev => ({
      ...prev,
      monthlyMessagesUsed: prev.monthlyMessagesUsed + 1,
    }));
  };

  const incrementUrlPages = (count: number) => {
    setUserTier(prev => ({
      ...prev,
      urlPagesUsed: prev.urlPagesUsed + count,
    }));
  };

  const canSendMessage = () => {
    if (userTier.plan === 'premium') return true;
    return userTier.monthlyMessagesUsed < FREE_TIER_LIMITS.monthlyMessages;
  };

  const canAddUrlPages = (count: number) => {
    if (userTier.plan === 'premium') return true;
    return userTier.urlPagesUsed + count <= FREE_TIER_LIMITS.urlPages;
  };

  const canCreateBot = () => {
    const maxBots = getMaxBots();
    return userTier.botsCreated < maxBots;
  };

  return (
    <BotContext.Provider
      value={{
        botConfig,
        allBots,
        userTier,
        updateBotConfig,
        createNewBot,
        switchBot,
        deleteBot,
        incrementMessageUsage,
        incrementUrlPages,
        canSendMessage,
        canAddUrlPages,
        canCreateBot,
        getMaxBots,
      }}
    >
      {children}
    </BotContext.Provider>
  );
};

export const useBotContext = () => {
  const context = useContext(BotContext);
  if (context === undefined) {
    throw new Error('useBotContext must be used within a BotProvider');
  }
  return context;
};
