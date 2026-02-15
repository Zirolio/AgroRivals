import { Scene } from "phaser";
import type { UIBaseConfig } from "@shared/config/interfaces/UIBaseConfig";
import UI3DBackground from "@shared/ui/UI3DBackground/UI3DBackground";
import Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";
import AchivmentInfo from "./AchivmentInfo";
import UIProgressBar from "@shared/ui/UIProgressBar/UIProgressBar";

export default class Achievement extends Sizer {
    constructor(scene: Scene, _config: UIBaseConfig) {
        super(scene, {
            orientation: "vertical",
            space: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20
            },
        });

        const bg = new UI3DBackground(scene, {
            radius: 22,
            shadowColor: 0xe2e8f0,
            color: 0xffffff,
            pressOffset: 6,
        });
        this.addBackground(bg);

        const infoContainer = scene.rexUI.add.gridSizer({
            column: 2,
            row: 1,
            columnProportions: [1, 1],
            rowProportions: [1],
        });

        const achivmentInfo = new AchivmentInfo(scene);
        infoContainer.add(achivmentInfo, { column: 0, row: 0, align: "left" });

        const reward = scene.rexUI.add.label({
            orientation: "horizontal",

            icon: scene.add.image(0, 0, "coin").setDisplaySize(12, 12),

            text: scene.add.text(0, 0, `+${100}`, {
                fontFamily: "Nunito",
                fontSize: "14px",
                color: "#d97706"
            }),

            space: {
                icon: 8
            }
        });
        infoContainer.add(reward, { column: 1, row: 0, align: "right-top" });
        this.add(infoContainer, { padding: { bottom: 14 }, expand: true });


        const progressContainer = scene.rexUI.add.sizer({ orientation: "vertical" });
        
        const progressBar = new UIProgressBar(scene, {
            height: 8,
            value: Math.random(),

            barColor: 0x00ff00,
            trackColor: 0x222222,
        });
        progressContainer.add(progressBar, { expand: true, proportion: 1 });

        const progressInfoContainer = scene.rexUI.add.gridSizer({
            column: 2,
            row: 1,
            columnProportions: [1, 1],
            rowProportions: [1],
        });
        progressInfoContainer.add(scene.add.text(0, 0, "ПРОГРЕСС", {
            fontFamily: "Nunito",
            fontSize: `${10}px`,
            color: "#64748b",
            fontStyle: "bold",
        }), { column: 0, row: 0, align: "left" });
        progressInfoContainer.add(scene.add.text(0, 0, "0/0", {
            fontFamily: "Nunito",
            fontSize: `${10}px`,
            color: "#64748b",
            fontStyle: "bold",
        }), { column: 1, row: 0, align: "right" });
        progressContainer.add(progressInfoContainer, { expand: true, proportion: 1 });

        this.add(progressContainer, { expand: true });
    }
}