import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Play, Pause } from "lucide-react"
import { useState } from "react"

export default function CarouselVideos({data}: {data: []}) {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)

  const videos = data.map((item: any) => {
    return {
      id: item.Contenido.id,
      title: item.Descripcion,
      thumbnail: "/hero-image.jpg",
      src: `${import.meta.env.PUBLIC_STRAPI_URL}${item.Contenido.url}`, // Asumiendo que el video es un campo opcional
      duration: "2:30", // Asumiendo que la duración es un campo opcional
    }
  }) 

  const handleVideoPlay = (videoId: number) => {
    setPlayingVideo(videoId)
  }

  const handleVideoPause = () => {
    setPlayingVideo(null)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Conócenos mas fondo</h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {videos.map((video) => (
            <CarouselItem key={video.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative group">
                    {/* Video Player */}
                    <video
                      className="w-full h-full aspect-video object-cover"
                      poster={video.thumbnail}
                      controls
                      preload="metadata"
                      onPlay={() => handleVideoPlay(video.id)}
                      onPause={handleVideoPause}
                    >
                      <source src={video.src} type="video/mp4" />
                      Tu navegador no soporta el elemento video.
                    </video>

                    {/* Overlay con información */}
                 
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      {/* Información adicional */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Desliza para ver más videos • {videos.length} videos disponibles</p>
      </div>
    </div>
  )
}
