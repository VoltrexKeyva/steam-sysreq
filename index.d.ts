interface SystemRequirements {
  os: string;
  processor: string;
  ram: string;
  graphics: string[];
  availableDiskSpace: string;
}

export default function getSteamSysReq(): Promise<SystemRequirements>;
