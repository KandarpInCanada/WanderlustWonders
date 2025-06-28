"use client";

import { useState, useMemo } from "react";
import { ImageIcon, Globe, CalendarDays, User } from "lucide-react";

const mockStories = [
  {
    id: "1",
    title: "Mountain Escape",
    username: "alice",
    avatar: "/avatars/alice.jpg",
    location: "Rocky Mountains, USA",
    date: "2025-06-25T10:30:00Z",
    photo: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg",
    excerpt: "Hiking through the Rockies reminded me how small we really are. Pure peace.",
  },
  {
    id: "2",
    title: "Hiking the Swiss Alps",
    username: "bob",
    avatar: "/avatars/bob.jpg",
    location: "Zermatt, Switzerland",
    date: "2025-06-22T09:00:00Z",
    photo: "/photos/swissalps.jpg",
    excerpt: "Nothing beats fresh alpine air and stunning mountain views...",
  },
  {
    id: "3",
    title: "Markets of Marrakech",
    username: "charlie",
    avatar: "/avatars/charlie.jpg",
    location: "Marrakech, Morocco",
    date: "2025-06-19T12:30:00Z",
    photo: "/photos/marrakech.jpg",
    excerpt: "Exploring the spice-scented souks was an unforgettable sensory journey...",
  },
  {
    id: "3",
    title: "Markets of Marrakech",
    username: "charlie",
    avatar: "/avatars/charlie.jpg",
    location: "Marrakech, Morocco",
    date: "2025-06-19T12:30:00Z",
    photo: "/photos/marrakech.jpg",
    excerpt: "Exploring the spice-scented souks was an unforgettable sensory journey...",
  },
  {
    id: "3",
    title: "Markets of Marrakech",
    username: "charlie",
    avatar: "/avatars/charlie.jpg",
    location: "Marrakech, Morocco",
    date: "2025-06-19T12:30:00Z",
    photo: "/photos/marrakech.jpg",
    excerpt: "Exploring the spice-scented souks was an unforgettable sensory journey...",
  },
  {
    id: "3",
    title: "Markets of Marrakech",
    username: "charlie",
    avatar: "/avatars/charlie.jpg",
    location: "Marrakech, Morocco",
    date: "2025-06-19T12:30:00Z",
    photo: "/photos/marrakech.jpg",
    excerpt: "Exploring the spice-scented souks was an unforgettable sensory journey...",
  },
  {
    id: "3",
    title: "Markets of Marrakech",
    username: "charlie",
    avatar: "/avatars/charlie.jpg",
    location: "Marrakech, Morocco",
    date: "2025-06-19T12:30:00Z",
    photo: "/photos/marrakech.jpg",
    excerpt: "Exploring the spice-scented souks was an unforgettable sensory journey...",
  },
];

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);

  if (mins < 60) return `${mins} min ago`;
  if (hrs < 24) return `${hrs} hrs ago`;
  if (days < 7) return `${days} days ago`;

  return date.toLocaleDateString();
};

export default function TravelStoriesOverview() {
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  const handleImageLoadStart = (id: string) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageLoadComplete = (id: string) => {
    setImageLoading((prev) => ({ ...prev, [id]: false }));
  };

  const stories = useMemo(() => {
    return mockStories.map((story) => ({
      ...story,
      timeAgo: formatTimeAgo(story.date),
    }));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
          🌍 Explore Travel Stories
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Real journeys, beautiful memories, shared by wanderers like you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-card rounded-2xl shadow-md border border-border overflow-hidden group hover:shadow-lg transition-all duration-300 relative"
          >
            {/* Image Container */}
            <div className="relative h-64 w-full bg-muted flex items-center justify-center">
              {imageLoading[story.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse z-10">
                  <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                </div>
              )}
              <img
                src={story.photo}
                alt={story.title}
                onLoadStart={() => handleImageLoadStart(story.id)}
                onLoad={() => handleImageLoadComplete(story.id)}
                className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${
                  imageLoading[story.id] ? "opacity-0" : "opacity-100"
                }`}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-lg font-semibold text-white line-clamp-1">
                  {story.title}
                </h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 space-y-3">
              <div className="flex items-center space-x-3">
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="w-9 h-9 rounded-full object-cover border"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {story.username}
                  </p>
                  <p className="text-xs text-muted-foreground">{story.timeAgo}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3">
                {story.excerpt}
              </p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <Globe className="w-4 h-4" />
                <span>{story.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
