import "./App.css";
import HomePage from "./components/Home/HomePage";
import NavBar from "./components/Navbar/NavBar";
function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;
