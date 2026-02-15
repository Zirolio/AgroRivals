import type { Scene } from "phaser";
import Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";

export default class AchivmentInfo extends Sizer {
    constructor(scene: Scene) {
        super(scene, {
            orientation: "horizontal"
        });

        const iconContainer = scene.rexUI.add.overlapSizer({  });
        const icon = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 16, 0x334155),
            icon: scene.add.image(0, 0, "Crown").setDisplaySize(24, 24),
            space: {
                top: 12,
                bottom: 12,
                left: 12,
                right: 12
            },
        });
        iconContainer.add(icon, { align: "center", expand: false });
        const leavel = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 2, 0x0f172a)
                .setStrokeStyle(2, 0x334155),
            text: scene.add.text(0, 0, "L2", {
                fontFamily: "Nunito",
                fontSize: `${10}px`,
                color: "#ffffff",
            }),
            space: {
                left: 4,
                right: 4
            }
        });
        iconContainer.add(leavel, { align: "right-bottom", offsetOriginX: 0.25, offsetOriginY: 0.25, expand: false });
        this.add(iconContainer, { padding: { right: 10 } });

        const textInfoContainer = scene.rexUI.add.sizer({ orientation: "vertical" });
        const infoName = scene.add.text(0, 0, "Покоритель II", {
            fontFamily: "Nunito",
            fontSize: `${22}px`,
            color: "#334155",
            fontStyle: "bold",
        });
        const infoEffect = scene.add.text(0, 0, "Достичь уровня (12)", {
            fontFamily: "Nunito",
            fontSize: `${14}px`,
            color: "#94a3b8",
        });
        textInfoContainer.add(infoName, { padding: {  bottom: 4 }, align: "left" });
        textInfoContainer.add(infoEffect, { padding: {  bottom: 4 }, align: "left" });
        this.add(textInfoContainer);
    }
}