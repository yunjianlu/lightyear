"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productItems, setProductItems] = useState({})
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedProducts = sessionStorage.getItem("products");
    if (savedProducts) {
      try {
        setProductItems(JSON.parse(savedProducts));
      } catch (error) {
        console.error("Error loading previous product queries from localStorage:", error);
      }
    }
    else {
        sessionStorage.setItem("products", "{}");
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    sessionStorage.setItem("products", JSON.stringify(productItems));
  }, [productItems]);

  const checkPrevProductQueries = (searchQuery) => {
    if (productItems[searchQuery]) {
        // return previous search query results
        return productItems[searchQuery]
    }
    else
    {
        // Fetch new query results from MongoDB, store the results in localstorage, and return the new results
        return undefined
    }
  };

    const updateProductQueryHistory = async (searchQuery, queryResult) => {
        await setProductItems(prev => ({
            ...prev, [searchQuery]: queryResult
        }));
    }

  return (
    <ProductContext.Provider
      value={{
        checkPrevProductQueries,
        updateProductQueryHistory
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}
