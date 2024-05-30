import { convertQuantity, getDisplayString } from "./utils";
import { Unit } from "./types";

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
  error: jest.fn(),
}));

describe("Utils Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("convertQuantity", () => {
    it("converts quantity correctly from kWh to MWh", () => {
      const quantity = 100;
      const fromUnit = Unit.KILO_WATT_HOURS;
      const toUnit = Unit.MEGA_WATT_HOURS;
      const expectedConvertedQuantity = 0.1;
      const convertedQuantity = convertQuantity(quantity, fromUnit, toUnit);

      expect(convertedQuantity).toBeCloseTo(expectedConvertedQuantity, 5);
    });

    it("converts quantity correctly from GJ to kWh", () => {
      const quantity = 50;
      const fromUnit = Unit.GIGA_JOULES;
      const toUnit = Unit.KILO_WATT_HOURS;
      const expectedConvertedQuantity = 13888.9;
      const convertedQuantity = convertQuantity(quantity, fromUnit, toUnit);

      expect(convertedQuantity).toBeCloseTo(expectedConvertedQuantity, 0);
    });
  });

  describe("getDisplayString", () => {
    it('returns "Kilo Watt Hours" for Unit.KILO_WATT_HOURS', () => {
      const result = getDisplayString(Unit.KILO_WATT_HOURS);
      expect(result).toBe("Kilo Watt Hours");
    });

    it('returns "Mega Watt Hours" for Unit.MEGA_WATT_HOURS', () => {
      const result = getDisplayString(Unit.MEGA_WATT_HOURS);
      expect(result).toBe("Mega Watt Hours");
    });

    it('returns "Giga Joules" for Unit.GIGA_JOULES', () => {
      const result = getDisplayString(Unit.GIGA_JOULES);
      expect(result).toBe("Giga Joules");
    });

    it("returns empty string for unknown unit", () => {
      const result = getDisplayString("invalid" as Unit);
      expect(result).toBe("");
    });
  });
});
