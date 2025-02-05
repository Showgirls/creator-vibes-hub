import { ProfileHeader } from "@/components/ProfileHeader";
import { Post } from "@/components/Post";

const Profile = () => {
  const profile = {
    name: "Sarah Anderson",
    username: "sarahcreates",
    bio: "Digital artist & content creator 🎨 | Sharing my creative journey and tips | Open for collaborations",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    bannerImage: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200",
  };

  const posts = [
    {
      author: {
        name: profile.name,
        username: profile.username,
        avatar: profile.profileImage,
      },
      content: "Just finished my latest digital art piece! Can't wait to share more about the creative process behind it. What kind of content would you like to see next? 🎨✨",
      timestamp: "2h ago",
    },
    {
      author: {
        name: profile.name,
        username: profile.username,
        avatar: profile.profileImage,
      },
      content: "Working on something exciting! Here's a sneak peek into my creative process. Remember: every masterpiece starts with a single stroke 🖌️",
      timestamp: "5h ago",
    },
  ];

  return (
    <div className="min-h-screen">
      <ProfileHeader {...profile} />
      <main className="max-w-2xl mx-auto px-4 py-6">
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </main>
    </div>
  );
};

export default Profile;