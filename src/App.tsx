import { useEffect, useState } from "react";

import { calculateFestival } from "./calculations/festivalCalculations";
import { defaultFestival } from "./data/defaultFestival";
import type { FestivalInput, SavedFestivalScenario } from "./types/festival";
import { ScenarioComparison } from "./components/ScenarioComparison";
import { exportJson } from "./utils/exportJson";
import { exportCsv } from "./utils/exportCsv";
import { USER_PROFILE_KEY } from "./constants/storage";
import type { UserProfile } from "./types/profile";
import { ProfileForm } from "./components/ProfileForm";
import { FestivalForm } from "./components/FestivalForm";
import { MetricsDashboard } from "./components/MetricsDashboard";

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
    return <ProfileForm onSave={saveProfile} />;
  }

  return (
    <div>
      <div>
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

      <button
        onClick={() =>
          exportJson("festival-forecast.json", {
            input: festival,
            result,
          })
        }
      >
        Export Current Forecast as JSON
      </button>

      <button
        type="button"
        onClick={() =>
          exportCsv("festival-forecast.csv", [
            {
              name: festival.name,
              weather: festival.weather,
              energySource: festival.energySource,
              attendance: result.adjustedAttendance,
              revenue: result.totalRevenue,
              capex: result.capex,
              opex: result.opex,
              profit: result.profit,
              energyUseKwh: result.energyUseKwh,
              requiredToilets: result.requiredToilets,
              requiredStaff: result.requiredStaff,
              requiredSecurity: result.requiredSecurity,
            },
          ])
        }
      >
        Export Current Forecast as CSV
      </button>

      <button
        type="button"
        onClick={() =>
          exportJson("saved-festival-scenarios.json", savedScenarios)
        }
      >
        Export Saved Scenarios as JSON
      </button>

      <button
        type="button"
        onClick={() =>
          exportCsv(
            "saved-festival-scenarios.csv",
            savedScenarios.map((scenario) => ({
              name: scenario.input.name,
              weather: scenario.input.weather,
              energySource: scenario.input.energySource,
              attendance: scenario.result.adjustedAttendance,
              revenue: scenario.result.totalRevenue,
              capex: scenario.result.capex,
              opex: scenario.result.opex,
              profit: scenario.result.profit,
              energyUseKwh: scenario.result.energyUseKwh,
              requiredToilets: scenario.result.requiredToilets,
              requiredStaff: scenario.result.requiredStaff,
              requiredSecurity: scenario.result.requiredSecurity,
            }))
          )
        }
      >
        Export Saved Scenarios as CSV
      </button>
    </div>
  );
}

export default App;