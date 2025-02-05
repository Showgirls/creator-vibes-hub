import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  username: string;
  bio: string;
  profileImage: string;
  bannerImage: string;
}

export const ProfileHeader = ({
  name,
  username,
  bio,
  profileImage,
  bannerImage,
}: ProfileHeaderProps) => {
  return (
    <div className="relative w-full">
      <div 
        className="w-full h-48 md:h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      />
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative flex flex-col sm:flex-row items-start sm:items-end -mt-16 sm:-mt-20 mb-4 gap-4">
          <img
            src={profileImage}
            alt={name}
            className="w-32 h-32 rounded-full border-4 border-background"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold truncate">{name}</h1>
            <p className="text-muted-foreground">@{username}</p>
          </div>
          <Button className="shrink-0">
            <PenSquare className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
        <p className="text-lg mb-6">{bio}</p>
      </div>
    </div>
  );
};