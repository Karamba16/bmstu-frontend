import {configureStore} from "@reduxjs/toolkit";

import studentReducer from "./students/studentSlice"
import draftOrderReducer from "./orders/orderSlice"
import authReducer from "./users/authSlice"
import ordersReducer from "./orders/ordersSlice"
import studentsReducer  from "./students/studentsSlice"

export default configureStore({
	reducer: {
		student: studentReducer,
		students: studentsReducer,
		order: draftOrderReducer,
		orders: ordersReducer,
		user: authReducer
	}
});