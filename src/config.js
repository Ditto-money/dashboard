export const APP_SLUG = 'ditto';

export const APP_TITLE = 'Ditto Dashboard';

export const CACHE_WALLET_KEY = 'wallet';

export const BORDER_RADIUS = 8;

export const IS_TESTNET = !!~window.location.href.indexOf('testnet');
export const IS_DEV = !!~window.location.href.indexOf('local');

export const API_URL =
  process.env.REACT_APP_API_URL ||
  (IS_TESTNET
    ? 'https://ditto.money/api-testnet'
    : IS_DEV
    ? 'http://localhost:5001'
    : 'https://ditto.money/api');

export const CONTRACTS = IS_TESTNET
  ? {
      token: '0xbf8C8eFD410414929eb63c62E2C28596c1AB7318',
      controller: '0xA121Fde07be72Dc9494FBa99bc84E48724a68820',
      oracle: '0xdA28e9c657D4690cb367D1d3dD969A8969c0b3D8',
    }
  : {
      token: '0x233d91A0713155003fc4DcE0AFa871b508B3B715',
      controller: '0xdaE0B6F111c62010a8dC6A003B02053C004cFFc1',
      oracle: '0x2df19009b4a48636699d4dbf00e1d7f923c6fa47',
      pair: '0x470BC451810B312BBb1256f96B0895D95eA659B1'
    };

export const INFURA_ID = '1e8cc8aac2bd47f98da31fd2846d6132';

export const NETWORK_NAME = IS_TESTNET ? 'testnet' : 'mainnet';

export const NETWORK_CHAIN_ID = IS_TESTNET ? 97 : 56;

export const READ_WEB3_PROVIDER = IS_TESTNET
  ? 'https://data-seed-prebsc-1-s1.binance.org:8545'
  : 'https://bsc-dataseed1.binance.org:443';

export const DURATIONS_MAP = new Map([
  ['1d', '1 DAY'],
  ['30d', '30 DAYS'],
  ['all', 'ALL'],
]);

export const TYPES_MAP = new Map([
  ['abs', 'ABS'],
  ['%', '%'],
]);

export const DURATIONS_ARRAY = Array.from(DURATIONS_MAP);
export const TYPES_ARRAY = Array.from(TYPES_MAP);

export const SECONDARY_COLOR = '#ed7ac0';

export const BLACKLIST = {
  'Address': {
    '1': '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F',
    '2': '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    '3': '0x4C35d9646C9E4ce9E57c074822F015581D0E0057',
    '4': '0x1B96B92314C44b159149f7E0303511fB2Fc4774f',
    '5': '0x5815511AA694C7157712405F324CA1EE01539C29',
    '6': '0x470BC451810B312BBb1256f96B0895D95eA659B1'
  }
};

export const BLOCKS_PER_DAY = 28800;

export const COMPETITION_DATA = {
  days: 5,
  startBlock: 4438000,
  firstBlock: 3316992
};
