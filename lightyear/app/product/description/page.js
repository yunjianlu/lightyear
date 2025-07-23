'use client'

import Layout from "../../components/Layout";
import { products } from "../mockData";
import Image from "next/image";
import AddToCartButton from "../../components/addToCartButton";
import { useSearchParams } from 'next/navigation'

export default function ProductPage() {

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
                        <div className="grid grid-cols-2 grid-rows-[8rem_minmax(15rem,17rem)_4rem] bg-white mb-2">
                            <div className="col-span-2 flex justify-center items-center">
                                <h1 className="text-5xl">{
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
                                    className="w-full object-contain rounded m-4"
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
                            
                            
                            <h2 className="bg-white">In Stock</h2>
                            <div className="flex justify-center bg-white">
                                <p className="">No</p>
                            </div>

                            <h2 className="bg-white">Frequently Returned</h2>
                            <div className="flex justify-center bg-white">
                                <p className="m-auto">No</p>
                            </div>

                            <h2 className="bg-white">Times Ordered in Past Month</h2>
                            <div className="flex justify-center bg-white">
                                <p className="m-auto">133</p>
                            </div>
                        </div>
                    </div>

                    <div id="rightScrollExpand" className="row-span-2 col-span-2 grid">

                        <div className="flex bg-white min-h-40 flex-col md:col-span-2 mb-2">
                            <h1 className="text-2xl col-span-2 bg-white">Description</h1>
                            <p>Description here...</p>
                        </div>

                        <div className="grid grid-cols-2 grid-flow-row bg-black gap-y-0.25 auto-rows-min h-min mb-2 md:mb-0 md:mr-2">
                            <div className="col-span-2 bg-white flex items-center justify-center">
                                <h1 className="text-2xl m-2">Specifications</h1>
                            </div>
                            
                            <h2 className="bg-white">Product ID</h2>
                            <div className="flex justify-center bg-white">
                                <p>1</p>
                            </div>

                            <h2 className="bg-white">Vendor</h2>
                            <div className="flex justify-center bg-white">
                                <p>Light Year Private Vendor</p>
                            </div>

                            <h2 className="bg-white">Dimensions</h2>
                            <div className="flex justify-center bg-white">
                                <p>20in x 14in x 22in</p>
                            </div>
                            
                            <h2 className="bg-white">Color</h2>
                            <div className="flex justify-center bg-white">
                                <p>Black</p>
                            </div>

                            <h2 className="bg-white">Place of Origin</h2>
                            <div className="flex justify-center bg-white">
                                <p>Coruscant</p>
                            </div>

                            <h2 className="bg-white">Batteries Included</h2>
                            <div className="flex justify-center bg-white">
                                <p>No</p>
                            </div>

                            <h2 className="bg-white">Grogu Approved?</h2>
                            <div className="flex justify-center bg-white">
                                <p>No</p>
                            </div>
                        </div>

                        <div className="flex bg-white min-h-18 flex-col h-min">
                            <h1 className="text-2xl col-span-2 bg-white mx-auto mt-2">Tags</h1>
                            <div className="flex flex-row">
                                <p className="m-1">Tag 1 </p>
                                <p className="m-1">Tag 2 </p>
                                <p className="m-1">Tag 3 </p>
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