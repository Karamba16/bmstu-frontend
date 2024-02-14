import {useDispatch, useSelector} from 'react-redux';
import {
	updateStudents,
	updateQuery
} from "../../store/students/studentsSlice";
import {api} from "../../utils/api";
import {useOrder} from "../orders/useOrder";
import {useToken} from "../users/useToken";

export function useStudents() {
	const students = useSelector(state => state.students.students);
	const query = useSelector(state => state.students.query);

	const {access_token} = useToken()

	const {setOrderId} = useOrder()

	const dispatch = useDispatch()

	const setStudents = (value) => {
		dispatch(updateStudents(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchStudents = async () => {

		const {data} = await api.get(`students/search/`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_order_id = data["draft_order_id"]
		setOrderId(draft_order_id)

		return data["students"]
	}

	const deleteStudent = async (student_id) => {
		await api.delete(`students/${student_id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})
	}

	return {
		students,
		setStudents,
		query,
		setQuery,
		searchStudents,
		deleteStudent
	};
}