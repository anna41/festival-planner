type ScenarioActionsProps = {
    onSaveScenario: () => void;
    onExportCurrentJson: () => void;
    onExportCurrentCsv: () => void;
    onExportSavedJson: () => void;
    onExportSavedCsv: () => void;
    hasSavedScenarios: boolean;
};

export function ScenarioActions({
    onSaveScenario,
    onExportCurrentJson,
    onExportCurrentCsv,
    onExportSavedJson,
    onExportSavedCsv,
    hasSavedScenarios,
}: ScenarioActionsProps) {
    return (
        <div>
            <h2>Scenario Actions</h2>

            <button type="button" onClick={onSaveScenario}>
                Save Scenario
            </button>

            <button type="button" onClick={onExportCurrentJson}>
                Export Current Forecast as JSON
            </button>

            <button type="button" onClick={onExportCurrentCsv}>
                Export Current Forecast as CSV
            </button>

            <button
                type="button"
                onClick={onExportSavedJson}
                disabled={!hasSavedScenarios}
            >
                Export Saved Scenarios as JSON
            </button>

            <button
                type="button"
                onClick={onExportSavedCsv}
                disabled={!hasSavedScenarios}
            >
                Export Saved Scenarios as CSV
            </button>
        </div>
    );
}