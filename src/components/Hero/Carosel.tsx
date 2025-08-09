import { Link } from "react-router";


const Carosel = () => {
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                    "url(https://i.ibb.co/6CHjJ5X/cozy-library-interior-with-bookshelves-wooden-desk.jpg)",
                }}
                >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold"><span className="text-green-500">Hola!</span> Explore. Borrow. Read.</h1>
                    <p className="mb-5">
                        Explore a vast collection of books across genres.
                        Easily borrow and manage your reading list.
                        Built for book lovers and library managers alike.
                    </p>
                    <Link to="/create-book">
                        <button className="btn bg-[#722323] text-white border-none">Be a contributor</button>
                    </Link>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carosel;