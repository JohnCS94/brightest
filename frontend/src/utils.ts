import { Unit } from "./types";
import { toast } from "react-toastify";

export const convertQuantity = (
  quantity: number,
  fromUnit: Unit,
  toUnit: Unit
) => {
  const unitConverson: Record<Unit, number> = {
    kWh: 1,
    MWh: 1000,
    GJ: 277.777778,
  };

  const quantityInKWh = quantity * unitConverson[fromUnit];
  const convertedQuantity = quantityInKWh / unitConverson[toUnit];
  return convertedQuantity;
};

export const toaster = (message: string, success: boolean) => {
  if (success) {
    toast(message, {
      theme: "light",
    });
  } else {
    toast.error(message, {
      theme: "light",
    });
  }
};

export const getDisplayString = (unit: Unit): string => {
  switch (unit) {
    case Unit.KILO_WATT_HOURS:
      return "Kilo Watt Hours";
    case Unit.MEGA_WATT_HOURS:
      return "Mega Watt Hours";
    case Unit.GIGA_JOULES:
      return "Giga Joules";
    default:
      return "";
  }
};
