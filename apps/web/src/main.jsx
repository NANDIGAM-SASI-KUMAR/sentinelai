import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Shell from './components/Shell.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LiveMonitor from './pages/LiveMonitor.jsx';
import Cameras from './pages/Cameras.jsx';
import Agents from './pages/Agents.jsx';
import Alerts from './pages/Alerts.jsx';
import Incidents from './pages/Incidents.jsx';
import Analytics from './pages/Analytics.jsx';
import Reports from './pages/Reports.jsx';
import Team from './pages/Team.jsx';
import Audit from './pages/Audit.jsx';
import Integrations from './pages/Integrations.jsx';
import Billing from './pages/Billing.jsx';
import Settings from './pages/Settings.jsx';

const Private = ({ children }) => localStorage.getItem('token') ? children : <Navigate to="/login" />;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<Private><Shell /></Private>}>
        <Route index element={<Dashboard />} />
        <Route path="live" element={<LiveMonitor />} />
        <Route path="cameras" element={<Cameras />} />
        <Route path="agents" element={<Agents />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="team" element={<Team />} />
        <Route path="audit" element={<Audit />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="billing" element={<Billing />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
