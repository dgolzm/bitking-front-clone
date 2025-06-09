// src/common/App.jsx
import './App.css';

function App({ children }) {
  return (
    <div className="app-layout">
      {/* Aquí podrías incluir <Navbar /> en el futuro */}
      {children}
    </div>
  );
}

export default App;
