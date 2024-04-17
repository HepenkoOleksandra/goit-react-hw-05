import toast, { Toaster } from "react-hot-toast";
import { FcSearch } from "react-icons/fc";

const SearchForm = ({ onFormSubmit }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.currentTarget.elements.query.value.trim() === "") {
            toast.error('Enter the name of the movie, please!')
            return;
        }
    
        const value = e.currentTarget.elements.query.value.trim();
        onFormSubmit(value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="query"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movies..."
                />
                <button type="submit">Search <FcSearch /></button>
                <Toaster />
            </form>
        </div>
    );
};

export default SearchForm;