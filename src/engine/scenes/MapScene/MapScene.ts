import CreateSnowfall from "@shared/utils/CreateSnowfall";
import Phaser from "phaser";
import Level from "./components/Level/UILevel";

export default class MapScene extends Phaser.Scene {
    private snowEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;

    

    constructor() {
        super("MapScene");
    }

    create() {
        this.scene.launch("MapUIScene");
        this.scene.bringToTop("MapUIScene");

        this.snowEmitter = CreateSnowfall(this);

        const currentLevel = 10;
        const map = this.generateMap(currentLevel);

        this.cameras.main.setBounds(
            0,
            0,
            this.scale.width,
            map.totalHeight
        ).setScroll(map.totalHeight);

        const g = this.add.graphics();
        g.fillStyle(0xffffff);
        g.fillRect(0, 0, this.scale.width, map.totalHeight);

        map.decorElements.forEach(el => {
            const sprite = this.add.image(el.x / 100 * this.scale.width, el.y, el.type);
            sprite.setScale(el.scale);
            sprite.setOrigin(0.5, 1);
        });

        map.levels.forEach((lvl, index) => {
            const pt = map.pathPoints[index];
            if (!pt) return;

            // Set camera position
            this.cameras.main.setScroll(pt.y);

            const level = new Level(this, {
                x: pt.x / 100 * this.scale.width,
                y: pt.y,
                hasIsland: lvl % 2 !== 0,
                type: lvl > currentLevel ? "locked" :
                        lvl < currentLevel ? "passed" : "current"
            });
            level.layout();

            /* node.setSize(50, 40);
            node.setInteractive();

            node.on("pointerdown", () => {
                if (lvl <= currentLevel) {
                    console.log("Start level", lvl);
                }
            }); */
        });

        map.cloudCover.forEach(c => {
            const cloud = this.add.image(c.x / 100 * this.scale.width, c.y, "cloud");
            cloud.setScale(c.scale);
            cloud.setDepth(50);
        });

        // Santa house
        const centerX = this.scale.width / 2;
        const y = map.totalHeight - 140;

        const santaDecorContainer = this.add.container(centerX, y)
            .setSize(200, 200)
            .setDepth(5);

        const santa = this.add.image(0, 0, "santa-house")
            .setOrigin(0.5, 1)
            .setScale(1.2);

        const sleigh = this.add.image(80, 0, "sleigh")
            .setOrigin(0.5, 1)
            .setScale(0.8);

        santaDecorContainer.add([santa, sleigh]);

        this.input.on("wheel", (_pointer: Phaser.Input.Pointer, _gameObjects: Phaser.GameObjects.GameObject[], _deltaX: number, deltaY: number) => {
            this.cameras.main.scrollY += deltaY * 0.5;
        });
    }

    drawPath(pathPoints: { x: number, y: number }[]) {
        const g = this.add.graphics();
        g.lineStyle(28, 0xe2e8f0);

        for (let i = 0; i < pathPoints.length - 1; i++) {
            const pt = pathPoints[i];
            const next = pathPoints[i + 1];

            const curve = new Phaser.Curves.QuadraticBezier(
                new Phaser.Math.Vector2(pt.x, pt.y),
                new Phaser.Math.Vector2(pt.x, pt.y - 80),
                new Phaser.Math.Vector2(next.x, next.y)
            );

            curve.draw(g, 64);
        }
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