'use client'
import React, { useState } from 'react'
import './addworkout.css'
import { toast } from 'react-toastify'

interface Workout {
    name: string;
    description: string;
    durationInMinutes: number;
    exercises: Exercise[];
    imageURL: string;
    imageFile: File | null;
}

interface Exercise {
    name: string;
    description: string;
    sets: number;
    reps: number;
    imageURL: string;
    imageFile: File | null;
}
const page = () => {
    const [workout, setWorkout] = useState<Workout>({
        name: '',
        description: '',
        durationInMinutes: 0,
        exercises: [],
        imageURL: '',
        imageFile: null
    })
    const [exercises, setExercises] = useState<Exercise>({
        name: '',
        description: '',
        sets: 0,
        reps: 0,
        imageURL: '',
        imageFile: null
    })

    const handleWorkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWorkout({
            ...workout,
            [e.target.name]: e.target.value
        })
    }

    const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExercises({
            ...exercises,
            [e.target.name]: e.target.value
        })
    }

    const addExerciseToWorkout = () => {
        console.log(exercises)

        if (exercises.name == '' || exercises.description == '' || exercises.sets == 0 || exercises.reps == 0 || exercises.imageFile == null) {
            toast.error('Please fill all the fields', {
                position: 'top-center',
            })
            return
        }
        setWorkout({
            ...workout,
            exercises: [...workout.exercises, exercises]
        })
        // setExercises({
        //     name: '',
        //     description: '',
        //     sets: 0,
        //     reps: 0,
        //     imageURL: '',
        //     imageFile: null
        // })
    }
    const deleteExerciseFromWorkout = (index: number) => { }
    const uploadingImage = async (image: File) => { }
    const checklogin = async () => { }
    const saveWorkout = async () => {
        console.log(workout)
    }
    return (
        <div className='formpage'>
            <h1 className='title'>Add Workout</h1>
            <input type='text'
                placeholder='Workout Name'
                name='Name'
                value={workout.name}
                onChange={handleWorkChange} />
            <textarea
                placeholder='Workout Description'
                name='description'
                value={workout.description}
                onChange={(e) => {
                    setWorkout({
                        ...workout,
                        description: e.target.value
                    })
                }}
                rows={5}
                cols={50}
            />

            <label htmlFor='durationInMinutes'>Duration in Minutes</label>
            <input
                type='number'
                placeholder='Workout Duration'
                name='durationInMinutes'
                value={workout.durationInMinutes}
                onChange={handleWorkChange}
            />
            <input
                type='file'
                placeholder='Workout Image'
                name='workoutImage'
                onChange={(e) =>
                    setWorkout({
                        ...workout,
                        imageFile: e.target.files![0]
                    })}
            />
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <h2 className='title'>Add Exercise to workout</h2>
                <input
                    type='text'
                    placeholder='Exercise Name'
                    name='name'
                    value={exercises.name}
                    onChange={handleExerciseChange}
                />

                <textarea
                    placeholder='Exercise Description'
                    name='description'
                    value={exercises.description}
                    onChange={(e) => {
                        setExercises({
                            ...exercises,
                            description: e.target.value
                        })
                    }}
                />
                <label htmlFor='sets'>Sets</label>
                <input
                    type='number'
                    placeholder='Sets'
                    name='sets'
                    value={exercises.sets}
                    onChange={handleExerciseChange}
                />

                <label htmlFor='reps'>Reps</label>
                <input type='number'
                    placeholder='Reps'
                    name='reps'
                    value={exercises.reps}
                    onChange={handleExerciseChange}
                />
                <input
                    type='file'
                    placeholder='Exercise Image'
                    name='exerciseImage'
                    onChange={(e) => {
                        setExercises({
                            ...exercises,
                            imageFile: e.target.files![0]
                        })
                    }}
                />

                <button onClick={(e) => {
                    addExerciseToWorkout(e)
                }}>Add Exercise</button>
            </div>
            <button onClick={(e) => {
                saveWorkout(e)
            }}></button>
        </div>
    )
}

export default page
