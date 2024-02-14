import {createSlice} from "@reduxjs/toolkit"
import {Order} from "../../utils/types";

interface IOrderState {
	order: Order | undefined,
	order_id: number | undefined,
	name: string,
	faculty: string,
	date_perform: string
}

const initialState: IOrderState = {
	order: undefined,
	order_id: undefined,
	name: "",
	faculty: "",
	date_perform: ""
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		updateOrder(state, action) {
			state.order = action.payload
		},
		updateStudents(state, action) {
			state.order.students = action.payload
		},
		updateOrderId(state, action) {
			state.order_id = action.payload
		},
		updateName(state, action) {
			state.name = action.payload
		},
		updateFaculty(state, action) {
			state.faculty = action.payload
		},
		updateDatePerform(state, action) {
			state.date_perform = action.payload
		}
	}
})

export const {updateOrder, updateStudents, updateOrderId, updateName, updateFaculty, updateDatePerform} = orderSlice.actions;

export default orderSlice.reducer;