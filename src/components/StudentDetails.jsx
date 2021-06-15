import React, { useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { userContext } from '../utils/userContext';
import firebase from 'firebase/app';

var AWS = require("aws-sdk");

export const StudentDetails = ({idCourse}) => {

    const { id } = useParams();
    const idStudent = id;
    const { user } = useContext(userContext);
    const userID = user?.user?.uid;
    const [courseDetails,setCourseDetails] = useState([]);
    const [student,setStudent] = useState('');
    const [washes,setWashes] = useState([]);

    AWS.config.update({
        region: "us-east-1",
        // endpoint: 'endpoint',
        // accessKeyId: "aqui va el access key",
        // secretAccessKey: "aqui va el secretaccess key"
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    function readItem() {
        var params = {
            TableName: 'serverlessrepo-SmartCare-IoT-App-MyTable-17KRCF5LOCYQE',
            Key:{
                "id": {"S":"329174c0-cd60-11eb-b139-1d5a6b0f7911"},
                }
        };

        docClient.get(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
    }

    React.useEffect(()=>{
        if(!userID) return;
        if(!idCourse) return;
        var db = firebase.firestore(); 
        db.collection("users").doc(userID).collection('courses').doc(idCourse).get()
        .then((doc)=> {
            if (doc.exists) {
                setCourseDetails(doc.data());
            } else {
                console.log("No such document!");
            }
        })

        db.collection("users").doc(userID).collection('courses').doc(idCourse).collection('students').doc(idStudent).get()
        .then((doc)=> {
            if (doc.exists) {
                setStudent(doc.data());
            } else {
                console.log("No such document!");
            }
        })

        const unsubscribe = db.collection("users").doc(userID).collection('courses').doc(idCourse).collection('students').doc(idStudent).collection('handWashes').onSnapshot((querySnapshot) => {
            let washesTemp = []; 
            querySnapshot.forEach((doc) => {
                washesTemp.push(doc.data());
            });
            setWashes(washesTemp);
        });

        return () => {
            console.log('component destroyed');
            unsubscribe();
        }

    }, [userID,idCourse,idStudent]);

    return (
        <div className="courseDetails">
            <div className="courseDetails__header" id={courseDetails.id}>
                <p className="courseDetails__headerSchedule">{courseDetails.schedule}</p>
                <h3 className="courseDetails__headerTitle">{courseDetails.title}</h3>
                <p className="courseDetails__headerStudents">{courseDetails.students}</p>
            </div>
            <div className="studentDetails">
                <div className="studentDetails__name">
                    <img src={process.env.PUBLIC_URL+'/resources/backArrow.svg'} alt="" onClick={()=>window.history.back()}/>
                    <h3>{student.name}</h3>
                </div>
                <p>Hoy</p>
                {washes.length == 0 &&  
                    <div className="studentDetails__wash">
                        <p>No se ha lavado las manos aún</p>
                    </div> 
                }
                {washes.map((wash) =>{
                    return(
                        <div className="studentDetails__wash">
                            <p>Se lavó las manos a las:</p>
                            <p>{wash.hour}</p>
                        </div> 
                    )
                })}
            </div>
        </div>
    )
}
