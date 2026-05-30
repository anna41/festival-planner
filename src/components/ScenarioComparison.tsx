import type { SavedFestivalScenario } from "../types/festival";

type ScenarioComparisonProps = {
    scenarios: SavedFestivalScenario[];
};

export function ScenarioComparison({
    scenarios,
}: ScenarioComparisonProps) {
    if (scenarios.length === 0) {
        return null;
    }

    return (
        <div>
            <h2>Scenario Comparison</h2>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Weather</th>
                        <th>Attendance</th>
                        <th>Revenue</th>
                        <th>CAPEX</th>
                        <th>OPEX</th>
                        <th>Profit</th>
                    </tr>
                </thead>

                <tbody>
                    {scenarios.map((scenario) => (
                        <tr key={scenario.id}>
                            <td>{scenario.input.name}</td>
                            <td>{scenario.input.weather}</td>
                            <td>{scenario.result.adjustedAttendance.toLocaleString()}</td>
                            <td>£{scenario.result.totalRevenue.toLocaleString()}</td>
                            <td>£{scenario.result.capex.toLocaleString()}</td>
                            <td>£{scenario.result.opex.toLocaleString()}</td>
                            <td>£{scenario.result.profit.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}