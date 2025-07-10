// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from './components/LandingPage';
// import FormPage from './components/FormPage';
// import ResultsPage from './components/ResultsPage';
// import { SkillProvider } from './context/SkillContext';
// import './index.css';

// function App() {
//   return (
//     <SkillProvider>
//       <Router>
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/form" element={<FormPage />} />
//             <Route path="/results" element={<ResultsPage />} />
//           </Routes>
//         </div>
//       </Router>
//     </SkillProvider>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FormPage from './components/FormPage';
import ResultsPage from './components/ResultsPage';
import { SkillProvider } from './context/SkillContext';
import './index.css';

function App() {
  return (
    <SkillProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </div>
      </Router>
    </SkillProvider>
  );
}

export default App;