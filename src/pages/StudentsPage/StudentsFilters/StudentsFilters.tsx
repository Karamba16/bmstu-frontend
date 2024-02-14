import "./StudentsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useStudents} from "../../../hooks/students/useStudents";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const StudentsFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useStudents()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="students-filters">

            <h2>Поиск студентов</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/students/add" bg={variables.primary}>
                        Добавить студента
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default StudentsFilters