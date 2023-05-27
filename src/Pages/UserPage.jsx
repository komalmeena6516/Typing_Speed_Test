import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress } from '@mui/material';
import UserTable from '../Components/UserTable';
import Graph from '../Components/Graph';
import UserInfo from '../Components/UserInfo';


const UserPage = () => {

    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const fetchUserData = () => {
        const resultRef = db.collection('Results');
        const { uid } = auth.currentUser;
        let tempData = [];
        let tempGraphData = [];
        resultRef.where("userId", "==", uid)
            .orderBy('timeStamp', 'desc')
            .get().then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    tempData.push({ ...doc.data() });
                    tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(",")[0], doc.data().wpm,]);
                });
                setData(tempData);
                setGraphData(tempGraphData.reverse());
                setDataLoading(false);
            });
    };

    useEffect(() => {
        if (!loading) {
            fetchUserData();
        }
        if (!user && !loading) {
            navigate('/');
        }

    }, [loading]);

    if (loading || dataLoading) {
        return <div className='center-of-screen'>
            <CircularProgress size={300} />
        </div>;
    }
    return (
        <div className='canvas'>
            <UserInfo totalTestTaken={data.length} />
            <div className="graph-user-page">
                <Graph graphData={graphData} />
            </div>
            <UserTable data={data} />
        </div>
    )
}

export default UserPage