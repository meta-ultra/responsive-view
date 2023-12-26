import {
  PropsWithChildren,
  FunctionComponent,
  ReactHTML,
  createElement,
  CSSProperties,
  Children,
  cloneElement,
  type ReactElement,
} from "react";
import { ResponsiveConfig, useResponsiveContext } from "./ResponsiveContext";
import { useScale, useScaledStyle } from "./core";

type ResponsiveViewExclusiveProps = {
  ctr?: keyof ReactHTML | null;
  style?: CSSProperties;
  className?: string;
};

type ResponsiveViewProps = PropsWithChildren<
  Partial<ResponsiveConfig> & ResponsiveViewExclusiveProps
>;

/**
 * scale down or up the children
 */
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
  const context = useResponsiveContext();
  draftWidth = draftWidth || context.draftWidth;
  draftHeight = draftHeight || context.draftHeight;
  mode = mode || context.mode;
  minScale = minScale || context.minScale;
  const width = (style && style.width) || draftWidth;
  const height = (style && style.height) || draftHeight;

  const scaleXY = useScale({ draftWidth, draftHeight, mode, minScale });
  const scaledStyle = useScaledStyle(style, width, height, scaleXY);

  if (!scaledStyle) return null;

  const props = {
    className,
    style: {
      ...style,
      width,
      height,
      ...scaledStyle,
    },
  };

  if (ctr) {
    return createElement(ctr, props, children);
  } else {
    return cloneElement(Children.only(children) as ReactElement, props);
  }
};

type ResponsiveViewType = FunctionComponent<ResponsiveViewProps> & {
  div: FunctionComponent<ResponsiveViewProps>;
};

ResponsiveView.div = (props) => {
  return <ResponsiveView {...props} ctr="div" />;
};

export type { ResponsiveViewProps, ResponsiveViewType };
export { ResponsiveView };
