import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getAnimeUpcoming } from '@/services/animeService';
import CardUpcoming from '@/components/common/card/CardUpcoming';
import { SkeletonUpcoming } from './Skeleton';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const UpcomingSection = () => {
  const {
    data: animeUpcoming,
    isLoading: loadingUpcoming,
    isError: errorUpcoming,
  } = useQuery({
    queryKey: ['animeUpcoming'],
    queryFn: getAnimeUpcoming,
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });

  const skeletons = Array(8).fill(null);

  return (
    <>
      <div className="flex items-center justify-between px-4 pt-4 text-xs font-semibold text-red-50 sm:px-6 lg:px-8 font-poppins">
        <h1 className="px-2 text-base capitalize border-l-4 border-red-700 sm:text-xl">
          Upcoming Anime
        </h1>
        <Link
          to="/up"
          className="flex items-center justify-center gap-1 px-2 py-1 text-xs italic bg-red-700 rounded-lg cursor-pointer hover:bg-orange-600 sm:text-sm"
        >
          View More <FaLongArrowAltRight />
        </Link>
      </div>

      <motion.div
        layout
        className="grid grid-cols-3 gap-4 px-4 mt-2 sm:grid-cols-4 rounded-b-md sm:px-6 lg:px-8"
      >
        <AnimatePresence>
          {loadingUpcoming
            ? skeletons.map((_, index) => <SkeletonUpcoming key={index} />)
            : animeUpcoming?.map((up, index) => (
                <CardUpcoming key={up.mal_id} all={up} index={index} />
              ))}
        </AnimatePresence>
      </motion.div>

      {errorUpcoming && (
        <div className="text-center text-red-500">
          Error loading upcoming anime
        </div>
      )}
    </>
  );
};

export default UpcomingSection;
