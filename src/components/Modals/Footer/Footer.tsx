import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
type FooterProps = {
    
};

const Footer:React.FC<FooterProps> = () => {
    const theme = createTheme({
        typography: {
          fontFamily: "pacifico",
          fontSize: 17
    
        }
      });
    
    return <div>
        <footer className="relative flex h-[70px] w-full shrink-0 items-center px-8 bg-light-blue text-white">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://www.squirrelstech.org/" className="hover:underline">Squirrels</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
        {/* <ThemeProvider theme={theme}> */}
            <a>Developed by</a>
            <a href="https://www.linkedin.com/in/aditi-t-chatterji-69082b75/" > Aditi </a>
            <a>&</a>
            <a href="https://www.linkedin.com/in/hari-mishra-bb9284184/" > Hari</a>
            {/* </ThemeProvider> */}
        </li>
        {/* <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li> */}
    </ul>
    </div>
</footer>

    </div>
}
export default Footer;

