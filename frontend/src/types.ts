export enum Unit {
  KILO_WATT_HOURS = "kWh",
  MEGA_WATT_HOURS = "MWh",
  GIGA_JOULES = "GJ",
}

export type DataPoint = {
  id: number;
  quantity: number;
  unit: Unit;
  created_at: string;
};
