import type { FestivalInput } from "../types/festival";

export const defaultFestival: FestivalInput = {
    name: "Summer Beats",
    days: 3,
    attendance: 10000,
    ticketPrice: 50,

    stages: 3,
    artists: 15,
    vendors: 20,

    toilets: 80,
    staff: 50,
    security: 30,

    weather: "sunny",
    energySource: "grid",
};