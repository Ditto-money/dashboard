import { ethers } from 'ethers';
import { CONTRACTS } from 'config';
import PAIR_ABI from 'abis/pair.json';
import { useWallet } from 'contexts/wallet';
import { useMemo } from 'react';

export default function usePairContract() {
    const { signer } = useWallet();
    
    return  useMemo(() => {
        if (!signer) return;
        return new ethers.Contract(CONTRACTS.pair, PAIR_ABI, signer);
    }, [signer]);
}