import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout';
import TicketList from './components/TicketList';
import CreateTicket from './components/CreateTicket';
import EditTicket from './components/EditTicket';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TicketList />} />
          <Route path="/create" element={<CreateTicket />} />
          <Route path="/edit/:id" element={<EditTicket />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;