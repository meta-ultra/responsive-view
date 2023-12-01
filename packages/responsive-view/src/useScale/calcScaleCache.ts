import { ResponsiveMode } from "../ResponsiveConfig/ResponsiveConfigContext";

export interface ScaleXY {
  scaleX: number;
  scaleY: number;
}
const cache = new Map<string, ScaleXY>();

const calcScale = (key: string) => {
  const props = JSON.parse(key);

  let scaleX = document.documentElement.clientWidth / props.draftWidth;
  let scaleY = document.documentElement.clientHeight / props.draftHeight;
  if (props.mode == ResponsiveMode.CONTAIN) {
    scaleX = scaleY = Math.min(scaleX, scaleY);
  }
  scaleX = Math.max(scaleX, props.minScale);
  scaleY = Math.max(scaleY, props.minScale);

  return { scaleX, scaleY };
};

const calcScaleCache = (key: string, invalid = false) => {
  if (invalid || !cache.has(key)) {
    cache.set(key, calcScale(key));
    if (process.env.NODE_ENV == "development") {
      console.debug("[responsive-view]", key, "miss cache.");
    }
  } else if (process.env.NODE_ENV == "development") {
    console.debug("[responsive-view]", key, "hit cache.");
  }

  return cache.get(key) as ScaleXY;
};

export { calcScaleCache };
