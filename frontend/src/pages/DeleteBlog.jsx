import React, {useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { deleteBlog } from "../services/api";
import { useAuth } from "../components/context/AuthContext";

const DeleteBlog = () => {
    const [loading, setLoading] = useState(false);
    const { token, userId } = useAuth();
    const navigate= useNavigate();
    const { id } = useParams();
    const handleDeleteBlog = async () => {
        setLoading(true);
        try
        {
            await deleteBlog(id, token);
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
        <div className= 'p-4 my-4'>
            
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-indigo-400 rounded-xl w-[600px] p-4 mx-auto'>
                <h3 className='mr-4 font-bold font-mono text-indigo-800 text-2xl'>Confirm Delete?</h3>
                <button
                    className='p-2 bg-red-500 hover:bg-indigo-600 m-8 font-mono text-white text-xl'
                    onClick={handleDeleteBlog}
                    >
                        Yes
                    </button>
            </div>
        </div>
    )
}

export default DeleteBlog