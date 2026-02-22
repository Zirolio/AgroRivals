import type { UIBaseConfig } from "@shared/config/interfaces/UIBaseConfig";
import type Label from "phaser3-rex-plugins/templates/ui/label/Label";
import type { UI3DBackgroundConfig } from "../UI3DBackground/UI3DBackground.interface";

export interface UIButtonConfig extends UIBaseConfig, Partial<UI3DBackgroundConfig> {
    width?: number;
    height?: number;

    text?: string | Phaser.GameObjects.GameObject;
    fontSize?: number;
    fontWeight?: number | string;
    fontFamily?: string;

    icon?: string | Phaser.GameObjects.GameObject;
    iconSize?: number;

    orientation?: Label.IConfig["orientation"];

    padding?: number | { top?: number; bottom?: number; left?: number; right?: number };

    enabled?: boolean;

    onClick?: () => void;
}
