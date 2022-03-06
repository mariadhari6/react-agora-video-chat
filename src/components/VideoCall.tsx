import React, { useState } from "react";
import {
    IAgoraRTCRemoteUser,
} from "agora-rtc-react"
import { useClient, useMicrophoneAndCameraTracks } from "../client";
const VideoCall = (props: {
    setInCall: React.Dispatch<React.SetStateAction<boolean>>;
    channelName: string;
}) => {
    const { setInCall, channelName } = props;
    const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
    const [start, setStart] = useState<boolean>(false);
    // using the hook to get access to the client object
    const client = useClient();
    const {ready, tracks} = useMicrophoneAndCameraTracks();

    return (
        <div>
            Ini Component Video Call
        </div>
    )
}
export default VideoCall