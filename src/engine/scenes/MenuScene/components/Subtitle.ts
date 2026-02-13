import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import type { Scene } from "phaser";
import type { UIBaseConfig } from "@shared/config/interfaces/UIBaseConfig";

export default class Subtitle extends Label {
    constructor(scene: Scene, config: UIBaseConfig & { text: string, fontSize: number }) {
        const {
            text,
            fontSize
        } = config;

        super(scene, {
            background: scene.rexUI.add.roundRectangle(0, 0, 200, 30, 20, 0xffffff, 0.6),

            text: scene.add.text(0, 0, text.toUpperCase(), {
                fontFamily: "Nunito",
                fontStyle: "900",
                color: "#1e3a8a",
                align: "center",
                fontSize: `${fontSize}px`,
            }),

            space: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            },

                /* .setStrokeStyle(1, 0xffffff, 0.5), */
        });
    }
}