 'use client'

import { createContext, useEffect, useContext , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDesign } from '../store/actions/design.js';

const AllAssetsContext = createContext();

export function AllAssetsProvider({ children }) {
  const [loading , setLoading] =  useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDeta = async ()=>{
      await dispatch(getDesign());
      setLoading(false)

    }
 
  fetchDeta()
    }, [dispatch]);

  const data = useSelector((state) => state.design);

  return (
    <AllAssetsContext.Provider value={{ data , loading}}>
      {children}
    </AllAssetsContext.Provider>
  );
}

export const useAssets = () => useContext(AllAssetsContext);
