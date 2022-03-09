import { AgoraVideoPlayer, IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-react";
import React from "react";
const Videos = (props: {
    users: IAgoraRTCRemoteUser[];
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) => {
    const { users, tracks } = props;
    return (
        <div>
            <div id="videos">
                <AgoraVideoPlayer className="vid" videoTrack={tracks[1]} style={{ height: '95%', width: '95%' }} />
                {users?.length > 0 && users.map((user) => {
                    if (user.videoTrack) {
                        return <AgoraVideoPlayer className="vid" videoTrack={user.videoTrack} style={{ height: '95%', width: '95%' }} key={user.uid} />
                    }
                    else{
                        return null;
                    }
                })}
            </div>
        </div>
    )
}
export default Videos;