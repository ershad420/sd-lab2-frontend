import { useCreateBookMutation } from "@/api/baseApi";

import type { Ibook } from "@/types"

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import { toast, Toaster } from "sonner";


const AddBook = () => {

    const [createBook,{}]=useCreateBookMutation();
    const navigate = useNavigate();
    const {
            register,
            handleSubmit,
            formState: { errors },
            reset,
        } = useForm<Ibook>()

    const onSubmit = async (data: Ibook) => {
            let availablity:boolean ;
            if(String(data.available)==="1")availablity=true;
            else availablity=false;
            console.log(data);
            const processedData = {
                ...data,
                available: availablity,
            };
            
            
            try{
                const res= await createBook(processedData).unwrap();
                toast.success("Book successfully Added !");
                console.log(res);
                reset() 
                setTimeout(()=>{
                    navigate("/books");
                },2000)
            }
            catch(error :any){
                console.error("Failed to Add book", error);
                toast.error('Failed to Add book');

                setTimeout(()=>{
                    const error_message = error?.data?.message || "";
                    if(error_message.includes("duplicate") && error_message.includes("isbn")){
                        toast.warning('This ISBN is already exist. Try different one');
                    }
                    else{
                        toast.warning('Something went wrong . Please check required field');
                    }
                },2000)
                
            }
            
            
        }


    return (
        <div className="mt-[70px]">
            <h3 className="">Add Book</h3>
             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 max-w-md mx-auto">
                <div>
                    <label className="block text-left text-sm mb-1">Title</label>
                    <input
                    {...register("title", { required: "Title is required" })}
                    className="border p-2 rounded w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">Author</label>
                    <input
                    {...register("author", { required: "Author is required" })}
                    className="border p-2 rounded w-full"
                    />
                    {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">Genre</label>
                    <select
                    {...register("genre", { required: "Genre is required" })}
                    className="border p-2 rounded w-full"
                    >
                    <option value="">Select Genre</option>
                    <option value="FICTION">Fiction</option>
                    <option value="NON_FICTION">Non-fiction</option>
                    <option value="SCIENCE">Science</option>
                    <option value="HISTORY">History</option>
                    <option value="BIOGRAPHY">Biography</option>
                    <option value="FANTASY">Fantasy</option>
                    </select>
                    {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">ISBN</label>
                    <input
                    {...register("isbn", { required: "ISBN is required" })}
                    className="border p-2 rounded w-full"
                    />
                    {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn.message}</p>}
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">Description</label>
                    <textarea
                    {...register("description")}
                    className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">Copies</label>
                    <input
                    type="number"
                    {...register("copies", {
                        required: "Copies are required",
                        min: { value: 1, message: "Must be 1 or more" },
                        valueAsNumber: true,
                    })}
                    className="border p-2 rounded w-full"
                    />
                    {errors.copies && <p className="text-red-500 text-sm">{errors.copies.message}</p>}
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">Available</label>
                    <select
                    className="border p-2 rounded w-full"
                    {...register("available", { required: true })}
                    >
                    <option value={1}>True</option>
                    <option value={0}>False</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-[#722323] text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Book
                </button> 
                <Toaster richColors position="bottom-right"/>  
            </form>
        </div>
    );
};

export default AddBook;