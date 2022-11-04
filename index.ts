import * as systemInformation from 'systeminformation';
import { strToUpper } from './utils/utils';
import {
  SystemInformation,
  SystemInformationType,
  SystemInformationTypes
} from './utils/structures';

export interface SystemRequirements {
  os: SystemInformation;
  processor: SystemInformation;
  ram: SystemInformation;
  graphics: SystemInformation;
  availableDiskSpace: SystemInformation;
}

export async function getSteamSysReq(): Promise<SystemRequirements> {
  const [
    osInfo,
    cpu,
    mem,
    graphics,
    fsSize
  ] = await Promise.all([
      systemInformation.osInfo(),
      systemInformation.cpu(),
      systemInformation.mem(),
      systemInformation.graphics(),
      systemInformation.fsSize()
    ]),
    formattedOsNames = {
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
    logBase = Math.log(1024),
    formattedOsName = formattedOsNames[osInfo.platform] ?? osInfo.platform,
    formattedKernel = `${formattedOsName} ${osInfo.kernel} (${osInfo.distro} ${osInfo.release})`,
    formattedProcessor = `${cpu.manufacturer} ${cpu.brand} @ ${cpu.speedMax.toFixed(
      2
    )}GHz`,
    formattedRam = formatBytes(mem.total),
    formattedGraphics = graphics.controllers.map(
      (controller) =>
        `${controller.vendor} ${
          controller.model.at(-1) === ' '
            ? controller.model.slice(0, -1)
            : controller.model
        }`
    ),
    formattedAvailableDiskSpace = formatBytes(fsSize[0].available);

  return {
    os: new SystemInformation({
      name: 'Operating System',
      value: formattedKernel,
      type: SystemInformationTypes.OS
    }),
    processor: new SystemInformation({
      name: 'Processor',
      value: formattedProcessor,
      type: SystemInformationTypes.Processor
    }),
    ram: new SystemInformation({
      name: 'RAM',
      value: formattedRam,
      type: SystemInformationTypes.RAM
    }),
    graphics: new SystemInformation({
      name: 'Graphics',
      value: formattedGraphics.join(', '),
      type: SystemInformationTypes.Graphics
    }),
    availableDiskSpace: new SystemInformation({
      name: 'Available Disk Space',
      value: formattedAvailableDiskSpace,
      type: SystemInformationTypes.AvailableDiskSpace
    })
  };
}

/**
 * Formats bytes into a more human-readable form.
 *
 * @param bytes Number of bytes to format
 * @returns Formatted bytes
 */
export function formatBytes(bytes: number): string {
  const exponent = Math.floor(Math.log(bytes) / logBase);

  return `${(bytes / Math.pow(1024, exponent)).toFixed()} ${sizes[exponent]}`;
}
