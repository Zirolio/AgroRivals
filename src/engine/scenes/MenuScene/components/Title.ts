import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import type { Scene } from "phaser";
import type { UIBaseConfig } from "@shared/config/interfaces/UIBaseConfig";

export default class Title extends Label {
    constructor(scene: Scene, config: UIBaseConfig & { text: string, textSize: number }) {
        const { text, textSize } = config;

        /* const textShadow = scene.add.text(-5, -5, text, {
            fontFamily: "TitanOne",
            fontSize: `${textSize + 10}px`,
            align: "center",
            color: "#1e3a8a",
            lineSpacing: -20,
        }); */

        const textObject = scene.add.text(0, 0, text, {
            fontFamily: "TitanOne",
            fontSize: `${textSize}px`,
            align: "center",
            stroke: '#1e3a8a',
            strokeThickness: 8,
            lineSpacing: -20
        });

        const ctx = textObject.context;
        const gradient = ctx.createLinearGradient(0, 0, 0, textObject.height);
        gradient.addColorStop(0.3, "#ffffff");
        gradient.addColorStop(1, "#93c5fd");
        textObject.setFill(gradient).setShadow(0, 6, '#1e3a8a', 0, true, true);
        // const container = scene.add.container(0, 0, [textShadow, textO]);
        
        /* textObject.setShadow(
            0,      // offsetX
            8,      // offsetY
            "#1e3a8a", // цвет тени
            20,     // blur
            false,
            true
        ); */

        super(scene, {
            // background: textShadow,

            text: textObject
        });

        /* const titleShadow = this.add.text(width / 2, height * 0.4, titleText, {
            fontFamily: "GameFont",
            fontSize: `${titleSize}px`,
            color: "#1e3a8a",
            align: "center",
            lineSpacing: -20
        }).setOrigin(0.5).setAlpha(0.8);

        // Main gradient layer
        const titleMain = ;

        // Phaser текстовый градиент через canvas
         */
    }
}