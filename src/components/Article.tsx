import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, ArrowLeft, Share2, BookmarkPlus, Eye } from "lucide-react"
import { useState, useEffect } from "react"
// Reutilizar los tipos del componente NewsSection
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
    Portada: any
    updatedAt: string
    publishedAt: string
    Autor: string
    Etiquetas: any[]
    Categorias: any[]
    Parrafos: StrapiParrafo[]
}

interface Article {
    id: number
    title: string
    excerpt: string
    category: string
    author: string
    date: string
    readTime: string
    img: string
    featured: boolean
    content?: StrapiParrafo[]
    subtitle?: string
}

// Función para obtener un artículo específico
const fetchArticleById = async (id: string): Promise<Article | null> => {
    try {
        const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_URL}/api/articulos/${id}?populate=*`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${import.meta.env.PUBLIC_STRAPI_KEY || ''}`
            }
        })

        if (!response.ok) {
            throw new Error('Error al obtener el artículo')
        }

        console.log('Response:', response)
        const { data } = await response.json()
        
        if (!data) return null

        const article: StrapiArticle = data

        // Calcular tiempo de lectura
        const allContent = article.Parrafos.map(p => p.Contenido).join(' ')
        const wordsPerMinute = 200
        const wordCount = allContent.split(' ').length
        const readTime = Math.ceil(wordCount / wordsPerMinute)

        // Crear excerpt
        const excerpt = article.Parrafos && article.Parrafos.length > 0 
            ? article.Parrafos[0].Contenido.substring(0, 150) + "..."
            : article.Subtitulo || "Sin descripción disponible"

        return {
            id: article.id,
            title: article.Titulo,
            subtitle: article.Subtitulo || undefined,
            excerpt: excerpt,
            category: article.Categorias && article.Categorias.length > 0 
                ? article.Categorias[0] 
                : "General",
            author: article.Autor,
            date: new Date(article.publishedAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            readTime: `${readTime} min`,
            img: import.meta.env.PUBLIC_STRAPI_URL + article.Portada?.url,
            featured: false,
            content: article.Parrafos
        }
    } catch (error) {
        console.error('Error fetching article:', error)
        return null
    }
}

// Función para obtener artículos relacionados
const fetchRelatedArticles = async (currentId: string): Promise<Article[]> => {
    try {
        const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_URL}/api/articulos?populate=*&pagination[limit]=3&filters[id][$ne]=${currentId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${import.meta.env.PUBLIC_STRAPI_KEY || ''}`
            }
        })

        if (!response.ok) {
            throw new Error('Error al obtener artículos relacionados')
        }

        const { data } = await response.json()

        return data.map((article: StrapiArticle) => {
            const excerpt = article.Parrafos && article.Parrafos.length > 0 
                ? article.Parrafos[0].Contenido.substring(0, 100) + "..."
                : article.Subtitulo || "Sin descripción disponible"

            const allContent = article.Parrafos.map(p => p.Contenido).join(' ')
            const wordCount = allContent.split(' ').length
            const readTime = Math.ceil(wordCount / 200)

            return {
                id: article.id,
                title: article.Titulo,
                excerpt: excerpt,
                category: article.Categorias && article.Categorias.length > 0 
                    ? article.Categorias[0] 
                    : "General",
                author: article.Autor,
                date: new Date(article.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }),
                readTime: `${readTime} min`,
                img: "/placeholder.svg?height=200&width=300",
                featured: false
            }
        })
    } catch (error) {
        console.error('Error fetching related articles:', error)
        return []
    }
}

export default function NewsDetail({id}: {id: string}) {
  
    const [article, setArticle] = useState<Article | null>(null)
    const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    console.log('Article ID:', id)
    useEffect(() => {
        const loadArticle = async () => {
            if (!id) {
                setError('ID de artículo no válido')
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                const fetchedArticle = await fetchArticleById(id)
                
                if (!fetchedArticle) {
                    setError('Artículo no encontrado')
                    return
                }

                setArticle(fetchedArticle)
                
                // Cargar artículos relacionados
                const related = await fetchRelatedArticles(id)
                setRelatedArticles(related)
                
                setError(null)
            } catch (err) {
                setError('Error al cargar el artículo')
            } finally {
                setLoading(false)
            }
        }

        loadArticle()
    }, [id])

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article?.title,
                    text: article?.excerpt,
                    url: window.location.href,
                })
            } catch (err) {
                console.log('Error sharing:', err)
            }
        } else {
            // Fallback: copiar URL al clipboard
            navigator.clipboard.writeText(window.location.href)
            alert('URL copiada al portapapeles')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">Cargando artículo...</p>
                </div>
            </div>
        )
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground mb-4">
                        {error || 'Artículo no encontrado'}
                    </p>
                    <Button >
                        Volver a noticias
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header con botón de regreso */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                      
                        className="flex items-center space-x-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Volver a noticias</span>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Metadatos del artículo */}
                    <div className="mb-6">
                        <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">
                            {article.category}
                        </Badge>
                        
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                            {article.title}
                        </h1>
                        
                        {article.subtitle && (
                            <p className="text-xl text-muted-foreground mb-6">
                                {article.subtitle}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>
                                        {article.author
                                            .split(" ")
                                            .map((n: string) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{article.author}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{article.date}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{article.readTime} de lectura</span>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex space-x-2 mb-8">
                            <Button variant="outline" size="sm" onClick={handleShare}>
                                <Share2 className="h-4 w-4 mr-2" />
                                Compartir
                            </Button>
                            <Button variant="outline" size="sm">
                                <BookmarkPlus className="h-4 w-4 mr-2" />
                                Guardar
                            </Button>
                        </div>
                    </div>

                    {/* Imagen principal */}
                    <div className="mb-8">
                        <img
                            src={article.img}
                            alt={article.title}
                            className="w-full h-64 md:h-96 object-cover rounded-lg"
                        />
                    </div>

                    {/* Contenido del artículo */}
                    <article className="prose prose-lg max-w-none mb-12">
                        {article.content?.map((paragraph, index) => (
                            <div key={paragraph.id || index} className="mb-6">
                                <p className="text-lg leading-relaxed text-foreground">
                                    {paragraph.Contenido}
                                </p>
                            </div>
                        ))}
                    </article>

                    <Separator className="my-8" />

                    {/* Artículos relacionados */}
                    {relatedArticles.length > 0 && (
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold mb-6">Artículos relacionados</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedArticles.map((relatedArticle) => (
                                    <Card 
                                        key={relatedArticle.id} 
                                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                      
                                    >
                                        <img
                                            src={relatedArticle.img}
                                            alt={relatedArticle.title}
                                            className="w-full h-32 object-cover"
                                        />
                                        <CardHeader className="p-4">
                                            <Badge variant="outline" className="w-fit mb-2 text-xs">
                                                {relatedArticle.category}
                                            </Badge>
                                            <CardTitle className="text-sm line-clamp-2">
                                                {relatedArticle.title}
                                            </CardTitle>
                                            <CardDescription className="text-xs line-clamp-2">
                                                {relatedArticle.excerpt}
                                            </CardDescription>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                                                <span>{relatedArticle.author}</span>
                                                <span>{relatedArticle.readTime}</span>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    )
}