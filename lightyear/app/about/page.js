import React from "react";
import Image from "next/image";

export default function LightyearBackground() {
  return (
    <main className="mx-auto bg-[url(/images/about/largerNightSky_pic.png)]">
        <div className="flex flex-col md:grid md:grid-cols-1 md:grid-rows-[h-min_h-min]">
            <div className="flex h-screen justify-center text-center items-center md:col-span-full">
                <video autoPlay muted loop disablePictureInPicture disableRemotePlayback playsInline poster="/images/about/sci-fi_warehouse_pic.png" className="object-cover absolute min-h-full min-w-full w-auto h-auto">
                    <source src="/images/about/astronautInSpaceWaterLoopSmaller.mp4" type="video/mp4" />
                    
                </video>
                <h1 className="text-4xl md:text-9xl font-bold mb-6 absolute text-white">About Lightyear</h1>
            </div>
                            {/* <h1 className="text-4xl md:text-9xl font-bold mb-6">About Lightyear</h1> */}
            <section className="space-y-15 mx-8 md:grid md:grid-rows-5 md:space-y-0 md:col-span-full mt-16">
                <div className="flex flex-col md:grid md:grid-cols-5 justify-around mb-15">
                    <div className="md:col-span-2 flex md:items-center 3xl:pl-10">
                        <Image
                            src={
                                "/images/about/sci-fi_warehouse_pic.png"
                            }
                            alt={"lightsaber"}
                            width={400}
                            height={200}
                            className="w-full min-h-95 max-h-130 md:max-h-180 md:min-h-min object-contain mb-4 rounded-4xl justify-center items-center"
                            />
                    </div>
                    <div className="md:flex md:pl-10 md:content-around md:justify-around md:flex-col md:col-span-3 h-4/6 3xl:px-20">
                        <div>
                            <h2 className="md:text-6xl font-semibold text-center text-2xl mb-2 md:mb-0 3xl:text-8xl text-white">The Sci-Fi Ecommerce Revolution</h2>
                        </div>
                        <div>
                            <p className="md:text-2xl text-md mb-10 md:mb-0 3xl:text-4xl text-white">
                                Lightyear is a cutting-edge ecommerce company inspired by the limitless possibilities of science fiction. Founded in the heart of the galaxy, Lightyear is dedicated to connecting interstellar customers with futuristic products, advanced technologies, and imaginative experiences.
                            </p>
                        </div>
                    </div>
                    
                </div>

                <div className="flex flex-col md:grid md:grid-cols-5 justify-around mb-15">
                    <div className="md:col-span-2 flex md:items-center md:order-last 3xl:pr-10">
                        <Image
                            src={
                                "/images/about/sci-fi_cargoShipTravelingThroughNebula_pic.png"
                            }
                            alt={"lightsaber"}
                            width={400}
                            height={200}
                            className="w-full min-h-95 max-h-130 md:max-h-180 md:min-h-min object-contain mb-4 rounded-4xl justify-center items-center"
                            />
                    </div>
                    
                    <div className="md:flex md:px-10 md:content-around md:justify-around md:flex-col md:col-span-3 h-4/6 3xl:px-20">
                        <div>
                            <h2 className="md:text-6xl font-semibold text-center text-2xl mb-2 md:mb-0 3xl:text-8xl text-white">Our Mission</h2>
                        </div>
                        <div>
                            <p className="md:text-2xl text-md mb-10 md:mb-0 3xl:text-4xl text-white">
                                At Lightyear, our mission is to bring the wonders of tomorrow to your doorstep today. Whether you&apos;re searching for quantum gadgets, space-grade apparel, or AI-powered home solutions, our platform is designed to deliver the highest quality goods across the cosmos.
                            </p>
                        </div>
                    </div>

                    
                    
                </div>

                <div className="flex flex-col md:grid md:grid-cols-5 justify-around mb-15">
                    <div className="md:col-span-2 flex md:items-center 3xl:pl-10">
                        <Image
                            src={
                                "/images/about/sci-fi_cargoShipUnloadingLoad_pic.png"
                            }
                            alt={"lightsaber"}
                            width={400}
                            height={200}
                            className="w-full min-h-95 max-h-130 md:max-h-180 md:min-h-min object-contain mb-4 rounded-4xl justify-center items-center"
                            />
                    </div>

                    <div className="md:flex md:pl-10 md:content-around md:justify-around md:flex-col md:col-span-3 h-4/6 3xl:px-20">
                        <div>
                            <h2 className="md:text-6xl font-semibold text-center text-2xl mb-2 md:mb-0 3xl:text-8xl text-white">Our Story</h2>
                        </div>
                        <div>
                            <p className="md:text-2xl text-md mb-10 md:mb-0 3xl:text-4xl text-white">
                                Born from a vision to unite the universe through commerce, Lightyear harnesses the power of advanced algorithms, hyper-efficient supply chains, and a passionate community of innovators. With a presence on countless planets and orbital stations, we&apos;re proud to support explorers, dreamers, and everyday citizens in their quest for the extraordinary.
                            </p>
                        </div>
                    </div>
                    
                </div>

                <div className="flex flex-col md:grid md:grid-cols-5 justify-around mb-15">
                    <div className="md:col-span-2 flex md:items-center md:order-last 3xl:pr-10">
                        <Image
                            src={
                                "/images/about/sci-fi_items5_pic.png"
                            }
                            alt={"lightsaber"}
                            width={400}
                            height={200}
                            className="w-full min-h-95 max-h-130 md:max-h-180 md:min-h-min object-contain mb-4 rounded-4xl justify-center items-center"
                            />
                    </div>
                    
                    <div className="md:flex md:px-10 md:content-around md:justify-around md:flex-col md:col-span-3 h-4/6 3xl:px-20">
                        <div>
                            <h2 className="md:text-6xl font-semibold text-center text-2xl mb-2 md:mb-0 3xl:text-8xl text-white">Why Shop With Us?</h2>
                        </div>
                        <div>
                            <ul className="list-disc list-inside pl-4 space-y-1 md:text-2xl text-md mb-10 md:mb-0 3xl:text-4xl text-white">
                                <li>Curated selection of sci-fi inspired products</li>
                                <li>Galactic-wide shipping and delivery</li>
                                <li>Secure, AI-enhanced transactions</li>
                                <li>Commitment to sustainability and ethical sourcing</li>
                                <li>Dedicated customer support from our stellar team</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:justify-around mb-15 md:mb-0 h-screen">
                    <div className="flex md:pl-10 justify-center items-center md:content-around md:justify-center flex-col md:col-span-full">
                        <div>
                            <h2 className="md:text-7xl font-semibold text-center text-4xl mb-10 3xl:text-9xl text-white">Join the Lightyear Journey</h2>
                        </div>
                        <div>
                            <p className="md:text-2xl text-center text-md 3xl:text-5xl text-white">
                                Embark on an adventure beyond imagination. Shop with Lightyear and discover a universe of possibilities.
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className="flex flex-col md:grid md:grid-cols-5 justify-around mb-15">
                    <div className="col-span-2 flex">
                        <Image
                            src={
                                "/images/about/sci-fi_warehouse_pic.png"
                            }
                            alt={"lightsaber"}
                            width={400}
                            height={200}
                            className="w-full min-h-95 max-h-130 md:max-h-200 md:min-h-170 object-contain mb-4 rounded justify-center items-center"
                            />
                    </div>
                    
                    <div className="md:col-span-3 md:px-0 md:grid md:grid-cols-1 md:grid-rows-2">
                        <div className="md:flex md:justify-center md:items-center">
                            <h2 className="text-2xl font-semibold mb-3 text-center md:text-5xl">The Sci-Fi Ecommerce Revolution</h2>
                        </div>
                        <p className="md:px-20 md:text-2xl">
                            Lightyear is a cutting-edge ecommerce company inspired by the limitless possibilities of science fiction. Founded in the heart of the galaxy, Lightyear is dedicated to connecting interstellar customers with futuristic products, advanced technologies, and imaginative experiences.
                        </p>
                    </div>

                    {/* <div className="md:flex md:px-10 md:content-around md:justify-around md:flex-col md:col-span-3">
                        <div>
                            <h2 className="text-2xl font-semibold text-center">The Sci-Fi Ecommerce Revolution</h2>
                        </div>
                        <div>
                            <p>
                                Lightyear is a cutting-edge ecommerce company inspired by the limitless possibilities of science fiction. Founded in the heart of the galaxy, Lightyear is dedicated to connecting interstellar customers with futuristic products, advanced technologies, and imaginative experiences.
                            </p>
                        </div>
                    </div>
                    
                </div> */}
                {/* <div className="h-50">
                <h2 className="text-2xl font-semibold mb-2 text-center">Our Mission</h2>
                <p>
                    At Lightyear, our mission is to bring the wonders of tomorrow to your doorstep today. Whether you&apos;re searching for quantum gadgets, space-grade apparel, or AI-powered home solutions, our platform is designed to deliver the highest quality goods across the cosmos.
                </p>
                </div>
                <div className="h-50">
                <h2 className="text-2xl font-semibold mb-2 text-center">Our Story</h2>
                <p>
                    Born from a vision to unite the universe through commerce, Lightyear harnesses the power of advanced algorithms, hyper-efficient supply chains, and a passionate community of innovators. With a presence on countless planets and orbital stations, we&apos;re proud to support explorers, dreamers, and everyday citizens in their quest for the extraordinary.
                </p>
                </div>
                <div className="h-50">
                <h2 className="text-2xl font-semibold mb-2 text-center">Why Shop With Us?</h2>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>Curated selection of sci-fi inspired products</li>
                    <li>Galactic-wide shipping and delivery</li>
                    <li>Secure, AI-enhanced transactions</li>
                    <li>Commitment to sustainability and ethical sourcing</li>
                    <li>Dedicated customer support from our stellar team</li>
                </ul>
                </div>
                <div className="h-50">
                <h2 className="text-2xl font-semibold mb-2 text-center">Join the Lightyear Journey</h2>
                <p>
                    Embark on an adventure beyond imagination. Shop with Lightyear and discover a universe of possibilities.
                </p>
                </div> */}
            </section>
        </div>
    </main>
  );
}