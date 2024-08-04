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
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};
  return (
    <Box sx={{ flexGrow: 0.5 }}>
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
            <img src='/squirrels.png' alt='Squirrels' width={25} height={25} />
            {/* </Link> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Let's Code
          </Typography>
          <Button color="inherit" variant="outlined" onClick={handleClick}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    
  );
}
export default Navbar;