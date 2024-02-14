import {useDispatch, useSelector} from 'react-redux';
import {
	updateStudent,
	updateName,
	updateFaculty,
	updateGroup,
	updateImage
} from "../../store/students/studentSlice";
import {api} from "../../utils/api";

export function useStudent() {
	const student = useSelector(state => state.student.student);

	const dispatch = useDispatch()

	const setStudent = (value) => {
		dispatch(updateStudent(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setFaculty = (value) => {
		dispatch(updateFaculty(value))
	}

	const setGroup = (value) => {
		dispatch(updateGroup(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchStudent = async (id) => {

		const {data} = await api.get(`students/${id}`);

		setStudent(data)

	};

	return {
		student,
		setStudent,
		fetchStudent,
		setName,
		setFaculty,
		setGroup,
		setImage
	};
}