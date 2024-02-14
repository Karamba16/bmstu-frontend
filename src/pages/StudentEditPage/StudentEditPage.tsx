import "./StudentEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useStudent} from "../../hooks/students/useStudent";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const StudentEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        student,
        fetchStudent,
        setName,
        setFaculty,
        setGroup,
        setImage
    } = useStudent()

    useEffect(() => {
        id && fetchStudent(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveStudent = async() => {
        let form_data = new FormData()

        form_data.append('name', student.name)
        form_data.append('faculty', student.faculty)
        form_data.append('group', student.group)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`students/${student.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/")
        }
    }

    const deleteStudent = async () => {

        const response = await api.delete(`students/${student.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (student == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={student.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="ФИО" value={student.name} setValue={setName} />

                    <CustomTextarea placeholder="Факультет" value={student.faculty} setValue={setFaculty} />
                    
                    <CustomInput placeholder="Группа" value={student.group} setValue={setGroup} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveStudent}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deleteStudent}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default StudentEditPage