import Phaser from "phaser";
import { ArrowLeft, Play, Settings, ShoppingBag, Trophy } from "lucide-static";
import { GAME_FONT } from "@app/constants";

export default class LoaderScene extends Phaser.Scene {
    /* private progressBar!: RoundRectangle;
    private progressBox!: RoundRectangle; */
    private loadingText!: Phaser.GameObjects.Text;
    private percentText!: Phaser.GameObjects.Text;

    constructor() {
        super("LoaderScene");
    }

    preload() {
        const { width, height } = this.scale;

        Promise.all([
            document.fonts.load(`400 32px "Nunito"`),
            document.fonts.load(`400 32px "TitanOne"`)
        ]);

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
        this.addLucideTexture('ShoppingBag', ShoppingBag, 64);
        this.addLucideTexture('Trophy', Trophy, 64);
        this.addLucideTexture('Settings', Settings, 64);
        this.addLucideTexture('ArrowLeft', ArrowLeft, 64);
        this.addLucideTexture('Play', Play, 64, undefined, "#ffffff");


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
            this.time.delayedCall(500, () => {
                this.scene.start("ShopScene");
            });
        });
    }

    /**
     * Создаёт Phaser текстуру из Lucide SVG string
     * @param key - ключ текстуры
     * @param svgString - Lucide SVG string
     * @param size - размер в пикселях
     */
    private addLucideTexture(
        key: string,
        lucideSvg: string,
        size: number = 64,
        color: string = "#ffffff",
        fill: string = "none"
    ) {
        const inner = lucideSvg
            .replace(/<svg[^>]*>/, "")
            .replace("</svg>", "");

        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg"
            width="${size}"
            height="${size}"
            viewBox="0 0 24 24"
            fill="${fill}"
            stroke="${color}"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            ${inner}
        </svg>`;

        const dataUrl = "data:image/svg+xml;base64," + btoa(svg);

        const img = new Image();
        img.onload = () => {
            this.textures.addImage(key, img);
        };
        img.src = dataUrl;
    }
}