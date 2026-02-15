import { Scene } from "phaser";
import type RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";
import type { UIProgressBarConfig } from "./UIProgressBar.interface";
import OverlapSizer from "phaser3-rex-plugins/templates/ui/overlapsizer/OverlapSizer";

export default class UIProgressBar extends OverlapSizer {
    private track: RoundRectangle;
    private fill: RoundRectangle;

    private value: number;
    private orientation: "horizontal" | "vertical";

    constructor(scene: Scene, config: UIProgressBarConfig) {
        const { width = 1, height = 1, orientation = "horizontal", radius = (height ?? 1) / 2, value = 0, trackColor, barColor } = config;
        
        super(scene);
        this.setOrigin(0);
        
        this.value = Phaser.Math.Clamp(value, 0, 1);
        this.orientation = orientation;

        this.track = scene.rexUI.add.roundRectangle(0, 0, width, height, radius, trackColor);
        this.fill = scene.rexUI.add.roundRectangle(0, 0, width, height, radius, barColor);

        if (orientation === "horizontal") {
            this.track.setOrigin(0, 0.5);
            this.track.setOrigin(0, 0.5);
        } else {
            this.track.setOrigin(0.5, 1);
            this.track.setOrigin(0.5, 1);
        }

        this.add(this.track, { expand: false, align: "center" })
            .add(this.fill, {
                expand: false,
                align: orientation === "horizontal"
                    ? "left-center"
                    : "center-bottom"
            });

        this.setValue(this.value);
    }

    setSize(width: number, height: number, resizeInput?: boolean): this {
        super.setSize(width, height, resizeInput);

        this.track.resize(width, height);
        this.setValue(this.value);

        return this;
    }

    setValue(value: number) {
        this.value = Phaser.Math.Clamp(value, 0, 1);

        if (this.orientation === "horizontal") {
            this.fill.resize(this.width * this.value, this.height);
        } else {
            this.fill.resize(this.width, this.height * this.value);
        }

        return this;
    }

    addValue(delta: number) {
        this.setValue(this.value + delta);
    }

    getValue(): number {
        return this.value;
    }
}