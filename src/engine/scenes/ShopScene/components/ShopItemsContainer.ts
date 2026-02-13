import ScrollablePanel from "phaser3-rex-plugins/templates/ui/scrollablepanel/ScrollablePanel";
import type Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";
import ShopItem from "./ShopItem";
import type { Scene } from "phaser";
import type { UIBaseConfig } from "@shared/config/interfaces/UIBaseConfig";

export default class ShopItemContainer extends ScrollablePanel {
    get content() { return this.getElement("panel") as Sizer; }

    constructor(scene: Scene, config: UIBaseConfig & { childs: ShopItem[], width: number }) {
        const { childs, width } = config;
        
        super(scene, {
            width: width,
            height: 100,
            
            scrollMode: "vertical",

            panel: {
                child: scene.rexUI.add.sizer({
                    orientation: "vertical",
                    // width: 0,
                }),
                mask: {
                    padding: 1,
                    
                },
                
            },
            slider: {
                track: scene.rexUI.add.roundRectangle(0, 0, 8, 10, 4, 0xe2e8f0),
                thumb: scene.rexUI.add.roundRectangle(0, 0, 8, 20, 4, 0x94a3b8)
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            space: {
                panel: 22,
                top: 22,
                bottom: 22,
                left: 22
            }
        });

        childs.forEach(child => this.addShopItem(child));

    }

    addShopItem(item: ShopItem[] | ShopItem) {
        if (item instanceof ShopItem) this.content.add(item.setDepth(1), { expand: true, proportion: 1, padding: { top: 22 } });
        else for (const _item of item) this.content.add(_item.setDepth(1), { expand: true, proportion: 1, padding: { top: 22 } });
    }
}