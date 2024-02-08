import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BlogsTable = ({ blogs }) => {
    return(
        <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No.</th>
                            <th className='border border-slate-600 rounded-md'>Title</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Story</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Likes</th>
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => (
                            <tr key={blog._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {blog.title}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {blog.story}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {blog.likes}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to = {`/blogs/details/${blog._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800'/>
                                        </Link>
                                        <Link to = {`/blogs/edit/${blog._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600'/>
                                        </Link>
                                        <Link to = {`/blogs/delete/${blog._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600'/>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))

                        }
                    </tbody>
                </table>
    )
}

export default BlogsTable