import { useEffect, useState } from "react";
import "./App.css";

import { calculateFestival } from "./calculations/festivalCalculations";
import { defaultFestival } from "./data/defaultFestival";
import type { FestivalInput, SavedFestivalScenario } from "./types/festival";
import { ScenarioComparison } from "./components/ScenarioComparison";
import { getSavedScenariosKey, USER_PROFILE_KEY } from "./constants/storage";
import type { UserProfile } from "./types/profile";
import { ProfileForm } from "./components/ProfileForm";
import { FestivalForm } from "./components/FestivalForm";
import { MetricsDashboard } from "./components/MetricsDashboard";
import { ScenarioActions } from "./components/ScenarioActions";

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const savedProfile = localStorage.getItem(USER_PROFILE_KEY);

    if (!savedProfile) {
      return null;
    }

    return JSON.parse(savedProfile);
  });
  const [festival, setFestival] =
    useState<FestivalInput>(defaultFestival);
  const [savedScenarios, setSavedScenarios] = useState<SavedFestivalScenario[]>(() => {
    if (!profile) {
      return [];
    }

    const saved = localStorage.getItem(
      getSavedScenariosKey(profile.email)
    );

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  });

  const result = calculateFestival(festival);

  useEffect(() => {
    if (!profile) {
      return;
    }

    localStorage.setItem(
      getSavedScenariosKey(profile.email),
      JSON.stringify(savedScenarios)
    );
  }, [savedScenarios, profile]);

  function getScenariosForEmail(email: string): SavedFestivalScenario[] {
    const saved = localStorage.getItem(getSavedScenariosKey(email));

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  }

  function saveScenario() {
    const scenario: SavedFestivalScenario = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ownerEmail: profile!.email,// TODO: handle no profile case
      input: festival,
      result,
    };

    setSavedScenarios([...savedScenarios, scenario]);
  }

  function deleteScenario(id: string) {
    setSavedScenarios(
      savedScenarios.filter((scenario) => scenario.id !== id)
    );
  }

  function loadScenario(id: string) {
    const scenario = savedScenarios.find(
      (scenario) => scenario.id === id
    );
    console.log("LOAD", scenario);

    if (!scenario) {
      return;
    }

    setFestival(scenario.input);
  }

  function saveProfile(profile: UserProfile) {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    setProfile(profile);
    setSavedScenarios(getScenariosForEmail(profile.email));
    setFestival(defaultFestival);
  }

  function clearProfile() {
    localStorage.removeItem(USER_PROFILE_KEY);
    setProfile(null);
    setSavedScenarios([]);
    setFestival(defaultFestival);
  }

  if (!profile) {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1>Festival planner</h1>
        </header>

        <main className="app-main">
          <ProfileForm onSave={saveProfile} />
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Festival planner</h1>
      </header>

      <main className="app-main">
        <div className="profile-bar">
          <p>
            Welcome, {profile.name} ({profile.email})
          </p>
          <button type="button" onClick={clearProfile}>
            Switch Profile
          </button>
        </div>

        <FestivalForm
          festival={festival}
          onFestivalChange={setFestival}
        />

        <MetricsDashboard result={result} />

        <button onClick={saveScenario}>
          Save Scenario
        </button>

        <h2>Saved Scenarios</h2>

        <ul>
          {savedScenarios.map((scenario) => (
            <li key={scenario.id}>
              {scenario.input.name} - Profit: £
              {scenario.result.profit.toLocaleString()}

              <button
                type="button"
                onClick={() => loadScenario(scenario.id)}
              >
                Use Scenario in Form
              </button>

              <button
                type="button"
                onClick={() => deleteScenario(scenario.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <ScenarioComparison scenarios={savedScenarios} />

        <ScenarioActions
          festival={festival}
          result={result}
          savedScenarios={savedScenarios}
          onSaveScenario={saveScenario}
        />
      </main>
    </div>
  );
}

export default App;