import {
  PropsWithChildren,
  FunctionComponent,
  ReactHTML,
  createElement,
  CSSProperties,
  Children,
  cloneElement,
  useContext,
} from "react";
import { ResponsiveConfig, Context } from "../ResponsiveConfig/ResponsiveConfigContext";
import { useScale } from "../useScale";
import { useScaledStyle } from "../useScaledStyle";
import { ReactElement } from "react";

type ResponsiveViewExclusiveProps = {
  ctr?: keyof ReactHTML | null;
  style?: CSSProperties;
  className?: string;
};

export type ResponsiveViewProps = PropsWithChildren<
  Partial<ResponsiveConfig> & ResponsiveViewExclusiveProps
>;

interface ResponsiveViewType extends FunctionComponent<ResponsiveViewProps> {
  div: FunctionComponent<ResponsiveViewProps>;
}

const ResponsiveView: ResponsiveViewType = ({
  draftWidth,
  draftHeight,
  mode,
  minScale,
  style,
  className,
  ctr,
  children,
}: ResponsiveViewProps) => {
  const config = useContext(Context);
  draftWidth = draftWidth || config.draftWidth;
  draftHeight = draftHeight || config.draftHeight;
  mode = mode || config.mode;
  minScale = minScale || config.minScale;
  const width = (style && style.width) || draftWidth;
  const height = (style && style.height) || draftHeight;

  const scaleXY = useScale({ draftWidth, draftHeight, mode, minScale });
  const scaledStyle = useScaledStyle(style, width, height, scaleXY);

  if (!scaledStyle) return null;

  if (ctr) {
    return createElement(
      ctr,
      {
        className,
        style: {
          ...style,
          width,
          height,
          ...scaledStyle,
        },
      },
      children
    );
  } else {
    return cloneElement(Children.only(children) as ReactElement, {
      className,
      style: {
        ...style,
        width,
        height,
        ...scaledStyle,
      },
    });
  }
};

ResponsiveView.div = (props) => {
  return <ResponsiveView {...props} ctr="div" />;
};

export { ResponsiveView };
