import React from 'react'
import {Route, Routes} from 'react-router-dom'
import MainScreen from './component/MainScreen'

export default function App() {
  return (
    <Routes>
      <Route path="/:room" element={<MainScreen />} />
    </Routes>
  )
}

