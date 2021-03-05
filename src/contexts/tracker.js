import React, { useEffect, useCallback } from 'react';
import useStateRef from 'react-usestateref';
import { useWallet } from './wallet';
import usePairContract from 'hooks/usePairContract';
import useTokenContract from 'hooks/useTokenContract';
import { useHandleSwapEventData, useHandleTransferEventData } from 'hooks/events';
import { filterBlacklisted } from '../utils/filter';
import { BLOCKS_PER_DAY, COMPETITION_DATA } from 'config';

const TrackerContext = React.createContext(null);

export function TrackerProvider({ children }) {
    return (
        <TrackerContext.Provider>
            {children}
        </TrackerContext.Provider>
    );
}

export function useTrackerInfo() {
    const [data, setData] = useStateRef({
        ditto_pair: [],
        ditto_token: [],
        firstBlock: 3316992,
  
        toBlock: 0,
        fromBlock: 0,
        blocksPerDay: 28800,

        swaps: [],
        address_swaps: [],
        address_swapss: [],
        filter: [],
        added: [],
        sortedVolume: [],
        loading: true,

        start_time: 0,
        end_time: 0,
        lastKnownTime: 0,

        numberOfDays_competition: 5,
        competitionStartBlock: 4438000,
        lastKnownBlock: 0,
    });

    const { signer } = useWallet();
    const pairContract = usePairContract();
    const tokenContract = useTokenContract();
    const handleSwapEventData = useHandleSwapEventData();
    const handleTransferEventData = useHandleTransferEventData();

    const loadDay = useCallback(async() => {
        const filters = pairContract.filters.Swap();
        const fromBlock = COMPETITION_DATA.startBlock;
        const toBlock =  COMPETITION_DATA.startBlock + 
            (BLOCKS_PER_DAY * COMPETITION_DATA.days);

        const events = await pairContract.queryFilter(
            filters, 
            fromBlock, 
            toBlock
        );
        const data = handleSwapEventData(events);
        const whitelist = filterBlacklisted(data)
            .sort((a, b) => b.total_volume - a.total_volume);

        setData(state => ({
            ...state,
            sortedVolume: whitelist,
            loading: false
        }));
    }, [handleSwapEventData, pairContract]);

    const loadToken = useCallback(async() => {
        if (!signer) return;

        const { provider } = signer;

        const filters = tokenContract.filters.Transfer(
            null, 
            '0x470BC451810B312BBb1256f96B0895D95eA659B1'
        );
        
        const currentBlock = await provider.getBlockNumber();
        const fromBlock = COMPETITION_DATA.startBlock;
        const toBlock =  COMPETITION_DATA.startBlock + 
            (BLOCKS_PER_DAY * COMPETITION_DATA.days);
        const lastKnownBlock = currentBlock;
        
        const current_time = await provider.getBlock(lastKnownBlock);
        const start_time = await provider.getBlock( COMPETITION_DATA.startBlock);
        const competitionDays = BLOCKS_PER_DAY * COMPETITION_DATA.days * 3;

        const events = await tokenContract.queryFilter(
            filters, 
            fromBlock, 
            toBlock
        );
        const data = handleTransferEventData(events, fromBlock, toBlock);
        const whitelist = filterBlacklisted(data)
            .sort((a, b) => b.total_volume - a.total_volume);

        setData(state => ({
            ...state,
            toBlock,
            fromBlock,
            lastKnownBlock,
            sortedVolume: whitelist,
            loading: false,
            start_time: new Date(parseInt(start_time.timestamp, 10) * 1000),
            end_time: new Date(parseInt(start_time.timestamp + competitionDays, 10) * 1000),
            lastKnownTime: new Date(parseInt(current_time.timestamp, 10) * 1000),
        }));
        
        setTimeout(() => loadDay(), 2500);
    }, [handleTransferEventData, loadDay, signer, tokenContract]);

    useEffect(() => {
        loadToken();
    }, [loadToken]);

    return { data };
}