import React, { useState } from 'react';
import {
  AgoraVideoPlayer,
  ClientConfig,
  createClient,
  createMicrophoneAndCameraTracks,
  IAgoraRTC,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";
import VideoCall from './components/VideoCall';
import ChannelForm from './components/ChannelForm';

const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8"
};

// const appId: string = "2a234f1516124149b574073a9b7aa36c"; // App ID yang didapat dari console.agora.io
// const token: string | null = "bc80f28e79b141ccb06627a8700c68c2"; // App Certificate
const App = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  return (
    <div>
      <h1 className="heading">
        Agora RTC NG SDK React Wrapper - By Mar'i Adhari
      </h1>
      {inCall ? (
        <VideoCall
          channelName={channelName}
          setInCall={setInCall}
        />
      ) : (
        <ChannelForm
          setInCall={setInCall}
          setChannelName={setChannelName}
        />
      )}
    </div>
  );
}

export default App;
