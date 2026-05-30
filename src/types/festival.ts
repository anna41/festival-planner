export type FestivalInput = {
    name: string;
    days: number;
    attendance: number;
    ticketPrice: number;
    stages: number;
    artists: number;
    vendors: number;
    toilets: number;
    staff: number;
    security: number;
    weather: WeatherScenario;
    energySource: EnergySource;
};

export type FestivalSimulationResult = {
    adjustedAttendance: number;
    ticketRevenue: number;
    vendorRevenue: number;
    totalRevenue: number;
    capex: number;
    opex: number;
    profit: number;
    requiredToilets: number;
    requiredStaff: number;
    requiredSecurity: number;
    energyUseKwh: number;
    energyCost: number;
    warnings: string[];
};

export const WEATHER_OPTIONS = [
    {
        label: "Sunny",
        value: "sunny",
    },
    {
        label: "Rain",
        value: "rain",
    },
    {
        label: "Heatwave",
        value: "heatwave",
    },
] as const;

export type WeatherScenario =
    (typeof WEATHER_OPTIONS)[number]["value"];

export const ENERGY_SOURCE_OPTIONS = [
    {
        label: "Grid Electricity",
        value: "grid",
    },
    {
        label: "Diesel Generator",
        value: "diesel",
    },
    {
        label: "Solar Hybrid",
        value: "solarHybrid",
    },
] as const;

export type EnergySource =
    (typeof ENERGY_SOURCE_OPTIONS)[number]["value"];

export type SavedFestivalScenario = {
    id: string;
    createdAt: string;
    ownerEmail: string;
    input: FestivalInput;
    result: FestivalSimulationResult;
};