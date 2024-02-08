import React, {useEffect, useState } from "react";
import Spinner from '../components/Spinner.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import BlogsTable from "../components/BlogsTable.jsx";
import BlogsCard from "../components/BlogsCard.jsx";
import { getBlogs, searchUsers, fetchUserDetails } from "../services/api.js";
import { useAuth } from "../components/context/AuthContext.jsx";
import Header from "../components/Header.jsx";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [showType, setShowType] = useState('card');
    const [searchTerm, setSearchTerm] = useState('');
    // const [name, setName] = useState('');
    const { name, logout, token, email } =  useAuth();
    const navigateTo = useNavigate();
    useEffect(() => {
        setLoading(true);
        const getBlogDetails = async () => {
            try 
            {
                const result = await getBlogs(token);
                setBlogs(result.data.data);
                setLoading(false);
            }
            catch (error)
            {
                setLoading(false);
                alert('Please check the console');
                console.log(error);
            }
        }
        getBlogDetails();
    }, []);

    // useEffect(() => {
    //     setLoading(true);
    //     const fetchCurrentUser = async () => {
    //         try {const result = await fetchUserDetails(token);
    //             setLoading(false);
    //         } catch (error) {
    //             setLoading(false);
    //             alert('Please check the console');
    //             console.log(error);
    //         }
    //     }
    // })

    const handleLogout = () => {
        logout();
       
      };

    const handleSearch = async () => {
        try {
            const result = await searchUsers(searchTerm, token);
            navigateTo(`/search-results/${searchTerm}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex h-screen">
        
            <div className="bg-gray-300 text-white w-64 flex-shrink-0">
                <div className="p-3">
                    <Link to={`/user/fetch/${email}`}>
                    <h1 className = 'font-bold font-sans text-indigo-800 text-2xl my-3'>{name}</h1>
                    </Link>
                    <p className='mr-3 font-bold font-sans text-black'>{email}</p>
                </div>
            </div>
            <div className="flex my-4 w-full basis-full flex-col justify-start">
                <p className = 'flex font-bold font-sans text-indigo-400 text-2xl justify-center'>Tell a story...
                <Link to='/blogs/create'>
                   <MdOutlineAddBox className='text-indigo-400 text-4xl' />
                </Link>
                </p>
                {loading ? <Spinner /> : (<BlogsCard blogs={blogs} setBlogs={setBlogs}> </BlogsCard>) }
            </div>
            
        </div>
    )
}

export default Home;