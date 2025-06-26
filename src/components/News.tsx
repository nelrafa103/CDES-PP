import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { ReactNode } from 'react'

import CarouselVideos from "./Videos"

export default function NewsSection({ data, videos }: { data: any, videos: any }) {
    return (
        <section className="bg-background py-16 md:py-32 dark:bg-transparent h-auto">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl news-title">
                        Noticias
                    </h2>
                </div>
                
                {/* Noticias principales (estáticas) */}
                <Card className="max-h-auto @min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-1">
                            <h3 className="mt-4 font-medium line-clamp-5 text-left news-heading">
                                <a 
                                    href="/noticias/1" 
                                    className="hover:text-primary transition-colors cursor-pointer"
                                >
                                    Ulises Rodríguez designa comisión especialistas para formular propuesta de Santiago al Premio Global Mayors Challenge 2025 de la Fundación Bloomberg
                                </a>
                            </h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-ellipsis overflow-hidden line-clamp-5 text-left my-2 news-content">
                                El alcalde por Santiago, Ulises Rodríguez, designa comisión de expertos integrada por el doctor Reynaldo Peguero, director del Plan Estratégico de Santiago 2030, el ingeniero Ervin Vargas, asesor de urbanismo de la alcaldía y a Johanna Castillo directora de la Oficina Municipal de Planeamiento Urbano del Ayuntamiento para diseñar la propuesta de participación de Santiago en el Premio Bloomberg Philanthropies 2025 Global Mayors Challenge.
                                Una iniciativa que premia con US$ 1,000,000.00 (Un millón de dólares), las soluciones innovadoras para solventar los desafíos y retos en las ciudades, proyectar la visión y el compromiso de la gestión local.
                            </p>
                            <div className="mt-4">
                                <a 
                                    href="/noticias/1"
                                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors cursor-pointer"
                                >
                                    Leer más →
                                </a>
                            </div>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-1">
                            <h3 className="mt-4 font-medium line-clamp-5 text-left news-heading">
                                <a 
                                    href="/noticias/2" 
                                    className="hover:text-primary transition-colors cursor-pointer"
                                >
                                    Foro Educativo de la Calidad valorará logros y desafíos del sector en Santiago
                                </a>
                            </h3>
                        </CardHeader>
                        
                        <CardContent>
                            <p className="text-sm text-ellipsis overflow-hidden line-clamp-5 text-left my-2 news-content">
                                El Auditorio Magno del Centro León acogerá el próximo 28 de noviembre el primer Foro de la Calidad Educativa que se realiza en Santiago en el contexto del Plan Estratégico al año 2030 y derivado de la Estrategia Santiago de Inclusión Social y Salvador de Vidas.
                            </p>
                            <div className="mt-4">
                                <a 
                                    href="/noticias/2"
                                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors cursor-pointer"
                                >
                                    Leer más →
                                </a>
                            </div>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-1">
                            <h3 className="mt-4 font-medium line-clamp-5 text-left news-heading">
                                <a 
                                    href="/noticias/3" 
                                    className="hover:text-primary transition-colors cursor-pointer"
                                >
                                    INTRANT, Alcaldía de Santiago y CDES acuerdan salvar vidas apoyando la seguridad vial
                                </a>
                            </h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-ellipsis overflow-hidden line-clamp-7 text-left h-auto my-2 news-content">
                                El Instituto Nacional de Tránsito y Transporte Terrestre (Intrant), la alcaldía de Santiago y el Consejo para el Desarrollo Estratégico de Santiago (CDES), firmaron un acuerdo de colaboración con el objetivo de aunar esfuerzos para salvar vidas, con un plan de movilidad urbana integral y seguridad vial para esa ciudad.
                            </p>
                            <div className="mt-4">
                                <a 
                                    href="/noticias/3"
                                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors cursor-pointer"
                                >
                                    Leer más →
                                </a>
                            </div>
                        </CardContent>
                    </div>
                </Card>

                {/* Noticias dinámicas desde data */}
                {data && data.length > 0 && (
                    <div className="mt-8 space-y-6">
                        {data.map((entrada: any, index: number) => (
                            <Card key={index} className="max-w-4xl mx-auto overflow-hidden shadow-zinc-950/5">
                                <div className="p-6">
                                    <CardHeader className="pb-1 px-0">
                                        <h3 className="font-medium line-clamp-3 text-left text-lg">
                                            {entrada.data.Titulo}
                                        </h3>
                                    </CardHeader>

                                    <CardContent className="px-0">
                                        <p className="text-sm text-muted-foreground line-clamp-4 text-left">
                                            {entrada.data.Parrafos?.[0]?.Contenido}
                                        </p>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Botón para ver todas las noticias */}
                <div className="text-center mt-8">
                    <a 
                        href="/noticias"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        Ver todas las noticias
                    </a>
                </div>
            </div>

            {/* Sección de videos */}
            <div className="mx-auto max-w-5xl px-6 mt-16">
                <CarouselVideos data={videos} />
            </div>
        </section>
    )
}
