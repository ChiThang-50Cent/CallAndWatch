import React from 'react'
import {Route, Routes} from 'react-router-dom'
import MainScreen from './component/MainScreen'
import Welcome from './component/Welcome'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/:room" element={<MainScreen />} />
    </Routes>
  )
}

