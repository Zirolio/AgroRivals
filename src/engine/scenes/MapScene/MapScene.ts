import CreateSnowfall from "@shared/utils/CreateSnowfall";
import Phaser from "phaser";
import Level from "./components/Level/UILevel";
import type { UILevelConfig } from "./components/Level/UILevel.interface";
import type { MapConfig } from "@shared/config/interfaces/MapConfig";

export default class MapScene extends Phaser.Scene {
    private snowEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;

    private bgGraphics?: Phaser.GameObjects.Graphics;
    private mapConfig?: MapConfig;
    private mapElements: Set<Phaser.GameObjects.Image | Level | Phaser.GameObjects.Container> = new Set();

    constructor() {
        super("MapScene");
    }

    create() {
        this.scene.launch("MapUIScene");
        this.scene.bringToTop("MapUIScene");

        this.mapElements.clear();
        this.snowEmitter = CreateSnowfall(this);

        const currentLevel = 10;
        const map = this.generateMap(currentLevel);
        this.mapConfig = map;

        this.cameras.main.setBounds(
            0,
            0,
            this.scale.width,
            map.totalHeight
        ).setScroll(map.totalHeight);

        this.bgGraphics = this.add.graphics()
            .fillStyle(0xffffff)
            .fillRect(0, 0, this.scale.width, map.totalHeight);

        map.decorElements.forEach(config => {
            const sprite = this.add.image(config.x / 100 * this.scale.width, config.y, config.type)
                .setScale(config.scale)
                .setOrigin(0.5, 1)
                .setData("config", config);
            this.mapElements.add(sprite);
        });

        map.levels.forEach((lvl, index) => {
            const pt = map.pathPoints[index];
            if (!pt) return;

            const config: UILevelConfig = {
                x: pt.x,
                y: pt.y,
                hasIsland: lvl % 2 !== 0,
                type: lvl > currentLevel ? "locked" :
                        lvl < currentLevel ? "passed" : "current"
            };

            // Set camera position
            this.cameras.main.setScroll(config.y);

            const level = new Level(this, config)
                .layout()
                .setData("config", config);
            
            this.mapElements.add(level);

            /* node.setSize(50, 40);
            node.setInteractive();

            node.on("pointerdown", () => {
                if (lvl <= currentLevel) {
                    console.log("Start level", lvl);
                }
            }); */
        });

        map.cloudCover.forEach(config => {
            const cloud = this.add.image(config.x / 100 * this.scale.width, config.y, "cloud")
                .setScale(config.scale)
                .setDepth(50)
                .setData("config", config);
            
            this.mapElements.add(cloud);
        });

        // Santa house
        const santaHouseConfig = {
            x: this.scale.width / 2,
            y: map.totalHeight - 140
        };

        const santaDecorContainer = this.add.container(santaHouseConfig.x, santaHouseConfig.y)
            .setSize(200, 200)
            .setDepth(5);

        const santa = this.add.image(0, 0, "santa-house")
            .setOrigin(0.5, 1)
            .setScale(1.2);

        const sleigh = this.add.image(80, 0, "sleigh")
            .setOrigin(0.5, 1)
            .setScale(0.8);

        santaDecorContainer.add([santa, sleigh])
            .setData("config", santaHouseConfig);
        this.mapElements.add(santaDecorContainer);

        this.input.on("wheel", (_pointer: Phaser.Input.Pointer, _gameObjects: Phaser.GameObjects.GameObject[], _deltaX: number, deltaY: number) => {
            this.cameras.main.scrollY += deltaY * 0.5;
        });

        this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
            this.onResize(gameSize.width, gameSize.height);
        });
    }

    private onResize(width: number, height: number) {
        if (!this.mapConfig) return;

        this.cameras.main.setBounds(0, 0, width, this.mapConfig.totalHeight);
        
        if (this.bgGraphics) {
            this.bgGraphics.clear();
            this.bgGraphics.fillStyle(0xffffff, 1);
            this.bgGraphics.fillRect(0, 0, width, this.mapConfig.totalHeight);
        }

        this.mapElements.forEach(el => {
            const config: { x: number, y: number } = el.getData("config");
            el.setPosition(config.x / 100 * this.scale.width, config.y);
            // if (el instanceof Level) el.layout();
        });
        /* this.map.decorElements.forEach(el => {
            if (!el.sprite) return;
            el.sprite.x = el.x / 100 * width;
        });

        this.map.levels.forEach((lvl, idx) => {
            const pt = this.map.pathPoints[idx];
            if (!pt || !lvl) return;
            lvl.setPosition(pt.x / 100 * width, pt.y);
        });

        this.map.cloudCover.forEach(c => {
            if (!c.sprite) return;
            c.sprite.x = c.x / 100 * width;
        }); */
    }

    generateMap(currentLevel: number) {
        const levelHeight = 120;
        const maxVisibleLevel = currentLevel + 5;
        const levels = Array.from({ length: maxVisibleLevel }, (_, i) => i + 1);
        const totalHeight = levels.length * levelHeight + 350; 

        const pathPoints: {x: number, y: number}[] = [];
        levels.forEach((l, idx) => {
            const top = totalHeight - (l * levelHeight) - 200;
            const xOffset = 30 * Math.sin(idx * 0.8) + 10 * Math.cos(idx * 0.3);
            const left = (50 + xOffset)/*  / 100 * this.scale.width */; 
            pathPoints.push({x: left, y: top});
        });

        const decorElements: {type: string, x: number, y: number, scale: number}[] = [];
        
        // Add mountains
        for(let i=0; i<levels.length; i+=2) {
            const yPos = totalHeight - (i * levelHeight) - 150;
            decorElements.push({ type: 'mountain', x: 5, y: yPos, scale: 1.2 });
            decorElements.push({ type: 'mountain', x: 95, y: yPos - 60, scale: 1.2 });
        }

        pathPoints.forEach((pt, i) => {
            const side = i % 2 === 0 ? 1 : -1;
            if (i % 2 === 0) {
                decorElements.push({ type: 'tree', x: pt.x - (side * 45), y: pt.y - 10, scale: 0.9 + Math.random()*0.2 });
            } else {
                decorElements.push({ type: 'rock', x: pt.x + (side * 40), y: pt.y + 20, scale: 0.8 });
            }

            if (i % 4 === 0) {
                decorElements.push({ type: 'cloud', x: 20 + (i*13 % 70), y: pt.y - 100, scale: 1 });
            }
        });

        const cloudCover: {x: number, y: number, scale: number}[] = [];
        levels.forEach((l, idx) => {
            if (l > currentLevel + 2) {
                const pt = pathPoints[idx];
                cloudCover.push({ x: pt.x, y: pt.y, scale: 2 });
                cloudCover.push({ x: pt.x - 10, y: pt.y + 20, scale: 1.5 });
                cloudCover.push({ x: pt.x + 10, y: pt.y - 10, scale: 1.8 });
            }
        });

        return { levels, totalHeight, levelHeight, pathPoints, decorElements, cloudCover };
    }

    /* Bad version */
    generateMap_(currentLevel: number) {
        const levelHeight = 120;
        const maxVisibleLevel = currentLevel + 5;
        const levels = Array.from({ length: maxVisibleLevel }, (_, i) => i + 1);
        const totalHeight = levels.length * levelHeight + 350;

        const pathPoints: { x: number, y: number }[] = [];

        levels.forEach((l, idx) => {
            const top = totalHeight - (l * levelHeight) - 200;

            const xOffset =
                30 * Math.sin(idx * 0.8) +
                10 * Math.cos(idx * 0.3);

            const leftPercent = 50 + xOffset;

            const left = (leftPercent / 100) * this.scale.width;

            pathPoints.push({ x: left, y: top });
        });

        // ---------- DECOR ----------
        const decorElements = [];

        for (let i = 0; i < levels.length; i += 2) {
            const yPos = totalHeight - (i * levelHeight) - 150;

            decorElements.push({
                type: "mountain",
                x: 0.05 * this.scale.width,
                y: yPos,
                scale: 1.2
            });

            decorElements.push({
                type: "mountain",
                x: 0.95 * this.scale.width,
                y: yPos - 60,
                scale: 1.2
            });
        }

        pathPoints.forEach((pt, i) => {
            const side = i % 2 === 0 ? 1 : -1;

            if (i % 2 === 0) {
                decorElements.push({
                    type: "tree",
                    x: pt.x - (side * 45),
                    y: pt.y - 10,
                    scale: 0.9 + Math.random() * 0.2
                });
            } else {
                decorElements.push({
                    type: "rock",
                    x: pt.x + (side * 40),
                    y: pt.y + 20,
                    scale: 0.8
                });
            }

            if (i % 4 === 0) {
                decorElements.push({
                    type: "cloud",
                    x: 20 + (i * 13 % 70),
                    y: pt.y - 100,
                    scale: 1
                });
            }
        });

        // ---------- CLOUD COVER ----------
        const cloudCover: { x: number, y: number, scale: number }[] = [];

        levels.forEach((l, idx) => {
            if (l > currentLevel + 2) {
                const pt = pathPoints[idx];

                cloudCover.push({ x: pt.x, y: pt.y, scale: 2 });
                cloudCover.push({ x: pt.x - 10, y: pt.y + 20, scale: 1.5 });
                cloudCover.push({ x: pt.x + 10, y: pt.y - 10, scale: 1.8 });
            }
        });

        return { levels, totalHeight, pathPoints, decorElements, cloudCover };
    }

}