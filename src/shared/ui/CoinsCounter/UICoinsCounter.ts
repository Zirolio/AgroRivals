import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import type { UICoinsCounterConfig } from "./UICoinsCounter.interface";
import type { Scene } from "phaser";

export default class UICoinsCounter extends Label {
    constructor(scene: Scene, config: UICoinsCounterConfig) {
        const { coins = 0 } = config;

        super(scene, {
            background: scene.rexUI.add.roundRectangle(
                0, 0, 1, 1, 22, 0xffffff
            ).setStrokeStyle(2, 0xf1f5f9),

            icon: scene.add.image(0, 0, "coin").setDisplaySize(20, 20),

            text: scene.add.text(0, 0, `${coins}`, {
                fontFamily: "Nunito",
                fontSize: "20px",
                color: "#d97706"
            }),

            space: {
                left: 16,
                right: 16,
                top: 8,
                bottom: 8,
                icon: 8
            }
        });
    }

    setCoins(value: number) {
        this.setText(`${value}`);
        this.layout();
    }
}
