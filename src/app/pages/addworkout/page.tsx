"use client";
import React, { useState } from "react";
import "./addworkout.css";
import { toast } from "react-toastify";

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
        name: "",
        description: "",
        durationInMinutes: 0,
        exercises: [],
        imageURL: "",
        imageFile: null,
    });
    const [exercises, setExercises] = useState<Exercise>({
        name: "",
        description: "",
        sets: 0,
        reps: 0,
        imageURL: "",
        imageFile: null,
    });

    const handleWorkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWorkout({
            ...workout,
            [e.target.name]: e.target.value,
        });
    };

    const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExercises({
            ...exercises,
            [e.target.name]: e.target.value,
        });
    };

    const addExerciseToWorkout = () => {
        console.log(exercises);

        if (exercises.name == "" || exercises.description == "" || exercises.sets == 0 || exercises.reps == 0 || exercises.imageFile == null) {
            toast.error("Please fill all the fields", {
                position: "top-center",
            });
            return;
        }
        setWorkout({
            ...workout,
            exercises: [...workout.exercises, exercises],
        });
        // setExercises({
        //     name: '',
        //     description: '',
        //     sets: 0,
        //     reps: 0,
        //     imageURL: '',
        //     imageFile: null
        // })
    };
    const deleteExerciseFromWorkout = (index: number) => {
        setWorkout({
            ...workout,
            exercises: workout.exercises.filter((exercises, i) => i !== index),
        });
    };
    const uploadingImage = async (image: File) => {
        const formData = new FormData();
        formData.append("myimage", image);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/image-upload/uploadimage`, {
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Image uploaded successfully:", data);
            return data.imageURL;
        } else {
            console.error("Failed to upload the image.");
            return null;
        }
    };
    const checklogin = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/admin/checklogin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (response.ok) {
            console.log("Admin is Authenticated");
        } else {
            console.log("Admin is not authenticated");
            window.location.href = "/adminauth/login";
        }
    };
    const saveWorkout = async () => {
        await checklogin();
        console.log(workout);

        if (workout.name == "" || workout.description == "" || workout.durationInMinutes == 0 || workout.imageFile == null || workout.exercises.length == 0) {
            toast.error("Please fill all the fields", {
                position: "top-center",
            });
            return;
        }

        if (workout.imageFile) {
            const imageURL = await uploadingImage(workout.imageFile);
            if (imageURL) {
                setWorkout({
                    ...workout,
                    imageURL,
                });
            }
        }

        for (let i = 0; i < workout.exercises.length; i++) {
            let temping = workout.exercises[i].imageFile;
            if (temping) {
                let imgURL = await uploadingImage(temping);
                workout.exercises[i].imageURL = imgURL;
            }
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(workout),
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Workout created successfully", data);
            toast.success("Workout created successfully", {
                position: "top-center",
            });
        } else {
            console.log("Workout creation failed", response.statusText);
            toast.error("Workout creation failed", {
                position: "top-center",
            });
        }
    };
    return (
        <div className="formpage">
            <h1 className="title">Add Workout</h1>
            <input type="text" placeholder="Workout Name" name="name" value={workout.name} onChange={(e) => setWorkout({ ...workout, name: e.target.value })} />
            <textarea
                placeholder="Workout Description"
                name="description"
                value={workout.description}
                onChange={(e) => {
                    setWorkout({
                        ...workout,
                        description: e.target.value,
                    });
                }}
                rows={5}
                cols={50}
            />

            <label htmlFor="durationInMinutes">Duration in Minutes</label>
            <input type="number" placeholder="Workout Duration" name="durationInMinutes" value={workout.durationInMinutes} onChange={handleWorkChange} />
            <input
                type="file"
                placeholder="Workout Image"
                name="workoutImage"
                onChange={(e) =>
                    setWorkout({
                        ...workout,
                        imageFile: e.target.files![0],
                    })
                }
            />
            <h2 className="title">Add Exercise to workout</h2>
            <input type="text" placeholder="Exercise Name" name="name" value={exercises.name} onChange={handleExerciseChange} />

            <textarea
                placeholder="Exercise Description"
                name="description"
                value={exercises.description}
                onChange={(e) => {
                    setExercises({
                        ...exercises,
                        description: e.target.value,
                    });
                }}
            />
            <label htmlFor="sets">Sets</label>
            <input type="number" placeholder="Sets" name="sets" value={exercises.sets} onChange={handleExerciseChange} />

            <label htmlFor="reps">Reps</label>
            <input type="number" placeholder="Reps" name="reps" value={exercises.reps} onChange={handleExerciseChange} />
            <input
                type="file"
                placeholder="Exercise Image"
                name="exerciseImage"
                onChange={(e) => {
                    setExercises({
                        ...exercises,
                        imageFile: e.target.files![0],
                    });
                }}
            />

            <button onClick={(e) => setExercises(e)}>
                Add Exercise
            </button>


            <div className="exercises">
                <h1 className="title">Exercises</h1>
                {workout.exercises.map((exercises, index) => (
                    <div className="exercises" key={index}>
                        <h2>{exercises.name}</h2>
                        <p>{exercises.description}</p>
                        <p>{exercises.sets}</p>
                        <p>{exercises.reps}</p>

                        <img src={exercises.imageFile ? URL.createObjectURL(exercises.imageFile) : exercises.imageURL} alt="" />

                        <button onClick={() => deleteExerciseFromWorkout(index)}>Delete</button>
                    </div>
                ))}
            </div>
            <button onClick={(e) => setWorkout(e)}>Save</button>
        </div >
    );
};

export default page;
