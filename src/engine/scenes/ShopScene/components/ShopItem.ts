import type { Scene } from "phaser";
import type { UIBaseConfig } from "@shared/config/interfaces/UIBaseConfig";
import UIButton from "@shared/ui/UIButton/UIButton";
import UI3DBackground from "@shared/ui/UI3DBackground/UI3DBackground";
import GridSizer from "phaser3-rex-plugins/templates/ui/gridsizer/GridSizer";

export default class ShopItem extends GridSizer {
    constructor(scene: Scene, _config?: UIBaseConfig) {

        super(scene, {
            column: 2,
            row: 1,
            columnProportions: [1, 1],
            rowProportions: [1],
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

        const icon = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 16, 0xdbeafe),
            icon: scene.add.image(0, 0, "Tangerine").setDisplaySize(50, 50),
            space: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            },
        });

        const infoContainer = scene.rexUI.add.sizer({ orientation: "horizontal" });
        const info = scene.rexUI.add.sizer({ orientation: "vertical" });
        const infoName = scene.add.text(0, 0, "Мандарин", {
            fontFamily: "Nunito",
            fontSize: `${22}px`,
            color: "#334155",
            fontStyle: "bold",
        });
        const infoEffect = scene.add.text(0, 0, "+ 3 хода", {
            fontFamily: "Nunito",
            fontSize: `${14}px`,
            color: "#94a3b8",
        });
        const infoCount = scene.add.text(0, 0, "У ВАС: 0", {
            fontFamily: "Nunito",
            fontSize: `${10}px`,
            color: "#94a3b8",
        });
        info.add(infoName, { padding: {  bottom: 4 }, align: "left" });
        info.add(infoEffect, { padding: {  bottom: 4 }, align: "left" });
        info.add(infoCount, { align: "left" });

        infoContainer.add(icon, { padding: { right: 20 } });
        infoContainer.add(info);
        this.add(infoContainer, { column: 0, row: 0, align: "left" });
        /* const icon = scene.rexUI.add.sizer(0, 0, { // V2??
            space: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            },
        });
        icon.addBackground(scene.rexUI.add.roundRectangle(0, 0, 1, 1, 22, 0xdbeafe));
        icon.add(scene.add.image(0, 0, "Tangerine").setDisplaySize(50, 50));
        this.add(icon); */

        const byBtn = new UIButton(scene, {
            text: "200",
            fontWeight: 700,
            radius: 16,
            fontSize: 16,
            color: 0x22c55e,
            shadowColor: 0x15803d,
            pressOffset: 4,
            icon: "coin",
            iconSize: 16,
            padding: 12,
            onClick: () => {
            }
        });
        this.add(byBtn, { column: 1, row: 0, align: "right" });
    }
}