import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 text-white py-4 px-6">
            <div className="flex justify-between items-center">
                <Link href="/">Typing Game</Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link href="/leaderboard">Leaderboard</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
