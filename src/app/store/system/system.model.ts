export interface System {
  platform?: string;
  isPortrait?: boolean;
  dimensions?: {
    width: number;
    height: number;
  };
}
