import { Button } from "../../button"

export const TestPage = () => {
    return (
        <div>
            <Button icon="/src/assets/Google.svg" isPrincipal={false}>Inicia sesión</Button>
            <Button icon="/src/assets/Facebook.svg" isPrincipal={false}>Inicia sesión</Button>
            <Button isPrincipal={true}>Iniciar sesión</Button>
            <Button isPrincipal={false}>Sin icono</Button>
            <Button className="h-56" isPrincipal={false}>Sin icono y className</Button>
            <Button className="border-amber-700 border-2" isPrincipal={true}></Button>
        </div>
    )
}