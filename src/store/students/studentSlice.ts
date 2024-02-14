import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	student: undefined,
};

const studentSlice = createSlice({
	name: 'student',
	initialState: initialState,
	reducers: {
		updateStudent(state, action) {
			state.student = action.payload
		}
	}
})

export const {
	updateStudent
} = studentSlice.actions;

export default studentSlice.reducer;