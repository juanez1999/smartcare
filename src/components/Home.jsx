import React, {useState, useContext } from 'react';
import { userContext } from '../utils/userContext';
import firebase from 'firebase/app';
import { Course } from './Course';

export const Home = () => {
    const { user } = useContext(userContext);
    const [name,setName] = useState('');
    const [courses,setCourses] = useState([]);

    const userID = user?.user?.uid;

    React.useEffect(() =>{
        if(!userID) return;
        const db = firebase.firestore();
        const docRef = db.collection("users").doc(userID);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setName(doc.data().name);
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });   

        const unsubscribe = db.collection("users").doc(userID).collection('courses').onSnapshot((querySnapshot) => {
            let coursesTemp = []; 
            querySnapshot.forEach((doc) => {
                coursesTemp.push(doc.data());
            });
            setCourses(coursesTemp);
        });

        return () => {
            console.log('component destroyed');
            unsubscribe();
        }
    },[userID])

    return (
        <div className='home'>
            <div className="home__welcome">
                <h1>Bienvenida, {name}</h1>
                <p>Visualiza tus cursos de hoy y el estado de cada estudiante.</p>
            </div>
            <div className="home__courses">
                <h2>Tus cursos</h2>
                {courses.map((course) =>{
                    return(
                        <Course key={course.id} title={course.title} idCourse={course.id} schedule={course.schedule} students={course.students}/>
                    )
                })}
            </div>
        </div>
    )
}
