"use client"

import Layout from "../components/Layout";
import Image from 'next/image';
import { useEffect, useState } from "react";

export default function Page() {

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Darth Vader");
  const [fName, setFName] = useState("Darth");
  const [lName, setLName] = useState("Vader");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState(""); 
  const [state, setState] = useState("");
  const [pfp, setPfp] = useState("/image.jpg");

  const [sidebar, setSidebar] = useState(false);

  // add logic here to hide sidebar on mobile
  //const [sidebarOpen, setSidebarOpen] = useState(false);

  // breaks name into first and last name when editing
  useEffect(() => {
    const [first = "", ...rest] = name.split(" ");
    setFName(first);
    setLName(rest.join(" "));
  }, [editing]);

  // combines first and last name into full name after editing
  useEffect(() => {
    setName([fName, lName].filter(Boolean).join(" "))
  }, [fName, lName]);

  const handleSave = async() => {
    await fetch('/api/session', {
      method: "Post",
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({name, email, address1, address2, city, state}),
    });
    setEditing(false);
  }

  const handlePfpChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPfp(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Layout>
      {/* Mobile sidebar */}

      {!sidebar ? (
        <>
        <button 
      className="md:hidden border rounded bg-gray-800 fixed bottom-10 left-5 z-50 text-white p-2"
      onClick={() => setSidebar(true)}
      >
        View Profile
      </button>
        </>
        
      ) : (
        <>
        <button 
      className="md:hidden border rounded bg-gray-800 fixed bottom-10 left-5 z-50 text-white p-2"
      onClick={() => setSidebar(false)}
      >
        Close Profile
      </button>

      <aside className="w-60 bg-gray-800 text-white p-6 flex flex-col">
        <div className="w-[150px] h-[150px] rounded-full object-fit overflow-hidden flex justify-center mx-auto items-center mb-2">
            <Image
              src={pfp}
              alt="profile picture"
              height={150}
              width={150}
              className="object-contain"
            />
        </div>
      
        <p className="text-xl text-center font-bold">{name}</p>

        <hr className="my-4 border-gray-600" />

        {!editing ? (
        <>
        <p className="text-sm mb-4 text-wrap"><span className="font-bold">Email: </span>{email}</p>
        <hr className="mb-4 border-gray-600" />
        <p className="text-sm mb-2 text-wrap"><span className="font-bold">Address 1: </span>{address1}</p>
        <p className="text-sm mb-2 text-wrap"><span className="font-bold">Address 2: </span>{address2}</p>
        <p className="text-sm mb-2 text-wrap"><span className="font-bold">City: </span>{city}</p>
        <p className="text-sm mb-2 text-wrap"><span className="font-bold">State: </span>{state}</p>

        <button onClick={() => setEditing(true)} className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded">
          Edit Profile
        </button> 
        </>
      ) : (
        <>
        
        <label className="block mb-2 text-sm text-white font-bold" htmlFor="file_input"> Change profile pic </label>
        <input className="block w-full text-sm text-black hover:bg-gray-200 file:mr-4 border border-gray-300 cursor-pointer bg-gray-50" 
        id="file_input"
        type="file"
        accept="image/*"
        onChange={handlePfpChange}
        />
        
        <hr className="my-4 border-gray-600" />

        <div className="w-full mb-2">
          <label className="w-28 text-sm font-bold mr-2" htmlFor="FName">First Name:</label>
          <input className="w-full p-2 border"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          placeholder="First Name" 
        />
        </div>
        <div className="w-full mb-2">
           <label className="w-28 text-sm font-bold mr-2" htmlFor="lName">Last Name:</label>
          <input className="w-full p-2 border"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
          placeholder="Last Name" 
        />
        </div>
        <div className="w-full mb-2">
           <label className="w-28 text-sm font-bold mr-2" htmlFor="email">Email:</label>
          <input className="w-full p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" 
        />
        </div>
        <div className="w-full mb-2">
           <label className="w-28 text-sm font-bold mr-2" htmlFor="address1">Address 1:</label>
          <input className="w-full p-2 border"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          placeholder="Address 1" 
        />
        </div>
        <div className="w-full mb-2">
           <label className="w-28 text-sm font-bold mr-2" htmlFor="address2">Address 2:</label>
          <input className="w-full p-2 border"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          placeholder="Address 2" 
        />
        </div>
        <div className="w-full mb-2">
           <label className="w-28 text-sm font-bold mr-2" htmlFor="city">City:</label>
          <input className="w-full p-2 border"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
        </div>
        <div className="w-full mb-2">
            <label className="w-28 text-sm font-bold mr-2" htmlFor="state">State:</label>
          <input className="w-full p-2 border"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
        />
        </div>  
        <button onClick={() => setEditing(false)} className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded">
          Save Changes
        </button> 
        
        </>
        
        )
        }
        </aside>

        </>
      )
      }

      

      {/* Desktop sidebar */}
      <div className="min-h-screen flex md:flex-row">

      <aside className="hidden md:block w-60 bg-gray-800 text-white p-6 flex flex-col">
        <div className="w-[150px] h-[150px] rounded-full object-fit overflow-hidden flex justify-center mx-auto items-center mb-2">
            <Image
              src={pfp}
              alt="profile picture"
              height={150}
              width={150}
              className="object-contain"
            />
        </div>
      
        <p className="text-xl text-center font-bold">{name}</p>

        <hr className="my-4 border-gray-600" />

        {!editing ? (
        <>
        <p className="text-sm mb-4 text-wrap"><span className="font-bold">Email: </span>{email}</p>
        <hr className="mb-4 border-gray-600" />
        <p className="text-sm mb-2 text-wrap"><span className="font-bold">Address 1: </span>{address1}</p>
        <p className="text-sm mb-2 text-wrap"><span className="font-bold">Address 2: </span>{address2}</p>
        <p className="text-sm mb-2 text-wrap"><span className="font-bold">City: </span>{city}</p>
        <p className="text-sm mb-2 text-wrap"><span className="font-bold">State: </span>{state}</p>

        <button onClick={() => setEditing(true)} className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded">
          Edit Profile
        </button> 
        </>
      ) : (
        <>
        
        <label className="block mb-2 text-sm text-white font-bold" htmlFor="file_input"> Change profile pic </label>
        <input className="block w-full text-sm text-black hover:bg-gray-200 file:mr-4 border border-gray-300 cursor-pointer bg-gray-50" 
        id="file_input"
        type="file"
        accept="image/*"
        onChange={handlePfpChange}
        />
        
        <hr className="my-4 border-gray-600" />

        <div className="w-full mb-2">
          <label className="w-28 text-sm font-bold mr-2" htmlFor="FName">First Name:</label>
          <input className="w-full p-2 border"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          placeholder="First Name" 
        />
        </div>
        <div className="w-full mb-2">
           <label className="w-28 text-sm font-bold mr-2" htmlFor="lName">Last Name:</label>
          <input className="w-full p-2 border"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
          placeholder="Last Name" 
        />
        </div>
        <div className="w-full mb-2">
           <label className="w-28 text-sm font-bold mr-2" htmlFor="email">Email:</label>
          <input className="w-full p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" 
        />
        </div>
        <div className="w-full mb-2">
           <label className="w-28 text-sm font-bold mr-2" htmlFor="address1">Address 1:</label>
          <input className="w-full p-2 border"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          placeholder="Address 1" 
        />
        </div>
        <div className="w-full mb-2">
           <label className="w-28 text-sm font-bold mr-2" htmlFor="address2">Address 2:</label>
          <input className="w-full p-2 border"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          placeholder="Address 2" 
        />
        </div>
        <div className="w-full mb-2">
           <label className="w-28 text-sm font-bold mr-2" htmlFor="city">City:</label>
          <input className="w-full p-2 border"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
        </div>
        <div className="w-full mb-2">
            <label className="w-28 text-sm font-bold mr-2" htmlFor="state">State:</label>
          <input className="w-full p-2 border"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
        />
        </div>  
        <button onClick={() => setEditing(false)} className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded">
          Save Changes
        </button> 
        
        </>
        
        )
        }
        </aside>
        
        
        <main className="flex-1 p-6">
        <header className="bg-gray-100 p-4 mb-4 rounded-md shadow">
          <h1 className="text-xl font-semibold text-black">My Account</h1>
        </header>
        <section className="min-h-screen bg-white text-black p-6 rounded-md shadow">
          <p>lorem ipsum more stuff here later</p>
        </section>
        </main>
      </div>
                   
    </Layout>);
  }

