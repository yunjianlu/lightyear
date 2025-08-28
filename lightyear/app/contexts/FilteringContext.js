import { createContext, useContext, useState, useEffect } from "react";

export const productFilteringContext = createContext();

export function FilterProvider({children}) {
    const initialCategory = "All";
    const initialPrice = 0;
    const initialRating = "0";
    const initialInStock = false;
    const initialOutOfStock = false;

    const [category, setCategory] = useState(initialCategory);
    const [price, setPrice] = useState(initialPrice);
    const [rating, setRating] = useState(initialRating);
    const [inStock, setInStock] = useState(initialInStock);
    const [outOfStock, setOutOfStock] = useState(initialOutOfStock);

    useEffect(() => {
    setCategory(initialCategory);
    setPrice(initialPrice);
    setRating(initialRating);
    setInStock(initialInStock);
    setOutOfStock(initialOutOfStock);
    }, [initialCategory, initialPrice, initialRating, initialInStock, initialOutOfStock]);

    const updateCategory = (categoryValue) => {
        if(categoryValue) {
            setCategory(categoryValue)
        }
        return setCategory
    }

    const getCategory = () => {
        return category
    }

    const updatePrice = (priceValue) => {
        if(priceValue) {
            setPrice(priceValue)
        }
        return setPrice
    }

    const getPrice = () => {
        return price
    }

    const updateRating = (ratingValue) => {
        if(ratingValue) {
            setRating(ratingValue)
        }
        return setRating
    }

    const getRating = () => {
        return rating
    }

    const updateInStock = (inStockValue) => {
        if(inStockValue) {
            setInStock(inStockValue)
        }
        return setInStock
    }

    const getInStock = () => {
        return inStock
    }

    const updateOutOfStock = (outOfStockValue) => {
        if(outOfStockValue) {
            setOutOfStock(outOfStockValue)
        }
        return setOutOfStock
    }

    const getOutOfStock = () => {
        return outOfStock
    }

    return (
        <productFilteringContext.Provider
            value={{
                updateCategory,
                getCategory,
                updatePrice,
                getPrice,
                updateRating,
                getRating,
                updateInStock,
                getInStock,
                updateOutOfStock,
                getOutOfStock
            }}
        >
         {children}   
        </productFilteringContext.Provider>
    );
}

export function useProductFilteringContext() {
    const context = useContext(productFilteringContext);
    //console.log("Printing product context");
    //console.log(context);
    //console.log(context.getPrice());
    if (!context) {
        throw new Error("useProductFilteringContext must be used within a filter provider");
    }
    return context
}