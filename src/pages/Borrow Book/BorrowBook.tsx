import { useGetBookByIdQuery, usePostBorrowMutation } from "@/api/baseApi";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast, Toaster } from "sonner";


const BorrowBook = () => {
    const { id }  = useParams<{ id: string }>();
    const {data , isLoading}=useGetBookByIdQuery(String(id)); 
    const [postBorrow,{}]=usePostBorrowMutation();
    const navigate=useNavigate();
    const {
            register,
            handleSubmit,
        } = useForm()

    const onSubmit = async (value :any) =>{
        if(data!==undefined && value.quantity>data?.book.copies){
            toast.warning("Quantity is greater then copies");
            return;
        }
        console.log("inside post");
        const iso = new Date(value.dueDate).toISOString();
        
        const finalData = {
            book:id,
            quantity:value.quantity,
            dueDate: iso,
        };
        //console.log(finalData);
        const res = await postBorrow(finalData).unwrap();
        toast.success("Book successfully borrowed !")
        console.log(res);

        setTimeout(()=>{
            navigate("/borrow-summary")
        },2000)
    }

    if(isLoading)return <p>Loading....</p>
    return (
        <div className="mt-[70px]">
            <h3>Borrow Book</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 max-w-md mx-auto">
                <div>
                    <label className="block text-left text-sm mb-1">Title</label>
                    <input defaultValue={data?.book.title} readOnly
                    {...register("title", { required: "Title is required" })}
                    className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">quantity</label>
                    <input 
                    type="number"
                    {...register("quantity", {
                        required: "quantity are required",
                        min: { value: 1, message: "Must be 1 or more" },
                        valueAsNumber: true,
                    })}
                    className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">Due Date</label>
                    <input type="datetime-local"
                    {...register("dueDate", { required: "Due date is required" })}
                    className="border p-2 rounded w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[#722323] text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Borrow Book
                </button> 
                <Toaster richColors position="bottom-right"/>   
            </form>
        </div>
    );
};

export default BorrowBook;