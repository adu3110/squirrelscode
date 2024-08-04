import React from 'react';

type SidebarProps = {
    
};

const Sidebar:React.FC<SidebarProps> = () => {
    
    return (
        <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row">
{/* 
    <!-- sticky sidebar --> */}
    <aside className="hidden md:w-1/3 lg:w-1/4 py-4 md:block">
        <div className="sticky top-12 flex flex-col gap-2 p-2 border rounded-xl">

            <a href="" className="px-3 py-1 font-semibold hover:bg-indigo-50 rounded-md">
                Dashboard
            </a>

            <a href="" className="px-3 py-1 font-semibold opacity-90 hover:bg-indigo-50 rounded-md">
                Study Lists
            </a>

            <a href="" className="px-3 py-1 font-semibold opacity-90 hover:bg-indigo-50 rounded-md">
                Your contribution
            </a>

            <div className="inline-flex items-center pl-1">
                <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"></path>
                </svg>
                <a href="" className="py-1 font-semibold hover:bg-indigo-50 rounded-md">
                    Recently viewed
                </a>
            </div>

            <a href="" className="px-3 py-1 font-semibold opacity-90 hover:bg-indigo-50 rounded-md">
                Settings
            </a>

            <button type="submit"
                className="text-red-500 text-sm font-semibold hover:text-purple-600 mb-1 border bg-white px-3 py-2 hover:bg-violet-200 rounded-md">
                Log Out
            </button>
        </div>
    </aside>



    <main className="md:w-2/3 lg:w-3/4 w-full py-1 min-h-screen">
        <div className="p-2 md:p-4">
            <h1 className="font-bold text-xl md:text-2xl my-4">Recently Viewed</h1>

            {/* <!-- content --> */}
            <div>

                <h2 className="text-xl font-bold mb-4">Today</h2>

                <ul className="space-y-10">
                    <li className="flex items-center space-x-4">
                        <img src="https://source.unsplash.com/random/200x200" alt="Product 1"
                            className="w-16 h-16 rounded-full">
                        <div>
                            <h3 className="text-lg font-semibold">Product 1</h3>
                            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </li>
                    <li className="flex items-center space-x-4">
                        <img src="https://source.unsplash.com/random/200x200" alt="Product 2"
                            className="w-16 h-16 rounded-full">
                        <div>
                            <h3 className="text-lg font-semibold">Product 2</h3>
                            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </li>
                    <li className="flex items-center space-x-4">
                        <img src="https://source.unsplash.com/random/200x200" alt="Product 3"
                            className="w-16 h-16 rounded-full">
                        <div>
                            <h3 className="text-lg font-semibold">Product 3</h3>
                            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </li>
                </ul>


                <h2 className="text-xl font-bold my-4">Yesterday</h2>
                <ul className="space-y-10">
                    <li className="flex items-center space-x-4">
                        <img src="https://source.unsplash.com/random/200x200" alt="Product 1"
                            className="w-16 h-16 rounded-full">
                        <div>
                            <h3 className="text-lg font-semibold">Product 1</h3>
                            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </li>
                    <li className="flex items-center space-x-4">
                        <img src="https://source.unsplash.com/random/200x200" alt="Product 2"
                            className="w-16 h-16 rounded-full">
                        <div>
                            <h3 className="text-lg font-semibold">Product 2</h3>
                            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </li>
                    <li className="flex items-center space-x-4">
                        <img src="https://source.unsplash.com/random/200x200" alt="Product 3"
                            className="w-16 h-16 rounded-full">
                        <div>
                            <h3 className="text-lg font-semibold">Product 3</h3>
                            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </li>
                </ul>

            </div>

        </div>
    </main>
</div>
    )
}
export default Sidebar;