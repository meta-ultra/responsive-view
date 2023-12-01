import { FC, PropsWithChildren } from "react";
import { Context, ResponsiveConfig } from "./ResponsiveConfigContext";

const ResponsiveConfigProvider: FC<PropsWithChildren<{ config: ResponsiveConfig }>> = ({
  config,
  children,
}) => {
  return <Context.Provider value={config}>{children}</Context.Provider>;
};

export { ResponsiveConfigProvider };
