import { useState } from 'react'
import Hero from './components/Hero'
import Workout from './components/Workout'
import Generate from './components/Generate'
import { generateWorkout } from './utils/functions'

function App() {
  const [workout, setWorkout] = useState(null)

  const [poison, setPoison] = useState('individual')
  const [muscles, setMuscles] = useState([])
  const [goals, setGoals] = useState('strength_power')

  function updateWorkout() {
    if(muscles.length < 1) {
      return
    }

    let newWorkout = generateWorkout({poison, muscles, goals})
    setWorkout(newWorkout)
    console.log(workout)
    window.location.href = '#workout'
  }


  return (
    <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white sm:text-base'>
      <Hero />
      <Generate
        poison={poison}
        setPoison={setPoison}
        muscles={muscles}
        setMuscles={setMuscles}
        goals={goals}
        setGoals={setGoals} 
        updateWorkout={updateWorkout}/>
      {
        workout && (
          <Workout workout={workout} />
        )
      }
    </main>
  )
}

export default App
