import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

// Tipos para los artículos de Strapi

interface StrapiParrafo {
    __component: string
    id: number
    Contenido: string
}
interface StrapiArticle {
    id: number
    documentId: string
    Titulo: string
    Subtitulo: string | null
    createdAt: string
    updatedAt: string
       Portada?: any // Asumiendo que la portada es una URL de imagen
    publishedAt: string
    Autor: string
    Etiquetas: any[]
    Categorias: any[]
    Parrafos: StrapiParrafo[]
}
interface Article {
    id: number
    documentId?: string // Agregado para manejar el enlace a la noticia
    title: string
    excerpt: string
    category: string
    author: string
    date: string
    readTime: string
    img: string
    featured: boolean
}
// Función para obtener artículos de Strapi
const fetchArticles = async (): Promise<Article[]> => {
    try {
        const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_URL}/api/articulos?populate=*`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${import.meta.env.PUBLIC_STRAPI_KEY || ''}` // Asegúrate de tener tu token de API configurado
            }
        })

        if (!response.ok) {
            throw new Error('Error al obtener los artículos')
        }

        const { data } = await response.json()
        console.log(data)

        return data.map((article: StrapiArticle) => {
            // Crear excerpt de los primeros párrafos
            const excerpt = article.Parrafos && article.Parrafos.length > 0
                ? article.Parrafos[0].Contenido.substring(0, 150) + "..."
                : article.Subtitulo || "Sin descripción disponible";

            // Calcular tiempo de lectura basado en el contenido
            const allContent = article.Parrafos.map(p => p.Contenido).join(' ');
            const wordsPerMinute = 200;
            const wordCount = allContent.split(' ').length;
            const readTime = Math.ceil(wordCount / wordsPerMinute);

            // Determinar categoría (usar la primera si existe, sino usar "General")
            const category = article.Categorias && article.Categorias.length > 0
                ? article.Categorias[0]
                : "General";

            // Determinar si es destacado (puedes usar algún criterio, por ejemplo, artículos recientes)
            const isRecent = new Date(article.publishedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

            console.log(article.documentId)
            return {
                id: article.id,
                title: article.Titulo,
                excerpt: excerpt,
                documentId: article.documentId, // Agregar el ID del documento para el enlace
                category: typeof category === 'string' ? category : 'General',
                author: article.Autor,
                date: new Date(article.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }),
                readTime: `${readTime} min`,
                img: import.meta.env.PUBLIC_STRAPI_URL + article.Portada?.url, // Como no hay imagen en tu estructura
                featured: isRecent // Los artículos de la última semana serán destacados
            }
        })
    } catch (error) {
        console.error('Error fetching articles:', error)
        // Devolver artículos de fallback en caso de error
        return fallbackArticles
    }
}

