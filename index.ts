import { osInfo, cpu, mem, graphics, fsSize } from 'systeminformation';

const formattedOsNames: Record<string, string> = {
    aix: 'Aix',
    darwin: 'Darwin',
    freebsd: 'FreeBSD',
    linux: 'Linux',
    openbsd: 'OpenBSD',
    netbsd: 'NetBSD',
    sunos: 'SunOS',
    android: 'Android'
  },
  sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  logBase = Math.log(1024);

/**
 * Formats bytes into a more human-readable form.
 */
function formatBytes(bytes: number): string {
  const exponent = Math.floor(Math.log(bytes) / logBase);

  return `${(bytes / Math.pow(1024, exponent)).toFixed()} ${sizes[exponent]}`;
}

interface SystemRequirements {
  os: string;
  processor: string;
  ram: string;
  graphics: string[];
  availableDiskSpace: string | null;
}

/**
 * Gets the Steam system requirements information.
 */
export default async function getSteamSysReq(): Promise<SystemRequirements> {
  const osInfo_ = await osInfo(),
    cpu_ = await cpu(),
    mem_ = await mem(),
    graphics_ = await graphics(),
    fsSize_ = await fsSize();

  return {
    os: `${formattedOsNames[osInfo_.platform] ?? osInfo_.platform} ${
      osInfo_.kernel
    } (${osInfo_.distro} ${osInfo_.release})`,
    processor: `${cpu_.manufacturer}${
      cpu_.brand.length !== 0 ? ` ${cpu_.brand}` : ''
    } @ ${cpu_.speedMax.toFixed(2)}GHz`,
    ram: formatBytes(mem_.total),
    graphics: graphics_.controllers.map(
      (controller) => `${controller.vendor} ${controller.model.trim()}`
    ),
    availableDiskSpace:
      fsSize_.length !== 0 ? formatBytes(fsSize_[0].available) : null
  };
}
