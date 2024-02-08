import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { searchUsers } from '../services/api';

const Header = () => {
  const { logout, token } =  useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const navigateTo = useNavigate();
  const handleSearch = async () => {
      try {
          const result = await searchUsers(searchTerm, token);
          navigateTo(`/search-results/${searchTerm}`);
      } catch (error) {
          console.log(error);
      }
  };

  const handleLogout = () => {
    logout();
  
  };



  return (
    <div className='flex justify-between items-center gap-x-4 bg-indigo-400 p-3'>
      <Link to={`/`}>
      <div className='flex text-3xl justify-start text-indigo-800 font-bold font-mono'>BlogsPost</div>
      </Link>
      <div className='flex justify-end gap-x-4'>
        <input
          className='bg-slate-200 hover:bg-slate-300 px-4 py-1 rounded-lg justify-end'
          type="text"
          placeholder="Search.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className='bg-blue-600 hover:bg-indigo-700 px-4 py-1 rounded-lg font-mono text-white text-l'
          onClick={handleSearch}
        >
          Search
        </button>
        <button className='bg-blue-600 hover:bg-indigo-700 px-4 py-1 rounded-lg font-mono text-white text-l' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;