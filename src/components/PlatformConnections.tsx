import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle2, Circle, Link2 } from 'lucide-react';

interface PlatformConnectionsProps {
  connectedPlatforms: {
    googleMaps: boolean;
    yelp: boolean;
    instagram: boolean;
    tiktok: boolean;
  };
  setConnectedPlatforms: React.Dispatch<React.SetStateAction<{
    googleMaps: boolean;
    yelp: boolean;
    instagram: boolean;
    tiktok: boolean;
  }>>;
}

export function PlatformConnections({ connectedPlatforms, setConnectedPlatforms }: PlatformConnectionsProps) {
  const apiBase = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:4000';
  const platforms = [
    {
      id: 'googleMaps',
      name: 'Google Maps',
      description: 'Share reviews and photos directly to Google Maps business listings',
      color: 'bg-green-500',
      icon: '📍',
      features: ['Business reviews', 'Photo uploads', 'Star ratings', 'Location tagging'],
    },
    {
      id: 'yelp',
      name: 'Yelp',
      description: 'Post reviews and recommendations to Yelp business pages',
      color: 'bg-red-500',
      icon: '⭐',
      features: ['Review posting', 'Photo uploads', '5-star ratings', 'Check-ins'],
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Share food photos and stories with your Instagram followers',
      color: 'bg-pink-500',
      icon: '📷',
      features: ['Feed posts', 'Stories', 'Location tags', 'Hashtags'],
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      description: 'Create short-form video content for TikTok (photos as slideshows)',
      color: 'bg-black',
      icon: '🎵',
      features: ['Photo slideshows', 'Music integration', 'Hashtags', 'Location tags'],
    },
  ];

  const handleConnect = (platformId: string) => {
    if (platformId === 'googleMaps') {
      // Real OAuth flow via backend
      window.location.href = `${apiBase}/auth/google`;
      return;
    }
    // Simulated for other platforms (Yelp/Instagram/TikTok) until wired
    setConnectedPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId as keyof typeof prev],
    }));
  };

  return (
    <div className="space-y-4">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Link2 className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-blue-900">
                Connect your social media and review platform accounts to start cross-posting. 
                Each platform requires authentication through their official OAuth process.
              </p>
              <p className="text-xs text-blue-700 mt-2">
                Note: In a production app, these connections would be securely managed through backend OAuth flows.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {platforms.map((platform) => {
          const isConnected = connectedPlatforms[platform.id as keyof typeof connectedPlatforms];
          
          return (
            <Card key={platform.id} className={isConnected ? 'border-green-200 bg-green-50' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{platform.icon}</span>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {platform.name}
                        {isConnected && (
                          <Badge className="bg-green-600">Connected</Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {platform.description}
                      </CardDescription>
                    </div>
                  </div>
                  {isConnected ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300 flex-shrink-0" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {platform.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="bg-white">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleConnect(platform.id)}
                    variant={isConnected ? 'outline' : 'default'}
                    className={isConnected ? '' : 'bg-orange-600 hover:bg-orange-700'}
                  >
                    {isConnected ? 'Disconnect' : `Connect ${platform.name}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
