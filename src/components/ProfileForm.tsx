import { useState } from "react";
import "./ProfileForm.css";

import type { UserProfile } from "../types/profile";

type ProfileFormProps = {
    onSave: (profile: UserProfile) => void;
};

export function ProfileForm({ onSave }: ProfileFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [nameValid, setNameValid] = useState(true);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    function validateEmail(value: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        setAttemptedSubmit(true);

        const emailOk = validateEmail(email);
        const nameOk = Boolean(name.trim());
        setEmailValid(emailOk);
        setNameValid(nameOk);

        if (!emailOk || !nameOk) return;

        onSave({
            name,
            email,
        });
    }

    return (
        <form className="profile-form" onSubmit={handleSubmit} noValidate>
            <h1 className="profile-title">Create Profile</h1>

            <div className="field">
                <label className="label">Name</label>
                <input
                    className="input"
                    placeholder="Your name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                        const v = event.target.value;
                        setName(v);
                        if (attemptedSubmit) setNameValid(Boolean(v.trim()));
                    }}
                    aria-invalid={attemptedSubmit ? !nameValid : undefined}
                    aria-describedby={attemptedSubmit && !nameValid ? "name-error" : undefined}
                    required
                />
                {attemptedSubmit && !nameValid && (
                    <div id="name-error" className="error">Please enter your name</div>
                )}
            </div>

            <div className="field">
                <label className="label">Email</label>
                <input
                    className="input"
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={(event) => {
                        const v = event.target.value;
                        setEmail(v);
                        if (attemptedSubmit) setEmailValid(validateEmail(v));
                    }}
                    aria-invalid={attemptedSubmit ? !emailValid : undefined}
                    aria-describedby={attemptedSubmit && !emailValid ? "email-error" : undefined}
                    required
                />
                {attemptedSubmit && !emailValid && (
                    <div id="email-error" className="error">Please enter a valid email address</div>
                )}
            </div>

            <div className="actions">
                <button className="btn btn-primary" type="submit">Continue</button>
            </div>
        </form>
    );
}
