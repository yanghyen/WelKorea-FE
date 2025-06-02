import React from 'react'
import SearchBar from '../components/SearchBar'
import CategoryKeyWord from '../components/CategoryKeyWord'
import MapView from '../components/MapView'
import BottomPanel from '../components/BottomPanel'

export default function MainPage() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SearchBar />
      <CategoryKeyWord />
      <MapView />
      <BottomPanel />
    </div>
  )
}
