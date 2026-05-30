import { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Module from './pages/Module/Module';

function App() {
  const [page, setPage] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);

  function navigate(target, data) {
    setPage(target);
    if (data) setSelectedModule(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app">
      <Header onNavigate={navigate} />
      <main>
        {page === 'home' && (
          <Home onEnterModule={(mod) => navigate('module', mod)} />
        )}
        {page === 'module' && (
          <Module module={selectedModule} onBack={() => navigate('home')} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
