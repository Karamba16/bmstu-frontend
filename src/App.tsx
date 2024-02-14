import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import {useState} from "react";
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import StudentsList from "./Components/StudentsList/StudentsList";
import StudentPage from "./Components/StudentPage/StudentPage";
import {Student} from "./Types";

function App() {

    const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined)

    return (
        <div className="App">

            <div className="wrapper">

                <Header />

                <div className={"content-wrapper"}>

                    <BrowserRouter basename="/bmstu-frontend">

                        <Breadcrumbs selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/students" replace />} />

                            <Route path="/students" element={<StudentsList />} />

                            <Route path="/students/:id" element={<StudentPage selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} />} />

                        </Routes>

                    </BrowserRouter>

                </div>

            </div>

        </div>
    )
}

export default App
