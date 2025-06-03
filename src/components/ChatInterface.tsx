
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useBotContext } from '@/contexts/BotContext';
import { Send, Bot, User, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const { botConfig, userTier, canSendMessage, incrementMessageUsage } = useBotContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: botConfig.welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateBotResponse = (userMessage: string, tone: string): string => {
    const responses = {
      friendly: [
        "That's a great question! Let me help you with that. 😊",
        "I'd be happy to assist you with that! Here's what I think...",
        "Thanks for asking! Based on your message, I'd suggest...",
        "Hey there! That's an interesting point. Let me share some thoughts...",
      ],
      formal: [
        "Thank you for your inquiry. I will provide you with the appropriate information.",
        "I acknowledge your request and will respond accordingly.",
        "Based on your message, I can provide the following assistance:",
        "I have received your query and will address it professionally.",
      ],
      neutral: [
        "I understand your request. Here's the information you need:",
        "Based on your question, here's what I can tell you:",
        "I can help you with that. Here's my response:",
        "Your message has been received. Here's the relevant information:",
      ],
    };

    const toneResponses = responses[tone as keyof typeof responses];
    return toneResponses[Math.floor(Math.random() * toneResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    if (!canSendMessage()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue, botConfig.tone),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
      incrementMessageUsage();
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const remainingMessages = userTier.plan === 'free' ? 30 - userTier.monthlyMessagesUsed : Infinity;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Bot className="w-5 h-5 mr-2" />
            Test Chat - {botConfig.name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              Tone: {botConfig.tone}
            </Badge>
            {userTier.plan === 'free' && (
              <Badge variant={remainingMessages <= 5 ? 'destructive' : 'secondary'} className="text-xs">
                {remainingMessages} messages left
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0">
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 mt-1" />
                      ) : (
                        <Bot className="w-4 h-4 mt-1" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          {userTier.plan === 'free' && remainingMessages <= 0 ? (
            <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">
                You've reached your monthly message limit. Upgrade to Premium for unlimited messages.
              </span>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
