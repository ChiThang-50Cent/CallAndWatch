import React from 'react'
import {Route, Routes} from 'react-router-dom'
import CallScreen from './component/CallScreen'


export default function App() {
  return (
    <Routes>
      <Route path="/:room" element={<CallScreen />} />
    </Routes>
  )
}

