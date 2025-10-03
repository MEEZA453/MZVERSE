'use client'
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import ButtonLoaderWhite from '../Components/ButtonLoaderWhite';
import { votePostAction } from '../store/actions/post';
import { useNotification } from '../Context/Notification';
import { useThemeContext } from '../Context/ThemeContext';

export default function Vote ({ fieldOfVote, existingVote, postId, token }: { fieldOfVote: [string], existingVote: object, postId: string, token: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { setNotification } = useNotification();
  const { isLightMode } = useThemeContext();
  const hasMounted = useRef(false); // track first mount

  const [votes, setVotes] = useState<Record<string, number>>({});

  const handleChange = (vote: string, value: number) => {
    setVotes(prev => ({
      ...prev,
      [vote]: value / 10
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(votes).length === fieldOfVote.length) {
      setLoading(true);
      dispatch(votePostAction(postId, votes, token));
      setNotification('voteSubmitted');
      setLoading(false);
    }
  };

  // mark mounted after first render
  useEffect(() => {
    hasMounted.current = true;
  }, []);

  return (
    <div className='w-screen relative lg:w-[30vw] flex items-center justify-center mt-6'>
      <div onClick={() => setIsOpen(true)} className={`duration-400 flex items-center justify-center w-[98%] z-100 bottom-5 ${isOpen ? `bg-[#dadada] rounded h-[240px] py-8` : `rounded-[2px] h-6.5 ${isLightMode ? 'bg-black' : 'bg-white'}`}`}>
        <div>
          {isOpen ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              className='flex w-screen lg:px-6 px-4 lg:w-[30vw] flex-col gap-2'
            >
              <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
                <RxCross2 className='close absolute right-3 top-2 text-black' />
              </button>

              {fieldOfVote?.map((vote, i) => (
                <div key={i} className='flex flex-col'>
                  <div className='w-full flex justify-between'>
                    <h3 style={{ color: 'black' }} className='leading-[-10px]'>{vote}</h3>
                    <h3 style={{ color: 'black' }}>{votes[vote] ? votes[vote] : '5.0'}</h3>
                  </div>
                  <input
                    type='range'
                    min={0}
                    max={100}
                    style={{ border: '0px' }}
                    className='w-full h-1.5'
                    onChange={(e) => handleChange(vote, Number(e.target.value))}
                  />
                </div>
              ))}

              <button
                style={{ opacity: Object.keys(votes).length < fieldOfVote.length ? 0.5 : 1, color: 'white' }}
                type='submit'
                className='bg-black text-[14px] px-3 py-1 rounded-[3px] mt-2 flex items-center justify-center h-7 w-full'
              >
                {loading ? <ButtonLoaderWhite /> : 'Submit'}
              </button>
            </motion.form>
          ) : (
            <motion.button
              initial={hasMounted.current ? { opacity: 0 } : false} // skip appear only on first mount
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ color: isLightMode ? 'white' : 'black' }}
              className='w-full text-center'
            >
              Vote now
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
