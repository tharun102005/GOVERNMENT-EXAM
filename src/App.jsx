import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ExamsPage from './pages/ExamsPage';
import PracticePage from './pages/PracticePage';
import MockTestPage from './pages/MockTestPage';
import TestResults from './pages/TestResults';
import AnalyticsPage from './pages/AnalyticsPage';
import AIHubPage from './pages/AIHubPage';
import PYQPage from './pages/PYQPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/exams"      element={<ExamsPage />} />
          <Route path="/practice"   element={<PracticePage />} />
          <Route path="/mock"       element={<MockTestPage />} />
          <Route path="/pyq"        element={<PYQPage />} />
          <Route path="/results"    element={<TestResults />} />
          <Route path="/analytics"  element={<AnalyticsPage />} />
          <Route path="/ai"         element={<AIHubPage />} />
          <Route path="/profile"    element={<ProfilePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/admin"      element={<AdminPage />} />
          <Route path="/login"      element={<LoginPage />} />
          <Route path="/settings"   element={<SettingsPage />} />
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


