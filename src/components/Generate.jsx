import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier';
import Button from './Button';

const Header = (props) => {
    const { children, index, title, description } = props;
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-2'>
                <p className='text-3xl sm:text-4xl md:text-5xl
                font-semibold text-slate-400'>
                    {index}
                </p>
                <h4 className='text-lg sm:text-2xl md:text-3xl'>{title}</h4>
            </div>
            <p
                className='text-sm sm:text-base mx-auto'>{description}</p>
        </div>
    )
}

const Generate = (props) => {
    const { muscles, setMuscles, poison, setPoison, goals, setGoals, updateWorkout } = props

    const [showModal, setShowModal] = useState(false)

    function toggleModal() {
        setShowModal(prev => !prev)
    }

    function updateMuscles(muscleGroup) {
        if (muscles.includes(muscleGroup)) {
            setMuscles(muscles.filter(val => val !==
                muscleGroup
            ))
            return;
        }

        if (muscles.length >= 3) {
            return
        }

        if (poison !== 'individual') {
            setMuscles([muscleGroup])
            setShowModal(false)
            return
        }

        setMuscles([...muscles, muscleGroup])

        if (muscles.length === 2) {
            setShowModal(false)
        }

    }


    return (
        <SectionWrapper id={'generate'} header={"Generate your workout"}
            title={["It's", "Huge", "o'clock"]}>
            <Header
                index={'01'}
                title={"Pick your poison"}
                description={'Select the workout you wish to endure'} />
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                {
                    Object.keys(WORKOUTS).map((type, idx) => {
                        return (
                            <button
                                onClick={() => {
                                    setMuscles([])
                                    setPoison(type);
                                }}
                                className={'bg-slate-950 border border-blue-400 py-4 rounded-lg hover:border-blue-600 duration-200 ' +
                                    (type === poison ? "border-blue-600" : "border-blue-400")
                                } key={idx}
                            >
                                <p className='capitalize'>{type.replaceAll("_", " ")}</p>
                            </button>
                        )
                    })
                }
            </div>
            <Header
                index={'02'}
                title={"Lock on targets"}
                description={'Select the muscles you wish to annihilate'} />
            <div className='bg-slate-950 border flex flex-col border-blue-400 border-solid rounded-lg'>
                <button onClick={toggleModal} className='flex flex-row p-3 items-center justify-center relative'>
                    <p className='capitalize'>{muscles.length === 0 ?'Select muscle group' : muscles.join (' ')}</p>
                    <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
                </button>
                {
                    showModal &&
                    ( <div className='flex flex-col px-3 pb-3'>
                        {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
                            return (
                                <button onClick={() => {
                                    updateMuscles(muscleGroup)
                                }} key={muscleGroupIndex} className={'hover:text-blue-400 duration-200 ' + (muscles.includes(muscleGroup) ? ' text-blue-400' : ' ')}>
                                    <p className='uppercase'>{muscleGroup.replaceAll('_', ' ')}</p>
                                </button>
                            )
                        })}
                    </div>)
                }
            </div>
            <Header
                index={'03'}
                title={"Become Juggernaut"}
                description={'Select your ultimate objective.'} />
            <div className='grid grid-cols-3 gap-4'>
                {
                    Object.keys(SCHEMES).map((scheme, idx) => {
                        return (
                            <button
                                onClick={() => {
                                    setGoals(scheme);
                                }}
                                className={'bg-slate-950 border border-blue-400 py-4 rounded-lg hover:border-blue-600 duration-200 ' +
                                    (scheme === goals ? "border-blue-600" : "border-blue-400")
                                } key={idx}
                            >
                                <p className='capitalize'>{scheme.replaceAll("_", " ")}</p>
                            </button>
                        )
                    })
                }
            </div>
            <Button func={updateWorkout} text={"Formulate"} />
        </SectionWrapper>
    )
}

export default Generate
