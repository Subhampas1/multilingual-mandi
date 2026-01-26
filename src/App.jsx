import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LanguageSelection from './pages/LanguageSelection';
import RoleSelection from './pages/RoleSelection';
import VendorDashboard from './pages/VendorDashboard';
import MarketBoard from './pages/MarketBoard';
import NegotiationRoom from './pages/NegotiationRoom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LanguageSelection />} />
                <Route path="/role-selection" element={<RoleSelection />} />
                <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                <Route path="/market-board" element={<MarketBoard />} />
                <Route path="/negotiate" element={<NegotiationRoom />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
