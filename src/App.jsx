import Header from "./components/header";
import Player from "./components/header";
import data from "./data";

export function App(props) {
  const entryElements = data.map((entry) => {
    return <player key={entry.id} {...entry} />;
  });
}
return (
  <div className="App">
    <Header />
  </div>
);

// Log to console
console.log("Hello console");
