'use client'
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useThemeContext } from "../Context/ThemeContext";

export default function PostCard({ post, onOpenPost }: { post: any, onOpenPost: (p: any) => void }) {
  const { isLightMode } = useThemeContext();
  const router = useRouter();

  const handleClick = () => {
    onOpenPost(post);
  };

  return (
    <div className="mb-4">
      <div
        onClick={handleClick}
        className={`group relative flex flex-col items-center justify-center overflow-hidden ${isLightMode ? 'card-light' : 'card-dark'} border rounded h-30 w-[43vw] lg:w-full lg:h-[20vw] min-h-[200px] cursor-pointer`}
      >
        {post?.images?.length > 0 && (
          <Image
            height={300}
            width={300}
            alt="post image"
            src={post.images[0]}
            className="w-[45vw] h-fit object-cover lg:mb-4 lg:w-[20vw]"
            priority
          />
        )}
      </div>

      <div className="flex justify-between items-center w-full pr-3 z-100 duration-200 mt-2">
        <div className="flex items-center gap-1">
          <button onClick={() => router.push('/' + post?.createdBy?.handle)}>
            <Image
              height={300}
              width={300}
              alt="creator profile"
              className="h-6 w-6 rounded-full object-cover"
              src={post?.createdBy?.profile || "/image.png"}
            />
          </button>
          <div>
            <h3>{post.name}</h3>
            <p style={{ fontSize: '12px' }}>@{post?.createdBy?.handle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
