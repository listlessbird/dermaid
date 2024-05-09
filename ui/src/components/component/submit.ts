'use server'

export async function submit(image: string) {

    console.log("Action submit",  {image})
    // console.log("form data", formData)

    const fd = new FormData()
    fd.append("file", image)

    const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: fd,
    })

    if (!res.ok) {
        throw new Error("Failed to upload image")
    }

    const resp = await res.json()
    
    console.log(resp)

    return resp

}