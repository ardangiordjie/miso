import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Star, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PostHistory() {
  // Mock data for post history
  const posts = [
    {
      id: 1,
      restaurant: 'Bella Italia',
      location: 'New York, NY',
      rating: 5,
      date: '2025-10-15',
      caption: 'Amazing authentic Italian cuisine! The pasta was perfectly al dente and the tiramisu was divine. 🍝✨',
      platforms: ['googleMaps', 'yelp', 'instagram'],
      photoUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    },
    {
      id: 2,
      restaurant: 'Sushi Master',
      location: 'Los Angeles, CA',
      rating: 5,
      date: '2025-10-12',
      caption: 'Freshest sushi in LA! The omakase experience was incredible. Every piece was a work of art. 🍣🎌',
      platforms: ['yelp', 'instagram', 'tiktok'],
      photoUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
    },
    {
      id: 3,
      restaurant: 'The Burger Joint',
      location: 'Chicago, IL',
      rating: 4,
      date: '2025-10-10',
      caption: 'Juicy burgers and crispy fries! A bit crowded but totally worth the wait. 🍔🍟',
      platforms: ['googleMaps', 'instagram'],
      photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    },
    {
      id: 4,
      restaurant: 'Green Garden Cafe',
      location: 'San Francisco, CA',
      rating: 5,
      date: '2025-10-08',
      caption: 'Beautiful vegan options! The plant-based burger was surprisingly delicious and the ambiance is perfect. 🌱💚',
      platforms: ['googleMaps', 'yelp', 'instagram', 'tiktok'],
      photoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    },
  ];

  const platformIcons: { [key: string]: string } = {
    googleMaps: '📍',
    yelp: '⭐',
    instagram: '📷',
    tiktok: '🎵',
  };

  const platformNames: { [key: string]: string } = {
    googleMaps: 'Google Maps',
    yelp: 'Yelp',
    instagram: 'Instagram',
    tiktok: 'TikTok',
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-orange-900">
              Your posting history across all platforms
            </p>
            <p className="text-sm text-orange-700 mt-1">
              {posts.length} posts • {posts.reduce((acc, post) => acc + post.platforms.length, 0)} total platform posts
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-48 md:flex-shrink-0">
                <ImageWithFallback
                  src={post.photoUrl}
                  alt={post.restaurant}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{post.restaurant}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {post.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: post.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">{post.caption}</p>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Posted to:</p>
                    <div className="flex flex-wrap gap-2">
                      {post.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="bg-white">
                          <span className="mr-1">{platformIcons[platform]}</span>
                          {platformNames[platform]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
