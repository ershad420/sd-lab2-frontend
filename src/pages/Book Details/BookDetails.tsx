
import { useGetBookByIdQuery } from '@/api/baseApi';

import { Link, useParams } from 'react-router';
import { FaBookOpen } from "react-icons/fa6";
import { MdLibraryBooks } from "react-icons/md";
import { FaCartPlus, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { BiSolidDuplicate } from "react-icons/bi";
import { CgUnavailable } from "react-icons/cg";
import { LuCircleChevronRight } from "react-icons/lu";
const BookDetails = () => {
    
    const { id }  = useParams<{ id: string }>();
    
    const { data, isLoading, error } = useGetBookByIdQuery(String(id));

     if (isLoading) return <p>Loading...</p>;
     if (error) return <p>Error</p>;
    
    console.log(data);
    
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                    "url(https://i.ibb.co/nqCVQNMj/tate-lohmiller-04-Ul7i-MJj3-E-unsplash.jpg)",
                }}
                >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <div className="flex justify-center text-[30px] mb-[10px]">
                            {
                                data?.book?.available === false ? (
                                    <CgUnavailable className='text-red-500'/>
                                ):(<LuCircleChevronRight  className='text-green-500'/>)
                            }
                        </div>
                        <h1 className={` text-5xl font-bold mb-[12px] ${
                                data?.book?.available ? 'text-green-500' : 'text-red-500'
                            }`}>{ data !==undefined && data.book.title}</h1>
                        <div className='flex justify-between text-sm mb-[20px]'>
                            <div className='flex space-x-2 items-center mr-[25px]'>
                                <FaBookOpen />
                                <p>Author : { data !==undefined && data.book.author}</p>
                            </div>
                            <div className='flex space-x-2 items-center text-sm'>
                                <MdLibraryBooks />
                                <p>ISBN : { data !==undefined && data.book.isbn}</p>
                            </div>
                        </div>
                        <div className='flex space-x-2'>
                            <FaQuoteLeft  className="mr-[10px]"/>
                            <p className="mb-5">
                                {data !== undefined && data.book.description}
                            </p>
                            <FaQuoteRight className=" mt-[6px]"/>
                        </div>
                        <div className='flex justify-between text-sm mb-[20px]'>
                            <div className='flex space-x-2 items-center mr-[25px]'>
                                <BiSolidDuplicate />
                                <p>Genre : { data !==undefined && data.book.genre}</p>
                            </div>
                            <div className='flex space-x-2 items-center text-sm'>
                                <FaCartPlus />
                                <p>Copies : { data !==undefined && data.book.copies}</p>
                            </div>
                        </div>
                        <button className="btn bg-[#722323] text-white border-none">
                            <Link to="/books" className=''>Go back</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;