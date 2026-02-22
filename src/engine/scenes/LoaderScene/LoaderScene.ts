import Phaser from "phaser";
import { ArrowLeft, Cloud, Crown, Home, Lock, Play, Settings, ShoppingBag, Star, Trophy } from "lucide-static";
import MountainSvg from "@shared/assets/Mountain.svg?raw";
import TreeSvg from "@shared/assets/Tree.svg?raw";
import RockSvg from "@shared/assets/Rock.svg?raw";
import SantaHouseSvg from "@shared/assets/SantaHouse.svg?raw";
import SleighSvg from "@shared/assets/Sleigh.svg?raw";
import IslandSvg from "@shared/assets/Island.svg?raw";

import { GAME_FONT } from "@app/constants";

export default class LoaderScene extends Phaser.Scene {
    /* private progressBar!: RoundRectangle;
    private progressBox!: RoundRectangle; */
    private loadingText!: Phaser.GameObjects.Text;
    private percentText!: Phaser.GameObjects.Text;

    constructor() {
        super("LoaderScene");
    }

    async preload() {
        const { width, height } = this.scale;

        this.add.rectangle(0, 0, width, height, 0x0f172a).setOrigin(0);

        /* const progressBox =  */this.rexUI.add.roundRectangle(
            width / 2, height / 2, 
            320, 50, 25, 0x1e293b
        );

        const progressBar = this.rexUI.add.roundRectangle(
            width / 2 - 150, height / 2, 
            0, 40, 20, 0xf97316
        ).setOrigin(0, 0.5);

        this.loadingText = this.add.text(width / 2, height / 2 - 60, "Loading...", {
            fontFamily: GAME_FONT,
            fontSize: "24px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.percentText = this.add.text(width / 2, height / 2, "0%", {
            fontFamily: GAME_FONT,
            fontSize: "18px",
            color: "#ffffff"
        }).setOrigin(0.5);

        // Loading
        this.addLucideTexture("ShoppingBag", ShoppingBag, { size: 64 });
        this.addLucideTexture("Crown", Crown, { size: 64 });
        this.addLucideTexture("Trophy", Trophy, { size: 64 });
        this.addLucideTexture("Settings", Settings, { size: 64 });
        this.addLucideTexture("ArrowLeft", ArrowLeft, { size: 64 });
        this.addLucideTexture("ArrowLeft_6b7280", ArrowLeft, { size: 64, stroke: "#6b7280" });
        this.addLucideTexture("Play", Play, { size: 64, fill: "#ffffff" });
        this.addLucideTexture("Star", Star, { size: 64, fill: "#ffffff", stroke: "#ffffff" });
        this.addLucideTexture("Lock", Lock, { size: 64, stroke: "#2563eb80" });
        this.addLucideTexture("Home", Home, { size: 64, stroke: "#1d4ed8" });
        
        this.addSvgTexture("tree", TreeSvg);
        this.addSvgTexture("mountain", MountainSvg);
        this.addSvgTexture("rock", RockSvg);
        this.addSvgTexture("santa-house", SantaHouseSvg);
        this.addSvgTexture("sleigh", SleighSvg);
        this.addSvgTexture("island", IslandSvg);

        this.addLucideTexture("cloud", Cloud, { size: 80, fill: "#ffffff", stroke: "#f3f3f3", strokeWidth: 2 });

        this.load.image("coin", "image/coin.png");
        this.load.image("santa", "image/santa_claus.png");
        this.load.image("gift", "image/gift.png");
        this.load.image("snowflake", "image/snowflake.png");
        this.load.image("map_bg", "image/map_background.png");
        this.load.image("Tangerine", "image/Tangerine.png");
        
        this.load.audio("click", "sounds/click.mp3");
        this.load.audio("match", "sounds/match.mp3");
        this.load.audio("music_menu", "sounds/bg_music.mp3");


        this.load.on("progress", (value: number) => {
            progressBar.width = 300 * value;
            this.percentText.setText(`${Math.round(value * 100)}%`);
        });

        this.load.on("fileprogress", (file: Phaser.Loader.File) => {
            this.loadingText.setText(`Loading: ${file.key}`);
        });

        this.load.on("complete", () => {
            this.loadingText.setText("Ready!");
            
        });
    }

    async create() {
        await Promise.all([
            document.fonts.load('24px "Nunito"'),
            document.fonts.load('24px "TitanOne"')
        ]);
        await document.fonts.ready;

        this.time.delayedCall(500, () => {
            this.scene.start("MapScene");
        });
    }

    /**
     * Создаёт Phaser текстуру из Lucide SVG string
     * @param key - ключ текстуры
     * @param svgString - Lucide SVG string
     */
    private addLucideTexture(key: string, lucideSvg: string, {
        size = 64,
        fill = "none",
        stroke = "#ffffff",
        strokeWidth = 2
    }: {
        size?: number | { width: number; height: number };
        fill?: string;
        color?: string;
        stroke?: string;
        strokeWidth?: number;
    } = {}) {
        if (typeof size === "number") size = { width: size, height: size };

        const inner = lucideSvg
            .replace(/<svg[^>]*>/, "")
            .replace("</svg>", "");

        const svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="${size.width}"
            height="${size.height}"
            viewBox="0 0 24 24"
            fill="${fill}"
            stroke="${stroke}"
            stroke-width="${strokeWidth}"
            stroke-linecap="round"
            stroke-linejoin="round">
            ${inner}
        </svg>`;

        this.addSvgTexture(key, svg);
    }
    /**
     * Создаёт Phaser текстуру из SVG string
     * @param key - ключ текстуры
     * @param svgString - SVG string
     */
    private addSvgTexture(
        key: string,
        svgString: string,
    ) {
        const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        this.load.svg(key, url);

        this.load.once(Phaser.Loader.Events.COMPLETE, () => {
            URL.revokeObjectURL(url);
        });
        /* const dataUrl = "data:image/svg+xml;base64," + btoa(svgString);

        const img = new Image();
        img.onload = () => {
            this.textures.addImage(key, img);
        };
        img.src = dataUrl; */
    }
}