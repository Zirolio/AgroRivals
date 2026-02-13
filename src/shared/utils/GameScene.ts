import { Scene } from "phaser";
import type { TranslationTextKey } from "../config/types/translation";
import t from "./translation";

export default class GameScene extends Scene {
    t(key: TranslationTextKey) { return t(key, this.registry.get("language")); }
}