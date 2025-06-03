
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Activity, Clock, Users, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ActiveSessions: React.FC = () => {
  // Mock data for active sessions
  const activeSessions = [
    {
      id: 1,
      user: 'John Doe',
      email: 'john@example.com',
      startTime: '14:30',
      duration: '5 min',
      platform: 'Web',
      location: 'Jakarta',
      status: 'chatting'
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      email: 'sarah@example.com',
      startTime: '14:25',
      duration: '10 min',
      platform: 'WhatsApp',
      location: 'Bandung',
      status: 'waiting'
    },
    {
      id: 3,
      user: 'Mike Chen',
      email: 'mike@example.com',
      startTime: '14:20',
      duration: '15 min',
      platform: 'Web',
      location: 'Surabaya',
      status: 'chatting'
    }
  ];

  const sessionTrend = [
    { time: '14:00', sessions: 12 },
    { time: '14:15', sessions: 18 },
    { time: '14:30', sessions: 25 },
    { time: '14:45', sessions: 22 },
    { time: '15:00', sessions: 28 },
    { time: '15:15', sessions: 31 },
  ];

  const hourlyData = [
    { hour: '10:00', sessions: 15 },
    { hour: '11:00', sessions: 22 },
    { hour: '12:00', sessions: 35 },
    { hour: '13:00', sessions: 28 },
    { hour: '14:00', sessions: 45 },
    { hour: '15:00', sessions: 52 },
    { hour: '16:00', sessions: 38 },
    { hour: '17:00', sessions: 25 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'chatting':
        return <Badge className="bg-green-100 text-green-800">Chatting</Badge>;
      case 'waiting':
        return <Badge className="bg-yellow-100 text-yellow-800">Waiting</Badge>;
      case 'idle':
        return <Badge className="bg-gray-100 text-gray-800">Idle</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPlatformBadge = (platform: string) => {
    const colors = {
      'Web': 'bg-blue-100 text-blue-800',
      'WhatsApp': 'bg-green-100 text-green-800',
      'Email': 'bg-purple-100 text-purple-800'
    };
    return <Badge className={colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{platform}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Active Sessions</h1>
        <p className="text-gray-600 mt-2">Monitor currently active chat sessions</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Current Active Sessions
            </CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">45</div>
            <p className="text-xs text-gray-600">
              +5 from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Session Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5 min</div>
            <p className="text-xs text-blue-600 font-medium">
              +1.2 min from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Peak Sessions Today
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-gray-600">
              at 2:15 PM
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Most Active Platform
            </CardTitle>
            <Globe className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Web</div>
            <p className="text-xs text-gray-600">
              65% of sessions
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Session Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Session Trend</CardTitle>
            <CardDescription>
              Active sessions over the last hour (updates every 15 minutes)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sessionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Session Pattern */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Session Pattern</CardTitle>
            <CardDescription>
              Session activity throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Active Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Currently Active Sessions</CardTitle>
          <CardDescription>
            Live view of users currently chatting with the bot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{session.user}</div>
                      <div className="text-sm text-gray-500">{session.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getPlatformBadge(session.platform)}
                  </TableCell>
                  <TableCell>{session.location}</TableCell>
                  <TableCell>{session.startTime}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{session.duration}</Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(session.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Monitor
                      </Button>
                      <Button variant="outline" size="sm">
                        Join Chat
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveSessions;
