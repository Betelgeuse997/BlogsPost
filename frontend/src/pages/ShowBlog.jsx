import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { fetchBlog } from "../services/api";
import { useAuth } from "../components/context/AuthContext";

const ShowBlog = () => {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { token } = useAuth();

    useEffect(() => {
        setLoading(true);
        const fetchBlogDetails = async () => {
            try 
            {
                const result = await fetchBlog(id, token);
                setBlog(result.data);
                setLoading(false);    
            }
            catch (error)
            {
                setLoading(false);
                alert('Please check the console');
                console.log(error);
            }

        } 
        fetchBlogDetails();
    }, [])
    return (
        <div className='p-4'>
            <BackButton />
                <h1 className="text-3xl my-4">Blog</h1>
                {loading ? (
                    <Spinner/>
                ) : (
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Id</span>
                            <span>{blog._id}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Title</span>
                            <span>{blog.title}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Story</span>
                            <span>{blog.story}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Likes</span>
                            <span>{blog.likes}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                            <span>{new Date(blog.createdAt).toString()}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
                            <span>{new Date(blog.updatedAt).toString()}</span>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default ShowBlog