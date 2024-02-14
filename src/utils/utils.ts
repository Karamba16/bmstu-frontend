export const format_visa = (value) => {
    if (value == undefined) {
        return "Нет"
    }

    if (value == "0") {
        return "Не получилось определить"
    }

    if (value == "1") {
        return "В наличии"
    }

    return "Отсутствует"
}