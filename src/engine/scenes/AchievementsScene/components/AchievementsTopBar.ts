import GridSizer from "phaser3-rex-plugins/templates/ui/gridsizer/GridSizer";
import type { Scene } from "phaser";
import t from "@shared/utils/translation";
import UICoinsCounter from "@shared/ui/UICoinsCounter/UICoinsCounter";
import type { UIBaseConfig } from "@shared/config/interfaces/UIBaseConfig";

export default class AchievementsScene extends GridSizer {
    constructor(scene: Scene, config: UIBaseConfig & { width: number, fontSize: number }) {
        const { width, fontSize } = config;

        super(scene, {
            column: 3,
            row: 1,
            columnProportions: [1, 0, 1],
            rowProportions: [1],
            width: width,
            space: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20
            }
        });

        this.addBackground(scene.add.rectangle(0, 0).setFillStyle(0xffffff));

        this.add(
            scene.rexUI.add.label({
                text: scene.add.text(0, 0, t("back").toUpperCase(), {
                    fontFamily: "Nunito",
                    fontSize: `${fontSize}px`,
                    color: "#6b7280",
                    fontStyle: "bold",
                }),
                icon: scene.add.image(0, 0, "ArrowLeft_6b7280").setDisplaySize(28, 28),
                space: {
                    iconLeft: 10
                }
            }).setInteractive({ cursor: "pointer" })
                .onClick(() => scene.scene.start("MenuScene")),
        
            { column: 0, row: 0, align: "left", padding: { left: 20 } }
        );
        
        this.add(scene.rexUI.add.label({
            text: scene.add.text(0, 0, t("achievements").toUpperCase(), {
                fontFamily: "Nunito",
                fontSize: `${fontSize}px`,
                color: "#2563eb",
                fontStyle: "bold"
            }),
        }), { column: 1, row: 0 });

        const coins = new UICoinsCounter(scene, { coins: 10 });
        this.add(coins, { column: 2, row: 0, align: "right", padding: { right: 20 } });
    }
}