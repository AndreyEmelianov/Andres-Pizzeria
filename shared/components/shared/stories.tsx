'use client';
import React from 'react';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';

import { IStory } from '@/shared/services/stories';
import { Api } from '@/shared/services/api-client';
import { Container } from './container';
import { cn } from '@/shared/lib/utils';

interface StoriesProps {
  className?: string;
}

export const Stories: React.FC<StoriesProps> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [storiesOpen, setStoriesOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setStoriesOpen(true);
    }
  };

  return (
    <Container className={cn('flex items-center justify-between gap-2 my-10', className)}>
      {stories.length === 0 &&
        [...Array(6)].map((_, index) => (
          <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
        ))}
      {stories.map((story) => (
        <img
          key={story.id}
          height={250}
          width={200}
          src={story.previewImageUrl}
          className="rounded-md cursor-pointer"
          onClick={() => onClickStory(story)}
        />
      ))}

      {storiesOpen && (
        <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center z-30 bg-black/70">
          <div className="relative" style={{ width: 520 }}>
            <button className="absolute -right-3 -top-2 z-30" onClick={() => setStoriesOpen(false)}>
              <X className="absolute top-0 ring-0 h-8 w-8 text-white/50" />
            </button>
            <ReactStories
              height={800}
              width={520}
              defaultInterval={3000}
              stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
              onAllStoriesEnd={() => setStoriesOpen(false)}
            />
          </div>
        </div>
      )}
    </Container>
  );
};
