import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";
import { useState } from "react";
import "./Veg.css"; // Import CSS file

function Veg() {
    const dispatch = useDispatch();
    const vegItems = useSelector(state => state.products.Veg) ?? [];

    // State for filter checkboxes
    const [filterBelow100, setFilterBelow100] = useState(false);
    const [filterAbove100, setFilterAbove100] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    // Pagination state
    const [pagenumber, setPagenumber] = useState(1);
    const perPage = 3;

    // Filtered items based on checkbox selection
    let filteredItems = vegItems
        .filter(item => {
            if (filterBelow100 && filterAbove100) return true; // Show all
            if (filterBelow100) return item.price < 100;
            if (filterAbove100) return item.price >= 100;
            return true; // If no filter is selected, show all
        })
        .filter(item => item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Calculate total pages (always round up)
    let totalPages = Math.ceil(filteredItems.length / perPage);

    // Pagination logic (apply to filteredItems, NOT vegItems)
    let pageEndItemIndex = perPage * pagenumber;
    let pageStartItemIndex = pageEndItemIndex - perPage;
    let finalItems = filteredItems.slice(pageStartItemIndex, pageEndItemIndex);

    // Handle page change
    let handlePage = (page) => {
        setPagenumber(page);
    };

    return (
        <div className="veg-container">
            <h1>Welcome to the Veg Items Page</h1>

            {/* Filter Section */}
            <div className="filter-section">
                <label>
                    <input 
                        type="checkbox" 
                        checked={filterBelow100} 
                        onChange={() => setFilterBelow100(!filterBelow100)} 
                    />
                    Below $100
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        checked={filterAbove100} 
                        onChange={() => setFilterAbove100(!filterAbove100)} 
                    />
                    Above $100
                </label>
            </div>

            {/* Search Input */}
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search veg items..."
                />
            </div>

            <div className="veg-list">
                {filteredItems.length > 0 ? (
                    <ul>
                        {finalItems.map((item, index) => (
                            <li key={index} className="veg-item">
                                <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="veg-image"
                                    width="100"
                                />
                                <p>{item.name} - ${item.price}</p>
                                <button onClick={() => dispatch(addToCart(item))}>
                                    Add to Cart
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Veg Items Available</p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={() => handlePage(pagenumber - 1)} disabled={pagenumber === 1}>
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button 
                        key={index} 
                        onClick={() => handlePage(index + 1)} 
                        className={pagenumber === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}

                <button onClick={() => handlePage(pagenumber + 1)} disabled={pagenumber === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Veg;

