export interface System {
  platform?: {
    device?: string;
    isBrowser?: boolean;
  };
  viewport?: {
    size?: string;
    isPortrait?: boolean;
  };
  dimensions?: {
    width: number;
    height: number;
  };
}
