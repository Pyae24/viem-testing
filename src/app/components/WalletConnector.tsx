'use client';

import { useEffect, useState } from "react";

export default function WalletConnector() {
    const [address, setAddress] = useState<string | undefined>(undefined);
    const [balance, setBalance] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWalletData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/wallet');
                const data = await response.json();

                if (response.ok) {
                    setAddress(data.address)
                    setBalance(data.balance)
                } else {
                    setError(data.error)
                }
            } catch (error) {
                console.log('Error fetching wallet data', error);
                setError('Failed to fetch wallet data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchWalletData();
    }, []);

    return (
        <div>
            {isLoading && <div>Connecting...</div>}
            {error && <div>Error: {error}</div>}
            {address && <div>Connected to: {address}</div>}
            {balance && <div> Balance: {balance} MATIC</div>}
        </div>
    );
}