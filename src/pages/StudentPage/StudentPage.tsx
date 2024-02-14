import "./StudentPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useStudent} from "../../hooks/students/useStudent";

const StudentPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {student, fetchStudent, setStudent} = useStudent()
    
    useEffect(() => {
        id && fetchStudent(id)
        return () => {
            setStudent(undefined)
        }
    }, [])

    if (student == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={student.image}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{student.name}</h2>

                    <br />

                    <span>Факультет: { student.faculty }</span>

                    <br />

                    <span>Группа: { student.group }</span>


                </div>
                
            </div>

        </div>
    )
}

export default StudentPage;