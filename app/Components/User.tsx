"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../store/actions/follow";
import { useAuth } from "../Context/AuthContext";
import { AppDispatch } from "../store/store";
import { useEffect, useState } from "react";

export default function User({
  user,
  isFollowing,
  isFollowingList,
  onUnfollow,
  isLightMode,
}: {
  user: any;
  isFollowing?: boolean;
  isFollowingList?: boolean;
  onUnfollow?: (id: string) => void;
  isLightMode : boolean
}) {
  const { token } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // local state for instant UI feedback
  const [localFollow, setLocalFollow] = useState(isFollowing ?? false);

  // keep local state in sync with prop if it changes
  useEffect(() => {
    setLocalFollow(isFollowing ?? false);
  }, [isFollowing]);

  const handleUnfollow = () => {
    setLocalFollow(false); // instant UI
    if (isFollowingList && onUnfollow) {
      onUnfollow(user._id); // instantly remove from list
    } else {
      dispatch(unfollowUser(user._id, token));
    }
  };

  const handleFollowClick = () => {
    if (!user._id) return;

    if (localFollow) {
      setLocalFollow(false); // instant
      dispatch(unfollowUser(user._id, token));
    } else {
      setLocalFollow(true); // instant
      dispatch(followUser(user, token));
    }
  };

  return (
    <div className={`flex ${isLightMode ? 'bg-[#ededed]':'bg-[#151515]'} mb-[4px] w-full h-10 px-2 items-center justify-between`}>
      <div className="profile w-30 flex items-center gap-1">
        <Image
          onClick={() => router.push(`/${user?.handle}`)}
          height={100}
          width={100}
          alt="profile pic"
          src={user?.profile || "/image.png"}
          className="h-8 w-8 rounded-full object-cover"
        />
        <h3>@{user?.handle || "unknowuser"}</h3>
      </div>
      <h3>Designer</h3>

      {isFollowingList ? (
        <button
          onClick={handleUnfollow}
          className="text-[13px] border px-2 py-0.5 rounded-[3px]"
        >
          Unfollow
        </button>
      ) : (
        <button
        style={{color : !localFollow ? isLightMode ? 'white': 'black': isLightMode ? 'black': 'white'}}
          onClick={handleFollowClick}
          className={`text-[13px] border ${
            !localFollow ? isLightMode ? 'bg-black':'bg-white' : isLightMode ? ' border-black': 'border-white'
          } px-2 py-0.5 rounded-[3px]`}
        >
          {!localFollow ? "Follow" : "Following"}
        </button>
      )}
    </div>
  );
}
