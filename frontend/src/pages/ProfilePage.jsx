import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { fetchUserDetails, followUser, unFollowUser, getUserBlogs } from "../services/api";
import { useAuth } from "../components/context/AuthContext";
import BlogsCard from "../components/BlogsCard";

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [user, setUser] = useState();
    const { email } = useParams();
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [isFollowing, setIsFollowing] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token, userId, email: emailId } = useAuth();

    
    
    useEffect(() => {
        setLoading(true);
        const userDetails = async () => {
            setLoading(false);
            try {
                const result = await fetchUserDetails(email, token);
                setName(result.data.name);
                setFollowing(result.data.following || []);
                setFollowers(result.data.followers || []);
                setIsFollowing(result.data.followers?.some(follower => follower.user === userId) || false);
                setUser(result.data._id);
                
            } catch (error)
            {
                alert('Please check the console');
                console.log(error);
            }
          
        };
        userDetails();
        }, [email, token, userId]);

        
        useEffect(() => {
            setLoading(true);
            const getBlogDetails = async () => {
                try 
                {
                    const result1 = await getUserBlogs(user, token);
                    setBlogs(result1.data.data);
                    setLoading(false);
                }
                catch (error)
                {
                    setLoading(false);
                    alert('Please check the console');
                    console.log(error);
                }
            };
            if (user) {
                getBlogDetails();
            }
        }, [user, token]);


        const handleFollowToggle = async () => {
            try {
                if (isFollowing) {
                    await unFollowUser(email, token);
                    setFollowers((prevFollowers) => prevFollowers.filter(id => id !== userId));
                    setIsFollowing(false);
                } else {
                    await followUser(email, token);
                    setFollowers((prevFollowers) => [...prevFollowers, userId]);
                    setIsFollowing(true);
                }
            } catch (error) {
                console.log(error);
            }
        };
    

    return (
        <div className="flex h-screen">
        <div className="bg-gray-300 text-white w-64 flex-shrink-0">
            <div className="p-3">
            {isFollowing !== null && (
                <>
                {loading ? (
                <Spinner />
            ) : (
                <div className='my-4'>
                    <h2 className='mr-4 font-bold font-sans text-indigo-800 text-2xl'>{name}</h2>
                    <p className='mr-4 font-bold font-sans text-black text-l'>{email}</p>
                    <p className='mr-4 font-bold font-sans text-black text-l'>Followers {followers.length}</p>
                    <p className='mr-4 font-bold font-sans text-black text-l'>Following {following.length}</p>
                    { email !== emailId &&
                        (<button className='mr-4 my-4 justify-start bg-blue-500 hover:bg-indigo-600 font-sans text-white text-l px-4 py-1 rounded-lg' onClick={handleFollowToggle}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>)
                    }
                </div>
            )}
            </>
            )}
            </div>
        </div>

        <div className="flex-1 bg-gray-200">
  
                <div className="p-4">

                <h1 className='mr-4 font-bold font-sans text-indigo-800 text-2xl'>Stories</h1>
                    {loading ? <Spinner /> : (<BlogsCard blogs={blogs} setBlogs={setBlogs}> </BlogsCard>) }
                </div>
            </div>

        </div>
    );
    
};

export default ProfilePage