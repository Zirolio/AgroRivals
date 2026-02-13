import type { UIBaseConfig } from "@shared/config/interfaces/UIBaseConfig";

export interface UI3DBackgroundConfig extends UIBaseConfig {
    radius: number;

    color: number;
    shadowColor: number;

    borderColor?: number;
    borderWidth?: number;
    
    pressOffset: number;
}