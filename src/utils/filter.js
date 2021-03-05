import { BLACKLIST } from 'config';

export function filterBlacklisted(arr) {
    return arr.filter((x) => 
        x.address !== BLACKLIST.Address[1] &&
        x.address !== BLACKLIST.Address[2] &&
        x.address !== BLACKLIST.Address[3] &&
        x.address !== BLACKLIST.Address[4] &&
        x.address !== BLACKLIST.Address[5] &&
        x.address !== BLACKLIST.Address[6]
    );
}