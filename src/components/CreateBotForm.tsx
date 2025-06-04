
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, QrCode, CheckCircle, Loader2 } from 'lucide-react';
import { useBotContext } from '@/contexts/BotContext';
import { useToast } from '@/hooks/use-toast';

interface CreateBotFormProps {
  onClose: () => void;
}

const CreateBotForm: React.FC<CreateBotFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    welcomeMessage: '',
    tone: 'friendly' as 'friendly' | 'formal' | 'neutral'
  });
  const [step, setStep] = useState<'form' | 'qr' | 'success'>('form');
  const [isLoading, setIsLoading] = useState(false);
  
  const { createNewBot } = useBotContext();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.welcomeMessage.trim()) {
      toast({
        title: "Error",
        description: "Harap isi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setStep('qr');

    // Simulasi menampilkan QR code selama 5 detik
    setTimeout(() => {
      const success = createNewBot(formData.name.trim());
      
      if (success) {
        setStep('success');
        toast({
          title: "Bot Berhasil Dibuat!",
          description: `Bot "${formData.name}" telah berhasil dibuat dan terhubung.`,
        });
        
        // Tutup form setelah 2 detik
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast({
          title: "Error",
          description: "Gagal membuat bot. Anda mungkin telah mencapai batas maksimum.",
          variant: "destructive",
        });
        setStep('form');
      }
      setIsLoading(false);
    }, 5000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 'qr') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <QrCode className="w-6 h-6 mr-2" />
            Menghubungkan Bot
          </CardTitle>
          <CardDescription>
            Scan QR code untuk menghubungkan bot Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-48 h-48 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">QR Code Dummy</p>
                <p className="text-xs text-gray-500 mt-1">Connecting...</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm text-gray-600">Menghubungkan bot...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'success') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center text-green-600">
            <CheckCircle className="w-6 h-6 mr-2" />
            Bot Berhasil Dibuat!
          </CardTitle>
          <CardDescription>
            Bot Anda telah berhasil dibuat dan terhubung
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Bot className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-lg font-medium text-gray-900 mb-2">{formData.name}</p>
          <p className="text-sm text-gray-600">Siap untuk dikonfigurasi dan digunakan</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="w-5 h-5 mr-2" />
          Buat Bot Baru
        </CardTitle>
        <CardDescription>
          Isi informasi untuk membuat chatbot baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="botName">Nama Bot *</Label>
            <Input
              id="botName"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Masukkan nama bot"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcomeMessage">Welcome Message *</Label>
            <Textarea
              id="welcomeMessage"
              value={formData.welcomeMessage}
              onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
              placeholder="Masukkan pesan sambutan bot"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Response Tone</Label>
            <Select value={formData.tone} onValueChange={(value) => handleInputChange('tone', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tone respons" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Friendly</span>
                    <span className="text-xs text-gray-500">Ramah dan santai</span>
                  </div>
                </SelectItem>
                <SelectItem value="formal">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Formal</span>
                    <span className="text-xs text-gray-500">Profesional dan bisnis</span>
                  </div>
                </SelectItem>
                <SelectItem value="neutral">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Neutral</span>
                    <span className="text-xs text-gray-500">Seimbang dan langsung</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Batal
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Membuat...' : 'Buat Bot'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateBotForm;
