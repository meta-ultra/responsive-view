import { debounce } from "lodash-es";
import { ScaleXY, calcScaleCache } from "./calcScaleCache";

interface Callback {
  (scaleXY: ScaleXY): void;
}
const keyCallbacks = new Map<string, Callback[]>();

const hasScrollbars = () => {
  const vScrollbar = document.documentElement.clientHeight < document.documentElement.scrollHeight;
  const hScrollbar = document.documentElement.clientWidth < document.documentElement.scrollWidth;

  if (process.env.NODE_ENV == "development") {
    console.debug(
      "[responsive-view]",
      "there is" + (vScrollbar || hScrollbar ? "" : " no"),
      "scroll bar"
    );
  }

  return vScrollbar || hScrollbar;
};

const calcScaleOnResize = () => {
  for (const [key, callbacks] of keyCallbacks.entries()) {
    const scaleXY = calcScaleCache(key, true);

    for (const callback of callbacks) {
      callback && callback(scaleXY);
    }
  }
};

const handleResize = debounce(() => {
  calcScaleOnResize();

  // try to calculate the scale again in the next event loop when there is a scrollbar
  if (hasScrollbars()) {
    setTimeout(calcScaleOnResize, 16);
  }
}, 200);

let bound = false;
const bind = () => {
  if (!bound) {
    window.addEventListener("resize", handleResize);
  }
  bound = true;
};
const unbind = () => {
  if (bound) {
    window.removeEventListener("resize", handleResize);
  }
  bound = false;
};

const keepScaling = (key: string, callback: Callback) => {
  const callbacks = keyCallbacks.get(key);
  if (callbacks) {
    callbacks.push(callback);
  } else {
    keyCallbacks.set(key, [callback]);
    bind();
  }

  return () => {
    const callbacks = keyCallbacks.get(key);
    if (callbacks) {
      const remainedCallbacks = callbacks.filter((item: Callback) => item != callback);
      if (remainedCallbacks.length) {
        keyCallbacks.set(key, remainedCallbacks);
      } else {
        keyCallbacks.delete(key);
        if (keyCallbacks.keys.length == 0) {
          unbind();
        }
      }

      if (process.env.NODE_ENV == "development") {
        console.debug(
          "[responsive-view]",
          "the amount of callback of ",
          key,
          "remains",
          remainedCallbacks.length
        );
      }
    }
  };
};

export { keepScaling };
