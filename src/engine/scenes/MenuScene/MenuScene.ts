import Phaser from "phaser";
import type Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";
import Title from "./components/Title";
import Subtitle from "./components/Subtitle";
import t from "@shared/utils/translation";
import UICoinsCounter from "@shared/ui/CoinsCounter/UICoinsCounter";
import UISettingsButton from "@shared/ui/UISettingsButton/UISettingsButton";
import UIButton from "@shared/ui/UIButton/UIButton";

export default class MenuScene extends Phaser.Scene {
    private snowEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
    
    private root!: Sizer;
    private bgGradient!: Phaser.GameObjects.Graphics;

    constructor() {
        super("MenuScene");
    }

    init() {
        // const saved = localStorage.getItem(STORAGE_KEY);
        // this.userStats = saved ? JSON.parse(saved) : { coins: 0, level: 1 };
    }

    create() {
        // 1. Фон: Градиент (from-blue-600 via-blue-400 to-white)
        this.bgGradient = this.add.graphics();
        this.updateBackground();

        // 2. Снег
        this.createSnowfall();

        // 3. UI
        this.setupUI();

        // 4. Ресайз
        this.scale.on("resize", this.handleResize, this);
    }

    private updateBackground() {
        const { width, height } = this.scale;
        this.bgGradient.clear();

        this.bgGradient.fillGradientStyle(0x2563eb, 0x2563eb, 0xffffff, 0xffffff, 1);
        this.bgGradient.fillRect(0, 0, width, height);
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
        this.root.setMinSize(width, height).layout();

        // --- SAFE TOP BAR (Coins & Settings) ---
        const safeTop = Math.max(20, window.visualViewport?.offsetTop || 0);
        const topBarLayout = this.rexUI.add.sizer({
            orientation: "horizontal"
        });
        const coins = new UICoinsCounter(this, { coins: 10 });
        const settingsBtn = new UISettingsButton(this, { scene: this });
        topBarLayout.add(coins, {
            align: "center",
            expand: false,
            padding: { right: 12 }
        });
        topBarLayout.add(settingsBtn, {
            align: "center",
            expand: false,
        });
        
        topBarLayout.layout();
        this.root.add(topBarLayout, {
            align: "right",
            expand: false,
            padding: { top: safeTop, right: safeTop }
        });

        // ====== CENTER ======
        const centerLayout = this.rexUI.add.sizer({ orientation: "vertical" });

        centerLayout.add(new Title(this, {
            text: "FRUIT\nCRASH",
            textSize: Math.min(width * 0.18, 100)
        }), {
            align: "center",
            expand: false
        });

        centerLayout.add(new Subtitle(this, {
            text: t("season_subtitle"),
            fontSize: Math.min(width * 0.18, 100) / 6
        }), {
            align: "center",
            expand: false,
            padding: {
                bottom: 40
            }
        });
        
        const playBtnWidth = Math.min(this.scale.width * 0.8, 560);
        const subBtnWidth = playBtnWidth / 2 - 10;

        centerLayout.add(new UIButton(this, {
            width: playBtnWidth,
            height: 80,
            text: t("play"),
            fontSize: 32,
            color: 0x2563eb,
            shadowColor: 0x1d4ed8,
            borderColor: 0x60a5fa,
            borderWidth: 4,
            pressOffset: 8,
            iconKey: "Play",
            onClick: () => {
            }
        }), {
            align: "center",
            expand: false,
            padding: {
                bottom: 20
            }
        });

        const buttonsContainer = this.rexUI.add.sizer({ orientation: "horizontal" })
            .add(new UIButton(this, {
                width: subBtnWidth,
                height: 70,
                text: t("shop"),
                fontSize: 12,
                color: 0xeab308,
                shadowColor: 0xca8a04,
                /* borderColor: 0xfacc15,
                borderWidth: 4, */
                pressOffset: 4,
                iconKey: "ShoppingBag",
                iconSize: 28,
                orientation: "vertical",
                onClick: () => {
                }
            }), { align: "center", expand: false, padding: { right: 20 } })
            .add(new UIButton(this, {
                width: subBtnWidth,
                height: 70,
                text: t("achievements"),
                fontSize: 12,
                color: 0xa855f7,
                shadowColor: 0x7e22ce,
                /* borderColor: 0xc084fc,
                borderWidth: 4, */
                pressOffset: 4,
                iconKey: "Trophy",
                iconSize: 28,
                orientation: "vertical",
                onClick: () => {
                }
            })).layout();
            
            
        centerLayout.add(buttonsContainer, {
            align: "center",
            expand: false
        });
        
        centerLayout.layout();
        this.root.addSpace();
        this.root.add(centerLayout, { align: "center", expand: false });
        this.root.addSpace();

        this.root.layout();
    }

    private createSnowfall() {
        this.snowEmitter = this.add.particles(0, -20, "snowflake", {
            x: { min: 0, max: this.scale.width },
            quantity: 2,
            frequency: 300,
            lifespan: 10000,
            speedY: { min: 50, max: 150 },
            scale: { min: 0.03, max: 0.05 },
            alpha: { start: 0.6, end: 0 },
            blendMode: "ADD",
            emitting: false
        });
        
        this.snowEmitter.onParticleEmit((p) => {
            p.setPosition(this.scale.width * Math.random(), -20);
        });
        
        this.snowEmitter.fastForward(5000).start();
    }

    private handleResize(_gameSize: Phaser.Structs.Size) {
        this.updateBackground();
        this.setupUI();
    }
}