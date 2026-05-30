import { exportCsv } from "../utils/exportCsv";
import { exportJson } from "../utils/exportJson";
import type {
    FestivalInput,
    FestivalSimulationResult,
    SavedFestivalScenario,
} from "../types/festival";

type ScenarioActionsProps = {
    festival: FestivalInput;
    result: FestivalSimulationResult;
    savedScenarios: SavedFestivalScenario[];
    onSaveScenario: () => void;
};

function scenarioToCsvRow(scenario: SavedFestivalScenario) {
    return {
        name: scenario.input.name,
        weather: scenario.input.weather,
        energySource: scenario.input.energySource,
        attendance: scenario.result.adjustedAttendance,
        revenue: scenario.result.totalRevenue,
        capex: scenario.result.capex,
        opex: scenario.result.opex,
        profit: scenario.result.profit,
        energyUseKwh: scenario.result.energyUseKwh,
        requiredToilets: scenario.result.requiredToilets,
        requiredStaff: scenario.result.requiredStaff,
        requiredSecurity: scenario.result.requiredSecurity,
    };
}

export function ScenarioActions({
    festival,
    result,
    savedScenarios,
    onSaveScenario,
}: ScenarioActionsProps) {
    function exportCurrentForecastJson() {
        exportJson("festival-forecast.json", {
            input: festival,
            result,
        });
    }

    function exportCurrentForecastCsv() {
        exportCsv("festival-forecast.csv", [
            {
                name: festival.name,
                weather: festival.weather,
                energySource: festival.energySource,
                attendance: result.adjustedAttendance,
                revenue: result.totalRevenue,
                capex: result.capex,
                opex: result.opex,
                profit: result.profit,
                energyUseKwh: result.energyUseKwh,
                requiredToilets: result.requiredToilets,
                requiredStaff: result.requiredStaff,
                requiredSecurity: result.requiredSecurity,
            },
        ]);
    }

    function exportSavedScenariosJson() {
        exportJson("saved-festival-scenarios.json", savedScenarios);
    }

    function exportSavedScenariosCsv() {
        exportCsv(
            "saved-festival-scenarios.csv",
            savedScenarios.map(scenarioToCsvRow)
        );
    }

    return (
        <div>
            <h2>Scenario Actions</h2>

            <button type="button" onClick={onSaveScenario}>
                Save Scenario
            </button>

            <button type="button" onClick={exportCurrentForecastJson}>
                Export Current Forecast as JSON
            </button>

            <button type="button" onClick={exportCurrentForecastCsv}>
                Export Current Forecast as CSV
            </button>

            <button
                type="button"
                onClick={exportSavedScenariosJson}
                disabled={savedScenarios.length === 0}
            >
                Export Saved Scenarios as JSON
            </button>

            <button
                type="button"
                onClick={exportSavedScenariosCsv}
                disabled={savedScenarios.length === 0}
            >
                Export Saved Scenarios as CSV
            </button>
        </div>
    );
}