import {useStudents} from "../../../hooks/students/useStudents";
import {useQuery} from "react-query";
import StudentsTable from "./StudentsTable/StudentsTable";

const StudentsTableWrapper = () => {

    const {searchStudents} = useStudents()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["students"],
        () => searchStudents(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="students-wrapper">
            <StudentsTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default StudentsTableWrapper