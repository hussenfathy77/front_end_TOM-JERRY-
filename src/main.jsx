import React from 'react';import {createRoot} from 'react-dom/client';import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Login from './Login.jsx';import Dashboard from './Dashboard.jsx';import UserManagement from './UserManagement.jsx';import ChildrenManagement from './ChildrenManagement.jsx';import './index.css';
createRoot(document.getElementById('root')).render(<BrowserRouter><Routes>
<Route path="/login" element={<Login/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/dashboard-empty" element={<Dashboard empty/>}/><Route path="/user-management" element={<UserManagement/>}/><Route path="/children-management" element={<ChildrenManagement/>}/><Route path="*" element={<Navigate to="/login"/>}/></Routes></BrowserRouter>);
