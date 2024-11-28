import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    return (
        <div className="flex justify-between items-center bg-[#2cb957] p-4">
            <h2 className="text-4xl text-white font-bold">CME</h2>
            <div className="flex items-center space-x-4 pr-2">
                <Link to="/" className={`${location.pathname === '/' ? 'bg-white text-[#2cb957]' : 'text-white'} text-lg px-4 py-0.5 rounded-md`}>Home</Link>
                <Link to="/view" className={`${location.pathname === '/view' ? 'bg-white text-[#2cb957]' : 'text-white'} text-lg px-4 py-0.5 rounded-md`}>View</Link>
                <Link to="/log" className={`${location.pathname === '/log' ? 'bg-white text-[#2cb957]' : 'text-white'} text-lg px-4 py-0.5 rounded-md`}>Log</Link>
            </div>

        </div>
    );
}