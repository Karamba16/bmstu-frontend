import "./StudentsList.sass"
import SearchBar from "../SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import StudentCard from "./StudentCard/StudentCard";
import {iStudentsMock, requestTime} from "../../Consts";
import {Student} from "../../Types";

const StudentsList = () => {

    const [students, setStudents] = useState<Student[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchStudents = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8000/api/students/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const students = raw["students"]

            setStudents(students)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true)
        setStudents(iStudentsMock.filter(student => student.name.toLowerCase().includes(query.toLowerCase())))

    }

    useEffect(() => {
        searchStudents()
    }, [])

    const cards = students.map(student  => (
        <StudentCard student={student} key={student.id} isMock={isMock}/>
    ))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await searchStudents()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={handleSubmit}>

                <h2>Поиск студентов</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default StudentsList;