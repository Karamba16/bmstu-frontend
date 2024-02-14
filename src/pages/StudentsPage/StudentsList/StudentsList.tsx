import "./StudentsList.sass"
import StudentCard from "../../../components/StudentCard/StudentCard";
import {useStudents} from "../../../hooks/students/useStudents";
import {useQuery} from "react-query";
import StudentsFilters from "../StudentsFilters/StudentsFilters";

const StudentsList = () => {

    const {searchStudents} = useStudents()

    const { isLoading, data, refetch } = useQuery(
        ["students"],
        () => searchStudents(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(student  => (
        <StudentCard student={student} key={student.id} refetch={refetch}/>
    ))

    return (
        <div className="students-wrapper">
            <div className="students-list-wrapper">

                <StudentsFilters refetch={refetch}/>

                <div className="students-list">
                    { cards }
                </div>

            </div>
        </div>
    )
}

export default StudentsList;