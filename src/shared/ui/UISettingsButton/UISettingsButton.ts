import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import type { UISettingsButtonConfig } from "./UISettingsButton.interface";
import type { Scene } from "phaser";

export default class UISettingsButton extends Label {
    constructor(scene: Scene, _config: UISettingsButtonConfig) {
        super(scene, {
            background: scene.rexUI.add.roundRectangle(
                0, 0, 1, 1, 16, 0xffffff, 0.2
            ),

            icon: scene.add.image(0, 0, "Settings").setDisplaySize(28, 28),

            space: {
                top: 10,
                left: 10,
                right: 10,
                bottom: 10,
            }

        });

        this.layout();
    }
}