// Artículos de fallback en caso de que falle la API
const fallbackArticles: Article[] = [
    {
        id: 1,
        title: "Avances en Inteligencia Artificial Transforman la Industria Tecnológica",
        excerpt:
            "Las últimas innovaciones en IA están revolucionando sectores desde la medicina hasta la educación, prometiendo un futuro más eficiente y automatizado.",
        category: "Tecnología",
        author: "María González",
        date: "2024-01-15",
        readTime: "5 min",
        img: "/placeholder.svg?height=400&width=600",
        featured: true,
    },
    {
        id: 2,
        title: "Crisis Climática: Nuevas Medidas Gubernamentales para 2024",
        excerpt: "El gobierno anuncia un paquete de medidas ambientales sin precedentes para combatir el cambio climático.",
        category: "Medio Ambiente",
        author: "Carlos Ruiz",
        date: "2024-01-14",
        readTime: "7 min",
        img: "/placeholder.svg?height=300&width=400",
        featured: false,
    },
    {
        id: 3,
        title: "Mercados Financieros Muestran Signos de Recuperación",
        excerpt:
            "Los índices bursátiles registran su mejor semana del año tras las últimas decisiones de política monetaria.",
        category: "Economía",
        author: "Ana Martín",
        date: "2024-01-13",
        readTime: "4 min",
        img: "/placeholder.svg?height=300&width=400",
        featured: false,
    },
    {
        id: 4,
        title: "Nuevos Desarrollos en Energía Solar Prometen Revolucionar el Sector",
        excerpt: "Científicos desarrollan células solares con eficiencia récord que podrían cambiar el panorama energético mundial.",
        category: "Energía",
        author: "Pedro Sánchez",
        date: "2024-01-12",
        readTime: "6 min",
        img: "/placeholder.svg?height=300&width=400",
        featured: false,
    },
    {
        id: 5,
        title: "Avances Médicos en Tratamientos contra el Cáncer",
        excerpt: "Nuevas terapias genéticas muestran resultados prometedores en ensayos clínicos recientes.",
        category: "Salud",
        author: "Dr. Carmen López",
        date: "2024-01-11",
        readTime: "8 min",
        img: "/placeholder.svg?height=300&width=400",
        featured: false,
    },
    {
        id: 6,
        title: "Reformas Educativas Implementadas en Todo el País",
        excerpt: "El sistema educativo nacional adopta nuevas metodologías de enseñanza basadas en tecnología.",
        category: "Educación",
        author: "Luis Fernández",
        date: "2024-01-10",
        readTime: "5 min",
        img: "/placeholder.svg?height=300&width=400",
        featured: false,
    },
    {
        id: 7,
        title: "Crecimiento Económico Supera Expectativas del Primer Trimestre",
        excerpt: "Los indicadores macroeconómicos reflejan una recuperación más sólida de la esperada.",
        category: "Economía",
        author: "Roberto García",
        date: "2024-01-09",
        readTime: "4 min",
        img: "/placeholder.svg?height=300&width=400",
        featured: false,
    },
    {
        id: 8,
        title: "Innovaciones en Transporte Público Urbano",
        excerpt: "Ciudades implementan sistemas de movilidad inteligente para reducir la congestión vehicular.",
        category: "Transporte",
        author: "Elena Martínez",
        date: "2024-01-08",
        readTime: "6 min",
        img: "/placeholder.svg?height=300&width=400",
        featured: false,
    },
    {
        id: 9,
        title: "Descubrimientos Arqueológicos Revelan Nueva Historia",
        excerpt: "Excavaciones recientes desenterran artefactos que cambian la comprensión de civilizaciones antiguas.",
        category: "Historia",
        author: "Dr. Miguel Torres",
        date: "2024-01-07",
        readTime: "7 min",
        img: "/placeholder.svg?height=300&width=400",
        featured: false,
    },
    {
        id: 10,
        title: "Cambios en Políticas de Seguridad Nacional",
        excerpt: "El gobierno anuncia nuevas medidas de seguridad en respuesta a amenazas emergentes.",
        category: "Política",
        author: "Isabel Rodríguez",
        date: "2024-01-06",
        readTime: "5 min",
        img: "/placeholder.svg?height=300&width=400",
        featured: false,
    }
]

