import React from 'react';
import { useHistory } from "react-router-dom";

export const Course = ({title,idCourse,schedule,students}) => {

    let history = useHistory();

    const goToLessonDetails = (idCourse) => {
        history.push('/courseDetails/'+idCourse);
    }

    return ( 
        <div className="course" onClick={() => goToLessonDetails(idCourse)}>    
            <p className="course__schedule">{schedule}</p>
            <h3 className="course__title">{title}</h3>
            <p className="course__students">{students}</p>
        </div>
    )
}
