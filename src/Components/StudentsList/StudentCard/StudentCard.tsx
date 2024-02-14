import "./StudentCard.sass"
import {Student} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const StudentCard = ({ student, isMock }: {student:Student, isMock:boolean }) => {

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : student.image} />
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {student.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/students/${student.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default StudentCard;