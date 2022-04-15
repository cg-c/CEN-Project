import React from 'react';
import { Button } from 'react-bootstrap';
import { useUserAuth } from '../context/userAuthContext';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from './styles/PageHeader.styled';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc} from 'firebase/firestore';
import FileUpload from './uploadFile'

const Course = () => {
    const {user, logOut} = useUserAuth();
    const navigate = useNavigate();

    const handleLogOut = async() => {
        try {
            await logOut();
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const handleNavVideo = async() => {
        navigate("/video");
    }

    function greetUser(){
        const docRef = doc(db, 'User', user.email);
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
            document.getElementById('Greetings').innerHTML = ("Hello " + docSnap.data().fullName); 
          } else {
            console.log("No such document!");
        }});
    }

    const handleCreateClass = async() => {
        navigate("/createCourse");
    }

    const handleAddClass = async() => {
        navigate("/joinCourse");
    }

    greetUser();

    return (
        <>
            <PageHeader id = "Greetings" style={{fontSize: '50px'}}>
                Hello 
            </PageHeader>

            <div>
                <Button onClick={handleLogOut}>
                    Log Out
                </Button>
            </div>

            <div>
                <Button onClick={handleCreateClass}>
                    Create Course
                </Button>
            </div>

            <div>
                <Button onClick={handleAddClass}>
                    Join Course
                </Button>
            </div>

            <Button onClick={handleNavVideo}>
                Launch Video
            </Button>
            <FileUpload />
        </>
    )

}

export default Course;