import Phaser from "phaser";
import MenuScene from "../engine/scenes/MenuScene/MenuScene";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import "./main.scss"; 
import LoaderScene from "../engine/scenes/LoaderScene/LoaderScene";
import ShopScene from "../engine/scenes/ShopScene/ShopScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,

  width: window.innerWidth,
  height: window.innerHeight,

  parent: "app",

  backgroundColor: "#1d1d1d",

  scale: {
    mode: Phaser.Scale.RESIZE, // Важно: Phaser сам меняет размер холста
    parent: 'app',
    width: '100%',
    height: '100%',
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },

  plugins: {
    scene: [
      {
        key: "rexUI",
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
    pixelArt: false, // Установите false для плавных векторных фигур и текста
    roundPixels: false
  },

  scene: [LoaderScene, MenuScene, ShopScene],
};

// Создаем игру
new Phaser.Game(config);
