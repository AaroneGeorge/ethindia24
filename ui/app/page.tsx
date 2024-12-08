"use client"
import React, { useEffect, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import { useOkto, OktoContextType, BuildType, AuthType } from "okto-sdk-react";
import { useAppContext } from "./components/AppContext";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "./components/ui/button";

export default function Home() {
  const { data: session } = useSession();
  const { apiKey, setApiKey, buildType, setBuildType } = useAppContext();
  const {
    isLoggedIn,
    authenticate,
    createWallet,
    getWallets,
    showOnboardingModal,
  } = useOkto() as OktoContextType;

  const idToken = useMemo(() => (session ? session.id_token : null), [session]);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Okto is authenticated");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const authenticate = async () => {
      if (idToken) {
        await handleAuthenticate();
        createWallet();
        getWallets();
      }
    };

    authenticate();
  }, [idToken]);

  async function handleAuthenticate(): Promise<any> {
    if (!idToken) {
      return { result: false, error: "No google login" };
    }
    return new Promise((resolve) => {
      authenticate(idToken, (result: any, error: any) => {
        if (result) {
          console.log("Authentication successful");
          resolve({ result: true });
        } else if (error) {
          console.error("Authentication error:", error);
          resolve({ result: false, error });
        }
      });
    });
  }

  const handleConnectWallet = () => {
    if (!isLoggedIn) {
      showOnboardingModal(AuthType.GAUTH, "MemAi");
    }
  };

  setApiKey(process.env.NEXT_PUBLIC_OKTO_CLIENT_API);

  const [walletAddress, setWalletAddress] = React.useState("");

  useEffect(() => {
    const getWalletDetails = async () => {
      if (isLoggedIn) {
        try {
          const response = await getWallets();
          if (response?.wallets?.[0]) {
            setWalletAddress(response.wallets[0].address);
          }
        } catch (error) {
          console.error("Error getting wallet:", error);
        }
      }
    };
    getWalletDetails();
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-violet-200">
      <div className="text-center space-y-8 max-w-xl p-6">
        <Button
          variant="outline"
          onClick={handleConnectWallet}
          className="w-64 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                   hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                   transition-all bg-white px-6 py-3"
        >
          {walletAddress
            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : "Connect Wallet"}
        </Button>

        {isLoggedIn && (
          <Link
            href="/landing"
            className="flex items-center justify-center gap-2 text-primary hover:underline"
          >
            Explore MemAi <ArrowRight className="w-4 h-4" />
          </Link>
        )}

        <div className="hidden">
          <select
            value={buildType}
            onChange={(e) => setBuildType(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-200 text-black"
          >
            <option value={BuildType.SANDBOX}>Sandbox</option>
            <option value={BuildType.STAGING}>Staging</option>
            <option value={BuildType.PRODUCTION}>Production</option>
          </select>
        </div>
      </div>
    </div>
  );
}
