import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {Link, useNavigate} from "react-router-dom";
import StudentsFilters from "../../StudentsFilters/StudentsFilters";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {variables} from "../../../../utils/consts";
import React from "react";
import {useStudents} from "../../../../hooks/students/useStudents";

const StudentsTable = ({isLoading, data, isSuccess, refetch}) => {

    const {deleteStudent} = useStudents()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "ФИО",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Группа",
            accessor: "group",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Действие",
            accessor: "edit_button",
            Cell: ({ cell }) => (
                <Link to={`/students/${cell.row.values.id}/edit`}>
                    <CustomButton bg={variables.primary}>Редактировать</CustomButton>
                </Link>
            )
        },
        {
            Header: "Действие",
            accessor: "delete_button",
            Cell: ({ cell }) => (
                <CustomButton onClick={() => handleDeleteStudent(cell.row.values.id)} bg={variables.red}>Удалить</CustomButton>
            )
        }
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openCityPage = (student_id) => {
        navigate(`/students/${student_id}/`)
    }

    const handleDeleteStudent = async (student_id) => {
        await deleteStudent(student_id)
        refetch()
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openCityPage}
            >
                <StudentsFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default StudentsTable