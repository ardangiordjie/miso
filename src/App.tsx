import { useState } from 'react';
import { PostComposer } from './components/PostComposer';
import { PlatformConnections } from './components/PlatformConnections';
import { PostHistory } from './components/PostHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Camera } from 'lucide-react';

export default function App() {
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    googleMaps: false,
    yelp: false,
    instagram: false,
    tiktok: false,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Camera className="w-10 h-10 text-orange-600" />
            <h1 className="text-orange-600">miso</h1>
          </div>
          <p className="text-gray-600">Post to Google Maps, Yelp, Instagram & TikTok - All at Once</p>
        </div>

        <Tabs defaultValue="compose" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="compose">Compose Post</TabsTrigger>
            <TabsTrigger value="connections">Platform Connections</TabsTrigger>
            <TabsTrigger value="history">Post History</TabsTrigger>
          </TabsList>

          <TabsContent value="compose">
            <PostComposer connectedPlatforms={connectedPlatforms} />
          </TabsContent>

          <TabsContent value="connections">
            <PlatformConnections 
              connectedPlatforms={connectedPlatforms}
              setConnectedPlatforms={setConnectedPlatforms}
            />
          </TabsContent>

          <TabsContent value="history">
            <PostHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
