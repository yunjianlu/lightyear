// "use client";

// async function storeNewQuery(searchQuery) {
//     let products;
//     let savedProducts = sessionStorage.getItem("products");
//     let productAPIURL = "/api/products"

//     try {

//         if (searchQuery && searchQuery != "{}") {
//             productAPIURL = `/api/products?${searchQuery}`
//         }
//         console.log("Product search query is: ", productAPIURL);

//         await fetch(productAPIURL, {method: 'GET'})
//             .then(res => {
//             if (!res.ok) throw new Error('Network response was not ok');
//             console.log("current response: ", res);
//             return res.json()
//             })
//             .then(data => products = data)
//             .catch(err => {
//             throw new Error(err);
//             });
//         savedProducts[searchQuery] = products;
//         sessionStorage.setItem("products", JSON.stringify(savedProducts));
//         return products
//     } catch {
//         throw new Error ("Unable to query database and store results");
//     }
// } 

// export default function checkQueryHistory(searchQuery, autoResults)  {
//     let savedProducts = sessionStorage.getItem("products");
//     if (autoResults) {
//         if(savedProducts) {
//             savedProducts[searchQuery] = autoResults;
//             sessionStorage.setItem("products", JSON.stringify(savedProducts));
//         }
//         else {
//             savedProducts = {};
//             savedProducts[searchQuery] = autoResults;
//             sessionStorage.setItem("products", JSON.stringify(savedProducts));
//         }
        
//         return autoResults
//     }

//     if (savedProducts) {
//         if (!savedProducts[searchQuery]) {
//             console.log("No saved products found but other queries exist. Storing now.")
//             let queryResult = storeNewQuery(searchQuery);
//             return queryResult
//         }
//         else {
//             console.log("Query already executed. Returning cached value");
//             return savedProducts[searchQuery]
//         }
//         // console.log("saved products found. Loading now");
//         // console.log(savedProducts);
//         // savedProducts = JSON.parse(savedProducts);
//         // savedProducts['yes'] = 'yesyes';
//         // sessionStorage.setItem("products",JSON.stringify(savedProducts));
//         // return savedProducts
//     }
//     else {
//         console.log("No saved products found. Storing now.")
//         let queryResult = storeNewQuery(searchQuery);

//         return queryResult
//     }
// };