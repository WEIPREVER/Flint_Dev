import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App';
import "./index.css";
import Home from "./components/Home";
import BankAccounts from "./components/AccountComp/BankAccounts";
import ExpenseReport from "./components/ExpenseReport";
import Transactions from "./components/Transactions";
import Deposit from "./components/AccountComp/Deposit";
import CreateAccount from "./components/AccountComp/CreateAccount";
import Withdraw from "./components/AccountComp/Withdraw";
import Transfer from "./components/AccountComp/Transfer";
import NavigationBar from "./components/NavigationBar";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import withNavigation from "./components/WithNavigation";

import Login from "./components/Login/Login";
import Error from "./components/Error";
import withParams from "./components/WithParams";
import AuthenticationService from "./services/AuthenticationService";



const root = ReactDOM.createRoot(document.getElementById('root'));


let LoginWithNavigation = withNavigation(Login);
let WelcomeWithParams = withParams(Welcome);
root.render(
<React.StrictMode>
    <BrowserRouter>
      <div style={{ backgroundImage: 'linear-gradient(#ff8a00, #e52e71)', position: 'relative', minHeight: '100%' }}>
        <NavigationBar />



        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bankaccount" element={<AuthenticatedRoute><BankAccounts /></AuthenticatedRoute>} />
        <Route path="/expenseReport" element={<AuthenticatedRoute><ExpenseReport /></AuthenticatedRoute>} />
        <Route path="/transactions" element={<AuthenticatedRoute><Transactions /></AuthenticatedRoute>} />
        <Route path="/deposit" element={<AuthenticatedRoute><Deposit /></AuthenticatedRoute>} />
        <Route path="/newaccount" element={<CreateAccount />} />
        <Route path="/withdraw" element={<AuthenticatedRoute><Withdraw /></AuthenticatedRoute>} />
        <Route path="/transfer" element={<AuthenticatedRoute><Transfer /></AuthenticatedRoute>} />
        <Route path="/logout"  element={<Logout/>} />
        <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeWithParams /></AuthenticatedRoute>} />
        <Route path="/login" element={<LoginWithNavigation />} />
        <Route path="*" element={<Error />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);


