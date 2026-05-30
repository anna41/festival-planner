export const USER_PROFILE_KEY = "userProfile";

export function getSavedScenariosKey(email: string) {
    return `savedFestivalScenarios:${email}`;
}