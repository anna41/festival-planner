import { useState } from "react";

import type { UserProfile } from "../types/profile";

type ProfileFormProps = {
    onSave: (profile: UserProfile) => void;
};

export function ProfileForm({ onSave }: ProfileFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        onSave({
            name,
            email,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Local Profile</h1>

            <label>
                <div>Name</div>
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label>

            <label>
                <div>Email</div>
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>

            <button type="submit">Continue</button>
        </form>
    );
}