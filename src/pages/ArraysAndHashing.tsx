import React from 'react';
import QuestionsNavbar from '@/components/QuestionNavbar/QuestionsNavbar';
import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";

import useHasMounted from "@/hooks/useHasMounted";

import { useState } from "react";

export default function Home() {
	const [loadingProblems, setLoadingProblems] = useState(true);
	const hasMounted = useHasMounted();

	if (!hasMounted) return null;

// type ArraysAndHashingProps = {
    
// };

// const ArraysAndHashing:React.FC<ArraysAndHashingProps> = () => {
    
return (
		<>
            
			<main className='bg-white min-h-screen'>
            <QuestionsNavbar />


            
				<h1
					className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					capitalize underline underline-offset-8 underline decoration-wavy underline decoration-sky-500/30 mt-10 mb-5'
				>
					&ldquo; Arrays & Hashing Problems &rdquo; 👇
				</h1>
				<div className='relative overflow-x-auto mx-auto px-6 pb-20 mt-10 mb-5'>
					{loadingProblems && (
						<div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
							{[...Array(10)].map((_, idx) => (
								<LoadingSkeleton key={idx} />
							))}
						</div>
					)}
					<table className='text-sl text-left text-black dark:text-black sm:w-7/12 w-full max-w-[1200px] mx-auto'>
						{!loadingProblems && (
							<thead className='text-xs text-black uppercase dark:text-black border-solid border-2 border-slate-950 '>
								<tr>
									<th scope='col' className='px-1 py-3 w-0 font-large text-black'>
										Status
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-large text-black '>
										Title
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-large text-black' >
										Difficulty
									</th>

									<th scope='col' className='px-6 py-3 w-0 font-large text-black'>
										Category
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-large text-black'>
										Solution
									</th>
								</tr>
							</thead>
						)}
						<ProblemsTable setLoadingProblems={setLoadingProblems} />
                        {/* <ProblemsTable/> */}
					</table>
				</div>
			</main>
		</>
	);
}

const LoadingSkeleton = () => {
	return (
		<div className='flex items-center space-x-12 mt-4 px-6'>
			<div className='w-6 h-6 shrink-0 rounded-full bg-slate-300'></div>
			<div className='h-4 sm:w-52  w-32  rounded-full bg-slate-300'></div>
			<div className='h-4 sm:w-52  w-32 rounded-full bg-slate-300'></div>
			<div className='h-4 sm:w-52 w-32 rounded-full bg-slate-300'></div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};
// export default Home;
          
          
