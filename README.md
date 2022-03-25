# Steam SysReq

Gets system requirement information to compare to the ones shown in Steam.

# Usage

```js
import getSteamSysReq from 'steam-sysreq';

const steamSysReq = await getSteamSysReq();

console.log(steamSysReq);
```

Example output:

```js
{
  os: 'Linux 5.13.0-37-generic (Ubuntu 21.10)',
  processor: 'Intel Pentium® 6405U @ 2.40GHz',
  ram: '8 GB',
  graphics: [
    'Intel Corporation Device 9b21',
    'NVIDIA Corporation GM108M [GeForce MX130]'
  ],
  availableDiskSpace: '826 GB'
}
```
