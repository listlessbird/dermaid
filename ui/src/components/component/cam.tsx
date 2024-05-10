"use client"
import { useRef, useCallback, useState } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Results } from "./results"

import { submit as submitAction } from "./submit"
import { useAppContext } from "./context"
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment",
}

export function WebcamCapture() {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  //   const [imageSrc, setImageSrc] = useState<string | null>(null)

  const {
    image: imageSrc,
    setImage: setImageSrc,
    imageFile,
    setImageFile,
  } = useAppContext()
  console.log({ imageSrc })
  const [results, setResults] = useState<{ [key: string]: number } | null>(null)

  const [showResults, setShowResults] = useState(false)

  const webcamRef = useRef<Webcam>(null)

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot() as string
    let file = await (await fetch(imageSrc)).blob()
    file = new File([file], "image.jpg", { type: "image/jpeg" }) as File
    setImageFile(file as File)
    console.log(imageSrc)
    if (imageSrc) {
      setImageSrc(imageSrc)
    }
  }, [webcamRef])

  const clear = useCallback(() => {
    setImageSrc(null)
    setResults(null)
    setShowResults(false)
  }, [imageSrc])

  const submit = useCallback(async () => {
    console.log("submitting")
    setHasSubmitted(true)
    setResults(null)
    if (!imageFile) return
    console.log("submitting", imageFile)

    const fd = new FormData()
    fd.append("image", imageFile)
    const submissionRes = await submitAction(fd)
    console.log(submissionRes)
    setResults(submissionRes)
    setHasSubmitted(false)
    setShowResults(true)
  }, [hasSubmitted, imageFile, setResults, setHasSubmitted, setShowResults])

  return (
    <>
      {results && (
        <Results
          image={imageSrc!}
          conditions={results}
          modalState={showResults}
        />
      )}

      <div className="relative overflow-hidden aspect-video w-full md:w-[400px]">
        {/* <span className="object-cover object-center rounded-md bg-muted" /> */}
        {imageSrc && (
          <div className={cn(hasSubmitted && "box")}>
            <Image
              src={imageSrc}
              alt="Captured image"
              width={1280}
              height={720}
              className="object-cover object-center rounded-md bg-muted"
            />
          </div>
        )}
        {!imageSrc && (
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
            className="object-cover object-center rounded-md bg-muted raspi:h-[200px] raspi:w-[300px] max-w-[450px] max-h-[450px]"
          />
        )}
      </div>
      {imageSrc && (
        <div className="flex w-full gap-2">
          <Button onClick={clear} className="w-full" disabled={hasSubmitted}>
            Retake
          </Button>
          <Button className="w-full" onClick={submit}>
            Start Detection
          </Button>
        </div>
      )}
      {!imageSrc && (
        <Button onClick={capture} className="w-full">
          Capture photo
        </Button>
      )}
    </>
  )
}
