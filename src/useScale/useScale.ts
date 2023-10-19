import { useLayoutEffect, useState, useMemo } from "react";
import { ResponsiveMode } from "../ResponsiveConfig/ResponsiveConfigContext";
import { calcScaleCache, ScaleXY } from "./calcScaleCache";
import { keepScaling } from "./keepScaling";

interface KeyProps {
  draftWidth: number;
  draftHeight: number;
  mode: ResponsiveMode;
  minScale: number;
}

/**
 * @param {KeyProps} keyProps - the properties used to make up the unique key of scale.
 * @param {boolean} [scaling = true] - whether listen to resize event of window object or not.
 * @returns {null | ScaleXY}
 */
const useScale = (keyProps: KeyProps, scaling = true) => {
  const [scaleXY, setScaleXY] = useState<null | ScaleXY>(null);

  const props = useMemo(
    () => ({
      draftWidth: keyProps.draftWidth,
      draftHeight: keyProps.draftHeight,
      mode: keyProps.mode,
      minScale: keyProps.minScale,
    }),
    [keyProps.draftWidth, keyProps.draftHeight, keyProps.mode, keyProps.minScale]
  );

  useLayoutEffect(() => {
    const key = JSON.stringify(props);
    setScaleXY(calcScaleCache(key));

    if (scaling) {
      return keepScaling(key, (scaleXY: ScaleXY) => setScaleXY(scaleXY));
    }
  }, [props, scaling]);

  return scaleXY;
};

export type { KeyProps };
export { useScale };
