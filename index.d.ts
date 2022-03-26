declare const formattedOsNames: Record<string, string>;
declare const sizes: string[];
declare const base: number;

declare function formatBytes(bytes: number): string;

interface SystemRequirements {
  os: string;
  processor: string;
  ram: string;
  graphics: string[];
  availableDiskSpace: string;
}

declare module 'steam-sysreq' {
  export default function getSteamSysReq(): Promise<SystemRequirements>;
}
