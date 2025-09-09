import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function SearchedCreators() {
  const router = useRouter();
  const { userResult, loading, searched } = useSelector((state: any) => state.search);

  // Show initial loading when the first search is in progress
  if (loading && !searched) return <Loading />;

  return (
    <div className="w-full">
      {/* Loading during subsequent searches */}
      {loading && searched && <Loading />}

      {/* Show results if available */}
      {!loading && userResult?.length > 0 && (
        <div className="w-full justify-start px-2">
          {userResult?.map((user : any, index :number) => (
            <div
              key={index}
              onClick={() => router.push(`/${user?.handle}`)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <Image
                height={300}
                width={300}
                alt={user?.name}
                className="h-8 w-8 rounded-full object-cover"
                src={user?.profile || "/image.png"}
              />
              <div>
                <h6 className="mt-2">{user?.name}</h6>
                <p className="text-[13px]">@{user?.handle}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show 'No users found' only after a search */}
      {!loading && searched && userResult.length === 0 && (
        <p className="text-center mt-20">No users found</p>
      )}
    </div>
  );
}
