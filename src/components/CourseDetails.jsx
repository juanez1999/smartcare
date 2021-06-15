import React, { useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { userContext } from '../utils/userContext';
import firebase from 'firebase/app';
import { StudentCard } from './StudentCard';

export const CourseDetails = ({setIdCourse}) => {

    const { id } = useParams();
    const idCourse = id;
    const { user } = useContext(userContext);
    const userID = user?.user?.uid;
    const [courseDetails,setCourseDetails] = useState([]);
    const [students,setStudents] = useState([]);

    React.useEffect(()=>{
        if(!userID) return;
        if(!idCourse) return;
        setIdCourse(idCourse);
        var db = firebase.firestore(); 
        db.collection("users").doc(userID).collection('courses').doc(idCourse).get()
        .then((doc)=> {
            if (doc.exists) {
                setCourseDetails(doc.data());
            } else {
                console.log("No such document!");
            }
        })

        const unsubscribe = db.collection("users").doc(userID).collection('courses').doc(idCourse).collection('students').onSnapshot((querySnapshot) => {
            let studentsTemp = []; 
            querySnapshot.forEach((doc) => {
                studentsTemp.push(doc.data());
            });
            setStudents(studentsTemp);
        });

        return () => {
            console.log('component destroyed');
            unsubscribe();
        }
    }, [userID,idCourse,setIdCourse]);

    return (
        <div className="courseDetails">
            <div className="courseDetails__header" id={courseDetails.id}>
                <p className="courseDetails__headerSchedule">{courseDetails.schedule}</p>
                <h3 className="courseDetails__headerTitle">{courseDetails.title}</h3>
                <p className="courseDetails__headerStudents">{courseDetails.students}</p>
            </div>
            <div className="courseDetails__washed">
                <h2>Lavado de manos</h2>
                {students.map((student) =>{
                    return(
                        <StudentCard nameStudent={student.name} idStudent={student.id} key={student.id}/>
                    )
                })}
            </div>
        </div>
    )
}
