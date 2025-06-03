
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BotConfig {
  name: string;
  welcomeMessage: string;
  tone: 'friendly' | 'formal' | 'neutral';
}

export interface UserTier {
  plan: 'free' | 'premium';
  urlPagesUsed: number;
  monthlyMessagesUsed: number;
  botsCreated: number;
}

interface BotContextType {
  botConfig: BotConfig;
  userTier: UserTier;
  updateBotConfig: (config: Partial<BotConfig>) => void;
  incrementMessageUsage: () => void;
  incrementUrlPages: (count: number) => void;
  canSendMessage: () => boolean;
  canAddUrlPages: (count: number) => boolean;
  canCreateBot: () => boolean;
}

const BotContext = createContext<BotContextType | undefined>(undefined);

const FREE_TIER_LIMITS = {
  urlPages: 10,
  monthlyMessages: 30,
  maxBots: 1,
};

export const BotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [botConfig, setBotConfig] = useState<BotConfig>({
    name: 'My Chatbot',
    welcomeMessage: 'Hello! How can I help you today?',
    tone: 'friendly',
  });

  const [userTier, setUserTier] = useState<UserTier>({
    plan: 'free',
    urlPagesUsed: 0,
    monthlyMessagesUsed: 0,
    botsCreated: 1,
  });

  const updateBotConfig = (config: Partial<BotConfig>) => {
    setBotConfig(prev => ({ ...prev, ...config }));
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
    if (userTier.plan === 'premium') return true;
    return userTier.botsCreated < FREE_TIER_LIMITS.maxBots;
  };

  return (
    <BotContext.Provider
      value={{
        botConfig,
        userTier,
        updateBotConfig,
        incrementMessageUsage,
        incrementUrlPages,
        canSendMessage,
        canAddUrlPages,
        canCreateBot,
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
