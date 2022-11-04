export interface SystemInformation {
  readonly name: string;
  readonly value: string;
  readonly type: SystemInformationType;
}

export enum SystemInformationTypes {
  OS = 'OS',
  Processor = 'Processor',
  RAM = 'RAM',
  Graphics = 'Graphics',
  AvailableDiskSpace = 'Available Disk Space'
}

export type SystemInformationType = keyof typeof SystemInformationTypes;

export class SystemInformation {
  name: string;
  value: string;
  type: SystemInformationType;

  constructor(systemInformation: SystemInformation) {
    this.name = systemInformation.name;
    this.value = systemInformation.value;
    this.type = systemInformation.type;
  }
}
