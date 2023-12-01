import { useContext, useMemo } from "react";
import { Context } from "packages/src/ResponsiveConfig/ResponsiveConfigContext";
import { useScale, KeyProps } from "packages/src/useScale";

export { ResponsiveConfigProvider, ResponsiveMode } from "packages/src/ResponsiveConfig";
export { ResponsiveView } from "packages/src/ResponsiveView";

const useScaledSize = (
  {
    keyProps,
    scaling,
    width,
    height,
  }: {
    keyProps?: KeyProps;
    scaling?: boolean;
    width?: number;
    height?: number;
  } = { scaling: true }
) => {
  const contextConfig = useContext(Context);
  const scaleXY = useScale(keyProps || contextConfig, scaling);
  const w = width || contextConfig.draftWidth;
  const h = height || contextConfig.draftHeight;
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

export { useScaledSize };
