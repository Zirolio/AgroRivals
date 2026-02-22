type UILevelType = "locked" | "current" | "passed";

export interface UILevelConfig {
    x: number;
    y: number;
    hasIsland: boolean;

    type: UILevelType;
}