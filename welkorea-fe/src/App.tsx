import './App.css'
import MapView from './components/MapView'

export const App:React.FC = () => {
  return (
    <>
      <div style={{width: '100vw', height: '100vh'}}>
        <MapView />
      </div>
    </>
  )
}

export default App
