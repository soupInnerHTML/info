import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";

export default () => {
    const [pairs, setPairs] = useState([])
    const [rooms, setRooms] = useState([])

    const time = [
        ["8:30 10:05"],
        ["10:25 12:00"],
        ["12:20 14:10"],
        ["14:15 15:50"],
        ["16:10 17:55"],
        ["18:00 19:35"],
    ]

    useEffect(() => {
        (async () => {
            const rooms = await fetch("https://api.ptpit.ru/rooms")
            const roomsJson = await rooms.json()
            setRooms(roomsJson)

            const response = await fetch("https://api.ptpit.ru/timetable/groups/101/2021-01-18")
            const json = await response.json()
            setPairs(json.filter(day => day.date === '2021-01-24'))
            console.log(json.filter(day => day.date === '2021-01-24'))
        })()
    }, [])

    return (
        <div className={"container d-flex align-items-center vh-100"}>
            <table className="table table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Время</th>
                    <th scope="col">Предмет</th>
                    <th scope="col">Подгруппа</th>
                    <th scope="col">Преподаватель</th>
                    <th scope="col">Кабинет</th>
                </tr>
                </thead>
                <tbody>
                {
                    pairs.map((pair) => {
                        return (
                            <tr>
                                <th scope="row">{pair.num}</th>
                                <td>{time[pair.num]}</td>
                                <td>{pair.moodle ? <a rel="noopener noreferrer nofollow" target="_blank" href={JSON.parse(pair.moodle)[0].url} >{pair.subject_name}</a> : pair.subject_name}</td>
                                <td>{pair.subgroup || 'Группа'}</td>
                                <td>{pair.teacher_surname} {pair.teacher_name[0]}.{pair.teacher_secondname[0]}.</td>
                                <th scope="row">{rooms.find(room => room.id === pair.room_id).name}</th>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
