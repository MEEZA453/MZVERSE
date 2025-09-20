import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WalletTransection({transaction , buyer}){


const router = useRouter()
    return  <div
    
                  className="w-full mb-1 rounded-[3px] px-3 border border-[#2d2d2d] items-center relative flex h-12 bg-[#151515] flex justify-between"
                >
                  <div className="flex gap-2 items-center py-2">
                    <div className="h-10 w-10 bg-[#1d1d1d] flex items-center">
                      <Image
                                    onClick={() => router.push('/AllAssets/' + transaction?._id || '/')}
                        src={transaction?.image}
                        height={100}
                        width={100}
                        alt="preview"
                        className="h-9 w-fit rounded-[2px] object-cover"
                      />
                    </div>
                    <div>
                      <div className='flex items-center gap-1 '>
                      <h6>{transaction?.name || 'Asset'}</h6>
    
                      </div>
                      <p style={{ fontSize: '12px' }}>Purchased by @{buyer?.handle || 'nope'} on 1/11/23</p>
                    </div>
                  </div>
                  <h6>+{transaction?.amount}</h6>
                </div>
}