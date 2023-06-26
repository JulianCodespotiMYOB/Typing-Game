import React from 'react';
import Layout from '../components/layout/Layout';
import Game from '@/components/game/Game';


const Home: React.FC = () => {
    return (
        <Layout>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    <Game/>
                </div>
            </main>
        </Layout>
    );
};

export default Home;
