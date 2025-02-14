import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";
import { useState } from "react";
import "./Nonveg.css"

function Nonveg() {
    const dispatch = useDispatch();
    const nonvegItems = useSelector(state => state.products.Nonveg);

    // State for filters
    const [filterBelow100, setFilterBelow100] = useState(false);
    const [filterAbove100, setFilterAbove100] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    // Pagination state
    const [pagenumber, setPagenumber] = useState(1);
    const perPage = 3;

    // Filter items based on checkbox selection
    const filteredItems = nonvegItems.filter(item => {
        if (filterBelow100 && item.price >= 100) return false;
        if (filterAbove100 && item.price < 100) return false;
        return true;
    }).filter(item => item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    // Calculate total pages (always round up)
 let totalPages = Math.ceil(filteredItems.length / perPage);

 // Pagination logic (apply to filteredItems, NOT vegItems)
 let pageEndItemIndex = perPage * pagenumber;
 let pageStartItemIndex = pageEndItemIndex - perPage;
 let finalItems = filteredItems.slice(pageStartItemIndex, pageEndItemIndex);
 // Handle page change
 let handlePage = (page) => {
     setPagenumber(page);
     }

    return (
        <>
        <div className="nonveg-container">
            <h1 className="title" >Welcome to the Non-Veg Items Page</h1>

            {/* Filter Section */}
            <div className="filters">
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
        <div  className="search-box">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search non-veg items..."
                />
            </div>
            <div className="items-container">
                {filteredItems.length > 0 ? (
                    <ul className="items-list">
                        {finalItems.map((item, index) => (
                            <li key={index} className="item-card">
                                <img 
                                    src={item.image} 
                                    alt={item.name}
                                    
                                    width="100"
                                />
                                <p>{item.name} - ${item.price}</p>
                                <button className="add-to-cart" onClick={() => dispatch(addToCart(item))}>
                                    Add to Cart
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-items">No  NonVeg Items Available</p>
                )}
                </div>

         {/* Pagination Controls */}
           <div className="pagination">
                <button onClick={() => handlePage(pagenumber - 1)} disabled={pagenumber === 1} className="pagination-button">Previous</button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button  onClick={() => handlePage(index + 1)}>
                   {index + 1}
               </button>
           ))}
              <button onClick={() => handlePage(pagenumber + 1)} disabled={pagenumber === totalPages}className="pagination-button"> Next</button>
            </div>
          </div>
        </>
        )
    };



export default Nonveg;