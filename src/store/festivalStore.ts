import { create } from "zustand";

import { calculateFestival } from "../calculations/festivalCalculations";
import { defaultFestival } from "../data/defaultFestival";
import { getSavedScenariosKey, USER_PROFILE_KEY } from "../constants/storage";
import type { FestivalInput, SavedFestivalScenario } from "../types/festival";
import type { UserProfile } from "../types/profile";

type FestivalStore = {
    profile: UserProfile | null;
    festival: FestivalInput;
    savedScenarios: SavedFestivalScenario[];

    setProfile: (profile: UserProfile) => void;
    clearProfile: () => void;

    updateFestival: (festival: FestivalInput) => void;

    saveScenario: () => void;
    deleteScenario: (id: string) => void;
    openScenario: (id: string) => void;
};

function getScenariosForEmail(email: string): SavedFestivalScenario[] {
    const saved = localStorage.getItem(getSavedScenariosKey(email));

    if (!saved) {
        return [];
    }

    return JSON.parse(saved);
}

export const useFestivalStore = create<FestivalStore>((set, get) => ({
    profile: null,
    festival: defaultFestival,
    savedScenarios: [],

    setProfile: (profile) => {
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));

        set({
            profile,
            festival: defaultFestival,
            savedScenarios: getScenariosForEmail(profile.email),
        });
    },

    clearProfile: () => {
        localStorage.removeItem(USER_PROFILE_KEY);

        set({
            profile: null,
            festival: defaultFestival,
            savedScenarios: [],
        });
    },

    updateFestival: (festival) => {
        set({ festival });
    },

    saveScenario: () => {
        const { profile, festival, savedScenarios } = get();

        if (!profile) {
            return;
        }

        const result = calculateFestival(festival);

        const scenario: SavedFestivalScenario = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            ownerEmail: profile.email,
            input: festival,
            result,
        };

        const nextScenarios = [...savedScenarios, scenario];

        localStorage.setItem(
            getSavedScenariosKey(profile.email),
            JSON.stringify(nextScenarios)
        );

        set({ savedScenarios: nextScenarios });
    },

    deleteScenario: (id) => {
        const { profile, savedScenarios } = get();

        if (!profile) {
            return;
        }

        const nextScenarios = savedScenarios.filter(
            (scenario) => scenario.id !== id
        );

        localStorage.setItem(
            getSavedScenariosKey(profile.email),
            JSON.stringify(nextScenarios)
        );

        set({ savedScenarios: nextScenarios });
    },

    openScenario: (id) => {
        const scenario = get().savedScenarios.find(
            (scenario) => scenario.id === id
        );

        if (!scenario) {
            return;
        }

        set({ festival: scenario.input });
    },
}));