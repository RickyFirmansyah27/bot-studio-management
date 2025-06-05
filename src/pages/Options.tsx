import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Bot, Info, Key, LogOut, Mail, Lock } from "lucide-react";

const Options: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetLoading, setIsResetLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      toast({
        title: "Error",
        description: "Silakan masukkan password lama dan password baru",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password baru minimal 6 karakter",
        variant: "destructive",
      });
      return;
    }

    setIsResetLoading(true);

    // Simulasi proses reset password
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Reset Password Berhasil",
      description: "Password Anda telah berhasil diubah",
    });

    setOldPassword("");
    setNewPassword("");
    setIsResetLoading(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem",
    });
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Options</h1>
        <p className="text-gray-600 mt-1">
          Pengaturan akun dan informasi aplikasi
        </p>
      </div>

      <div className="space-y-6">
        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="w-5 h-5 mr-2" />
              About Bot Studio
            </CardTitle>
            <CardDescription>
              Information about the Bot Studio application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Bot className="w-12 h-12 text-blue-600" />
              <div>
                <h3 className="font-semibold text-lg">Bot Studio</h3>
                <p className="text-sm text-gray-600">Versi 1.0.0</p>
              </div>
            </div>
            <p className="text-gray-700">
              Bot Studio is a platform for easily creating and managing
              chatbots. With its intuitive interface, you can build responsive
              bots tailored to your business needs.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Key Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Flexible bot configuration</li>
                <li>• Real-time chat testing interface</li>
                <li>• Multiple bot management</li>
                <li>• Analytics and usage tracking</li>
                <li>• Free and Premium plans</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Reset Password Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="w-5 h-5 mr-2" />
              Reset Password
            </CardTitle>
            <CardDescription>
              Change your account password here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="old-password">Old Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="old-password"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Input old password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Input new password"
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <Button type="submit" disabled={isResetLoading}>
                {isResetLoading ? "Changes..." : "Change Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Separator />

        {/* Account Info & Logout */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LogOut className="w-5 h-5 mr-2" />
              Account
            </CardTitle>
            <CardDescription>Account Information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Current User:
              </h4>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {user?.name || "Tidak diset"}
                </p>
                <p>
                  <span className="font-medium">Plan:</span>
                  <span
                    className={`ml-1 px-2 py-1 rounded text-xs ${
                      user?.plan === "premium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user?.plan?.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="w-full sm:w-auto"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Options;
