
export default function Footer() {
    let date = new Date().getFullYear();
    return (
        <footer className="text-center p-2 text-sm md:text-lg italic border-t-1 border-solid border-gray-200 relative bottom-0 w-auto z-20 primary-bg transition ease-in-out duration-700 ">
            &copy; Copyright {date} | All Rights Reserved
        </footer>
    );  
}

