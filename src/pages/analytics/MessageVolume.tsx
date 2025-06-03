
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageSquare, TrendingUp, Clock, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

const MessageVolume: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState('week');

  // Mock data for different time frames
  const weeklyData = [
    { day: 'Mon', messages: 234, users: 45 },
    { day: 'Tue', messages: 189, users: 38 },
    { day: 'Wed', messages: 298, users: 52 },
    { day: 'Thu', messages: 256, users: 41 },
    { day: 'Fri', messages: 334, users: 58 },
    { day: 'Sat', messages: 178, users: 32 },
    { day: 'Sun', messages: 145, users: 28 },
  ];

  const monthlyData = [
    { week: 'Week 1', messages: 1234, users: 234 },
    { week: 'Week 2', messages: 1456, users: 267 },
    { week: 'Week 3', messages: 1678, users: 298 },
    { week: 'Week 4', messages: 1345, users: 245 },
  ];

  const hourlyData = [
    { hour: '00:00', messages: 12 },
    { hour: '03:00', messages: 8 },
    { hour: '06:00', messages: 15 },
    { hour: '09:00', messages: 45 },
    { hour: '12:00', messages: 78 },
    { hour: '15:00', messages: 92 },
    { hour: '18:00', messages: 67 },
    { hour: '21:00', messages: 34 },
  ];

  const messageTypes = [
    { type: 'User Messages', count: 2456, percentage: 65, color: '#3B82F6' },
    { type: 'Bot Responses', count: 2134, percentage: 56, color: '#10B981' },
    { type: 'Auto Replies', count: 456, percentage: 12, color: '#F59E0B' },
    { type: 'Error Messages', count: 89, percentage: 2, color: '#EF4444' },
  ];

  const getDataForTimeFrame = () => {
    switch (timeFrame) {
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      default:
        return weeklyData;
    }
  };

  const getCurrentStats = () => {
    switch (timeFrame) {
      case 'week':
        return {
          total: '1,634',
          change: '+18%',
          avgDaily: '233',
          peak: '334 (Friday)'
        };
      case 'month':
        return {
          total: '5,713',
          change: '+12%',
          avgDaily: '190',
          peak: '1,678 (Week 3)'
        };
      default:
        return {
          total: '1,634',
          change: '+18%',
          avgDaily: '233',
          peak: '334 (Friday)'
        };
    }
  };

  const stats = getCurrentStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Message Volume</h1>
          <p className="text-gray-600 mt-2">Track total messages exchanged with users</p>
        </div>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Messages ({timeFrame === 'week' ? 'Week' : 'Month'})
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-green-600 font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {stats.change} from last {timeFrame}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Daily Messages
            </CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgDaily}</div>
            <p className="text-xs text-gray-600">
              messages per day
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Peak Volume
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.peak}</div>
            <p className="text-xs text-blue-600 font-medium">
              highest message count
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Messages Per User
            </CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.4</div>
            <p className="text-xs text-gray-600">
              avg. messages per session
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Message Volume Trend</CardTitle>
            <CardDescription>
              {timeFrame === 'week' ? 'Daily message volume this week' : 'Weekly message volume this month'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getDataForTimeFrame()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={timeFrame === 'week' ? 'day' : 'week'} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="messages" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Users & Messages Correlation */}
        <Card>
          <CardHeader>
            <CardTitle>Users vs Messages</CardTitle>
            <CardDescription>
              Correlation between active users and message volume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getDataForTimeFrame()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={timeFrame === 'week' ? 'day' : 'week'} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="messages" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                  name="Messages"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="users" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981' }}
                  name="Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Message Distribution</CardTitle>
            <CardDescription>
              Message volume distribution by hour of day
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
                  dataKey="messages" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      
        {/* Message Types */}
        <Card>
          <CardHeader>
            <CardTitle>Message Types</CardTitle>
            <CardDescription>
              Breakdown of different message categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messageTypes.map((type, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{type.type}</span>
                    <span className="text-sm text-gray-500">{type.count} ({type.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{ width: `${type.percentage}%`, backgroundColor: type.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessageVolume;
