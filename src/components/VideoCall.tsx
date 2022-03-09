import React, { useEffect, useState } from "react";
import {
    IAgoraRTCRemoteUser,
} from "agora-rtc-react"
import { appId, token, useClient, useMicrophoneAndCameraTracks } from "../client";
import Controls from "./Controls";
import Videos from "./Videos";
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
    useEffect(() => {
        let init = async (name: string) => {
            console.log("init", name);
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                console.log("Subscribe success");
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return [...prevUsers, user];
                    })
                }
                else if (mediaType === "audio") {
                    user.audioTrack?.play();
                }
            })
            client.on("user-unpublished", (user, type) => {
                console.log("unpublished", user, type);
                if (type === "audio") {
                    user.audioTrack?.stop();
                }
                else if (type === "video") {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid)
                    })
                }
            })
            client.on("user-left", (user) => {
                console.log("Leaving", user);
                setUsers((prevUser) => {
                    return prevUser.filter((User) => User.uid !== user.uid);
                })
            })
            await client.join(appId, name, token, null);
            if (tracks) {
                await client.publish([tracks[0], tracks[1]])
            }
            setStart(true);
        }
        if (ready && tracks) {
            console.log("Init Ready");
            init(channelName);
        }
    }, [channelName, client, ready, tracks]);
    return (
        <div className="App">
            {ready && tracks && (
                // <div>Video Call Control</div>
                <Controls setInCall={setInCall} tracks={tracks} setStart={setStart} />
            )}
            {start && tracks && (
                // <div>Video Cam</div>
                <Videos tracks={tracks} users={users} />
            )}
        </div>
    )
}
export default VideoCall