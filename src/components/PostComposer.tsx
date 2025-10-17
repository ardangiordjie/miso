import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { ImagePlus, MapPin, Star, Send, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PostComposerProps {
  connectedPlatforms: {
    googleMaps: boolean;
    yelp: boolean;
    instagram: boolean;
    tiktok: boolean;
  };
}

export function PostComposer({ connectedPlatforms }: PostComposerProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    googleMaps: false,
    yelp: false,
    instagram: false,
    tiktok: false,
  });
  const [restaurantName, setRestaurantName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [caption, setCaption] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [posted, setPosted] = useState(false);

  const platforms = [
    { id: 'googleMaps', name: 'Google Maps', color: 'bg-green-500', icon: '📍' },
    { id: 'yelp', name: 'Yelp', color: 'bg-red-500', icon: '⭐' },
    { id: 'instagram', name: 'Instagram', color: 'bg-pink-500', icon: '📷' },
    { id: 'tiktok', name: 'TikTok', color: 'bg-black', icon: '🎵' },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId as keyof typeof prev],
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setPhotos(prev => [...prev, ...newFiles]);
      
      // Create preview URLs
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    setIsPosting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPosting(false);
    setPosted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setPosted(false);
      setCaption('');
      setRestaurantName('');
      setLocation('');
      setPhotos([]);
      setPreviewUrls([]);
      setRating(5);
    }, 3000);
  };

  const selectedCount = Object.values(selectedPlatforms).filter(Boolean).length;
  const connectedCount = Object.values(connectedPlatforms).filter(Boolean).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
        <CardDescription>
          Share your food experience across multiple platforms simultaneously
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {connectedCount === 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Connect at least one platform in the "Platform Connections" tab to start posting
            </AlertDescription>
          </Alert>
        )}

        {/* Platform Selection */}
        <div>
          <Label className="mb-3 block">Select Platforms to Post</Label>
          <div className="grid grid-cols-2 gap-3">
            {platforms.map(platform => (
              <div
                key={platform.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPlatforms[platform.id as keyof typeof selectedPlatforms]
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${
                  !connectedPlatforms[platform.id as keyof typeof connectedPlatforms]
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                onClick={() => {
                  if (connectedPlatforms[platform.id as keyof typeof connectedPlatforms]) {
                    handlePlatformToggle(platform.id);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{platform.icon}</span>
                    <span>{platform.name}</span>
                  </div>
                  <Checkbox
                    checked={selectedPlatforms[platform.id as keyof typeof selectedPlatforms]}
                    disabled={!connectedPlatforms[platform.id as keyof typeof connectedPlatforms]}
                  />
                </div>
                {!connectedPlatforms[platform.id as keyof typeof connectedPlatforms] && (
                  <p className="text-xs text-gray-500 mt-2">Not connected</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="restaurant">Restaurant Name</Label>
            <Input
              id="restaurant"
              placeholder="e.g., The Golden Spoon"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <div className="relative mt-1.5">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="location"
                placeholder="e.g., San Francisco, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <Label className="mb-2 block">Rating</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <Label className="mb-3 block">Photos</Label>
          <div className="space-y-3">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative aspect-square group">
                  <ImageWithFallback
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                <ImagePlus className="w-8 h-8 text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div>
          <Label htmlFor="caption">Caption</Label>
          <Textarea
            id="caption"
            placeholder="Write your review or caption here... Each platform will optimize the format automatically."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={6}
            className="mt-1.5 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1.5">
            {caption.length} characters
          </p>
        </div>

        {/* Post Button */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-600">
            {selectedCount > 0 ? (
              <span>
                Posting to <span className="text-orange-600">{selectedCount}</span> platform{selectedCount !== 1 ? 's' : ''}
              </span>
            ) : (
              <span>Select at least one platform</span>
            )}
          </div>
          <Button
            onClick={handlePost}
            disabled={selectedCount === 0 || !restaurantName || !caption || isPosting}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isPosting ? (
              <>
                <span className="animate-pulse">Posting...</span>
              </>
            ) : posted ? (
              <>Posted! ✓</>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Post to All Selected
              </>
            )}
          </Button>
        </div>

        {posted && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Successfully posted to {selectedCount} platform{selectedCount !== 1 ? 's' : ''}!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
