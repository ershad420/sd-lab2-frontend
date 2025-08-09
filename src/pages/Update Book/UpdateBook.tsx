import { useGetBookByIdQuery, useUpdateBookMutation } from "@/api/baseApi";
import type { Ibook } from "@/types";
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import { toast, Toaster } from "sonner";



const UpdateBook = () => {
    const { id }  = useParams<{ id: string }>();
    const navigate= useNavigate();
    const { data, isLoading, error} = useGetBookByIdQuery(String(id));
    const [updateBook,{}] = useUpdateBookMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Ibook>()
    
    const onSubmit = async (value:Ibook) => {
        
        let availablity:boolean;
        if(String(value.available)==="true")availablity=true;
        else availablity=false;
      
        const updatedData = {
            ...value,
            available:availablity
        }
        console.log(id);
        console.log(updatedData);
        try{
            const res=await updateBook({id , updatedData}).unwrap();
            console.log(res);
            toast.success("Book successfully updated !")
            setTimeout(()=>{
                navigate("/books");
            },2000)
        }
        catch(error){
            toast.error("Failed to update")
            console.error("Error :",error);
            
        }
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;   
    return (
        <div className="mt-[70px]">
            <h3 className="">Update Book</h3>
             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 max-w-md mx-auto">
                <div>
                    <label className="block text-left text-sm mb-1">Title</label>
                    <input defaultValue={data?.book.title}
                    {...register("title", { required: "Title is required" })}
                    className="border p-2 rounded w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">Author</label>
                    <input defaultValue={data?.book.author}
                    {...register("author", { required: "Author is required" })}
                    className="border p-2 rounded w-full"
                    />
                    {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">Genre</label>
                    <select defaultValue={data?.book.genre}
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
                    <input defaultValue={data?.book.isbn}
                    {...register("isbn", { required: "ISBN is required" })}
                    className="border p-2 rounded w-full"
                    />
                    {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn.message}</p>}
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">Description</label>
                    <textarea defaultValue={data?.book.description}
                    {...register("description")}
                    className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">Copies</label>
                    <input defaultValue={data?.book.copies}
                    type="number"
                    {...register("copies", {
                        required: "Copies are required",
                        min: { value: 0, message: "Must be 0 or more" },
                        valueAsNumber: true,
                    })}
                    className="border p-2 rounded w-full"
                    />
                    {errors.copies && <p className="text-red-500 text-sm">{errors.copies.message}</p>}
                </div>
                <div>
                    <label className="block text-left text-sm mb-1">Available</label>
                    <select defaultValue={String(data?.book.available)}
                    className="border p-2 rounded w-full"
                    {...register("available", { required: true })}
                    >
                    <option value="true">True</option>
                    <option value="false">False</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-[#722323] text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Update Book
                </button> 
                <Toaster richColors position="bottom-right"/>   
            </form>
        </div>
    );
};

export default UpdateBook;