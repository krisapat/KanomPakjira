import Image from "next/image";
import { UserIcon } from "@/components/ui/UserIcon";
import { useUser } from "@clerk/nextjs";

const UserProfile = () => {
  const { user, isSignedIn } = useUser();
  
  return (
    <div className="flex items-center">
      {isSignedIn && user?.imageUrl ? (
        <Image
          src={user.imageUrl}
          alt={user.fullName || "User profile picture"}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <UserIcon className="w-8 h-8" />
      )}
      <span className="sr-only">Toggle profile</span>
    </div>
  );
};

export default UserProfile;
