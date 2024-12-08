import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useOkto } from "okto-sdk-react";
import { useRouter } from "next/navigation";

export function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logOut, getWallets } = useOkto();
  const router = useRouter();
  const [wallets, setWallets] = useState([]);

  const handleImageClick = async () => {
    try {
      const walletsResponse = await getWallets();
      setWallets(walletsResponse.wallets || []);
      setIsDropdownOpen(!isDropdownOpen);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b-2 border-black relative">
      <Link href="/" className="text-primary text-2xl font-bold">
        MemAi
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/exchange" className="nav-link flex items-center gap-1">
          Exchange <ChevronDown className="w-4 h-4" />
        </Link>
        <Link href="/marketplace" className="nav-link flex items-center gap-1">
          Marketplace <ChevronDown className="w-4 h-4" />
        </Link>
        <Link href="/treasury" className="nav-link flex items-center gap-1">
          Treasury <ChevronDown className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex items-center gap-2 relative">
        <span className="text-sm">Aarlio Messi</span>
        <img
          className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer"
          src="https://lh3.googleusercontent.com/a/ACg8ocLTckYxLwA7SVb3OdYMpI3Xnmaboco_LBrLCmwvdVLNQAhoZQ3b=s360-c-no"
          onClick={handleImageClick}
        />

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            {wallets.map((wallet, index) => (
              <div key={index} className="p-3 border-b border-gray-100">
                <div className="text-sm font-medium">{wallet.network_name}</div>
                <div className="text-xs text-gray-500 break-all">
                  {wallet.address}
                </div>
              </div>
            ))}
            <button
              onClick={handleLogout}
              className="w-full p-3 text-left text-red-500 hover:bg-gray-50"
            >
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
