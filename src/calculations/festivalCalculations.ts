import type {
    FestivalInput,
    FestivalSimulationResult,
} from "../types/festival";

import { toNonNegativeNumber } from "../utils/number";

const TOILET_RATIO = 75;
const STAFF_RATIO = 100;
const SECURITY_RATIO = 150;

const VENDOR_FEE_PER_DAY = 500;

const STAGE_CAPEX = 20_000;
const ARTIST_EQUIPMENT_CAPEX = 1_000;

const ARTIST_FEE = 5_000;
const STAFF_DAY_RATE = 120;
const SECURITY_DAY_RATE = 160;
const TOILET_RENTAL_PER_DAY = 80;

const ENERGY_KWH_PER_ATTENDEE_PER_DAY = 1.5;
const ENERGY_KWH_PER_STAGE_PER_DAY = 250;

const ENERGY_PRICE_PER_KWH = {
    grid: 0.3,
    diesel: 0.45,
    solarHybrid: 0.22,
};

export function calculateFestival(
    input: FestivalInput
): FestivalSimulationResult {
    const attendance = toNonNegativeNumber(
        input.attendance
    );

    const days = Math.max(
        1,
        toNonNegativeNumber(input.days)
    );

    const ticketPrice = toNonNegativeNumber(
        input.ticketPrice
    );

    const stages = toNonNegativeNumber(
        input.stages
    );

    const artists = toNonNegativeNumber(
        input.artists
    );

    const vendors = toNonNegativeNumber(
        input.vendors
    );

    const toilets = toNonNegativeNumber(
        input.toilets
    );

    const staff = toNonNegativeNumber(
        input.staff
    );

    const security = toNonNegativeNumber(
        input.security
    );

    const adjustedAttendance = Math.round(
        attendance * getWeatherAttendanceMultiplier(input.weather)
    );
    const ticketRevenue =
        adjustedAttendance * ticketPrice;

    const vendorRevenue =
        vendors *
        VENDOR_FEE_PER_DAY *
        days;

    const totalRevenue =
        ticketRevenue + vendorRevenue;

    const requiredToilets =
        Math.ceil(
            adjustedAttendance /
            TOILET_RATIO
        );

    const requiredStaff =
        Math.ceil(
            adjustedAttendance /
            STAFF_RATIO
        );

    const requiredSecurity =
        Math.ceil(
            adjustedAttendance /
            SECURITY_RATIO
        );

    const capex =
        stages * STAGE_CAPEX +
        artists *
        ARTIST_EQUIPMENT_CAPEX;

    const energyUseKwh =
        adjustedAttendance *
        days *
        ENERGY_KWH_PER_ATTENDEE_PER_DAY +
        stages *
        days *
        ENERGY_KWH_PER_STAGE_PER_DAY;

    const energyCost =
        energyUseKwh *
        ENERGY_PRICE_PER_KWH[
        input.energySource
        ];

    const opex =
        artists * ARTIST_FEE +
        staff *
        STAFF_DAY_RATE *
        days +
        security *
        SECURITY_DAY_RATE *
        days +
        toilets *
        TOILET_RENTAL_PER_DAY *
        days +
        energyCost;

    const profit =
        totalRevenue -
        capex -
        opex;

    const warnings: string[] = [];

    if (
        toilets <
        requiredToilets
    ) {
        warnings.push(
            `Not enough toilets. Required: ${requiredToilets}, current: ${toilets}.`
        );
    }

    if (
        staff <
        requiredStaff
    ) {
        warnings.push(
            `Not enough staff. Required: ${requiredStaff}, current: ${staff}.`
        );
    }

    if (
        security <
        requiredSecurity
    ) {
        warnings.push(
            `Not enough security. Required: ${requiredSecurity}, current: ${security}.`
        );
    }

    return {
        adjustedAttendance,

        ticketRevenue,
        vendorRevenue,
        totalRevenue,

        capex,
        opex,
        profit,

        requiredToilets,
        requiredStaff,
        requiredSecurity,

        energyUseKwh,
        energyCost,

        warnings,
    };
}

function getWeatherAttendanceMultiplier(weather: FestivalInput["weather"]): number {
    if (weather === "rain") {
        return 0.85;
    }

    if (weather === "heatwave") {
        return 0.95;
    }

    return 1;
}