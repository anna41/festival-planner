import { MetricCard } from "./MetricCard";
import { WarningsPanel } from "./WarningsPanel";
import type { FestivalSimulationResult } from "../types/festival";

type MetricsDashboardProps = {
    result: FestivalSimulationResult;
};

export function MetricsDashboard({ result }: MetricsDashboardProps) {
    return (
        <div>
            <h2>Forecast Dashboard</h2>

            <div>
                <MetricCard
                    title="Revenue"
                    value={`£${result.totalRevenue.toLocaleString()}`}
                />

                <MetricCard
                    title="Profit"
                    value={`£${result.profit.toLocaleString()}`}
                />

                <MetricCard
                    title="CAPEX"
                    value={`£${result.capex.toLocaleString()}`}
                />

                <MetricCard
                    title="OPEX"
                    value={`£${result.opex.toLocaleString()}`}
                />

                <MetricCard
                    title="Adjusted Attendance"
                    value={result.adjustedAttendance.toLocaleString()}
                />

                <MetricCard
                    title="Required Toilets"
                    value={result.requiredToilets.toLocaleString()}
                />

                <MetricCard
                    title="Required Staff"
                    value={result.requiredStaff.toLocaleString()}
                />

                <MetricCard
                    title="Required Security"
                    value={result.requiredSecurity.toLocaleString()}
                />

                <MetricCard
                    title="Energy Use"
                    value={`${result.energyUseKwh.toLocaleString()} kWh`}
                />

                <MetricCard
                    title="Energy Cost"
                    value={`£${result.energyCost.toLocaleString()}`}
                />
            </div>

            <WarningsPanel warnings={result.warnings} />
        </div>
    );
}