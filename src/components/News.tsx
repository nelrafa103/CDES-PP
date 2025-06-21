import { Card, CardContent, CardHeader } from '@/components/ui/card'
import CarouselVideos from "./Videos"
export default function NewsSection({ data, videos }: { data: any, videos: any }) {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent h-auto">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Noticias</h2>
                    <p className="mt-4">Mantente al tanto de lo último.</p>
                </div>
                {
                    data.map((entrada: any, index: number) => (
                        <Card className="max-h-auto  @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">

                            <div key={index} className="group shadow-zinc-950/5">
                                <CardHeader className="pb-1">
                                    <h3 className="mt-4 font-medium line-clamp-5 text-left">{entrada.data.Titulo}</h3>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-sm text-ellipsis overflow-hidden line-clamp-7 text-left h-auto my-2">
                                        {entrada.data.Parrafos[0].Contenido}
                                    </p>
                                </CardContent>
                            </div>

                        </Card>))
                }

            </div>
            <div className="mx-auto max-w-5xl px-6 mt-16">
                <CarouselVideos data={videos} />
            </div>
        </section>
    )
}

