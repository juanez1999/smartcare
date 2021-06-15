import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import { useHistory } from "react-router-dom";

export const Login = ({setUser}) => {
    const classes = useStyles();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    let history = useHistory();

    const sendData = (e)=>{
        e.preventDefault();

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            setUser(user);
            history.push('/home');
            
        }).catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
    }
    return(
        <div className="login">
            <img className="login__bg" src={process.env.PUBLIC_URL+'/resources/imgLogin.png'} alt="" />
            <img className="login__logo" src={process.env.PUBLIC_URL+'/resources/logo.svg'} alt="" />
            <form className="login__form" action="" onSubmit={sendData}>
                <TextField 
                    id="standard-basic" 
                    label="Correo electronico" 
                    classes={{root: classes.root}} 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField 
                    id="standard-password-input"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    classes={{root: classes.root}} 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit" classes={{containedPrimary:classes.containedBtn}}>
                    Iniciar sesión
                </Button>
            </form>
        </div>
    )
}

const useStyles = makeStyles(() =>
    createStyles({
        root:{
            width:'100%',
            color: '#1C3496',
            margin: '20px 0px',
        },
        focusedLabel:{
            color: '#1C3496',
        },
        containedBtn:{
            backgroundColor:'#7250FD',
            margin: '20px 0px',
            '&:hover': {
                backgroundColor: '#6039FF',
            },
        }
    })
);