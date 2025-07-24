'use client'

import Layout from "../../components/Layout";
import { products } from "../mockData";
import Image from "next/image";
import AddToCartButton from "../../components/addToCartButton";
import { useSearchParams } from 'next/navigation'

export default function DetailedProductPage() {

    const productIdParam = useSearchParams().get('id');
    let productArrayPosition = undefined;
    let productPositionCounter = 0;

    while (productArrayPosition == undefined && productPositionCounter < products.length && productIdParam != undefined) {
        if (products[productPositionCounter].productId == productIdParam) {
            productArrayPosition = productPositionCounter;
            break
        }

        productPositionCounter++;
    };

    if (productArrayPosition != undefined) {
        return (
            <Layout>
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 md:gap-2 grid-flow-row md:grid-flow-col md:grid-rows-[min-content_min-content] h-min">
                    <div id="leftScrollStick" className="row-span-2">
                        <div className="grid grid-cols-2 grid-rows-[8rem_minmax(15rem,32rem)_4rem] md:grid-rows-[8rem_minmax(15rem,26rem)_4rem] bg-white mb-2">
                            <div className="col-span-2 flex justify-center items-center">
                                <h1 className="text-6xl wrap-normal text-wrap">{
                                    products[productArrayPosition].productName
                                    ? products[productArrayPosition].productName
                                    : "Unknown Name"
                                    }
                                </h1>
                            </div>
                            <div className="col-span-2 flex">
                                <Image
                                    src={
                                        products[productArrayPosition].productImage
                                        ? products[productArrayPosition].productImage
                                        : "/images/products/lightsaber-blue.png"
                                    }
                                    alt={products[productArrayPosition].productName}
                                    width={400}
                                    height={192}
                                    className="w-full object-contain rounded m-4 mx-auto p-2"
                                    />
                            </div>
                            <div className="row-span-1 flex justify-center items-center">
                                <p>Rating: {
                                    products[productArrayPosition].starRating
                                    ? products[productArrayPosition].starRating
                                    : "Unknown Rating"
                                    }
                                </p>
                            </div>
                            <div className="row-span-1 flex justify-center items-center">
                                <p>Price: ${
                                    products[productArrayPosition].price
                                    ? products[productArrayPosition].price
                                    : "Unknown Rating"
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 grid-flow-row bg-black gap-y-0.25 auto-rows-min h-min mb-2 md:mb-0">
                            <div className="col-span-2 bg-white flex items-center justify-center">
                                <h1 className="text-2xl m-2">Statistics</h1>
                            </div>
                            
                            
                            <h2 className="bg-white pl-2">Quantity In Stock</h2>
                            <div className="flex justify-center bg-white">
                                <p className="m-auto">
                                    {
                                        products[productArrayPosition].quantityInStock
                                        ? products[productArrayPosition].quantityInStock
                                        : 0
                                    }
                                </p>
                            </div>

                            <h2 className="bg-white pl-2">Frequently Returned</h2>
                            <div className="flex justify-center bg-white">
                                <p className="m-auto">
                                    {
                                        products[productArrayPosition].frequentlyReturned
                                        ? "Yes"
                                        : "No"
                                    }
                                </p>
                            </div>

                            <h2 className="bg-white pl-2">Times Ordered in Past Month</h2>
                            <div className="flex justify-center bg-white">
                                <p className="m-auto">
                                    {
                                        products[productArrayPosition].orderedQuantityPastMonth
                                        ? products[productArrayPosition].orderedQuantityPastMonth
                                        : 0
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div id="rightScrollExpand" className="row-span-2 md:grid-cols-2 md:col-span-2 grid md:gap-2">

                        <div className="flex bg-white min-h-40 flex-col md:col-span-2 mb-2 md:mb-0 items-center">
                            <h1 className="text-2xl col-span-2 bg-white">Description</h1>
                            <p className="mx-2 self-start">
                                {
                                    products[productArrayPosition].productDescription
                                    ? products[productArrayPosition].productDescription
                                    : "No description available"
                                }
                            </p>
                        </div>

                        <div className="grid grid-flow-row bg-black grid-cols-2 gap-y-0.25 auto-rows-min h-min mb-2 md:mb-0 md:col-span-1">
                            <div className="col-span-2 bg-white flex items-center justify-center">
                                <h1 className="text-2xl m-2">Specifications</h1>
                            </div>
                            
                            <h2 className="bg-white pl-2">Product ID</h2>
                            <div className="flex justify-center bg-white">
                                <p>
                                    {
                                        products[productArrayPosition].productId
                                        ? products[productArrayPosition].productId
                                        : "No product ID available"
                                    }
                                </p>
                            </div>

                            <h2 className="bg-white pl-2">Vendor</h2>
                            <div className="flex justify-center bg-white">
                                <p>
                                    {
                                        products[productArrayPosition].vendor
                                        ? products[productArrayPosition].vendor
                                        : "Unknown"
                                    }
                                </p>
                            </div>

                            <h2 className="bg-white pl-2">Dimensions</h2>
                            <div className="flex justify-center bg-white">
                                <p>
                                    {
                                        products[productArrayPosition].productDetails.dimensions
                                        ? products[productArrayPosition].productDetails.dimensions
                                        : "Unknown"
                                    }
                                </p>
                            </div>
                            
                            <h2 className="bg-white pl-2">Color</h2>
                            <div className="flex justify-center bg-white">
                                <p>
                                    {
                                        products[productArrayPosition].productDetails.color
                                        ? products[productArrayPosition].productDetails.color
                                        : "Unknown"
                                    }
                                </p>
                            </div>

                            <h2 className="bg-white pl-2">Material</h2>
                            <div className="flex justify-center bg-white">
                                <p>
                                    {
                                        products[productArrayPosition].productDetails.material
                                        ? products[productArrayPosition].productDetails.material
                                        : "Unknown"
                                    }
                                </p>
                            </div>

                            <h2 className="bg-white pl-2">Weight</h2>
                            <div className="flex justify-center bg-white">
                                <p>
                                    {
                                        products[productArrayPosition].productDetails.weight
                                        ? products[productArrayPosition].productDetails.weight
                                        : "Unknown"
                                    }
                                </p>
                            </div>

                            <h2 className="bg-white pl-2">Place of Origin</h2>
                            <div className="flex justify-center bg-white">
                                <p>
                                    {
                                        products[productArrayPosition].productDetails.originLocation
                                        ? products[productArrayPosition].productDetails.originLocation
                                        : "Unknown"
                                    }
                                </p>
                            </div>

                            <h2 className="bg-white pl-2">Batteries Included</h2>
                            <div className="flex justify-center bg-white">
                                <p>
                                    {
                                        products[productArrayPosition].productDetails.batteriesIncluded
                                        ? products[productArrayPosition].productDetails.batteriesIncluded
                                        : "Unknown"
                                    }
                                </p>
                            </div>

                            <h2 className="bg-white pl-2">Grogu Approved?</h2>
                            <div className="flex justify-center bg-white">
                                <p>
                                    {
                                        products[productArrayPosition].productDetails.groguApproved
                                        ? products[productArrayPosition].productDetails.groguApproved
                                        : "No"
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="flex bg-white min-h-18 flex-col h-min md:col-span-1 flex-wrap">
                            <h1 className="text-2xl bg-white mx-auto mt-2">Tags</h1>
                            <div className="flex flex-row flex-wrap px-1 py-1">
                                {
                                    products[productArrayPosition].tags.map((tag) => {
                                        return (
                                        <div className="m-1 p-1 bg-blue-400" key={tag}>
                                            <p>{tag}</p>
                                        </div>)
                                    }
                                    )
                                }
                            </div>
                            
                        </div>
                    </div>
                    
                </div>

            </Layout>
        );
    }
    else {
        return (
            <p>hi</p>
        );
    }
}