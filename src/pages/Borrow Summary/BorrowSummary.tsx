import { useGetBorrowedBooksQuery } from '@/api/baseApi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const BorrowSummary = () => {
    const {data,isLoading}=useGetBorrowedBooksQuery(undefined);

    if(isLoading)return <p>Loading...</p>
    console.log(data);
    return (
        <div>
            <div className='mb-[20px] mt-[20px]'>
                <h3 className='font-bold text-[#722323]'>Borrow Summary</h3>
            </div>
            <Table >
                
                <TableHeader>
                    <TableRow >
                    <TableHead className='text-center'>Book Title</TableHead>
                    <TableHead className='text-center'>ISBN</TableHead>
                    <TableHead className='text-center'>Total Quantity borrowed</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        !isLoading &&  data.data.map((borrowedBook:any)=>(
                            <TableRow key={borrowedBook.book.isbn}>
                                <TableCell>
                                    {
                                        borrowedBook.book.title
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        borrowedBook.book.isbn
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        borrowedBook.totalQuantity
                                    }
                                </TableCell>
                            </TableRow>
                            
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default BorrowSummary;