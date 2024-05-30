import React, { createContext, useState, useContext, ReactNode } from "react";

type UsageContextType = {
  refreshKey: number;
  refreshUsages: () => void;
};

const UsageContext = createContext<UsageContextType | undefined>(undefined);

const UsageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const refreshUsages = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <UsageContext.Provider value={{ refreshKey, refreshUsages }}>
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
};

export default UsageProvider;
