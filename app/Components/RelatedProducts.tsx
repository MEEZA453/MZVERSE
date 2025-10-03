import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { getPostsByHandleAction, searchPostsAction } from "../store/actions/post";
import { useAuth } from "../Context/AuthContext";
import Image from "next/image";
import DraggableCarousel from "./DraggableCarousel";
import Link from "next/link";
import SkeletonRelatedPosts from "./Skeleton/SkeletonReletedPosts";
import { searchAssets } from "../store/actions/search";

export default function RelatedProducts({query, token, productId}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (query) {
        dispatch(searchAssets(query, 1, 20 , token));
      }
    }
  , [dispatch, query]);

 const {assetResult , loading} = useSelector((state : any)  => state.search)


  // filter out current post
  const filteredSupply = assetResult?.results?.filter((post: any) => post._id !== productId) || [];

  return (
    <div className="mb-4 mt-6">
      <h5 className="mx-2 my-3">More {query}</h5>
      <div className="flex w-screen hide-scrollbar  overflow-hidden gap-2">
        {loading ? (
          <SkeletonRelatedPosts />
        ) : filteredSupply.length === 0 ? (
          <p className="mx-2 text-sm opacity-70">No posts found</p>
        ) : (
          <DraggableCarousel className="px-4">
            {filteredSupply?.map((supply: any) => (
              <div key={supply._id} className="shrink-0 w-[80px] h-[80px]">
                <Link href={`/supply/${supply?._id}`}>
                  <Image
                    src={supply?.image[0]}
                    alt="related"
                    width={100}
                    height={100}
                    className="w-full h-full rounded-[2px] object-cover"
                  />
                </Link>
              </div>
            ))}
          </DraggableCarousel>
        )}
      </div>
    </div>
  );
}
