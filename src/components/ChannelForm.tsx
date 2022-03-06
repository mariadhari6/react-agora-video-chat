import React from "react";
import { appId } from "../client";
const ChannelForm = (props: {
    setInCall: React.Dispatch<React.SetStateAction<boolean>>;
    setChannelName: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { setInCall, setChannelName } = props;
    return (
        <form className="join">
            {appId === '' &&
                <p style={{ color: 'red' }}>
                    Please enter your Agora App ID in client.ts and refresh the page
                </p>
            }
            <input
                type="text"
                placeholder="Enter channel name"
                onChange={(e) => {
                    setChannelName(e.target.value)
                }}
            />
            <button
                onClick={(e)=>{
                    e.preventDefault();
                    setInCall(true);
                }}
            >
                Join
            </button>
        </form>
    )
}
export default ChannelForm;