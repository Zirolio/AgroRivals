import UIButton from "@shared/ui/UIButton/UIButton";
import UICoinsCounter from "@shared/ui/UICoinsCounter/UICoinsCounter";
import { Scene } from "phaser";
import type Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";

export default class MapUIScene extends Scene {
    private root!: Sizer;

    constructor() {
        super("MapUIScene");
    }
    
    create() {
        this.setupUI();
    }

    setupUI() {
        const { width, height } = this.scale;

        if (this.root) this.root.destroy();
        this.root = this.rexUI.add.sizer({
            x: 0,
            y: 0,
            orientation: "vertical",
            origin: 0,
            width: width,
            height: height
        });
        this.root.setMinSize(width, height).layout();

        const safeTop = Math.max(20, window.visualViewport?.offsetTop || 0);
        const topBarLayout = this.rexUI.add.gridSizer({
            row: 1,
            column: 2,
            columnProportions: [1, 1],
            rowProportions: [1],
        });

        const homeButton = new UIButton(this, {
            color: 0xffffff,
            shadowColor: 0xbfdbfee0,
            borderColor: 0xbfdbfe,
            borderWidth: 2,
            icon: "Home",
            radius: 12,
            pressOffset: 2,
            padding: {
                top: 8,
                bottom: 8,
                left: 8,
                right: 8,
            }
        });
        topBarLayout.add(homeButton, {
            column: 0,
            align: "left",
            expand: false,
            padding: { left: 12 }
        });

        const coins = new UICoinsCounter(this, { coins: 10 });
        topBarLayout.add(coins, {
            column: 1,
            align: "right",
            expand: false,
            padding: { right: 12 }
        });
        this.root.add(topBarLayout, {
            expand: true,
            padding: { top: safeTop, right: safeTop, left: safeTop }
        });

        const playButton = new UIButton(this, {
            color: 0xd97706,
            shadowColor: 0x92400e,
            borderColor: 0x92400e,
            borderWidth: 3,
            icon: "Play",
            text: "Уровень\n4",
            fontSize: 24,
            radius: 12,
            pressOffset: 4,
            padding: {
                top: 8,
                bottom: 8,
                left: 8,
                right: 8,
            }
        });
        this.rexUI.add.roundRectangleCanvas(0,0,0,0);
        this.root.addSpace();
        this.root.add(playButton, {
            expand: false,
            align: "bottom",
            padding: { bottom: safeTop }
        });

        this.root.layout();
    }
}