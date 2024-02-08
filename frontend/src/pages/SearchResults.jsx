import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { searchUsers } from "../services/api";
import { useAuth } from "../components/context/AuthContext";

const SearchResults = () => {
    const { term } = useParams();
    const { token } = useAuth();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await searchUsers(term, token);
                setSearchResults(result.data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [term, token]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>

            <h1 className = 'flex my-8 justify-center mr-4 font-bold font-sans text-indigo-800 text-2xl'>Looking for: {term}</h1>
        <div className='flex justify-center flex-wrap'>
            
            <div >
            <ul> <h3 className='mr-4 font-bold font-sans text-indigo-800 text-xl'>Found {searchResults.length}</h3>
                {searchResults.map((user) => (
                    
                    <li className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl' style={{ width: '600px', 
                }}
                     key={user._id}> 
                     <Link to={`/user/fetch/${user.email}`}>
                        <p className="my-2 font-bold font-sans text-indigo-800 text-xl">{user.name}</p>
                        <p>{user.email}</p>
                        </Link> 
                        
                    </li>
                ))}
            </ul>
            </div>
        </div>
        </div>
    );
};

export default SearchResults;
