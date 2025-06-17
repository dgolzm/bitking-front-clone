import Navbar from "./Navbar";
import "./App.css";

function App({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default App;
