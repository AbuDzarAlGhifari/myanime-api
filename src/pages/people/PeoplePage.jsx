import CardPeople from '@/components/common/card/CardPeople';
import { getTopPeople } from '@/services/peopleService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PeoplePage = () => {
  const navigate = useNavigate();

  const [peopleTop, setPeopleTop] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [top] = await Promise.all([getTopPeople()]);
        setPeopleTop(top);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="justify-center min-h-screen py-4 text-sm bg-red-700">
      <div className="flex justify-between px-4 pt-4 mx-2 mt-1 text-xs font-semibold text-white bg-red-700 sm:mx-3 sm:mt-2 lg:mt-3 font-poppins text-decoration-line: underlin sm:text-sm lg:text-lg rounded-t-md">
        <h1>Top Famous People In Anime</h1>
        <h1
          className="italic text-yellow-300 underline cursor-pointer hover:text-blue-400"
          onClick={() => navigate('/peopleall')}
        >
          other...
        </h1>
      </div>
      <div className="grid grid-cols-3 mx-4 bg-red-700 rounded-b-lg sm:grid-cols-4 lg:grid-cols-6">
        {peopleTop?.map((top) => (
          <CardPeople all={top} />
        ))}
      </div>
    </div>
  );
};

export default PeoplePage;
