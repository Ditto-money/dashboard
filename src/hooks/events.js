import { useCallback } from 'react';

export function useHandleSwapEventData() {
    return useCallback((events, fromBlock, toBlock) => {
        const newest = events
        .concat()
        .sort((a, b) => b.blockNumber - a.blockNumber);
    
        const swaps = newest.map(value => {
            return {
                to: value.args.to,
                amount0Out: value.args.amount0Out,
                amount0In: value.args.amount0In
            };
        });
    
        let address_swapss = [];
        let filter = [];
    
        for (let i = 0; i < swaps.length; i++) {
            address_swapss = [
                ...address_swapss,
                {
                    address: swaps[i].to,
                    transfer_in: 0,
                    ditto_in: swaps[i].amount0Out / 1000000000,
                    ditto_out: swaps[i].amount0In / 1000000000,
                    total_volume: 
                        swaps[i].amount0Out / 1000000000 +
                        swaps[i].amount0In / 1000000000,
                    fromBlock,
                    toBlock
                }
            ];
    
            const index = filter.findIndex(
                (x) => x.address === address_swapss[i].address
            );
            if (index === -1) {
                filter = [...filter, address_swapss[i]];
            } else {
                filter = [...filter];
                const transfer = filter[index].transfer_in;
                const In =
                filter[index].ditto_in +
                address_swapss[i].ditto_in;
                const Out =
                filter[index].ditto_out +
                address_swapss[i].ditto_out;
                const total = transfer + In + Out;
    
                filter[index] = {
                address: filter[index].address,
                transfer_in: transfer,
                ditto_in: In,
                ditto_out: Out,
                total_volume: total,
                fromBlock,
                toBlock
                };
            }
        }
    
        return filter;
    }, []);
} 
    

export function useHandleTransferEventData() {
    return useCallback((events, fromBlock, toBlock) => {
        const newest = events
        .concat()
        .sort((a, b) => b.blockNumber - a.blockNumber);
    
        const swaps = newest.map((value) => {
            return {
                to: value.args.to,
                from: value.args.from,
                value: value.args.value.toString()
            };
        });
    
        let address_swaps = [];
        let filter = [];
    
        for (let i = 0; i < swaps.length; i++) {
            address_swaps = [
                ...address_swaps,
                {
                    address: swaps[i].from,
                    transfer_in: swaps[i].value / 1000000000,
                    ditto_in: 0,
                    ditto_out: 0,
                    total_volume: swaps[i].value / 1000000000,
                    fromBlock,
                    toBlock
                }
            ];
    
            const index = filter.findIndex(
                (x) => x.address === address_swaps[i].address
            );
    
            if (index === -1) {
                filter = [...filter, address_swaps[i]];
            } else {
                filter = [...filter];
                const transfer = 
                    filter[index].transfer_in + 
                    address_swaps[i].transfer_in;
                const In = 
                    filter[index].ditto_in +
                    address_swaps[i].ditto_in;
                const Out =
                    filter[index].ditto_out +
                    address_swaps[i].ditto_out;
                const total = transfer;
    
                filter[index] = {
                    address: filter[index].address,
                    transfer_in: transfer,
                    ditto_in: In,
                    ditto_out: Out,
                    total_volume: total,
                    fromBlock,
                    toBlock
                };
            }
        }

        return filter;
    }, []);
} 