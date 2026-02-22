import type { Scene } from "phaser";

export default function CreateSnowfall(scene: Scene) {
    const snowEmitter = scene.add.particles(0, -20, "snowflake", {
        x: { min: 0, max: scene.scale.width },
        quantity: 2,
        frequency: 300,
        lifespan: 10000,
        speedY: { min: 50, max: 150 },
        scale: { min: 0.03, max: 0.05 },
        alpha: { start: 0.6, end: 0 },
        blendMode: "ADD",
        tint: 0xff0000,
        emitting: false
    });
    
    snowEmitter.onParticleEmit((p) => {
        p.setPosition(scene.scale.width * Math.random(), -20);
    });
    
    snowEmitter.fastForward(5000).start();

    return snowEmitter;
}