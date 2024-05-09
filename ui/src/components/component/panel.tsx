"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CameraIcon } from "lucide-react"
import { WebcamCapture } from "./cam"
import { Upload } from "./upload"

export default function Panel() {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-semibold tracking-tighter">
          Live Detection
        </h1>
        <p className="text-center text-sm text-gray-500 md:text-base dark:text-gray-400">
          Point the camera at the affected area and click start to begin
          detection
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        {/* <div className="relative overflow-hidden aspect-video w-full md:w-[400px]"> */}
        {/* <span className="object-cover object-center rounded-md bg-muted" /> */}
        <WebcamCapture />
        {/* </div> */}
        {/* <Button className="w-full">Capture</Button> */}
      </div>
      <p>OR</p>
      <div className="flex flex-col items-center gap-2">
        <Upload />
      </div>
    </>
  )
}

// function CameraIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
//       <circle cx="12" cy="13" r="3" />
//     </svg>
//   )
// }
