"use client"
import { CalendarIcon, ClockIcon, MapPinIcon, InfoIcon, XIcon } from 'lucide-react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { useEffect, useState } from 'react'
 
import '@schedule-x/theme-default/dist/index.css'

// Definición de tipos
interface Evento {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  location: string;
  type: keyof typeof tiposEvento;
}

const tiposEvento = {
  evento: { 
    color: '#2563eb', 
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
    label: 'Evento' 
  },
  reunion_publica: { 
    color: '#059669', 
    backgroundColor: '#d1fae5',
    borderColor: '#059669',
    label: 'Reunión Pública' 
  },
  lanzamiento_proyecto: { 
    color: '#d97706',
    backgroundColor: '#fef3c7',
    borderColor: '#d97706', 
    label: 'Lanzamiento de Proyecto' 
  },
};

// Eventos para junio 2025 con los 3 tipos especificados
const eventosEjemplo: Evento[] = [
  {
    id: '1',
    title: 'Reunión Junta Directiva CDES',
    type: 'reunion_publica',
    description: 'Reunión mensual de la Junta Directiva para revisar avances del Plan Estratégico Santiago 2030 y aprobar nuevos proyectos de desarrollo urbano.',
    start: '2025-06-02 09:00',
    end: '2025-06-02 11:00',
    location: 'Oficinas centrales de CDES',
  },
  {
    id: '2',
    title: 'Foro de Movilidad Urbana Sostenible',
    type: 'evento',
    description: 'Foro público sobre estrategias de movilidad urbana sostenible en Santiago, con participación del INTRANT y expertos internacionales.',
    start: '2025-06-05 14:00',
    end: '2025-06-05 18:00',
    location: 'Auditorio INTRANT',
  },
  {
    id: '3',
    title: 'Taller de Planificación Participativa',
    type: 'evento',
    description: 'Taller dirigido a líderes comunitarios sobre metodologías de planificación participativa para el desarrollo local.',
    start: '2025-06-10 08:30',
    end: '2025-06-10 12:00',
    location: 'Sala de conferencias CDES',
  },
  {
    id: '7',
    title: 'Encuentro de Aliados Estratégicos',
    type: 'reunion_publica',
    description: 'Encuentro anual con organizaciones aliadas, sector privado y cooperación internacional para fortalecer alianzas estratégicas.',
    start: '2025-06-20 10:00',
    end: '2025-06-20 15:00',
    location: 'Hotel Plaza Santiago',
  },
  {
    id: '8',
    title: 'Conferencia: Desarrollo Económico Local',
    type: 'evento',
    description: 'Conferencia magistral sobre estrategias de desarrollo económico local y atracción de inversiones sostenibles.',
    start: '2025-06-23 19:00',
    end: '2025-06-23 21:00',
    location: 'Centro de Eventos y Convenciones',
  },
  {
    id: '9',
    title: 'Asamblea Comunitaria Sector Norte',
    type: 'reunion_publica',
    description: 'Asamblea con representantes comunitarios del sector norte de Santiago para evaluar proyectos de infraestructura.',
    start: '2025-06-25 18:00',
    end: '2025-06-25 20:00',
    location: 'Centro Comunitario Villa Esperanza',
  },
  {
    id: '10',
    title: 'Evaluación Trimestral de Proyectos',
    type: 'reunion_publica',
    description: 'Sesión de evaluación trimestral del progreso de proyectos prioritarios del Plan Estratégico con indicadores de gestión.',
    start: '2025-06-27 08:00',
    end: '2025-06-27 12:00',
    location: 'Sala de Juntas CDES',
  },
  {
    id: '11',
    title: 'Lanzamiento Programa Juventud Emprendedora',
    type: 'lanzamiento_proyecto',
    description: 'Evento de lanzamiento del Programa de Juventud Emprendedora en alianza con universidades locales y sector privado.',
    start: '2025-06-30 16:00',
    end: '2025-06-30 19:00',
    location: 'Universidad de Santiago',
  },
  {
    id: '12',
    title: 'Lanzamiento Centro de Innovación Urbana',
    type: 'lanzamiento_proyecto',
    description: 'Inauguración oficial del Centro de Innovación Urbana de Santiago, espacio para el desarrollo de soluciones tecnológicas.',
    start: '2025-06-13 10:00',
    end: '2025-06-13 13:00',
    location: 'Centro de Innovación Urbana',
  },
]

