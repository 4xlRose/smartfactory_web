import { useQuery } from "react-query";
import { useCameraClientServer } from "camera_server_api/CameraServerClientProvider";
import { Logo } from "ui";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Web() {
  const router = useRouter();

  const cameraClient = useCameraClientServer();

  const query = useQuery("streams", () => cameraClient.getStreams());

  if (query.isSuccess && query.data.length > 0) {
    router.push(`/cameras/${query.data[0].id}`);
  }

  return (
    <div className="h-screen w-screen bg-primary">
      <div className="h-32 w-32">
        <Image src={Logo.src} fill alt="Smart Factory logo" priority />
      </div>
    </div>
  );
}
