import { useQuery } from "react-query";
import { getStreams } from "security_camera_api/stream";
import { Logo } from "ui";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Web() {
  const router = useRouter();

  const query = useQuery("streams", getStreams);

  if (query.isSuccess && query.data.length > 0) {
    router.push(`/cameras/${query.data[0].id}`);
  }

  return (
    <div className="h-screen w-screen bg-primary">
      <div className="h-32 w-32">
        <Image src={Logo.src} fill alt="Smart Factory logo" priority/>
      </div>
    </div>
  );
}
