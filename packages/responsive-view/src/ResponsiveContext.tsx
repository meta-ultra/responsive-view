import { createContext, useContext, type PropsWithChildren, type FC } from "react";

enum ResponsiveMode {
  FILL = "FILL",
  CONTAIN = "CONTAIN",
}

type ResponsiveConfig = {
  // scale up or down if the screen size doesn't match the draftWidth or draftHeight.
  draftWidth: number;
  draftHeight: number;
  mode: ResponsiveMode;
  minScale: number;
};

const Context = createContext<ResponsiveConfig | undefined>(undefined);

const useResponsiveContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw Error(`[@meta-ultra/responsive-view] useResponsiveContext must be inside ResponsiveProvider`);
  }
  return context;
}

type ResponsiveProviderProps = PropsWithChildren<{
  config: ResponsiveConfig;
}>

const ResponsiveProvider: FC<ResponsiveProviderProps> = ({
  config = {
    draftWidth: 1920,
    draftHeight: 1080,
    mode: ResponsiveMode.FILL,
    minScale: 0.5,
  },
  children,
}) => {
  return (
    <Context.Provider value={config}>
      {children}
    </Context.Provider>
  )
}

export type { ResponsiveProviderProps, ResponsiveConfig }
export { ResponsiveMode, ResponsiveProvider, useResponsiveContext }
