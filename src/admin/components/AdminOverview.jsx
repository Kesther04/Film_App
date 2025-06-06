import { Link } from "react-router-dom";
import { BASE_API_URL } from "../../constants";
import { useEffect, useState } from "react";
import { UseSessionAdmin } from "./UseSessionAdmin";
import axios from "axios";

export default function AdminOverview() {
    const URL = `${BASE_API_URL}?apiKey=adminOverviewData`;
    const [overviewData,setOverviewData] = useState([]);
    const {user} = UseSessionAdmin();
    console.log(user);
    
    useEffect(()=>{
        axios.post(URL,{email:user?.email},{withCredentials: true,headers:{'Content-Type':'application/json'}})
        .then((res)=>{
            setOverviewData(res.data);        
        })
        .catch((err)=>setOverviewData(err));
    },[user]);
    console.log(overviewData);
    return(
        <div className="adminOverview">
            <div className="dataVals">
                {/* first part of overview */}
                <span>
                    <h3>Total Movies</h3>
                    <p>{overviewData.totalMovies}</p>
                </span>

                <span>
                    <h3>Total Series</h3>
                    <p>{overviewData.totalSeries}</p>
                </span>

                <span>
                    <h3>Total Users</h3>
                    <p>{overviewData.totalUsers}</p>
                </span>

                <span>
                    <h3>Storage Used</h3>
                    <p>{overviewData.storageUsed}MB</p>
                </span>

                <span>
                    <h3>Downloads Today</h3>
                    <p>{overviewData.downloadsToday}</p>
                </span>

                <span>
                    <h3>Streams Today</h3>
                    <p>{overviewData.streamsToday}</p>
                </span>
            </div>

            <div className="sndDataVals">
                {/* second part of the overview */}
                
                <div>
                    <h3>Recent Uploads</h3>
                    
                    {overviewData?.latestUploads?.map(upl =>  
                        <p>{upl.video}</p>     
                    )}         
                </div>

                <div>
                    <h3>Top Downloaded Films</h3>
                    {overviewData?.topDownloads?.map(upl =>  
                        <p>{upl[0]} | {upl[1] == 1 ? `${upl[1]} Download` :`${upl[1]} Downloads`}</p>     
                    )}        
                </div>
                
                <div>
                    <h3>Top Streamed Films</h3>
                    {overviewData?.topStreams?.map(upl =>  
                        <p>{upl[0]} | {upl[1] == 1 ? `${upl[1]} Stream` :`${upl[1]} Streams`}</p>     
                    )}     
                </div>
                
            </div>

            <div className="thdDataVals">
                <h2>Quick Actions</h2>

                <div className="flex flex-col md:flex-row  gap-5">
                    <Link to="/admin/upload">
                        <span>Add New Film(Movie / Serie)</span>
                    </Link>

                
                    <Link to="/admin/view_uploads">
                        <span>View Uploaded Films</span>
                    </Link>

                    <Link to="/admin/user_details">
                        <span>Manage Users</span>
                    </Link>

                    <Link to="/admin/profile">
                        <span>My Profile</span>
                    </Link> 

                </div>           
            </div>

            <div className="fthDataVals">
                {/* last part of the overview */}
                <h2>System Health</h2>

                <div>
                    <span>
                        <b>Server:</b> Online
                    </span>

                    <span>
                        <b>API:</b> Working
                    </span>

                    <span>
                        <b>Last Backup:</b> Today
                    </span>
                </div>
            </div>
        </div>
    );
}