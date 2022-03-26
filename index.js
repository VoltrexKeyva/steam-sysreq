import { osInfo, cpu, mem, graphics, fsSize } from 'systeminformation';

const formattedOsNames = {
    aix: 'Aix',
    darwin: 'Darwin',
    freebsd: 'FreeBSD',
    linux: 'Linux',
    openbsd: 'OpenBSD',
    netbsd: 'NetBSD',
    sunos: 'SunOS',
    win32: 'Windows',
    android: 'Android'
  },
  sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  base = 1024;

/**
 * Formats bytes into a more readable string.
 * @param {number} bytes The bytes to format.
 * @returns {string} The formatted bytes.
 */
function formatBytes(bytes) {
  if (typeof bytes !== 'number' || isNaN(bytes))
    throw new TypeError("Argument 'bytes' must be a number.");

  const exponent = Math.floor(Math.log(bytes) / Math.log(base));

  return `${(bytes / Math.pow(base, exponent)).toFixed()} ${sizes[exponent]}`;
}

/**
 * @typedef {object} SystemRequirements
 * @prop {string} os The operating system.
 * @prop {string} processor The Central Processing Unit (CPU)
 * model.
 * @prop {string} ram The Random Access Memory (RAM) size.
 * @prop {string} graphics The Graphics Processing Unit (GPU)
 * models.
 * @prop {string} availableDiskSpace The available disk space.
 */

/**
 * Gets the Steam system requirements information.
 * @returns {Promise<SystemRequirements>} The system requirements.
 */
async function getSteamSysReq() {
  const osInfo_ = await osInfo(),
    cpu_ = await cpu(),
    mem_ = await mem(),
    graphics_ = await graphics(),
    fsSize_ = await fsSize();

  return {
    os: `${formattedOsNames[osInfo_.platform] ?? osInfo_.platform} ${osInfo_.kernel} (${
      osInfo_.distro
    } ${osInfo_.release})`,
    processor: `${cpu_.manufacturer} ${cpu_.brand} @ ${cpu_.speedMax.toFixed(
      2
    )}GHz`,
    ram: formatBytes(mem_.total),
    graphics: graphics_.controllers.map(
      (controller) =>
        `${controller.vendor} ${
          controller.model.at(-1) === ' '
            ? controller.model.slice(0, -1)
            : controller.model
        }`
    ),
    availableDiskSpace: formatBytes(fsSize_[0].available)
  };
}

export default getSteamSysReq;
