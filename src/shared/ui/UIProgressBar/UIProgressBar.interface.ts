import type { UIBaseConfig } from "@shared/config/interfaces/UIBaseConfig";

export interface UIProgressBarConfig extends UIBaseConfig {
    width?: number;
    height?: number;
    
    orientation?: "horizontal" | "vertical";

    radius?: number;

    value?: number;

    barColor: number;
    trackColor: number;
}