import { useMemo } from "react";
import { useResponsiveContext } from "./ResponsiveContext";
import { useScale, KeyProps } from "./core";

type useScaledSizeType = (props?: {
  keyProps?: KeyProps; // the draft size, minimum scaling ratio and responsive mode
  scaling?: boolean; // watch resize event of window
  width?: number; // the screen width
  height?: number; // the screen height
}) => null | {
  width: number;
  height: number;
};

/**
 * get the scaled size on top of screen size and draft size.
 */
const useScaledSize: useScaledSizeType = (
  { keyProps, scaling, width, height } = { scaling: true }
) => {
  const context = useResponsiveContext();
  const scaleXY = useScale(keyProps || context, scaling);
  const w = width || context.draftWidth;
  const h = height || context.draftHeight;

  return useMemo(() => {
    if (scaleXY) {
      return {
        width: w * scaleXY.scaleX,
        height: h * scaleXY.scaleY,
      };
    }
    return null;
  }, [scaleXY, w, h]);
};

export type { useScaledSizeType };
export default useScaledSize;
