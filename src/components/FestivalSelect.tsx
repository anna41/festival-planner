type FestivalSelectOption<T extends string> = {
    label: string;
    value: T;
};

type FestivalSelectProps<T extends string> = {
    label: string;
    value: T;
    options: readonly FestivalSelectOption<T>[];
    onChange: (value: T) => void;
};

export function FestivalSelect<T extends string>({
    label,
    value,
    options,
    onChange,
}: FestivalSelectProps<T>) {
    return (
        <label>
            <div>{label}</div>

            <select
                value={value}
                onChange={(event) => onChange(event.target.value as T)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}