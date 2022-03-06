import {
    ClientConfig,
    createClient,
    createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

export const appId: string = "2a234f1516124149b574073a9b7aa36c"; // App ID yang didapat dari console.agora.io
export const token: string | null = "bc80f28e79b141ccb06627a8700c68c2"; // App Certificate
export const config: ClientConfig = {
    mode: "rtc",
    codec: "vp8"
}
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();