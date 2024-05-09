import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { CrossIcon } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"
import { useState } from "react"

export function Results({
  image,
  conditions,
  modalState,
}: {
  image?: string
  conditions: { [key: string]: number }
  modalState: boolean
}) {
  const [open, setOpen] = useState(modalState)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-2xl">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Image
            alt="Detected Image"
            className="rounded-xl object-cover object-center w-full md:w-1/2"
            height={600}
            src={image || "/images/placeholder.png"}
            style={{
              aspectRatio: "800/600",
              objectFit: "cover",
            }}
            width={800}
          />
          <div className="flex flex-col items-start gap-2 w-full md:w-1/2">
            <div className="flex items-center gap-2">
              <CrossIcon className="h-6 w-6 text-red-500" />
              <h2 className="text-2xl font-semibold">
                Potential Skin Conditions
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              {Object.keys(conditions).map((key) => (
                <div className="flex flex-col items-start gap-1" key={key}>
                  <span className="font-medium truncate text-pretty">
                    {key}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {(conditions[key] * 100).toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
            <Button className="w-full" variant="outline">
              View History
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
