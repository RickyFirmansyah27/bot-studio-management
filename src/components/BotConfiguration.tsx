
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useBotContext } from '@/contexts/BotContext';
import { Bot, MessageSquare, Palette } from 'lucide-react';

const BotConfiguration: React.FC = () => {
  const { botConfig, updateBotConfig } = useBotContext();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBotConfig({ name: e.target.value });
  };

  const handleWelcomeMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateBotConfig({ welcomeMessage: e.target.value });
  };

  const handleToneChange = (tone: 'friendly' | 'formal' | 'neutral') => {
    updateBotConfig({ tone });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="w-5 h-5 mr-2" />
            Bot Identity
          </CardTitle>
          <CardDescription>
            Configure your chatbot's name and personality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="botName">Bot Name</Label>
            <Input
              id="botName"
              value={botConfig.name}
              onChange={handleNameChange}
              placeholder="Enter your bot's name"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="welcomeMessage">Welcome Message</Label>
            <Textarea
              id="welcomeMessage"
              value={botConfig.welcomeMessage}
              onChange={handleWelcomeMessageChange}
              placeholder="Enter the greeting message your bot will show when chat starts"
              className="mt-1"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Response Tone
          </CardTitle>
          <CardDescription>
            Choose how your bot communicates with users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={botConfig.tone} onValueChange={handleToneChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="friendly">
                <div className="flex flex-col items-start">
                  <span className="font-medium">Friendly</span>
                  <span className="text-xs text-gray-500">Warm, casual, and approachable</span>
                </div>
              </SelectItem>
              <SelectItem value="formal">
                <div className="flex flex-col items-start">
                  <span className="font-medium">Formal</span>
                  <span className="text-xs text-gray-500">Professional and business-like</span>
                </div>
              </SelectItem>
              <SelectItem value="neutral">
                <div className="flex flex-col items-start">
                  <span className="font-medium">Neutral</span>
                  <span className="text-xs text-gray-500">Balanced and straightforward</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default BotConfiguration;
