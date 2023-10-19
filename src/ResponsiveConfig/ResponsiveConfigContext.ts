import { createContext, useContext } from "react";

enum ResponsiveMode {
  FILL = "FILL",
  CONTAIN = "CONTAIN",
}

type ResponsiveConfig = {
  draftWidth: number;
  draftHeight: number;
  mode: ResponsiveMode;
  minScale: number;
};

const Context = createContext<ResponsiveConfig>({
  draftWidth: 1920,
  draftHeight: 1080,
  mode: ResponsiveMode.FILL,
  minScale: 0.5,
});

export { ResponsiveMode, ResponsiveConfig, Context };
