
export default function Footer() {
    let date = new Date().getFullYear();
    return (
        <footer className="text-center p-2 font-bold text-2xl border-t-1 border-solid border-gray-200 relative bottom-0 w-auto z-20 bg-white">
            &copy; Copyright {date}
        </footer>
    );
}

