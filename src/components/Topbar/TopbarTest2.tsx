import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import Timer from "../Timer/Timer";
import Logout from "../Buttons/Logout";
type TopbarProps = {}

const Topbar: React.FC<TopbarProps> = () => {
    
    const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <Link href='/' className='flex items-center justify-center h-10'> */}
            <img src='/squirrels.png' alt='Squirrels' width={30} height={30} />
            {/* </Link> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Let's Code
          </Typography>
          <Button color="inherit" variant="outlined" onClick={handleClick}>Buy me a coffee</Button>
        
        {!user && (
						<Link
							href='/auth'
							onClick={() => setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }))}
						>
							<Button color="inherit" variant="outlined" onClick={handleClick}>Login</Button>
						</Link>
					)}
					{/* {user && problemPage &&<Timer />} */}
					{/* {user && ( */}
						<div className='cursor-pointer group relative'>
							<Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
							<div
								className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-white text-black p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
							>
								<p className='text-sm'>{user.email}</p>
							</div>
						</div>
					{/* )} */}
					{user && <Logout />}
                    </Toolbar>
      </AppBar>
    </Box>
    
    
  );
}
export default Topbar;