import Buttons from "phaser3-rex-plugins/templates/ui/buttons/Buttons";
import type { UIButtonConfig } from "./UIButton.interface";
import type Label from "phaser3-rex-plugins/templates/ui/label/Label";
import type { Scene } from "phaser";
import UI3DBackground from "../UI3DBackground/UI3DBackground";

export default class UIButton extends Buttons {
    public readonly bg: UI3DBackground;
    private label: Label;

    private pressed: boolean = false;
    private pressOffset: number;
    
    constructor(scene: Scene, config: UIButtonConfig) {
        const {
            width = 0, height = 0, radius = 20, padding,
            text, fontSize = 16, fontFamily = "Nunito",
            color = 0x2563eb, shadowColor = 0x1d4ed8,
            icon, iconSize = 28, pressOffset = 2, borderColor, borderWidth,
            orientation = "horizontal", fontWeight = "bold",
            onClick, enabled = true
        } = config;

        const bg = new UI3DBackground(scene, {
            radius,
            shadowColor,
            color,
            borderColor,
            borderWidth,
            pressOffset
        });

        const textLabel = typeof text === "string" ? scene.add.text(0, 0, text.toUpperCase(), {
            fontFamily,
            fontSize: `${fontSize}px`,
            color: "#ffffff",
            fontStyle: fontWeight.toString(),
        }) : text;

        const iconNode = typeof icon === "string" ? scene.add.image(0, 0, icon).setDisplaySize(iconSize, iconSize) : icon;

        const label = scene.rexUI.add.label({
            background: bg,

            text: textLabel,
            icon: iconNode,
            
            align: "center",
            orientation: orientation,
            space: {
                iconLeft: fontSize / 4,

                ...(typeof padding === "number" ? {
                    top: padding, bottom: padding, left: padding, right: padding } : padding)
            },
            sizerEvents: true
        });
        label.setMinSize(width, height);
        if (enabled) label.setInteractive({ cursor: "pointer" });

        super(scene, {
            buttons: [label],
            click: {
                mode: "pointerup",
                enable: enabled,
            },
            sizerEvents: true,
        });
        
        this.bg = bg;
        this.pressOffset = pressOffset;
        this.label = label;

        this.on("button.down", this.onPointerDown.bind(this));
        this.on("button.up", this.onPointerUp.bind(this));
        scene.input.on("pointerup", this.onPointerUp.bind(this));
        
        if (onClick) this.on("button.click", () => onClick());
    }

    setButtonEnable(enable?: boolean): this {
        super.setButtonEnable(enable);
        
        if (enable) this.label.setInteractive({ cursor: "pointer" });
        else this.label.disableInteractive(true);

        return this;
    }

    getButtonEnable(): boolean {
        return super.getButtonEnable(0);
    }

    private onPointerDown() {
        if (!this.getButtonEnable()) return;

        this.pressed = true;

        this.y += this.pressOffset; // or label.y ?
        this.bg.onPointerDown();
    }

    private onPointerUp() {
        if (!this.getButtonEnable()) return;

        if (!this.pressed) return;
        this.pressed = false;

        this.y -= this.pressOffset; // or label.y ?
        this.bg.onPointerUp();
    }
}