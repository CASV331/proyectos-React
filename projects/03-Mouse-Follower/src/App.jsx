import { useEffect, useState } from "react"

const FollowMouse = () => {
  const [ enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 0, y:0})

  // Pointer move
  useEffect(() => {

    const handleMove = (e) => {
      const {clientX, clientY} = e
      console.log('handleMove', {clientX, clientY})
      setPosition({x: clientX, y: clientY})
    }
    if(enabled){
    window.addEventListener('pointermove', handleMove)
    }
    // Clean up 
    // Cuando el componente se desmonta
    // Cuando cambian las dependencias, antes de ejecutar
    // el efecto de nuevo
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // change cursor
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled);

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])
  return (
    <>
    <div style={{
      position: 'absolute',
      backgroundColor: '#09f',
      borderRadius: '50%',
      opacity: 0.8,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
      transform: `translate(${position.x}px, ${position.y}px)`
    }}/>
    <button onClick={() => setEnabled(!enabled)}>
      {enabled ? 'Desactivar' : 'Activar'} seguir puntero 
    </button>
    </>
  )
}
function App() {
  return (
    <main>
      <FollowMouse/>
    </main>
  )
}

export default App
