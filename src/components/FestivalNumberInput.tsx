type NumberInputProps = {
    label: string;
    value: number;
    onChange: (value: string) => void;
};

export function FestivalNumberInput({
    label,
    value,
    onChange,
}: NumberInputProps) {
    return (
        <label>
            <div>{label}</div>

            <input
                type="number"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
            />
        </label>
    );
}