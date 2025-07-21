import Layout from "../components/Layout";
import Image from 'next/image';

export default function Page() {
  return (
    <Layout>
      <div className="min-h-screen flex">
        <aside className="w-50 bg-gray-800 text-white p-6 flex flex-col">
        {/* w=width */}
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src="/image.jpg"
              alt="profile picture"
              height={150}
              width={150}
              className="object-contain"
              />
              </div>
              <div> space</div>
              <p className="text-xl text-left font-bold">Jane Doe</p>

              <hr className="my-4 border-gray-600" />
        </aside>
        <main className="flex-1 p-6">
        <header className="bg-gray-100 p-4 mb-4 rounded-md shadow">
          <h1 className="text-xl font-semibold">Welcome back!</h1>
        </header>
        <section className="bg-white p-6 rounded-md shadow">
          <p>lorem ipsum more stuff here later</p>
        </section>
        </main>
      </div>
                   
    </Layout>);
}
