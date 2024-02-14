import "./StudentCard.sass"
import {Student} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useOrder} from "../../hooks/orders/useOrder";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";

const StudentCard = ({ student, refetch }: {student:Student}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {is_draft, addStudentToOrder, deleteStudentFromOrder} = useOrder()

    const handleAddStudent = async (e) => {
        e.preventDefault()
        await addStudentToOrder(student)
        refetch()
    }

    const handleDeleteStudentFromOrder = async (e) => {
        e.preventDefault()
        await deleteStudentFromOrder(student)
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={student.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {student.name} </h3>

                </div>

                <div className="content-bottom">


                    <Link to={`/students/${student.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>

                    {is_authenticated && !is_moderator && location.pathname.includes("students") &&
                        <CustomButton onClick={handleAddStudent} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("orders") &&
                        <CustomButton onClick={handleDeleteStudentFromOrder} bg={variables.red}>Удалить</CustomButton>
                    }
                    
                </div>

            </div>

        </div>
    )
}

export default StudentCard;