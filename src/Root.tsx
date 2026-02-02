import { Composition } from "remotion";
import { AssertiveCommunicationPromo } from "./compositions/AssertiveCommunicationPromo";

// Video configuration: 16:9 aspect ratio, 1 minute duration
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AssertiveCommunicationPromo"
        component={AssertiveCommunicationPromo}
        durationInFrames={1800} // 60 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
