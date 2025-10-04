'use client'
import Image from 'next/image';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import { Product } from '../types/Product';
import { HiOutlineLink } from "react-icons/hi2";
import MasterNavber from './MasterNavber';
import ProductImages from './ProductImages'
import Loading from './loading'
import { PiHeartLight } from "react-icons/pi";
import { GoHeartFill } from "react-icons/go";

import { useShowInput } from '../Context/ShowInputContext';
import { useState  , useEffect, useRef, Suspense} from 'react';
import Notification from './Notification';
import { useNotification } from '../Context/Notification';
import { addToFavorites , removeFromFavorites } from '../store/actions/fav';
import { useDispatch , useSelector} from 'react-redux';
import { AppDispatch } from '../store/store';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { AnimatePresence } from 'framer-motion';
import ProductMenu from './ProductMenu';
import { useAuth } from '../Context/AuthContext';
import { FaArrowDown } from 'react-icons/fa';
import { SlArrowDown } from 'react-icons/sl';
import ImageShower from './ImageShower';
import { IoIosArrowBack } from 'react-icons/io';
import Useages from './Useges';
import ProductMenuLg from './ProductMenuLg';
import { getDesignById } from '../store/actions/design';
import { addToCart, getUserCart, removeFromCart } from '../store/actions/cart';
import { getDownloadLink, handleProductUnlock } from '../store/actions/order';
import Alart from './Alart';
import { capturePayment, createOrder } from '../store/actions/payment';
import { useThemeContext } from '../Context/ThemeContext';
import Post from './Post';
import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import Header from './Header';
import DynamicOverlay from './DynamicOverlay';
import HighlightOfProduct from './HighlightOfProduct';
import MetaOfProduct from './MetaOfProduct';
import PurchaseHandler from './PurchaseHandler';
import DynamicImageShower from './DynamicImageShower';
import HiddenHeader from './HiddenHeader';
import DynamicPanelWrapper from './DynamicPanelWrapper';
import { productCache } from '../lib/ProductCache';
import RouteLoader from './RouteLoader';
export default function ProductPage({selectedProduct}:{selectedProduct?:any}) {
const pathname = usePathname()
const productpath = pathname.split('/');
const {items} = useSelector((state : any)=>state.cart)
const slug = productpath[productpath.length - 1]
const [isMenu , setIsMenu] = useState(false)
const {token} = useAuth()
const [isMobile , setIsMobile] = useState(false)
const dispatch = useDispatch<AppDispatch>()
const {isLightMode} = useThemeContext()
const searchParams = useSearchParams();
const pid = searchParams.get('pid');
const pathParts = usePathname().split('/');
const productId = pid || pathParts[2] || selectedProduct?._id;

const scrollRef = useRef<HTMLDivElement>(null)
const {rdxProduct , loading} = useSelector((state : any)=> state.design)
const [post, setPost] = useState<any>(null)
const [votes, setVotes] = useState<any[]>([])
const {postsOfAsset} = useSelector((state:any)=>state.attach)
const [opacity , setOpacity] = useState(0)
const [scale , setScale] = useState(1)
const [panelY, setPanelY] = useState(40);
const [product, setProduct] = useState<any>(null);
const [navigation , setIsNavigating] = useState(false)
const [loadingProduct, setLoadingProduct] = useState(false);
// Cache / fetch product
const isOverlay = !!selectedProduct;

useEffect(() => {
  if (!productId) return;

  setProduct(null);        // clear old
  setLoadingProduct(true); // show loader until next resolved

  const loadProduct = async () => {
    if (isOverlay && selectedProduct?._id) {
      setProduct(selectedProduct);
      setLoadingProduct(false);

      if (!productCache[selectedProduct._id]) {
        productCache[selectedProduct._id] = { product: selectedProduct, animated: false };
      }
      return;
    }

    if (productCache[productId]) {
      setProduct(productCache[productId].product);
      setLoadingProduct(false);
      return;
    }

    await dispatch(getDesignById(productId, token));
    setLoadingProduct(false);
  };

  loadProduct();
}, [selectedProduct, productId, dispatch, token, isOverlay]);
useEffect(() => {
  if (!isOverlay && rdxProduct?._id === productId) {
    const prevAnimated = productCache[productId]?.animated ?? false;
    productCache[productId] = { product: rdxProduct, animated: prevAnimated };
    setProduct(rdxProduct);
  }
}, [rdxProduct, productId, isOverlay]);
   useEffect(() => {
    dispatch(getUserCart(token))
   }, [dispatch  , slug, token])
   useEffect(()=>{

    window.innerWidth > 640 ?    setIsMobile(false):setIsMobile(true)

},[])
console.log('product cache is',productCache)
  return (
  <div
  style={{ backgroundColor: isLightMode ? 'white' : 'black' }}
  ref={scrollRef}
  className='fixed top-0 left-0 z-[9999] hide-scrollbar w-screen h-screen overflow-y-auto'
>
  <Notification />
{navigation && <RouteLoader/>}
  {( loadingProduct || !product) ? (
    <Loading />
  ) : (
    <>
      {post && (
        <div className='abso'>
          <Post catchedPost={post} catchedVotes={votes} />
        </div>
      )}

      {isMobile ? (
        <AnimatePresence>
          {isMenu && (
            <ProductMenu
              currentData={product}
              setIsMenu={setIsMenu}
              token={token ?? ''}
              postId={product._id}
            />
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          {isMenu && (
            <ProductMenuLg
              setIsMenu={setIsMenu}
              token={token ?? ''}
              postId={product._id}
            />
          )}
        </AnimatePresence>
      )}

      <main className='desc flex max-sm:flex-col h-screen w-screen'>
        <ImageShower
          style={{
            height: `${panelY + 10}vh`,
            minHeight: '50vh',
            maxHeight: '98vh',
            transition: 'height 0.35s cubic-bezier(0.25, 0.8, 0.5, 1)',
          }}
          setIsMenu={setIsMenu}
          isMyProduct={product.isMyProduct}
          name={product.name}
          amount={product.amount}
          isMobile={isMobile}
          images={product.image}
        />

        <Header setIsMenu={setIsMenu} isLightMode={isLightMode} />

        <div style={{ height: `${product.image.length * 50 + 50}vh` }}>
          <DynamicPanelWrapper initialStep={2} onTranslateYChange={(y) => setPanelY(y)}>
            <aside
              className={`flex flex-col ${
                isLightMode ? 'bg-white border-t relative border-[#dadada]' : 'bg-black'
              } pt-2 z-[500] lg:overflow-y-scroll h-fit py-10 hide-scrollbar -translate-y-4 lg:w-[30vw] rounded-t-[6px] items-center lg:border-l w-screen sticky top-2 lg:mt-24`}
            >
              <div
                style={{ opacity: panelY > 100 ? 1 : 0 }}
                className='rounded-full duration-500 h-1 w-16 bg-[#dadada] absolute -top-3.5 -translate-x-1/2 left-1/2'
              ></div>

              {panelY > 100 && <div className='h-[27vh] w-full -mt-[27vh]'></div>}

              <HighlightOfProduct
                name={product.name}
                amount={product.amount}
                isLightMode={isLightMode}
                postsOfAsset={postsOfAsset}
              />

              <div className='w-full mb-2 px-2'>
                <MetaOfProduct
                  type='preset'
                  creator={product.postedBy.handle}
                  size='2.40GB'
                  dateOfPosted={product.createdAt}
                  isLightMode={isLightMode}
                />
                <PurchaseHandler amount={product.amount} productId={product._id} />
              </div>

              <div>
                <ProductDetails isLightMode={isLightMode} product={product} />
                <Suspense>
                  <Useages setPost={setPost} setVotes={setVotes} assetId={product._id} token={token} />
                </Suspense>
                <Suspense>
                  <RelatedProducts
                    setIsNavigating={setIsNavigating}
                    query='s'
                    token={token}
                    productId={product._id}
                  />
                </Suspense>
              </div>
            </aside>
          </DynamicPanelWrapper>
        </div>
      </main>
    </>
  )}
</div>

  );
}
