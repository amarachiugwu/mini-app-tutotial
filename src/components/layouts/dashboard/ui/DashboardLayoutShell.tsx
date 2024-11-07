import React from "react";
import DashboardFooter from "./DashboardFooter.layout";

const DashboardLayoutShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="bg-black flex justify-center">
      {children}
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayoutShell;
