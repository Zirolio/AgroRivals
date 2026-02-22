export interface MapConfig {
    levels: number[];
    totalHeight: number;
    levelHeight: number;
    pathPoints: {
        x: number;
        y: number;
    }[];
    decorElements: {
        type: string;
        x: number;
        y: number;
        scale: number;
    }[];
    cloudCover: {
        x: number;
        y: number;
        scale: number;
    }[];
};