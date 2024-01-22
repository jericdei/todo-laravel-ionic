import { alertController } from "@ionic/vue";

export default function useAlert() {
    const error = async (message: string, header: string = "Error!") => {
        const alert = await alertController.create({
            header,
            message,
            buttons: ["Try Again"],
        });

        await alert.present();
    };

    return { error };
}
