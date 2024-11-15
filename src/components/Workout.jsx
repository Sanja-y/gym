import React from 'react'
import SectionWrapper from './SectionWrapper'
import ExerciseCard from './ExerciseCard'

const Workout = (props) => {

  const { workout } = props

  return (
    <SectionWrapper id={'workout'} header={"welcome to"} title={['The', 'Danger', 'Zone']}>
      <div className='flex flex-col gap-4'>
        {
          workout.map((exercise, idx)=> {
            return(
              <ExerciseCard exercise={exercise} idx={idx} key={idx} />
            )
          })
        }
      </div>
    </SectionWrapper>
  )
}

export default Workout
