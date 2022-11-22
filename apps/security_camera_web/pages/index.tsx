import { Button, Logo } from "ui";
import Image from "next/image";

export default function Web() {
  return (
    <div className="w-auto flex">
      <div className="bg-primary h-screen flex flex-col items-center">
        <div className="flex items-center mr-4 my-4">
          <div className="h-24 w-24 relative">
            <Image src={Logo.src} fill alt="Smart Factory logo" />
          </div>
          <h2 className="text-primary-text font-bold">
            Smart Factory <br />
            Camera System
          </h2>
        </div>
        <div className="flex p-4 gap-4 items-center border-t-2 border-primary-border">
          <h3 className="w-24 text-primary-text font-bold ml-2">
            Upper camera
          </h3>
          <div className="bg-gray h-20 aspect-[16/9] rounded">

          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-4xl mx-auto my-8 gap-4">
        <div className="w-full aspect-[16/9] bg-gray rounded">

        </div>
        <h1 className="text-4xl">
          Upper camera
        </h1>
      </div>
    </div>
  );
}
