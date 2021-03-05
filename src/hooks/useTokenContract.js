import { ethers } from 'ethers';
import { CONTRACTS } from 'config';
import TOKEN_ABI from 'abis/token.json';
import { useWallet } from 'contexts/wallet';
import { useMemo } from 'react';

export default function useTokenContract() {
    const { signer } = useWallet();
    
    return  useMemo(() => {
        if (!signer) return;
        return new ethers.Contract(CONTRACTS.token, TOKEN_ABI, signer);
    }, [signer]);
}