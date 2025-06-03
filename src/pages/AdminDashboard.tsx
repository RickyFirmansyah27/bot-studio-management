
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
import { Users, MessageSquare, Activity, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data for demonstration
  const recentConversations = [
    {
      id: 1,
      user: 'John Doe',
      email: 'john@example.com',
      city: 'Jakarta',
      lastMessage: 'Thanks for the help!',
      timestamp: '2 minutes ago',
      status: 'completed'
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      email: 'sarah@example.com',
      city: 'Bandung',
      lastMessage: 'Can you help with pricing?',
      timestamp: '5 minutes ago',
      status: 'active'
    },
    {
      id: 3,
      user: 'Mike Chen',
      email: 'mike@example.com',
      city: 'Surabaya',
      lastMessage: 'I need a refund',
      timestamp: '10 minutes ago',
      status: 'pending'
    }
  ];

  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Sessions',
      value: '45',
      change: '+5%',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'Messages Today',
      value: '892',
      change: '+18%',
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '12.5%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor and manage chatbot interactions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 font-medium">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Conversations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>
            Latest chatbot interactions with users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Last Message</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentConversations.map((conversation) => (
                <TableRow key={conversation.id}>
                  <TableCell className="font-medium">
                    {conversation.user}
                  </TableCell>
                  <TableCell>{conversation.email}</TableCell>
                  <TableCell>{conversation.city}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {conversation.lastMessage}
                  </TableCell>
                  <TableCell>{conversation.timestamp}</TableCell>
                  <TableCell>
                    {getStatusBadge(conversation.status)}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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

export default AdminDashboard;
