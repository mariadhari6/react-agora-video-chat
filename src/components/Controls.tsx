import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-react";
import React, { useState } from "react";
import { useClient } from "../client";
const Controls = (props: {
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
    setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const client = useClient();
    const { tracks, setStart, setInCall } = props;
    const [trackState, setTrackState] = useState({ audio: true, video: true }); //track state video dan audio
    const mute = async (type: "audio" | "video") => {
        if (type === "audio") {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((ps) => {
                return { ...ps, audio: !ps.audio };
            })
        }
        else if (type === "video") {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState((ps) => {
                return { ...ps, video: !ps.video };
            })
        }
    }
    const tinggalkanChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setStart(false);
        setInCall(false);
    }
    return (
        <div className="controls">
            <p
                className={trackState.audio ? "on" : ""}
                onClick={() => {
                    mute("audio");
                }}
            >
                {trackState.audio ? "Bisukan Audio" : "Nyalakan Audio"}
            </p>
            <p
                className={trackState.video ? "on" : ""}
                onClick={() => {
                    mute("video");
                }}
            >
                {trackState.video ? "Matikan Kamera" : "Nyalakan Kamera"}
            </p>
            <p
                onClick={() => {
                    tinggalkanChannel();
                }}
            >
                Tinggalkan Channel
            </p>
        </div>
    );
}
export default Controls;