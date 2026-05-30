type WarningsPanelProps = {
    warnings: string[];
};

export function WarningsPanel({ warnings }: WarningsPanelProps) {
    if (warnings.length === 0) {
        return (
            <div>
                <h2>Planning Checks</h2>
                <p>No issues detected.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Planning Checks</h2>

            <ul>
                {warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                ))}
            </ul>
        </div>
    );
}