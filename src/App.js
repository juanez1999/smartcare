import { Login } from './components/Login';
import { Home } from './components/Home';
import { CourseDetails } from './components/CourseDetails';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React, {useState} from 'react';
import { userContext } from './utils/userContext';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { StudentDetails } from './components/StudentDetails';

var firebaseConfig = {
  apiKey: "AIzaSyDxh6gfM-1H1NvO9OnU8csCtFj9hswNrN0",
  authDomain: "smartcareiot-9f3f1.firebaseapp.com",
  projectId: "smartcareiot-9f3f1",
  storageBucket: "smartcareiot-9f3f1.appspot.com",
  messagingSenderId: "133344616870",
  appId: "1:133344616870:web:f531564e5832a70d5fef67",
  measurementId: "G-EM6GZ9R1KR"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
function App() {
  const [user,setUser] = useState('');
  const [idCourse,setIdCourse] = useState('');
  
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user, error) => {
      if(user) setUser({ user });
    })
  }, []);

  return (
    <div className="App">
        <userContext.Provider value={{user}}>
          <Router>
            <Route path="/" exact render={()=>{
                  return <Login setUser={setUser}/> 
            }}/>
            <Route path="/home" render={()=>{
                  return <Home/> 
            }}/>
            <Route exact path="/courseDetails/:id" render={()=>{
                  return <CourseDetails setIdCourse={setIdCourse}/> 
            }}/>
            <Route exact path="/studentDetails/:id" render={()=>{
                  return <StudentDetails idCourse={idCourse} />
            }}/>
          </Router>
        </userContext.Provider>
    </div>
  );
}

export default App;
