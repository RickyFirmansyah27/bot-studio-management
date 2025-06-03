
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Search, Calendar, Filter } from 'lucide-react';

const SearchHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [city, setCity] = useState('');

  // Mock search results
  const searchResults = [
    {
      id: 1,
      user: 'John Doe',
      email: 'john@example.com',
      city: 'Jakarta',
      message: 'What are your pricing options?',
      date: '2024-01-15',
      keyword: 'pricing',
      sentiment: 'neutral'
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      email: 'sarah@example.com',
      city: 'Bandung',
      message: 'I need help with a refund process',
      date: '2024-01-14',
      keyword: 'refund',
      sentiment: 'negative'
    },
    {
      id: 3,
      user: 'Mike Chen',
      email: 'mike@example.com',
      city: 'Surabaya',
      message: 'Great service, thank you!',
      date: '2024-01-13',
      keyword: 'service',
      sentiment: 'positive'
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Search History</h1>
        <p className="text-gray-600 mt-2">Search and filter through conversation history</p>
      </div>

      {/* Search Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Search Filters
          </CardTitle>
          <CardDescription>
            Use filters to find specific conversations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Search Term
              </label>
              <Input
                placeholder="Enter keyword, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Date Range
              </label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                City
              </label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jakarta">Jakarta</SelectItem>
                  <SelectItem value="bandung">Bandung</SelectItem>
                  <SelectItem value="surabaya">Surabaya</SelectItem>
                  <SelectItem value="medan">Medan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>
            {searchResults.length} conversations found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Keyword</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.user}</TableCell>
                  <TableCell>{result.email}</TableCell>
                  <TableCell>{result.city}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {result.message}
                  </TableCell>
                  <TableCell>{result.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{result.keyword}</Badge>
                  </TableCell>
                  <TableCell>
                    {getSentimentBadge(result.sentiment)}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Full
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

export default SearchHistory;
