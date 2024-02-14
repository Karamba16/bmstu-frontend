import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	students: [],
	query: ""
};

const studentsSlice = createSlice({
	name: 'students',
	initialState: initialState,
	reducers: {
		updateStudents(state, action) {
			state.students = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateStudents,
	updateQuery
} = studentsSlice.actions;

export default studentsSlice.reducer;