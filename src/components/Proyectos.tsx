"use client"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Target, 
  ArrowRight,
  Building,
  Leaf,
  Car,
  GraduationCap,
  Eye
} from 'lucide-react'

// Datos de proyectos actuales del CDES (simplificados según la imagen)
const proyectosActivos = [
  {
    id: 1,
    titulo: "Parque Central Metropolitano",
    objetivos: "Crear el principal espacio verde y recreativo de Santiago con áreas deportivas, culturales y de esparcimiento.",
    alcance: "500,000 habitantes beneficiados directamente",
    instituciones: ["Ayuntamiento de Santiago", "Ministerio de Obras Públicas", "BID"],
    imagen: "/proyecto-parque.jpg",
    icono: Leaf,
    color: "bg-green-500"
  },
  {
    id: 2,
    titulo: "Sistema de Transporte Público BRT",
    objetivos: "Implementar un sistema de transporte público rápido y eficiente para mejorar la movilidad urbana.",
    alcance: "800,000 habitantes con mejor acceso al transporte",
    instituciones: ["INTRANT", "MOPC", "Banco Mundial"],
    imagen: "/proyecto-transporte.jpg",
    icono: Car,
    color: "bg-blue-500"
  },
  {
    id: 3,
    titulo: "Centro de Innovación Urbana",
    objetivos: "Desarrollar un hub tecnológico para soluciones innovadoras y fomento del emprendimiento local.",
    alcance: "50,000 emprendedores capacitados y apoyados",
    instituciones: ["PUCMM", "INTEC", "Sector Privado"],
    imagen: "/proyecto-innovacion.jpg",
    icono: Building,
    color: "bg-purple-500"
  },
  {
    id: 4,
    titulo: "Programa Juventud Emprendedora",
    objetivos: "Capacitar y apoyar a jóvenes emprendedores con herramientas, financiamiento y mentorías.",
    alcance: "2,000 jóvenes capacitados anualmente",
    instituciones: ["Universidades Locales", "Sector Privado", "USAID"],
    imagen: "/proyecto-juventud.jpg",
    icono: GraduationCap,
    color: "bg-orange-500"
  }
]

export default function ProyectosSection() {
  return (
    <section className="bg-muted py-16 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header con Foto */}
        <div className="text-center mb-16">
          <div className="bg-background rounded-lg border shadow-sm p-8 mb-8">
            <div className="aspect-video overflow-hidden rounded-lg mb-6">
              <img
                src="/trabajadores.jpg"
                alt="Proyectos CDES Santiago"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='16' fill='%236b7280'%3EProyectos CDES Santiago%3C/text%3E%3C/svg%3E"
                }}
              />
            </div>
            <h2 className="text-4xl font-bold mb-4 font-playfair">
              Proyectos en Desarrollo
            </h2>
            <p className="text-muted-foreground text-lg font-inter max-w-4xl mx-auto">
              Profundizar más la importancia de CDES en los proyectos actualmente en desarrollo para 
              mejorar la ciudad de Santiago
            </p>
          </div>
        </div>

        {/* Grid de Proyectos - Estructura según imagen */}
        <div className="grid gap-8 lg:grid-cols-2">
          {proyectosActivos.map((proyecto) => {
            const IconComponent = proyecto.icono
            return (
              <Card key={proyecto.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    {/* Icono del proyecto */}
                    <div className={`${proyecto.color} p-3 rounded-full text-white flex-shrink-0`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 font-noto">
                        {proyecto.titulo}
                      </h3>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Objetivos */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">Objetivos</h4>
                    <p className="text-muted-foreground text-sm font-inter leading-relaxed">
                      {proyecto.objetivos}
                    </p>
                  </div>

                  {/* Alcance */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">Alcance</h4>
                    <p className="text-muted-foreground text-sm font-inter">
                      {proyecto.alcance}
                    </p>
                  </div>

                  {/* Instituciones Involucradas */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">Instituciones Involucradas</h4>
                    <div className="flex flex-wrap gap-2">
                      {proyecto.instituciones.map((institucion, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {institucion}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Botón Ver Detalles */}
                  <div className="pt-4 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles del Proyecto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer Section */}
        <div className="mt-16 bg-background rounded-lg border shadow-sm p-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-semibold font-playfair">
              Impacto en el Desarrollo de Santiago
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Proyectos Estratégicos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1.3M+</div>
                <div className="text-sm text-muted-foreground">Ciudadanos Beneficiados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">RD$ 11B</div>
                <div className="text-sm text-muted-foreground">Inversión Total</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Instituciones Aliadas</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg">
                Ver Todos los Proyectos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Únete como Aliado Estratégico
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}