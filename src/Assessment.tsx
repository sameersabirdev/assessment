import "./Assessment.css";
import { AppProvider, useAppContext } from "./assessment/AppContext";
import Dashboard from "./assessment/components/Dashboard";
import Nav from "./assessment/components/Nav";
import RegistrationForm from "./assessment/components/RegistrationForm";

function AppContextConsumer() {
  const { activeTab } = useAppContext();
  return activeTab === "dashboard" ? <Dashboard /> : <RegistrationForm />;
}

export default function AssessmentApp() {
  return (
    <AppProvider>
      <div className="app">
        <Nav />
        <AppContextConsumer />
      </div>
    </AppProvider>
  );
}
