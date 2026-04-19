import React, { createContext, useContext } from "react";
import {
  CHYR_CONFIG,
  BaseBrandVariables,
} from "../components/ChyrLandingPage/landingConfig";

interface LandingConfigContextType {
  config: BaseBrandVariables;
}

const LandingConfigContext = createContext<
  LandingConfigContextType | undefined
>(undefined);

export const LandingConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const config = CHYR_CONFIG;

  return (
    <LandingConfigContext.Provider value={{ config }}>
      {children}
    </LandingConfigContext.Provider>
  );
};

export const useLandingConfig = () => {
  const context = useContext(LandingConfigContext);
  if (!context) {
    throw new Error(
      "useLandingConfig must be used within a LandingConfigProvider",
    );
  }
  return context;
};
