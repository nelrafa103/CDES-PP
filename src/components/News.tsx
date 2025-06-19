import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { ReactNode } from 'react'
import CarouselVideos from "./Videos"
export default function NewsSection() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent h-auto">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Noticias</h2>
                    <p className="mt-4">Mantente al tanto de lo último.</p>
                </div>
                <Card className="max-h-auto @min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-1">
                            <h3 className="mt-4 font-medium line-clamp-5 text-left">Ulises Rodríguez designa comisión especialistas para formular propuesta de Santiago al Premio Global Mayors Challenge 2025 de la Fundación Bloomberg</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-ellipsis overflow-hidden line-clamp-5 text-left my-2">
                                El alcalde por Santiago, Ulises Rodríguez, designa comisión de expertos integrada por el doctor Reynaldo Peguero, director del Plan Estratégico de Santiago 2030, el ingeniero Ervin Vargas, asesor de urbanismo de la alcaldía y a Johanna Castillo directora de la Oficina Municipal de Planeamiento Urbano del Ayuntamiento para diseñar la propuesta de participación de Santiago en el Premio Bloomberg Philanthropies 2025 Global Mayors Challenge.
                                Una iniciativa que premia con US$ 1,000,000.00 (Un millón de dólares), las soluciones innovadoras para solventar los desafíos y retos en las ciudades, proyectar la visión y el compromiso de la gestión local.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-1">
                            <h3 className="mt-4 font-medium line-clamp-5 text-left ">Foro Educativo de la Calidad valorara logros y desafíos del sector en Santiago.</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-ellipsis overflow-hidden line-clamp-7 text-left h-auto my-2">El Auditorio Magno del Centro León acogerá el próximo 28 de noviembre el primer Foro de la Calidad Educativa que se realiza en Santiago en el contexto del Plan Estratégico al año 2030 y derivado de la Estrategia Santiago de Inclusión Social y Salvador de Vidas.
                                El Ministerio de Educación y su dirección regional en Santiago, la Asociación de Colegios Privados, la Gobernación Provincial, la Asociación Dominicana de Profesores (ADP) y la Pontificia Universidad Católica Madre y maestra (PUCMM) junto al Consejo Estratégico de Santiago (CDES), vienen articulándose para implementar una serie de Foros para fortalecer la calidad educativa que inician con esta actividad introductoria.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-1">
                            <h3 className="mt-4 font-medium line-clamp-5 text-left ">INTRANT, Alcaldía de Santiago y CDES acuerdan salvar vidas apoyando la seguridad vial.</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-ellipsis overflow-hidden line-clamp-7 text-left h-auto my-2">
                                El Instituto Nacional de Tránsito y Transporte Terrestre (Intrant), la alcaldía de Santiago y el Consejo para el Desarrollo Estratégico de Santiago (CDES), firmaron un acuerdo de colaboración con el objetivo de aunar esfuerzos para salvar vidas, con un plan de movilidad urbana integral y seguridad vial para esa ciudad.

                                El compromiso contempla el diseño, formulación y desarrollo de un programa modelo a nivel municipal de impacto rápido, integrando a todas las fuerzas de la sociedad, de cara al desarrollo de acciones preventivas para la reducción de la siniestrabilidad de tránsito, respeto a las leyes vigentes, y el reordenamiento del transporte en esa localidad.
                            </p>
                        </CardContent>
                    </div>
                </Card>

            </div>
            <div className="mx-auto max-w-5xl px-6 mt-16">
                <CarouselVideos />
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div
            aria-hidden
            className="bg-radial to-background absolute inset-0 from-transparent to-75%"
        />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)