"use client";

import Layout from "../components/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [pfp, setPfp] = useState("/image.jpg");
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  const [sidebar, setSidebar] = useState(false);

  // add logic here to hide sidebar on mobile
  //const [sidebarOpen, setSidebarOpen] = useState(false);

  // breaks name into first and last name when editing
  useEffect(() => {
    const [first = "", ...rest] = name.split(" ");
    setFName(first);
    setLName(rest.join(" "));
  }, [editing, name]);

  // combines first and last name into full name after editing
  useEffect(() => {
    setName([fName, lName].filter(Boolean).join(" "));
  }, [fName, lName]);

  useEffect(() => {
    // Load session data on mount
    fetch("./api/session")
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || name);
        setEmail(data.email || email);
        setAddress1(data.address1 || address1);
        setAddress2(data.address2 || address2);
        setCity(data.city || city);
        setState(data.state || state);
        setPfp(data.pfp || pfp);
        setZipCode(data.zipCode || zipCode);
        setPurchasedProducts(data.purchasedProducts || []);
      });
  }, [name, email, address1, address2, city, state, pfp, zipCode]);

  const handleSave = async () => {
    await fetch("/api/session", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        address1,
        address2,
        city,
        state,
        zipCode,
      }),
    });
    setEditing(false);
  };

  console.log(
    "purchasedProducts:",
    purchasedProducts,
    typeof purchasedProducts
  );
  const handlePfpChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPfp(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

          <aside className="md:hidden w-full bg-gray-800 text-white p-6 space-y-6">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
                <Image
                  src={pfp}
                  alt="profile picture"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-2xl font-semibold text-center">{name}</p>
            </div>

            <hr className="border-gray-700" />

            {!editing ? (
              <>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Email:</span> {email}
                  </p>
                  <p>
                    <span className="font-semibold">Address 1:</span> {address1}
                  </p>
                  <p>
                    <span className="font-semibold">Address 2:</span> {address2}
                  </p>
                  <p>
                    <span className="font-semibold">City:</span> {city}
                  </p>
                  <p>
                    <span className="font-semibold">State:</span> {state}
                  </p>
                  <p>
                    <span className="font-semibold">Zip Code:</span> {zipCode}
                  </p>
                </div>

                <button
                  onClick={() => setEditing(true)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded mt-4"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                {/* Profile Picture Upload */}
                <div>
                  <label
                    htmlFor="file_input"
                    className="block text-sm font-medium mb-1"
                  >
                    Change profile picture
                  </label>
                  <input
                    id="file_input"
                    type="file"
                    accept="image/*"
                    onChange={handlePfpChange}
                    className="w-full text-sm text-black bg-white border border-gray-300 rounded p-2"
                  />
                </div>

                <hr className="border-gray-700" />

                <div className="space-y-4">
                  {[
                    { label: "First Name", value: fName, setter: setFName },
                    { label: "Last Name", value: lName, setter: setLName },
                    { label: "Email", value: email, setter: setEmail },
                    {
                      label: "Address 1",
                      value: address1,
                      setter: setAddress1,
                    },
                    {
                      label: "Address 2",
                      value: address2,
                      setter: setAddress2,
                    },
                    { label: "City", value: city, setter: setCity },
                    { label: "State", value: state, setter: setState },
                    { label: "Zip Code", value: zipCode, setter: setZipCode },
                  ].map(({ label, value, setter }) => (
                    <div key={label}>
                      <label className="block text-sm font-semibold mb-1">
                        {label}
                      </label>
                      <input
                        className="w-full p-2 rounded border border-gray-300 text-white"
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        placeholder={label}
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSave}
                  className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded mt-4"
                >
                  Save Changes
                </button>
              </>
            )}
          </aside>
        </>
      )}

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
              <p className="text-sm mb-4 text-wrap">
                <span className="font-bold">Email: </span>
                {email}
              </p>
              <hr className="mb-4 border-gray-600" />
              <p className="text-sm mb-2 text-wrap">
                <span className="font-bold">Address 1: </span>
                {address1}
              </p>
              <p className="text-sm mb-2 text-wrap">
                <span className="font-bold">Address 2: </span>
                {address2}
              </p>
              <p className="text-sm mb-2 text-wrap">
                <span className="font-bold">City: </span>
                {city}
              </p>
              <p className="text-sm mb-2 text-wrap">
                <span className="font-bold">State: </span>
                {state}
              </p>
              <p className="text-sm mb-2 text-wrap">
                <span className="font-bold">Zip Code: </span>
                {zipCode}
              </p>

              <button
                onClick={() => setEditing(true)}
                className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <label
                className="block mb-2 text-sm text-white font-bold"
                htmlFor="file_input"
              >
                {" "}
                Change profile pic{" "}
              </label>
              <input
                className="block w-full text-sm text-black hover:bg-gray-200 file:mr-4 border border-gray-300 cursor-pointer bg-gray-50"
                id="file_input"
                type="file"
                accept="image/*"
                onChange={handlePfpChange}
              />

              <hr className="my-3 border-gray-600" />

              <div className="w-full mb-2">
                {[
                  { label: "First Name", value: fName, setter: setFName },
                  { label: "Last Name", value: lName, setter: setLName },
                  { label: "Email", value: email, setter: setEmail },
                  { label: "Address 1", value: address1, setter: setAddress1 },
                  { label: "Address 2", value: address2, setter: setAddress2 },
                  { label: "City", value: city, setter: setCity },
                  { label: "State", value: state, setter: setState },
                  { label: "Zip Code", value: zipCode, setter: setZipCode },
                ].map(({ label, value, setter }) => (
                  <div key={label}>
                    <label className="w-28 text-sm font-bold mr-2">
                      {label}
                    </label>
                    <input
                      className="w-full p-2 border"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={label}
                    />
                  </div>
                ))}
              </div>

              {/* <div className="w-full mb-2">
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
        </div>   */}
              <button
                onClick={handleSave}
                className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </>
          )}
        </aside>

        <main className="flex-1 p-6">
          <header className="bg-gray-100 p-4 mb-4 rounded-md shadow">
            <h1 className="text-xl font-semibold text-black">My Account</h1>
          </header>
          <section className="min-h-screen bg-white text-black p-6 rounded-md shadow">
            <h1 className="text-xl font-bold text-black">Account History</h1>
            <hr className="mb-4 border-gray-600" />
            <div>
              <ul>
                {purchasedProducts.length === 0 ? (
                  <li>No purchases yet.</li>
                ) : (
                  purchasedProducts.map((product) => (
                    <li key={product.productId} className="mb-2">
                      <span className="font-semibold">
                        {product.productName}
                      </span>{" "}
                      - Qty: {product.selectedQuantity}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
