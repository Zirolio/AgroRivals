import Phaser from "phaser";
import type Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";
import ShopTopBar from "./components/ShopTopBar";
import ShopItemContainer from "./components/ShopItemsContainer";
import ShopItem from "./components/ShopItem";
import { RENDER_BOUNDS } from "@app/constants";

export default class ShopScene extends Phaser.Scene {
    private root!: Sizer;
    private boundsGraphics?: Phaser.GameObjects.Graphics;

    constructor() {
        super("ShopScene");
    }

    init() {
        // const saved = localStorage.getItem(STORAGE_KEY);
        // this.userStats = saved ? JSON.parse(saved) : { coins: 0, level: 1 };
    }

    create() {
        this.setupUI();
        this.scale.on("resize", this.handleResize, this);
    }

    private setupUI() {
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
        this.root.addBackground(this.add.rectangle(0, 0, 1, 1, 0xeff6ff));
        // this.root.setMinSize(width, height).layout();

        const topBarLayout = new ShopTopBar(this, {
            width: width,
            fontSize: 24
        });
        this.root.add(topBarLayout);

        const shopItemsContainer = new ShopItemContainer(this, {
            width: width,
            childs: [
                new ShopItem(this, {
                    scene: this
                }),
            ]
        });
        shopItemsContainer.addShopItem(new ShopItem(this, {
                    scene: this
                }));
        this.root.add(shopItemsContainer, { expand: true, proportion: 1 });
        
        
        this.root.layout();
        // topBarLayout.y += 10;
    }
    
    update(_time: number, _delta: number): void {
        if (RENDER_BOUNDS) {
            if (!this.boundsGraphics) this.boundsGraphics = this.add.graphics();

            this.root.drawBounds(this.boundsGraphics, {
                color: 0xff0000,
                lineWidth: 2,
                name: true
            });
        } else this.boundsGraphics?.clear();
    }

    private handleResize(_gameSize: Phaser.Structs.Size) {
        this.setupUI();
    }
}