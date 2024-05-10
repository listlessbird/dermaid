'use server'

export async function submit(formData: FormData) {

    console.log("submit data", formData)
    console.log("Using the API URL", process.env.API_URL!)
    const res = await fetch(process.env.API_URL!, {
        method: "POST",
        body: formData,
    })

    if (!res.ok) {
        throw new Error("Failed to upload image")
    }

    const resp = await res.json()
    
    console.log(resp)

    return resp

}