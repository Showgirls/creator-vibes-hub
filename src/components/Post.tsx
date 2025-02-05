import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostProps {
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

export const Post = ({ author, content, timestamp }: PostProps) => {
  return (
    <Card className="glass-card p-4 mb-4">
      <div className="flex gap-3">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{author.name}</span>
            <span className="text-muted-foreground">@{author.username}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{timestamp}</span>
          </div>
          <p className="mt-2 text-base">{content}</p>
          <div className="flex justify-between mt-4 max-w-md">
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>24</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Repeat2 className="w-4 h-4 mr-2" />
              <span>12</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              <span>148</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};