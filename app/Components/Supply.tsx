'use client'
import MasterNavber from './MasterNavber';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { AppDispatch } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getDesign } from '../store/actions/design';
import StoreCard from './StoreCard';
import { SkeletonMyPostCard } from './Skeleton/SkeletomMyPostCard';
import { useAuth } from '../Context/AuthContext';
import ProductPage from './ProductPage';

export default function Supply() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { token } = useAuth();

  const { items, loading } = useSelector((state: any) => state.design);
  const dispatch: AppDispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const pid = searchParams.get('pid');

  // Fetch design items
const [fetched, setFetched] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    await dispatch(getDesign(token));
    setFetched(true); // mark that we fetched at least once
  };
  fetchData();
}, [dispatch, token]);

  // Set selected product if URL has ?pid
  useEffect(() => {
    if (pid && items.length > 0) {
      const found = items.find((p: any) => p._id === pid);
      if (found) setSelectedProduct(found);
    } else {
      setSelectedProduct(null);
    }
  }, [pid, items]);

  // Open product overlay
  const openProduct = (product: any) => {
    setSelectedProduct(product);
    router.push(`${pathname}?pid=${product._id}`);
  };

  // Lock scroll when overlay open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProduct]);

  return (
    <div className="w-screen px-4 mt-10 lg:px-22">
      {!loading && fetched ? (
        <div className="lg:grid-cols-5 lg:gap-5 gap-2 grid-cols-2 grid">
          {items?.map((product: any, index: number) => (
            <div key={index}>
              <StoreCard openProduct={openProduct} product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="lg:grid-cols-5 lg:gap-5 gap-1 grid-cols-2 grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonMyPostCard key={i} />
          ))}
        </div>
      )}

      {/* Product overlay */}
      {selectedProduct && (
        <Suspense>
          <ProductPage selectedProduct={selectedProduct} />
        </Suspense>
      )}
    </div>
  );
}
