import { FestivalNumberInput } from "./FestivalNumberInput";
import { FestivalSelect } from "./FestivalSelect";
import {
    ENERGY_SOURCE_OPTIONS,
    WEATHER_OPTIONS,
    type FestivalInput,
} from "../types/festival";

type FestivalFormProps = {
    festival: FestivalInput;
    onFestivalChange: (festival: FestivalInput) => void;
};

export function FestivalForm({
    festival,
    onFestivalChange,
}: FestivalFormProps) {
    function updateNumberField(field: keyof FestivalInput, value: string) {
        onFestivalChange({
            ...festival,
            [field]: Number(value),
        });
    }

    return (
        <div>
            <h2>Festival Simulator Form</h2>

            <label>
                <div>Festival Name</div>
                <input
                    type="text"
                    value={festival.name}
                    onChange={(event) =>
                        onFestivalChange({
                            ...festival,
                            name: event.target.value,
                        })
                    }
                />
            </label>

            <FestivalNumberInput label="Attendance" value={festival.attendance} onChange={(value) => updateNumberField("attendance", value)} />
            <FestivalNumberInput label="Days" value={festival.days} onChange={(value) => updateNumberField("days", value)} />
            <FestivalNumberInput label="Ticket Price" value={festival.ticketPrice} onChange={(value) => updateNumberField("ticketPrice", value)} />
            <FestivalNumberInput label="Toilets" value={festival.toilets} onChange={(value) => updateNumberField("toilets", value)} />
            <FestivalNumberInput label="Stages" value={festival.stages} onChange={(value) => updateNumberField("stages", value)} />
            <FestivalNumberInput label="Artists" value={festival.artists} onChange={(value) => updateNumberField("artists", value)} />
            <FestivalNumberInput label="Vendors" value={festival.vendors} onChange={(value) => updateNumberField("vendors", value)} />
            <FestivalNumberInput label="Staff" value={festival.staff} onChange={(value) => updateNumberField("staff", value)} />
            <FestivalNumberInput label="Security" value={festival.security} onChange={(value) => updateNumberField("security", value)} />

            <FestivalSelect
                label="Weather"
                value={festival.weather}
                options={WEATHER_OPTIONS}
                onChange={(value) =>
                    onFestivalChange({
                        ...festival,
                        weather: value,
                    })
                }
            />

            <FestivalSelect
                label="Energy Source"
                value={festival.energySource}
                options={ENERGY_SOURCE_OPTIONS}
                onChange={(value) =>
                    onFestivalChange({
                        ...festival,
                        energySource: value,
                    })
                }
            />
        </div>
    );
}