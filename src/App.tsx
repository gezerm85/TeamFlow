import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import CreateTeamPage from './pages/CreateTeamPage/CreateTeamPage'
import ListTeamsPage from './pages/ListTeamsPage/ListTeamsPage'
import DiagramChartPage from './pages/DiagramChartPage/DiagramChartPage'



function App() {
  return (
    <div className="min-h-screen  bg-[#fff] text-white">
    <Header />
    <div className='px-8'>
      <Routes>
        <Route path="/create" element={<CreateTeamPage />} />
        <Route path="/list" element={<ListTeamsPage />} />
        <Route path="/diagram" element={<DiagramChartPage />} />
        <Route path="*" element={<CreateTeamPage />} /> 
      </Routes>
    </div>
  </div>
  )
}

export default App