const CalendarApp = () => {
  const [eventsService] = useState(() => createEventsServicePlugin())
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null)
  const [filtrosActivos, setFiltrosActivos] = useState<(keyof typeof tiposEvento)[]>([])

  const handleTagClick = (type: keyof typeof tiposEvento) => {
    setFiltrosActivos(prevFiltros => 
      prevFiltros.includes(type)
        ? prevFiltros.filter(f => f !== type) // Desactivar filtro
        : [...prevFiltros, type] // Activar filtro
    )
  }

  const calendar = useCalendarApp({
    locale: 'es-ES',
    firstDayOfWeek: 0,
    defaultView: 'month-grid',
    views: [
      createViewDay(), 
      createViewWeek(), 
      createViewMonthGrid(), 
      createViewMonthAgenda()
    ],
    calendars: {
      evento: {
        colorName: 'blue',
        lightColors: { main: '#3b82f6', container: '#dbeafe', onContainer: '#1e40af' },
        darkColors: { main: '#60a5fa', container: '#1e40af', onContainer: '#dbeafe' },
      },
      reunion_publica: {
        colorName: 'green',
        lightColors: { main: '#10b981', container: '#d1fae5', onContainer: '#047857' },
        darkColors: { main: '#34d399', container: '#047857', onContainer: '#d1fae5' },
      },
      lanzamiento_proyecto: {
        colorName: 'amber',
        lightColors: { main: '#f59e0b', container: '#fef3c7', onContainer: '#b45309' },
        darkColors: { main: '#fbbf24', container: '#b45309', onContainer: '#fef3c7' },
      },
    },
    events: eventosEjemplo.map(evento => ({
      ...evento,
      calendarId: evento.type,
    })),
    plugins: [eventsService],
    callbacks: {
      onEventClick(calendarEvent) {
        const eventoId = calendarEvent.id
        const eventoCompleto = eventosEjemplo.find(e => e.id === eventoId)
        setEventoSeleccionado(eventoCompleto || null)
      }
    }
  })

  // Filtrar eventos cuando cambia el filtro
  useEffect(() => {
    const eventosParaMostrar = filtrosActivos.length > 0
      ? eventosEjemplo.filter(e => filtrosActivos.includes(e.type))
      : eventosEjemplo;

    eventsService.set(eventosParaMostrar.map(evento => ({
        ...evento,
        calendarId: evento.type,
    })));
  }, [filtrosActivos, eventsService]);
 
  const eventosFiltrados = filtrosActivos.length > 0
    ? eventosEjemplo.filter(evento => filtrosActivos.includes(evento.type))
    : eventosEjemplo

  return (
    <div className="w-full space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Calendario de Eventos CDES</h2>
        <p className="text-muted-foreground">
          Mantente al día con nuestros eventos, reuniones y actividades programadas
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Columna de Filtros */}
        <div className="w-full md:w-1/4 lg:w-1/5">
          <h3 className="text-lg font-semibold mb-4">Filtrar por tipo</h3>
          <div className="space-y-3">
            {Object.entries(tiposEvento).map(([key, tipo]) => {
              const isActive = filtrosActivos.includes(key as keyof typeof tiposEvento);
              return (
                <div 
                  key={key}
                  onClick={() => handleTagClick(key as keyof typeof tiposEvento)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    isActive 
                      ? 'shadow-lg scale-105' 
                      : 'opacity-80 hover:opacity-100 hover:shadow-md'
                  }`}
                  style={{ 
                    backgroundColor: isActive ? tipo.backgroundColor : `${tipo.color}10`,
                    borderColor: tipo.borderColor 
                  }}
                >
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: tipo.color }}
                  ></div>
                  <span className="text-sm font-medium" style={{ color: tipo.color }}>
                    {tipo.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Columna del Calendario */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="bg-background rounded-lg border shadow-sm">
            <ScheduleXCalendar calendarApp={calendar} />
          </div>
        </div>
      </div>
      
      {eventoSeleccionado && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg m-4 p-6 relative transform transition-all duration-300 ease-out scale-95 hover:scale-100">
            <button onClick={() => setEventoSeleccionado(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <XIcon className="w-6 h-6" />
            </button>
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-lg flex-shrink-0"
                style={{
                  backgroundColor: `${tiposEvento[eventoSeleccionado.type]?.backgroundColor}`,
                  border: `2px solid ${tiposEvento[eventoSeleccionado.type]?.borderColor}`
                }}
              ></div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{eventoSeleccionado.title}</h3>
                <div 
                  className="mt-2 inline-block px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: `${tiposEvento[eventoSeleccionado.type]?.backgroundColor}`,
                    color: tiposEvento[eventoSeleccionado.type]?.color
                  }}
                >
                  {tiposEvento[eventoSeleccionado.type]?.label}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <InfoIcon className="w-5 h-5 mt-1 text-gray-400" />
                <p>{eventoSeleccionado.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-gray-400" />
                <p>{eventoSeleccionado.location}</p>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="w-5 h-5 text-gray-400" />
                <p>{new Date(eventoSeleccionado.start).toLocaleString()} - {new Date(eventoSeleccionado.end).toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
              <span>ID del Evento</span>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">{eventoSeleccionado.id}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-sm text-muted-foreground space-y-1">
        <p>📅 Haz clic en un evento existente para ver todos los detalles</p>
        <p>🗓️ El calendario muestra {eventosFiltrados.length} de {eventosEjemplo.length} eventos programados</p>
        <div className="mt-2 text-xs">
          <strong>Distribución:</strong> 
          {Object.entries(tiposEvento).map(([key, tipo]) => {
            const count = eventosEjemplo.filter(e => e.type === key).length
            return (
              <span key={key} className="ml-2">
                {tipo.label}: {count}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
 
export default CalendarApp