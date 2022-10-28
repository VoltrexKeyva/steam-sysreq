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
  os: 'Linux 5.19.0-23-generic (Ubuntu 22.10)',
  processor: 'Intel Pentium® 6405U @ 2.40GHz',
  ram: '8 GB',
  graphics: [
    'Intel Corporation Comet Lake-U GT2 [UHD Graphics 620]',
    'NVIDIA Corporation GM108M [GeForce MX130]'
  ],
  availableDiskSpace: '644 GB'
}
```
