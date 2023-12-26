import { type CSSProperties, useMemo } from "react";
import { type ScaleXY } from "./calcScaleCache";

const parsePixel = (value: string | number) => (typeof value == "number" ? value : parseInt(value));

const calcCompensatoryMargin = (value: string | number, scale: number) =>
  parsePixel(value) * (scale - 1);

const isCenter = (
  position?: string,
  margin?: string | number,
  marginLeft?: string | number,
  marginRight?: string | number,
  left?: string | number,
  right?: string | number,
  inset?: string | number
) => {
  if (position == "absolute") {
    if (!((left == 0 && right == 0) || inset == 0)) return false;
    if (!((marginLeft == "auto" && marginRight == "auto") || margin == "auto")) return false;

    return true;
  }

  return false;
};
const isMiddle = (
  position?: string,
  margin?: string | number,
  marginTop?: string | number,
  marginBottom?: string | number,
  top?: string | number,
  bottom?: string | number,
  inset?: string | number
) => {
  if (position == "absolute") {
    if (!((top == 0 && bottom == 0) || inset == 0)) return false;
    if (!((marginTop == "auto" && marginBottom == "auto") || margin == "auto")) return false;

    return true;
  }

  return false;
};

const calcScaledStyle = (
  style?: CSSProperties,
  width?: number | string,
  height?: number | string,
  scaleXY?: ScaleXY | null
) => {
  if (!scaleXY || !width || !height) return null;

  const scaledStyle: CSSProperties = {
    transform: `scale(${scaleXY.scaleX}, ${scaleXY.scaleY})`,
  };

  let transformOriginX = "0";
  let transformOriginY = "0";
  if (style) {
    if (
      isCenter(
        style.position,
        style.margin,
        style.marginLeft,
        style.marginRight,
        style.left,
        style.right,
        style.inset
      )
    ) {
      transformOriginX = "50%";
    } else {
      scaledStyle.marginRight = calcCompensatoryMargin(width, scaleXY.scaleX);
    }

    if (
      isMiddle(
        style.position,
        style.margin,
        style.marginTop,
        style.marginBottom,
        style.top,
        style.bottom,
        style.inset
      )
    ) {
      transformOriginY = "50%";
    } else {
      scaledStyle.marginBottom = calcCompensatoryMargin(height, scaleXY.scaleY);
    }
  } else {
    scaledStyle.marginRight = calcCompensatoryMargin(width, scaleXY.scaleX);
    scaledStyle.marginBottom = calcCompensatoryMargin(height, scaleXY.scaleY);
  }

  scaledStyle.transformOrigin = `${transformOriginX} ${transformOriginY}`;

  return scaledStyle;
};

const useScaledStyle = (
  style?: CSSProperties,
  width?: number | string,
  height?: number | string,
  scaleXY?: ScaleXY | null
) => {
  return useMemo(
    () => calcScaledStyle(style, width, height, scaleXY),
    [style, width, height, scaleXY]
  );
};

export { useScaledStyle };
