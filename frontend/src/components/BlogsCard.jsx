import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { likeBlog, unlikeBlog } from '../services/api';
import { useAuth } from './context/AuthContext';
import BlogModal from './ShowBlogModal';

const BlogsCard = ( {blogs, setBlogs} ) => {
    const [expandedIndexes, setExpandedIndexes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { token, userId } = useAuth();
    const [modalStates, setModalStates] = useState(blogs.map(() => false));
    const handleLikeToggle = async (id) => {
        try {
            const blogIndex = blogs.findIndex((blog) => blog._id === id);

            if (blogIndex !== -1) {
                const isLiked = blogs[blogIndex].likes.includes(userId);
                
                if (isLiked) {
                    await unlikeBlog(id, token);
                    blogs[blogIndex].likes = blogs[blogIndex].likes.filter(
                        (likedUserId) => likedUserId !== userId
                    );
                } else {
                    await likeBlog(id, token);
                    blogs[blogIndex].likes.push(userId);
                }

                setBlogs([...blogs]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleModalToggle = (index) => {
        const newModalStates = [...modalStates];
        newModalStates[index] = !newModalStates[index];
        setModalStates(newModalStates);
    };

    const toggleExpansion = (index) => {
        if (expandedIndexes.includes(index)) {
          setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
        } else {
          setExpandedIndexes([...expandedIndexes, index]);
        }
      };
    
      const isExpanded = (index) => expandedIndexes.includes(index);


    return(
        <div className='flex justify-center flex-wrap'>
            {(blogs.map((item, index) => (
                <div
                    key={item._id}
                    className='w-full md:w-3/4 lg:w-2/3 xl:w-1/2 border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
                        
                    <div className='flex justify-start items-center gap-x-2 font-bold font-sans text-indigo-800 text-2xl my-3'>
                    
                    <BiUserCircle className='text-blue-300 text-2xl'/>
                    <h4 className='my-2'>{item.userName.name}</h4>
                    
                    </div>
                    <div className='flex justify-start items-center gap-x-2'>
                        <PiBookOpenTextLight className='text-red-300 text-2xl' />
                        <h2 className='mr-3 font-bold font-sans text-xl'>{item.title}</h2>
                    </div>
                    <div className='flex justify-start items-center gap-x-2'>
                        {/* <PiBookOpenTextLight className='text-red-300 text-2xl' /> */}
                        <h2 className='my-3 font-sans'>{isExpanded(index) ? item.story : `${item.story.slice(0, 600)}`}</h2>
                    </div>

                    {(`${item.story.length}` > 600 && !isExpanded(index)) && (
                            <div className='flex justify-start items-center gap-x-2'>
                            <button
                                className='text-indigo-600 hover:text-indigo-800'
                                onClick={() => toggleExpansion(index)}
                            >
                                Read more
                            </button>
                            </div>
                        )}

                    <div className='flex justify-between items-center gap-x-2 mt-4'>
                        {/* <Link to={`/blogs/details/${item._id}`}> */}
                        <BsInfoCircle 
                            className='text-2xl text-green-800 hover:text-black'
                            onClick={() => handleModalToggle(index)}
                        />
                        {/* </Link> */}
                        {/* <Link to={`/blogs/edit/${item._id}`}>
                            <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
                        </Link>
                        <Link to={`/blogs/delete/${item._id}`}>
                            <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
                        </Link> */}
                            {userId === item.userName.user && (
                            <>
                                <Link to={`/blogs/edit/${item._id}`}>
                                    <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
                                </Link>
                                <Link to={`/blogs/delete/${item._id}`}>
                                    <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
                                </Link>
                            </>
                        )}
                        <div>
                            {/* <button type="button" onClick={() => handleLikeToggle(item._id)} >
                                {item.likes.includes(userId) ? 'Unlike' : 'Like'}
                            </button> */}
                            <h2 type="button" onClick={() => handleLikeToggle(item._id)}  className={`${item.likes.includes(userId) ? 
                                'font-bold border-2 border-red-600 font-sans px-4 py-1 bg-red-600 rounded-lg' : 
                                'px-4 py-1 border-2 font-bold font-sans border-red-600 rounded-lg'}`}>
                                {item.likes.length}
                            </h2>
                        </div>
                    </div>
                    {modalStates[index] && (
                        <BlogModal blog={item} onClose={() => handleModalToggle(index)} />
                    )}
                </div>
            )))}
        </div>
    );
};

export default BlogsCard;