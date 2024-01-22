import { alertController } from "@ionic/vue"

export default function useAlert() {
    const error = async (message: string, header: string = "Error!") => {
        const alert = await alertController.create({
            header,
            message,
            buttons: ["Try Again"],
        })

        await alert.present()
    }

    const confirm = async (message: string, header: string = "Confirm?") => {
        const alert = await alertController.create({
            header,
            message,
            buttons: [
                {
                    text: "Yes",
                    role: "confirm",
                },
                {
                    text: "No",
                    role: "cancel",
                },
            ],
        })

        await alert.present()
    }

    return { error, confirm }
}
