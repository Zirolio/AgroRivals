import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

declare module "phaser" {
    interface Scene {
        rexUI: RexUIPlugin;
    }
}
