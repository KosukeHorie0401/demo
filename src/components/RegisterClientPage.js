import axios from 'axios';
import React, { useState } from 'react';

function RegisterClientPage() {
    const [client, setClient] = useState({
        companyName: '',
        representativeName: '',
        contactPersonName: '',
        address: '',
        phone: '',
        email: '',
        websiteUrl: '',
        contractStartDate: '',
        meetingHistory: '',
        referralRecord: '',
        priority: '中', // デフォルト値を設定
        users: [
            { username: '', email: '', password: '', role: 'ROLE_USER' }
        ]
    });

    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const handleUserChange = (index, e) => {
        const { name, value } = e.target;
        const users = [...client.users];
        users[index][name] = value;
        setClient({ ...client, users });
    };

    const addUser = () => {
        setClient({
            ...client,
            users: [...client.users, { username: '', email: '', password: '', role: 'ROLE_USER' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Client data before API call:', JSON.stringify(client, null, 2));
            console.log('Password before API call:', client.users[0].password);
            const response = await axios.post('http://localhost:8080/api/clients/saveWithUsers', client);
            console.log('Client and users registered successfully:', response.data);
            alert('Client and users registered successfully');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h2>クライアント登録</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>会社名:</label>
                    <input type="text" name="companyName" value={client.companyName} onChange={handleClientChange} required />
                </div>
                <div>
                    <label>代表者名:</label>
                    <input type="text" name="representativeName" value={client.representativeName} onChange={handleClientChange} required />
                </div>
                <div>
                    <label>担当者名:</label>
                    <input type="text" name="contactPersonName" value={client.contactPersonName} onChange={handleClientChange} required />
                </div>
                <div>
                    <label>住所:</label>
                    <input type="text" name="address" value={client.address} onChange={handleClientChange} required />
                </div>
                <div>
                    <label>電話番号:</label>
                    <input type="text" name="phone" value={client.phone} onChange={handleClientChange} required />
                </div>
                <div>
                    <label>メールアドレス:</label>
                    <input type="email" name="email" value={client.email} onChange={handleClientChange} required />
                </div>
                <div>
                    <label>ウェブサイトURL:</label>
                    <input type="text" name="websiteUrl" value={client.websiteUrl} onChange={handleClientChange} />
                </div>
                <div>
                    <label>契約開始日:</label>
                    <input type="date" name="contractStartDate" value={client.contractStartDate} onChange={handleClientChange} required />
                </div>
                <div>
                    <label>会議履歴:</label>
                    <input type="text" name="meetingHistory" value={client.meetingHistory} onChange={handleClientChange} />
                </div>
                <div>
                    <label>紹介記録:</label>
                    <input type="text" name="referralRecord" value={client.referralRecord} onChange={handleClientChange} />
                </div>
                <div>
                    <label>優先度:</label>
                    <select name="priority" value={client.priority} onChange={handleClientChange} required>
                        <option value="高">高</option>
                        <option value="中">中</option>
                        <option value="低">低</option>
                    </select>
                </div>
                <h3>ユーザー</h3>
                {client.users.map((user, index) => (
                    <div key={index}>
                        <div>
                            <label>ユーザー名:</label>
                            <input type="text" name="username" value={user.username} onChange={(e) => handleUserChange(index, e)} required />
                        </div>
                        <div>
                            <label>メールアドレス:</label>
                            <input type="email" name="email" value={user.email} onChange={(e) => handleUserChange(index, e)} required />
                        </div>
                        <div>
                            <label>パスワード:</label>
                            <input type="password" name="password" value={user.password} onChange={(e) => handleUserChange(index, e)} required />
                        </div>
                        <div>
                            <label>役割:</label>
                            <input type="text" name="role" value={user.role} onChange={(e) => handleUserChange(index, e)} required />
                        </div>
                    </div>
                ))}
                <button type="button" onClick={addUser}>ユーザー追加</button>
                <button type="submit">登録</button>
            </form>
        </div>
    );
}

export default RegisterClientPage;