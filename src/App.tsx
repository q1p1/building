import React from "react";
import Header from "./components/Header";
import BuildingForm from "./components/BuildingForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <BuildingForm />
    </div>
  );
};

export default App;
