import { useMemo } from "react";
import { isLowPowerHeuristic } from "../config/motion";

type NetworkConnection = {
  saveData?: boolean;
  effectiveType?: string;
};

export function usePowerMode() {
  return useMemo(() => {
    const connection = (navigator as Navigator & { connection?: NetworkConnection }).connection;
    const saveData = Boolean(connection?.saveData);
    const lowPower = isLowPowerHeuristic();
    const slowNetwork = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";

    return {
      saveData,
      lowPower,
      shouldReduceEffects: saveData || lowPower || slowNetwork,
    };
  }, []);
}
