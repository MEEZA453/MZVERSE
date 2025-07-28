'use client';

import {
  createContext,
  useEffect,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDesign } from '../store/actions/design';
import type { RootState, AppDispatch } from '../store/store';
import { Product } from '../types/Product'; // ✅ update import path if needed

// Define the context type
interface AllAssetsContextType {
  data: Product[];
  loading: boolean;
}

// Create the context
const AllAssetsContext = createContext<AllAssetsContextType | undefined>(undefined);

// Define props for provider
interface Props {
  children: ReactNode;
}

export function AllAssetsProvider({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDesign(10 , 10));
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const data = useSelector((state: RootState) => state.design);

  return (
    <AllAssetsContext.Provider value={{ data, loading }}>
      {children}
    </AllAssetsContext.Provider>
  );
}

// Custom hook
export const useAssets = () => {
  const context = useContext(AllAssetsContext);
  if (!context) {
    throw new Error('useAssets must be used within AllAssetsProvider');
  }
  return context;
};
