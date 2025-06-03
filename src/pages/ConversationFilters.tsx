
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Filter, Users, MessageSquare, TrendingUp } from 'lucide-react';

const ConversationFilters: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    includesLead: false,
    positivesentiment: false,
    negativesentiment: false,
    neutralSentiment: false,
    whatsappSource: false,
    webSource: false,
    emailSource: false
  });

  const [sentimentFilter, setSentimentFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  // Mock filtered conversations
  const filteredConversations = [
    {
      id: 1,
      user: 'Alice Johnson',
      email: 'alice@example.com',
      source: 'WhatsApp',
      sentiment: 'positive',
      hasLead: true,
      messages: 15,
      date: '2024-01-15',
      leadInfo: 'Interested in premium plan'
    },
    {
      id: 2,
      user: 'Bob Smith',
      email: 'bob@example.com',
      source: 'Web',
      sentiment: 'neutral',
      hasLead: false,
      messages: 8,
      date: '2024-01-14',
      leadInfo: null
    },
    {
      id: 3,
      user: 'Carol White',
      email: 'carol@example.com',
      source: 'Email',
      sentiment: 'negative',
      hasLead: true,
      messages: 22,
      date: '2024-01-13',
      leadInfo: 'Complained about pricing'
    }
  ];

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Badge className="bg-green-100 text-green-800">Positive</Badge>;
      case 'negative':
        return <Badge className="bg-red-100 text-red-800">Negative</Badge>;
      case 'neutral':
        return <Badge className="bg-gray-100 text-gray-800">Neutral</Badge>;
      default:
        return <Badge variant="secondary">{sentiment}</Badge>;
    }
  };

  const getSourceBadge = (source: string) => {
    const colors = {
      'WhatsApp': 'bg-green-100 text-green-800',
      'Web': 'bg-blue-100 text-blue-800',
      'Email': 'bg-purple-100 text-purple-800'
    };
    return <Badge className={colors[source as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{source}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Conversation Filters</h1>
        <p className="text-gray-600 mt-2">Filter conversations by various criteria</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filter Options */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter Options
              </CardTitle>
              <CardDescription>
                Select criteria to filter conversations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Lead Filters */}
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-3">Lead Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includes-lead"
                      checked={selectedFilters.includesLead}
                      onCheckedChange={(checked) => 
                        setSelectedFilters(prev => ({ ...prev, includesLead: checked as boolean }))
                      }
                    />
                    <label htmlFor="includes-lead" className="text-sm">
                      Show only conversations with leads
                    </label>
                  </div>
                </div>
              </div>

              {/* Sentiment Filters */}
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-3">Sentiment</h4>
                <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sentiment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sentiments</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Source Filters */}
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-3">Message Source</h4>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                Apply Filters
              </Button>
            </CardContent>
          </Card>

          {/* Filter Summary */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Filter Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Total Conversations:</span>
                  <Badge variant="outline">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>With Leads:</span>
                  <Badge variant="outline">2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Positive Sentiment:</span>
                  <Badge variant="outline">1</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtered Results */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Filtered Conversations</CardTitle>
              <CardDescription>
                {filteredConversations.length} conversations match your filters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Lead Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConversations.map((conversation) => (
                    <TableRow key={conversation.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{conversation.user}</div>
                          <div className="text-sm text-gray-500">{conversation.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getSourceBadge(conversation.source)}
                      </TableCell>
                      <TableCell>
                        {getSentimentBadge(conversation.sentiment)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{conversation.messages}</Badge>
                      </TableCell>
                      <TableCell>
                        {conversation.hasLead ? (
                          <div>
                            <Badge className="bg-green-100 text-green-800 mb-1">Lead</Badge>
                            <div className="text-xs text-gray-500">
                              {conversation.leadInfo}
                            </div>
                          </div>
                        ) : (
                          <Badge variant="outline">No Lead</Badge>
                        )}
                      </TableCell>
                      <TableCell>{conversation.date}</TableCell>
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
      </div>
    </div>
  );
};

export default ConversationFilters;
