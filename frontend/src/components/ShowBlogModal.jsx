import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const BlogModal = ({ blog, onClose }) => {
    return (
        <div
            className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className='w-[800px] max-w-full bg-white rounded-xl p-4 flex flex-col relative'
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
                    {blog.likes.length}
                </h2>
                <h4 className='flex justify-start items-center gap-x-2 font-bold font-sans text-indigo-800 text-2xl my-3'>
                <BiUserCircle className='text-blue-300 text-2xl' />{blog.userName.name}</h4>
                <div className='flex justify-start items-center gap-x-2'>
                    <PiBookOpenTextLight className='text-red-300 text-2xl' />
                    <h2 className='mr-3 font-bold font-sans text-xl'>{blog.title}</h2>
                </div>
                <div className='flex justify-start items-center gap-x-2'>
                    {/* <PiBookOpenTextLight className='text-red-300 text-2xl' /> */}
                    <h2 className='my-3 font-sans'>{blog.story}</h2>
                </div>
                <div className='my-4'>
                    <span className='my-2 font-bold font-sans text-black-500'>Create Time </span>
                    <span>{new Date(blog.createdAt).toString()}</span>
                </div>
                <div className='my-4'>
                    <span className='my-2 font-bold font-sans text-black-500'>Last Update Time </span>
                    <span>{new Date(blog.updatedAt).toString()}</span>
                </div>
            </div>
        </div>
    );
};

export default BlogModal;