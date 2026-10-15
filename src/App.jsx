import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import InvoicePage from "./pages/InvoicePage";
import ExpensesPage from "./pages/ExpensesPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<InvoicePage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
