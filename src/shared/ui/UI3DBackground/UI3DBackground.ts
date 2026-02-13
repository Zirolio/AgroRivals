import type RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";
import type { Scene } from "phaser";
import type { UI3DBackgroundConfig } from "./UI3DBackground.interface";

export default class UI3DBackground extends Phaser.GameObjects.Container {
    private shadow: RoundRectangle;
    private bg: RoundRectangle;

    private pressOffset: number;
    
    constructor(scene: Scene, config: UI3DBackgroundConfig) {
        super(scene);

        const {
            radius, 
            color, shadowColor,
            borderColor, borderWidth,
            pressOffset
        } = config;

        this.pressOffset = pressOffset;

        this.shadow = scene.rexUI.add.roundRectangle(0, pressOffset, 1, 1, radius, shadowColor);
        this.bg = scene.rexUI.add.roundRectangle(0, 0, 1, 1, radius, color);
        if (typeof borderColor !== "undefined" && typeof borderWidth !== "undefined") this.bg.setStrokeStyle(borderWidth, borderColor);

        this.add([ this.shadow, this.bg ]);

        scene.add.existing(this);
    }

    setSize(width: number, height: number): this {
        super.setSize(width, height);

        this.shadow.width = width;
        this.shadow.height = height;

        this.bg.width = width;
        this.bg.height = height;

        return this;
    }

    onPointerDown() {
        this.shadow.y = 0;
    }
    onPointerUp() {
        this.shadow.y = this.pressOffset;
    }
}