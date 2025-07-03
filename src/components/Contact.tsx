import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import emailjs from '@emailjs/browser';

export const Contact = () => {
   
    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs.sendForm(
            import.meta.env.PUBLIC_EMAIL_SERVICE_ID, // desde EmailJS
            import.meta.env.PUBLIC_EMAIL_TEMPLATE_ID, // desde EmailJS
            e.target, // el formulario
            import.meta.env.PUBLIC_EMAIL_USER_ID // public key
        ).then(
            (result) => {
                console.log("Correo enviado", result.text);
            },
            (error) => {
                console.log("Error al enviar", error.text);
            }
        );

        e.target.reset();
    };
    return (
        <form onSubmit={sendEmail} className="@container lg:col-span-3">
            <Card className="p-8 sm:p-12">
                <h3 className="text-xl font-semibold">
                    Vamos a dirigirte al lugar correcto
                </h3>
                <p className="mt-4 text-sm">
                    ¡Contacta a nuestra secretaria! Nos encantaría
                    saber más sobre ti y cómo podemos ayudarte.
                </p>

                <div
                    className="**:[&>label]:block mt-12 space-y-6 *:space-y-3"
                >
                    <div className="@md:grid-cols-2 grid gap-3 *:space-y-3">
                        <div>
                            <Label htmlFor="name" className="space-y-2">
                                Nombre completo
                            </Label>
                            <Input  name="name" type="text" id="name" required />
                        </div>
                        <div>
                            <Label htmlFor="email"
                            >Correo electrónico de trabajo</Label>
                            <Input  name="email" type="email" id="email" required />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="phone">Número de teléfono</Label>
                        <Input  name="phone" type="tel" id="phone" required />
                    </div>
                    <div>
                        <Label htmlFor="msg">Mensaje</Label>
                        <Textarea  name="message" id="msg" rows={3} />
                    </div>
                    <Button type="submit">Enviar</Button>
                </div>
            </Card>
        </form>
    )
}