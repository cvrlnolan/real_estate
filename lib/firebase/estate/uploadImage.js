import firebase from "@/lib/firebase/firebaseClientInit"
import axios from "axios"

const storage = firebase.storage()
const storageRef = storage.ref()

export default async function UploadImage(imageData, estateData, toast) {
    async function upload(image, estate) {
        try {
            await storageRef.child(`${new Date().toISOString()}`).put(image).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                    //Send data for write operation to MongoDB...
                    const newEstateData = {
                        ...estate,
                        imgUrl: url
                    }
                    axios.post("/api/estate/insert", newEstateData).then((response) => {
                        if (response.data.message === "Ok.") {
                            toast({
                                title: "Estate added successfully.",
                                description: "You have successfully included your estate to our listings.",
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                            })
                        }
                    })
                })
            })
        } catch (e) {
            console.log(e)
        }
    }

    if (typeof window !== "undefined") {
        await upload(imageData, estateData)
    }

}