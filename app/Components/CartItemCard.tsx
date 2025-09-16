import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartItemCart({asset}){

const router = useRouter()
    return  <div
    
                  className="w-full mb-1 rounded-[3px] px-3 border border-[#2d2d2d] items-center relative flex h-12 bg-[#151515] flex justify-between"
                >
                  <div className="flex gap-2 items-center py-2">
                    <div className="h-10 w-10 bg-[#1d1d1d] flex items-center">
                      <Image
                                    onClick={() => router.push('/AllAssets/' + asset._id || '/')}
                        src={asset?.image?.[0] || '/abundance.webp'}
                        height={100}
                        width={100}
                        alt="preview"
                        className="h-9 w-fit rounded-[2px] object-cover"
                      />
                    </div>
                    <div>
                      <div className='flex items-center gap-1 justify-center'>
                      <h6>{asset?.name || 'Asset'}</h6>
                <label className="bg-white text-black px-1.5 flex items-center justify-center py-2.5  " style={{fontFamily : 'inter' , lineHeight : 0, borderRadius :'40px', fontWeight : 300 ,fontSize : '11px'
                            }}>{asset?.amount === 0 ? 'free':asset?.amount}</label>
                      </div>
                      <p style={{ fontSize: '12px' }}>@{asset?.postedBy?.handle}</p>
                    </div>
                  </div>
                  <h6>+{asset?.amount}</h6>
                </div>
}