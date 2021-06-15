import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles, createStyles } from '@material-ui/core';

export const StudentCard = ({nameStudent,idStudent}) => {

    let history = useHistory();
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(1);

    const goToStudentDetails = (idStudent) => {
        history.push('/studentDetails/'+idStudent);
    }

    function getSteps() {
        return ['Primer lavado', 'Segundo lavado', 'Tercer lavado','Cuarto lavado','Quinto lavado'];
    }

    const steps = getSteps();

    return (
        <div className="studentCard" onClick={()=>goToStudentDetails(idStudent)}>
            <h4>{nameStudent}</h4>
            <div className="studentCard__timeline">
                <Stepper activeStep={activeStep} alternativeLabel classes={{root: classes.root}}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </div>
    )
}

const useStyles = makeStyles(() =>
    createStyles({
        root:{
            padding: '0px',
        },
    })
);
