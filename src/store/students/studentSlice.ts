import {createSlice} from "@reduxjs/toolkit"
import {Student} from "../../utils/types";

interface IStudentState {
	student: Student | undefined
}

const initialState: IStudentState = {
	student: undefined,
};

const studentSlice = createSlice({
	name: 'student',
	initialState: initialState,
	reducers: {
		updateStudent(state, action) {
			state.student = action.payload
		},
		updateName(state, action) {
			state.student.name = action.payload
		},
		updateFaculty(state, action) {
			state.student.faculty = action.payload
		},
		updateGroup(state, action) {
			state.student.group = action.payload
		},
		updateImage(state, action) {
			state.student.image = action.payload
		}
	}
})

export const {
	updateStudent,
	updateName,
	updateFaculty,
	updateGroup,
	updateImage
} = studentSlice.actions;

export default studentSlice.reducer;