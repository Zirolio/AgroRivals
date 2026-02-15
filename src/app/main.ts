import Phaser from "phaser";
import MenuScene from "../engine/scenes/MenuScene/MenuScene";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import "./main.scss"; 
import LoaderScene from "../engine/scenes/LoaderScene/LoaderScene";
import ShopScene from "../engine/scenes/ShopScene/ShopScene";
import AchievementsScene from "../engine/scenes/AchievementsScene/AchievementsScene";
// import RoundRectangleProgressPlugin from "phaser3-rex-plugins/plugins/roundrectangleprogress-plugin";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,

  width: window.innerWidth,
  height: window.innerHeight,

  parent: "app",

  backgroundColor: "#1d1d1d",

  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: "app",
    width: "100%",
    height: "100%",
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },

  plugins: {
    /* global: [{
        key: "scene.roundRectangleProgress",
        plugin: RoundRectangleProgressPlugin,
        start: true
    }], */
    scene: [
      {
        key: "RexUIPlugin",
        plugin: RexUIPlugin,
        mapping: "rexUI"
      }
    ]
  },

  dom: {
    createContainer: true
  },

  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: false
  },

  scene: [LoaderScene, MenuScene, ShopScene, AchievementsScene],
};

new Phaser.Game(config);
