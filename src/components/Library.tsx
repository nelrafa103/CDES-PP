import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Search, TrendingUp, User } from "lucide-react";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";


const libros = [
    {
        id: 1,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        categoria: "Literatura",
        disponible: true,
        portada:
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
        descripcion:
            "Una obra maestra del realismo mágico que narra la historia de la familia Buendía.",
    },
    {
        id: 2,
        titulo: "El nombre del viento",
        autor: "Patrick Rothfuss",
        categoria: "Fantasía",
        disponible: false,
        portada:
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
        descripcion:
            "La primera parte de la Crónica del Asesino de Reyes, una épica fantasía.",
    },
    {
        id: 3,
        titulo: "Sapiens",
        autor: "Yuval Noah Harari",
        categoria: "Historia",
        disponible: true,
        portada:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
        descripcion:
            "Una breve historia de la humanidad desde la prehistoria hasta el presente.",
    },
    {
        id: 4,
        titulo: "El algoritmo del café",
        autor: "Santiago Posteguillo",
        categoria: "Ciencia",
        disponible: true,
        portada:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
        descripcion:
            "Una fascinante exploración de los algoritmos en nuestra vida cotidiana.",
    },
];

const eventos = [
    {
        titulo: "Club de Lectura: Clásicos Modernos",
        fecha: "2025-07-15",
        hora: "18:00",
        descripcion:
            "Únete a nuestro club de lectura mensual para discutir obras contemporáneas.",
    },
    {
        titulo: "Taller de Escritura Creativa",
        fecha: "2025-07-20",
        hora: "16:00",
        descripcion:
            "Aprende técnicas de escritura creativa con autores locales.",
    },
    {
        titulo: "Cuentacuentos para Niños",
        fecha: "2025-07-25",
        hora: "10:00",
        descripcion:
            "Actividad especial para los más pequeños con cuentos interactivos.",
    },
];
export default function Library() {
    const [books, setBooks] = useState([])
    useEffect(() => {

        const fetchBooks = async () => {
            const response = await fetch(
                `${import.meta.env.PUBLIC_STRAPI_URL}/api/libros?populate=*`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${import.meta.env.PUBLIC_STRAPI_KEY}`,
                    },
                },
            );
            const { data } = await response.json();
            setBooks(data);
        };

        fetchBooks().then(() => { }).catch((e) => console.log(e))


        console.log(typeof books)
    }, []);
    return (
        <main className="min-h-screen mx-8 my-8">
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {
                    books.map((libro: any) => (
                        <Card
                            key={libro.id}
                            className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="aspect-[3/4] overflow-hidden">
                                <img
                                    src={import.meta.env.PUBLIC_STRAPI_URL + libro.Portada.url}
                                    alt={libro.Portada.alternativeText}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg line-clamp-2">
                                    {libro.Titulo}
                                </CardTitle>
                            </CardHeader>
                            <CardFooter className="pt-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                        >
                                            Ver detalles
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                {libro.Titulo}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <img
                                                src={import.meta.env.PUBLIC_STRAPI_URL + libro.Portada.url}
                                                alt={libro.Portada.alternativeText}
                                                className="w-32 h-40 object-cover mx-auto rounded"
                                            />
                                            <p className="text-sm text-gray-600">
                                                {libro.Descripcion || ""}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <a href={import.meta.env.PUBLIC_STRAPI_URL + libro.Archivos[0].url}>
                                                    <Button>
                                                        {"Descargar"}
                                                    </Button>
                                                </a>

                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>






        </main>
    );
}
