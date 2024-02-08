import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { createBlogs } from "../services/api";
import { useAuth } from "../components/context/AuthContext";

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();
    const handleSaveBlog = async () => {
        const data = {
            title,
            story,
        };
        setLoading(true);
        try
        {
            await createBlogs(data, token);
            setLoading(false);
            navigate('/');
        }
        catch (error)
        {   
            setLoading(false);
            alert('An error happened. Please check console');
            console.log(error);
        }
    };

    return (
        <div className='p-4 my-4'>
            
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-indigo-400 rounded-xl w-[600px] p-4 mx-auto' style={{ width: '800px' }}>
                <div className='my-4'>
                    <label className='mr-4 font-bold font-mono text-indigo-800 text-2xl'>Title</label>
                    <input
                        type='text'
                        value={title}
                        placeholder="Give me a name"
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-indigo-800 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='mr-4 font-bold font-mono text-indigo-800 text-2xl'>Content</label>
                    <textarea
                        type='text'
                        value={story}
                        placeholder="Tell a new story"
                        onChange={(e) => setStory(e.target.value)}
                        className='border-2 border-indigo-800 px-4 py-2 w-full'
                        style={{ height: '300px' }} 
                    />
                </div>
            
                <button className='p-2 bg-blue-500 hover:bg-indigo-600 m-8 font-mono text-white text-xl ' onClick={handleSaveBlog}>
                    Post
                </button>
            </div>
        </div>
    )
}

export default CreateBlog