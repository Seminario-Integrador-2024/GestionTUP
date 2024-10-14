import { useEffect } from "react";
import { useParams } from "react-router-dom"

export default function Pagos() {

    const { fecha } = useParams<{ fecha: string }>();

    useEffect (() => {
    const [year, month] = fecha.split('-');

    }, [fecha]);

    return (
        <div>
            <h1>Pagos</h1>
        </div>
    )

}