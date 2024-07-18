import axios from 'axios';
import React, { useEffect, useState } from 'react';

function MyPage() {
    const [tasks, setTasks] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/tasks');
                const tasks = response.data;

                // 合計稼働時間と合計金額を計算
                let totalMinutes = 0;
                tasks.forEach(task => {
                    totalMinutes += task.hours * 60 + task.minutes;
                });

                const totalHours = Math.floor(totalMinutes / 60);
                const totalCost = (totalMinutes / 60) * 2000;

                setTasks(tasks);
                setTotalHours(totalHours);
                setTotalCost(totalCost);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h2>My Page</h2>
            <table>
                <thead>
                    <tr>
                        <th>タスク名</th>
                        <th>実施日</th>
                        <th>稼働時間</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.taskId}>
                            <td>{task.taskName}</td>
                            <td>{task.taskDate}</td>
                            <td>{`${task.hours}時間 ${task.minutes}分`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h3>この月の合計稼働時間: {totalHours}時間</h3>
                <h3>この月の合計金額: {totalCost.toLocaleString()}円</h3>
            </div>
        </div>
    );
}

export default MyPage;