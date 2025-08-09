import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router';
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEye, FaBook } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { useDeleteBookMutation, useGetBooksQuery } from '@/api/baseApi';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import type { IBookWithId } from '@/types';

import { toast, Toaster } from 'sonner';


const Books = () => {

    const {data,isLoading} = useGetBooksQuery(undefined);

    const [deleteBook] = useDeleteBookMutation();
    console.log(data);
    const handleDelete = async (id: string) => {
    try {
        await deleteBook(id).unwrap();
        toast.success("Book successfully deleted !");
        
    } catch (error) {
        console.error("Failed to delete book", error);
        toast.error('Failed to delete book')
    }
    };
    
    if (isLoading) return <p>Loading...</p>;
    return (
        <div className='mt-[50px]'>
            <div className='mb-[20px]'>
                <h3 className='font-bold text-[#722323]'>All Books</h3>
            </div>
            
            <Table >
                
                <TableHeader>
                    <TableRow >
                    <TableHead className='text-center'>Title</TableHead>
                    <TableHead className='text-center'>Author</TableHead>
                    <TableHead className='text-center'>Genre</TableHead>
                    <TableHead className='text-center'>ISBN</TableHead>
                    <TableHead className='text-center'>Copies</TableHead>
                    <TableHead className='text-center'>Availablities</TableHead>
                    <TableHead className='text-center'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                       !isLoading &&  data.data.map((book :IBookWithId)=> (
                            
                            <TableRow key={book._id}>
                                <TableCell className="font-medium text-[#722323]">{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.genre}</TableCell>
                                <TableCell>{book.isbn}</TableCell>
                                <TableCell>{book.copies}</TableCell>
                                <TableCell>{book.available ? "True":"False"}</TableCell>
                                <TableCell >
                                    <TooltipProvider>
                                        <div className='flex space-x-4'>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                <Link to={`/books/${book._id}`}>
                                                    <FaEye  className="text-xl text-[#722323] cursor-pointer"/>
                                                </Link>
                                                </TooltipTrigger>
                                                <TooltipContent >
                                                <p>View</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                <Link to={`/edit-book/${book._id}`}>
                                                    <MdEditSquare className="text-xl text-[#722323] cursor-pointer" />
                                                </Link>
                                                </TooltipTrigger>
                                                <TooltipContent >
                                                <p>Edit</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                {book.available ? (
                                                    <Link to={`/borrow/${book._id}`}>
                                                        <FaBook className="text-[18px] text-[#722323] cursor-pointer hover:scale-110 transition" />
                                                    </Link>
                                                    ) : (
                                                        <FaBook className="text-[18px] text-gray-400 cursor-not-allowed opacity-50" />
                                                        )}
                                                </TooltipTrigger>
                                                <TooltipContent >
                                                    {
                                                        book.available ? (<p>Borrow</p>):(<p>Not available</p>)
                                                    }
                                                
                                                </TooltipContent>
                                            </Tooltip>

                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    
                                                    <RiDeleteBin5Fill className="text-xl cursor-pointer text-red-500" />
                                                    
                                                
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete book.
                                                    </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction className='bg-[#B82132]' onClick={()=>handleDelete(book._id)}>Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                                
                                                </AlertDialog>
                                                
                                        </div>
                                    </TooltipProvider>
                                    <Toaster richColors position="bottom-right"/>
                                </TableCell>
                            </TableRow>
                            
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default Books;