export default function NewsHomePage() {
    const [currentPage, setCurrentPage] = useState(1)
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const articlesPerPage = 4

    // Cargar artículos al montar el componente
    useEffect(() => {
        const loadArticles = async () => {
            try {
                setLoading(true)
                const fetchedArticles = await fetchArticles()

                setArticles(fetchedArticles)
                setError(null)
            } catch (err) {
                setError('Error al cargar los artículos')
                setArticles(fallbackArticles)
            } finally {
                setLoading(false)
            }
        }

        loadArticles()
    }, [])

    // Obtener artículo destacado (el primero con featured: true o el primero de la lista)
    const featuredArticle = articles.find(article => article.featured) || articles[0]

    // Obtener artículos para paginación (excluyendo el destacado)
    const articlesForPagination = articles.filter(article => article.id !== featuredArticle?.id)

    // Calcular índices para paginación
    const indexOfLastArticle = currentPage * articlesPerPage
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
    const currentArticles = articlesForPagination.slice(indexOfFirstArticle, indexOfLastArticle)

    const totalPages = Math.ceil(articlesForPagination.length / articlesPerPage)

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        // Scroll al inicio de la sección de noticias
        document.getElementById('latest-news')?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            document.getElementById('latest-news')?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            document.getElementById('latest-news')?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // Mostrar loading o error
    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">Cargando artículos...</p>
                </div>
            </div>
        )
    }

    if (error || articles.length === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground mb-4">
                        {error || 'No se encontraron artículos'}
                    </p>
                    <Button onClick={() => window.location.reload()}>
                        Intentar de nuevo
                    </Button>
                </div>
            </div>
        )
    }

    if (!featuredArticle) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground">No hay artículos disponibles</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    {/* Featured Article */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Noticia Destacada</h2>
                        <Card className="overflow-hidden">
                            <a href={`/noticias/${featuredArticle.documentId}`}>
                                <div className="relative">
                                    <img
                                        src={featuredArticle.img}
                                        alt={featuredArticle.title}
                                        width={800}
                                        height={400}
                                        className="w-full h-64 md:h-80 object-cover"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700">
                                        {featuredArticle.category}
                                    </Badge>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-2xl md:text-3xl leading-tight">{featuredArticle.title}</CardTitle>
                                    <CardDescription className="text-base mt-2">{featuredArticle.excerpt}</CardDescription>
                                    <div className="flex items-center space-x-4 mt-4 text-sm text-muted-foreground">
                                        <div className="flex items-center space-x-1">
                                            <User className="h-4 w-4" />
                                            <span>{featuredArticle.author}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>{featuredArticle.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{featuredArticle.readTime}</span>
                                        </div>
                                    </div>
                                </CardHeader>
                            </a>
                        </Card>
                    </section>

                    {/* Latest News */}
                    <section id="latest-news">
                        <h2 className="text-2xl font-bold mb-6">Últimas Noticias</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentArticles.map((article: Article) => (
                                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <a href={`/noticias/${article.documentId}`}>
                                        <div className="relative">
                                            <img
                                                src={article.img || "/placeholder.svg"}
                                                alt={article.title}
                                                width={400}
                                                height={250}
                                                className="w-full h-48 object-cover"
                                            />
                                            <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700">{article.category}</Badge>
                                        </div>
                                        <CardHeader>
                                            <CardTitle className="text-lg leading-tight hover:text-primary cursor-pointer">
                                                {article.title}
                                            </CardTitle>
                                            <CardDescription className="mt-2">{article.excerpt}</CardDescription>
                                            <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src="/placeholder-user.jpg" />
                                                        <AvatarFallback>
                                                            {article.author
                                                                .split(" ")
                                                                .map((n: string) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span>{article.author}</span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <span>{article.date}</span>
                                                    <span>{article.readTime}</span>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </a>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Pagination */}
                    <div className="flex flex-col items-center space-y-4 mt-8">
                        {/* Información de página */}
                        <div className="text-sm text-muted-foreground">
                            Mostrando {((currentPage - 1) * articlesPerPage) + 1} - {Math.min(currentPage * articlesPerPage, articlesForPagination.length)} de {articlesForPagination.length} artículos
                        </div>

                        {/* Controles de paginación */}
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-2"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span>Anterior</span>
                            </Button>

                            {/* Números de página */}
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                    <Button
                                        key={pageNumber}
                                        variant={currentPage === pageNumber ? "default" : "outline"}
                                        size="sm"
                                        className="w-10 h-10"
                                        onClick={() => handlePageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </Button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-2"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                <span>Siguiente</span>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t bg-muted/50 mt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4">NoticiasHoy</h3>
                            <p className="text-sm text-muted-foreground">
                                Tu fuente confiable de noticias e información actualizada las 24 horas del día.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Secciones</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="hover:text-primary">
                                        Política
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary">
                                        Economía
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary">
                                        Tecnología
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary">
                                        Deportes
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Empresa</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="hover:text-primary">
                                        Acerca de
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary">
                                        Contacto
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary">
                                        Publicidad
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary">
                                        Términos
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Síguenos</h4>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="bg-black text-white">
                                    Twitter
                                </Button>
                                <Button variant="outline" size="sm" className="bg-black text-white">
                                    Facebook
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Separator className="my-8" />
                    <div className="text-center text-sm text-muted-foreground">
                        <p>&copy; 2024 NoticiasHoy. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

