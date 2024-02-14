import {useDispatch, useSelector} from 'react-redux';
import {
	updateOrder,
	updateOrderId,
	updateStudents,
	updateName,
	updateFaculty,
	updateDatePerform
} from "../../store/orders/orderSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useOrder() {

	const {access_token} = useToken()

	const order = useSelector(state => state.order.order)
	const order_id = useSelector(state => state.order.order_id)
	const name = useSelector(state => state.order.name)
	const faculty = useSelector(state => state.order.faculty)
	const date_perform = useSelector(state => state.order.date_perform)

	const is_draft = order?.status == 1

	const navigate = useNavigate()

	const dispatch = useDispatch()

	const setOrder = (value) => {
		dispatch(updateOrder(value))
	}

	const setStudents = (value) => {
		dispatch(updateStudents(value))
	}

	const setOrderId = (value) => {
		dispatch(updateOrderId(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setFaculty = (value) => {
		dispatch(updateFaculty(value))
	}

	const setDatePerform = (value) => {
		dispatch(updateDatePerform(value))
	}

	const sendOrder = async () => {

		const response = await api.put(`orders/${order.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
			setOrderId(undefined)
			navigate("/orders")
		}
	}

	const deleteOrder = async () => {

		const response = await api.delete(`orders/${order.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
			setOrderId(undefined)
			navigate("/")
		}

	}

	const saveOrder = async () => {

		const formData = new FormData()
		formData.append("name", name)
		formData.append("faculty", faculty)
		formData.append("date_perform", date_perform)

		await api.put(`orders/${order.id}/update/`, formData, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchOrder = async (order_id) => {

		const {data} = await api.get(`orders/${order_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setOrder(data)
		setName(data["name"])
		setFaculty(data["faculty"])
		setDatePerform(data["date_perform"].split('T')[0])
	}

	const addStudentToOrder = async (student) => {
		await api.post(`students/${student.id}/add_to_order/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteStudentFromOrder = async (student) => {
		const response = await api.delete(`orders/${order.id}/delete_student/${student.id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200){
			await fetchOrder(order_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		order,
		order_id,
		is_draft,
		name,
		faculty,
		date_perform,
		setOrder,
		saveOrder,
		sendOrder,
		deleteOrder,
		fetchOrder,
		addStudentToOrder,
		deleteStudentFromOrder,
		setOrderId,
		setStudents,
		setName,
		setFaculty,
		setDatePerform
	};
}