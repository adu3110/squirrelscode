
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import { title } from "process";
// import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Footer from '@/components/Modals/Footer/Footer'
import Link from "next/link"
import Image from "next/image";
import { useState, CSSProperties } from "react";
import { Button } from "@mui/material";

// import ArraysAndHasshing from "./ProblemsPage/ArraysAndHasshing";

export default function Home() {
    // const [inputs, setInputs] = useState({
    //     id: "",
    //     title: "",
    //     difficulty: "",
    //     category: "",
    //     videoId: "",
    //     link: "",
    //     order: 0,
    //     likes: 0,
    //     dislikes: 0,
    // });
    // const handleInputChange = (e.React.ChangEvent<HTMLInputElement>) => {
    //     setInputs({ 
    //         ...inputs,
    //         [e.target.name]: e.target.value
    //     });
    // };
    // console.log(inputs)
	const [loadingProblems, setLoadingProblems] = useState(true);
	const hasMounted = useHasMounted();

	if (!hasMounted) return null;
	
	
	return (
		<>
			<main className='bg-white min-h-screen '>
				<Topbar />

				<h1
					className='text-2xl text-center text-black dark:text-black font-medium font-mono
					uppercase mt-10 mb-5 flex items-center justify-center h-[calc(10vh-5rem)] pointer-events-none select-none'
				>
					&ldquo; Code with Squirrels &rdquo; 👇
				</h1>   
				<div className='relative overflow-x-auto mx-auto px-60 pb-10'>
					{/* {loadingProblems && (
						<div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
							{[...Array(1)].map((_, idx) => (
								<LoadingSkeleton key={idx} />
							))}
						</div>
					)} */}
<div className="flex flex-wrap gap-4 p-6 justify-center text-lg font-serif">
	
<Link href= '/ArraysAndHashing'
    className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12">
	Arrays & Hashing
        <div className="text-gray-500 font-thin text-sm pt-1">
            <span>Explore</span>
            {/* <span>MCQs: 20697</span> */}
        </div>
		</Link>
		
	

    <a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Two Pointers
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 18222</span> */}
        </div>
    </a>
    <a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Stack
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 14783</span> */}
        </div>
    </a>
    <a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Binary Search
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 8818</span> */}
        </div>
    </a>
    <a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Sliding Window
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 9584</span> */}
        </div>
    </a>
    <a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Linked List
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 2576</span> */}
        </div>
    </a>
    <a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Trees
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 1739</span> */}
        </div>
    </a>
    <a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Tries
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 217</span> */}
        </div>
    </a>
    <a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Backtracking
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	<a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Recursion
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	<a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Searching
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	<a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Sorting
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	<a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Heap/Priority Queue
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	<a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Intervals
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	<a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Greedy
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	<a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Graphs
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	<a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        1-D DP
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	<a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Advanced Graphs
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	<a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        2-D DP
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	<a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Bit Manipulation
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	<a className="bg-gray-100 flex-grow text-black border-l-8 border-olive rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
        href="#">
        Math & Geometry
        <div className="text-gray-500 font-thin text-sm">
            <span>Explore</span>
            {/* <span>MCQs: 154</span> */}
        </div>
    </a>
	
</div>

            
					
				</div>
                    {/* <form className="p-6 flex flex-col max-w-sm gap-3">
                        <input onChange={handleInputChange} type="text" placeholder="problem id" name="id"/>
                        <input onChange={handleInputChange}  type="text" placeholder="problem title" name="title"/>
                        <input onChange={handleInputChange}  type="text" placeholder="difficulty" name="difficulty"/>
                        <input onChange={handleInputChange}  type="text" placeholder="order" name="order"/>             
                        <input onChange={handleInputChange} type="text" placeholder="videoId?" name="videoId"/>
                        <input onChange={handleInputChange} type="text" placeholder="link?" name="link"/>
                        <Button className="bg-black">Save to DB</Button>
                    </form> */}
            
			</main>
			<Footer/>
		</>
	);
}

const LoadingSkeleton = () => {
	return (
		<Box sx={{ width: 800 }}>
      {/* <Skeleton /> */}
      <Skeleton animation="wave" />
      {/* <Skeleton animation={false} /> */}
    </Box>
	);
};



