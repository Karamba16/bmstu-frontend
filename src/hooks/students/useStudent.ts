import {useDispatch, useSelector} from 'react-redux';
import {
	updateStudent
} from "../../store/students/studentSlice";
import {api} from "../../utils/api";

export function useStudent() {
	const student = useSelector(state => state.student.student);

	const dispatch = useDispatch()

	const setStudent = (value) => {
		dispatch(updateStudent(value))
	}

	const fetchStudent = async (id) => {

		const {data} = await api.get(`students/${id}`);

		setStudent(data)

	};

	return {
		student,
		setStudent,
		fetchStudent
	};
}