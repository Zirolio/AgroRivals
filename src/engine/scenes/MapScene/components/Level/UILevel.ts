import UIButton from "@shared/ui/UIButton/UIButton";
import type { Scene } from "phaser";
import OverlapSizer from "phaser3-rex-plugins/templates/ui/overlapsizer/OverlapSizer";
import type { UILevelConfig } from "./UILevel.interface";

export default class Level extends OverlapSizer {
    constructor(scene: Scene, { x, y, hasIsland, type }: UILevelConfig) {
        super(scene);

        if (hasIsland) this.add(scene.add.image(0, 0, "island"), { expand: false });

        const node = new UIButton(scene, {
            width: 50,
            height: 40,
            fontSize: 32,
            color: type === "current" ? 0xef4444 : type === "passed" ? 0x10b981 : 0x93c5fd,
            shadowColor: type === "current" ? 0xb91c1c : type === "passed" ? 0x047857 : 0x60a5fa,
            pressOffset: 4,
            icon: type === "current" ? undefined : type === "passed" ? "Star" : "Lock",
            iconSize: 20,
            onClick: () => {
            }
        });
        node.setButtonEnable(type !== "locked");
        this.add(node, { expand: false });
        
        this.setPosition(x / 100 * scene.scale.width, y);
    }
}