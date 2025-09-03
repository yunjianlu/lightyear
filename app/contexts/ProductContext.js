// "use client";
// import { createContext, useContext, useState, useEffect } from "react";

// const ProductContext = createContext();

// export function ProductProvider({ children }) {
//   const [productItems, setProductItems] = useState([]);

//   // Load cart from localStorage on component mount
//   useEffect(() => {
//     const savedProducts = localStorage.getItem("products");
//     if (savedProducts) {
//       try {
//         setProductItems(JSON.parse(savedProducts));
//       } catch (error) {
//         console.error("Error loading previous product queries from localStorage:", error);
//       }
//     }
//   }, []);

//   // Save cart to localStorage whenever cartItems changes
//   useEffect(() => {
//     localStorage.setItem("products", JSON.stringify(productItems));
//   }, [productItems]);

//   const addToCart = (product, quantity = 1) => {
//     setCartItems((prev) => {
//       const existingItem = prev.find(
//         (item) => item.productId === product.productId
//       );

//       if (existingItem) {
//         // Update quantity if item already exists
//         return prev.map((item) =>
//           item.productId === product.productId
//             ? {
//                 ...item,
//                 selectedQuantity: Math.min(
//                   item.selectedQuantity + quantity,
//                   product.quantityInStock
//                 ),
//               }
//             : item
//         );
//       } else {
//         // Add new item to cart
//         return [...prev, { ...product, selectedQuantity: quantity }];
//       }
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prev) => prev.filter((item) => item.productId !== productId));
//   };

//   const updateQuantity = (productId, quantity) => {
//     if (quantity <= 0) {
//       removeFromCart(productId);
//       return;
//     }

//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.productId === productId
//           ? {
//               ...item,
//               selectedQuantity: Math.min(quantity, item.quantityInStock),
//             }
//           : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const getCartTotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.selectedQuantity,
//       0
//     );
//   };

//   const getCartItemCount = () => {
//     return cartItems.reduce((total, item) => total + item.selectedQuantity, 0);
//   };

//   return (
//     <ProductContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         getCartTotal,
//         getCartItemCount,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// }

// export function useProducts() {
//   const context = useContext(ProductContext);
//   if (!context) {
//     throw new Error("useProduct must be used within a ProductProvider");
//   }
//   return context;
// }
