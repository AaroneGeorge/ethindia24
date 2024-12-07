// pages/landing.tsx
import React from 'react';
import Header from '../components/Header';
import Head from 'next/head';

const LandingPage: React.FC = () => {
    return (
        <div>
            <Header/>
        <main>
        <section className="bg-white py-8">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-pink-500">Hello, u degen</h1>
            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor sit amet, adipiscing elit.
            </p>
            <p className="mt-4 text-gray-600">
              Helium arweave compound ankr ethereum siacoin waves holo solana.
              Uniswap revain compound polkadot fantom heder a chilie stacks audius EOS.
              Helium arweave compound ankr ethereum siacoin waves holo solana.
            </p>
            <button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
              Mint a thing
            </button>
          </div>
        </section>

        <section className="bg-white py-8">
          <div className="container mx-auto grid grid-cols-3 gap-4">
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-2xl font-bold text-pink-500">Bitcoin BTC</h2>
              <p className="text-gray-600 text-sm">$51,595 ▲1.13%</p>
              <img src="/bitcoin-chart.svg" alt="Bitcoin chart" className="w-full" />
            </div>
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-2xl font-bold text-pink-500">Bitcoin BTC</h2>
              <p className="text-gray-600 text-sm">$51,595 ▲1.13%</p>
              <img src="/bitcoin-chart.svg" alt="Bitcoin chart" className="w-full" />
            </div>
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-2xl font-bold text-pink-500">Bitcoin BTC</h2>
              <p className="text-gray-600 text-sm">$51,595 ▲1.13%</p>
              <img src="/bitcoin-chart.svg" alt="Bitcoin chart" className="w-full" />
            </div>
          </div>
        </section>

        <section className="bg-white py-8">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-pink-500">Table header</h2>
            <p className="mt-4 text-gray-600">
              Crypto ipsum bitcoin ethereum dogecoin litecoin.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border text-left">Percent</th>
                    <th className="p-2 border text-left">Label</th>
                    <th className="p-2 border text-center">Coin</th>
                    <th className="p-2 border text-center">Amount</th>
                    <th className="p-2 border text-center">TVL</th>
                    <th className="p-2 border text-center">Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border text-center">12.15%</td>
                    <td className="p-2 border text-center">12.15%</td>
                    <td className="p-2 border text-center">WETH</td>
                    <td className="p-2 border text-center">$131,189,987</td>
                    <td className="p-2 border text-center">$374,973,328</td>
                    <td className="p-2 border text-center">0x6b1.1d0f</td>
                  </tr>
                  {/* Add more table rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2024 DEGEN Design System</p>
          <a
            href="https://triceedesign.eth"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            triceedesign.eth
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;