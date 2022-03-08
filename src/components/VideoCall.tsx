import React, { useState } from "react";
import {
    IAgoraRTCRemoteUser,
} from "agora-rtc-react"
import { useClient, useMicrophoneAndCameraTracks } from "../client";
import Controls from "./Controls";
const VideoCall = (props: {
    setInCall: React.Dispatch<React.SetStateAction<boolean>>;
    channelName: string;
}) => {
    const { setInCall, channelName } = props;
    const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
    const [start, setStart] = useState<boolean>(false);
    // using the hook to get access to the client object
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    return (
        <div className="App">
            {ready && tracks && (
                // <div>Video Call Control</div>
                <Controls setInCall={setInCall} tracks={tracks} setStart={setStart} />
            )}
            {start && tracks && (
                <div>Video Cam</div>
            )}
        </div>
    )
}
export default VideoCall