"use client"
import { useState, useEffect } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'

// Eventos para junio 2025 con los 3 tipos especificados
const eventosEjemplo = [
  {
    id: '1',
    title: 'Reunión Junta Directiva CDES',
    type: 'reunion_publica',
    description: 'Reunión mensual de la Junta Directiva para revisar avances del Plan Estratégico Santiago 2030 y aprobar nuevos proyectos de desarrollo urbano.',
    start: '2025-06-02 09:00',
    end: '2025-06-02 11:00',
  },
  {
    id: '2',
    title: 'Foro de Movilidad Urbana Sostenible',
    type: 'evento',
    description: 'Foro público sobre estrategias de movilidad urbana sostenible en Santiago, con participación del INTRANT y expertos internacionales.',
    start: '2025-06-05 14:00',
    end: '2025-06-05 18:00',
  },
  {
    id: '3',
    title: 'Taller de Planificación Participativa',
    type: 'evento',
    description: 'Taller dirigido a líderes comunitarios sobre metodologías de planificación participativa para el desarrollo local.',
    start: '2025-06-10 08:30',
    end: '2025-06-10 12:00',
  },
  {
    id: '7',
    title: 'Encuentro de Aliados Estratégicos',
    type: 'reunion_publica',
    description: 'Encuentro anual con organizaciones aliadas, sector privado y cooperación internacional para fortalecer alianzas estratégicas.',
    start: '2025-06-20 10:00',
    end: '2025-06-20 15:00',
  },
  {
    id: '8',
    title: 'Conferencia: Desarrollo Económico Local',
    type: 'evento',
    description: 'Conferencia magistral sobre estrategias de desarrollo económico local y atracción de inversiones sostenibles.',
    start: '2025-06-23 19:00',
    end: '2025-06-23 21:00',
  },
  {
    id: '9',
    title: 'Asamblea Comunitaria Sector Norte',
    type: 'reunion_publica',
    description: 'Asamblea con representantes comunitarios del sector norte de Santiago para evaluar proyectos de infraestructura.',
    start: '2025-06-25 18:00',
    end: '2025-06-25 20:00',
  },
  {
    id: '10',
    title: 'Evaluación Trimestral de Proyectos',
    type: 'reunion_publica',
    description: 'Sesión de evaluación trimestral del progreso de proyectos prioritarios del Plan Estratégico con indicadores de gestión.',
    start: '2025-06-27 08:00',
    end: '2025-06-27 12:00',
  },
  {
    id: '11',
    title: 'Lanzamiento Programa Juventud Emprendedora',
    type: 'lanzamiento_proyecto',
    description: 'Evento de lanzamiento del Programa de Juventud Emprendedora en alianza con universidades locales y sector privado.',
    start: '2025-06-30 16:00',
    end: '2025-06-30 19:00',
  },
  {
    id: '12',
    title: 'Lanzamiento Centro de Innovación Urbana',
    type: 'lanzamiento_proyecto',
    description: 'Inauguración oficial del Centro de Innovación Urbana de Santiago, espacio para el desarrollo de soluciones tecnológicas.',
    start: '2025-06-13 10:00',
    end: '2025-06-13 13:00',
  }
]

// Configuración de colores para los 3 tipos de eventos
const tiposEvento = {
  evento: { 
    color: '#3b82f6', 
    backgroundColor: '#3b82f6',
    borderColor: '#2563eb',
    label: 'Evento' 
  },
  reunion_publica: { 
    color: '#10b981', 
    backgroundColor: '#10b981',
    borderColor: '#059669',
    label: 'Reunión Pública' 
  },
  lanzamiento_proyecto: { 
    color: '#f59e0b', 
    backgroundColor: '#f59e0b',
    borderColor: '#d97706',
    label: 'Lanzamiento de Proyecto' 
  }
}
 
function CalendarApp() {
  const [eventsService] = useState(() => createEventsServicePlugin())
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null)
  const [lastClickTime, setLastClickTime] = useState(0)
 
  // Update the calendar configuration:
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
    // Create separate calendars for each event type
    calendars: {
      evento: {
        colorName: 'blue',
        lightColors: {
          main: '#3b82f6',
          container: '#3b82f6',
          onContainer: '#ffffff',
        },
        darkColors: {
          main: '#3b82f6',
          onContainer: '#ffffff',
          container: '#3b82f6',
        },
      },
      reunion_publica: {
        colorName: 'green',
        lightColors: {
          main: '#10b981',
          container: '#10b981',
          onContainer: '#ffffff',
        },
        darkColors: {
          main: '#10b981',
          onContainer: '#ffffff',
          container: '#10b981',
        },
      },
      lanzamiento_proyecto: {
        colorName: 'orange',
        lightColors: {
          main: '#f59e0b',
          container: '#f59e0b',
          onContainer: '#ffffff',
        },
        darkColors: {
          main: '#f59e0b',
          onContainer: '#ffffff',
          container: '#f59e0b',
        },
      },
    },
    events: eventosEjemplo.map(evento => ({
      id: evento.id,
      title: evento.title,
      start: evento.start,
      end: evento.end,
      calendarId: evento.type, // This links to the calendar colors above
      _event: evento
    })),
    plugins: [eventsService],
    callbacks: {
      onEventClick(calendarEvent) {
        const eventoCompleto = calendarEvent._event || 
          eventosEjemplo.find(e => e.id === calendarEvent.id)
        setEventoSeleccionado(eventoCompleto)
      }
    }
  })

  // Aplicar colores dinámicamente
  useEffect(() => {
    const applyEventColors = () => {
      Object.entries(tiposEvento).forEach(([type, config]) => {
        const events = document.querySelectorAll(`[data-calendar-id="${type}"]`)
        events.forEach(event => {
          event.style.backgroundColor = config.backgroundColor + ' !important'
          event.style.borderColor = config.borderColor + ' !important'
          event.style.color = '#ffffff !important'
        })
      })
    }

    const timer = setTimeout(applyEventColors, 100)
    
    const observer = new MutationObserver(applyEventColors)
    const calendarElement = document.querySelector('.sx-react-calendar')
    
    if (calendarElement) {
      observer.observe(calendarElement, { 
        childList: true, 
        subtree: true 
      })
    }

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  // Manejar clicks en fechas de manera más específica
  useEffect(() => {
    const handleDateClick = (event) => {
      // Solo proceder si es un click directo en una celda de fecha vacía
      const target = event.target
      const now = Date.now()
      
      // Evitar múltiples clicks rápidos
      if (now - lastClickTime < 500) return
      
      // Verificar que sea un click en una celda de fecha vacía (no en eventos)
      const isDateCell = target.classList.contains('sx-month-grid-day') || 
                        target.classList.contains('sx-week-grid-day') ||
                        target.closest('.sx-month-grid-day') ||
                        target.closest('.sx-week-grid-day')
      
      // Verificar que no sea un click en un evento existente
      const isEvent = target.closest('.sx-event') || target.classList.contains('sx-event')
      
      if (isDateCell && !isEvent) {
        setLastClickTime(now)
        
        // Extraer la fecha del elemento clickeado
        let dateElement = target.closest('[data-date]') || target
        let dateStr = dateElement.getAttribute('data-date')
        
        if (!dateStr) {
          // Si no hay data-date, intentar extraer de la estructura del calendario
          const dayElement = target.closest('.sx-month-grid-day') || target.closest('.sx-week-grid-day')
          if (dayElement) {
            // Buscar la fecha en el texto del elemento o elementos relacionados
            const dateText = dayElement.textContent || dayElement.innerText
            if (dateText && !isNaN(parseInt(dateText))) {
              // Obtener el contexto del mes/año actual del calendario
              const currentDate = new Date()
              const year = currentDate.getFullYear()
              const month = currentDate.getMonth() + 1
              const day = parseInt(dateText)
              dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
            }
          }
        }
        
        if (dateStr) {
          const confirmar = confirm(`¿Crear un nuevo evento para ${dateStr}?`)
          if (confirmar) {
            const tipoEvento = prompt('Tipo de evento (evento/reunion_publica/lanzamiento_proyecto):', 'evento')
            const tipoValido = tiposEvento[tipoEvento] ? tipoEvento : 'evento'
            const tipoConfig = tiposEvento[tipoValido]
            
            const nuevoEvento = {
              id: Date.now().toString(),
              title: 'Nuevo Evento CDES',
              type: tipoValido,
              description: 'Evento creado por el usuario',
              start: `${dateStr} 09:00`,
              end: `${dateStr} 10:00`,
            }
            
            eventsService.add({
              id: nuevoEvento.id,
              title: nuevoEvento.title,
              start: nuevoEvento.start,
              end: nuevoEvento.end,
              calendarId: tipoValido,
              backgroundColor: tipoConfig.backgroundColor,
              borderColor: tipoConfig.borderColor,
              textColor: '#ffffff',
              color: tipoConfig.color,
              _event: nuevoEvento
            })
          }
        }
      }
    }

    // Agregar el event listener al calendario
    const calendarElement = document.querySelector('.sx-react-calendar')
    if (calendarElement) {
      calendarElement.addEventListener('click', handleDateClick)
      
      return () => {
        calendarElement.removeEventListener('click', handleDateClick)
      }
    }
  }, [eventsService, lastClickTime])
 
  useEffect(() => {
    console.log('Eventos de junio 2025 cargados:', eventosEjemplo.length)
  }, [eventsService])
 
  return (
    <div className="w-full space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Calendario de Eventos CDES</h2>
        <p className="text-muted-foreground">
          Mantente al día con nuestros eventos, reuniones y actividades programadas
        </p>
        
        {/* Leyenda de tipos de eventos */}
        <div className="mt-4 flex flex-wrap gap-3">
          {Object.entries(tiposEvento).map(([key, tipo]) => (
            <div 
              key={key}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border"
              style={{ 
                backgroundColor: `${tipo.color}20`, 
                borderColor: tipo.borderColor 
              }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: tipo.color }}
              ></div>
              <span className="text-sm font-medium" style={{ color: tipo.color }}>
                {tipo.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-background rounded-lg border shadow-sm">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
      
      {/* Panel de detalles del evento seleccionado */}
      {eventoSeleccionado && (
        <div className="bg-muted p-6 rounded-lg border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{eventoSeleccionado.title}</h3>
              <div 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border"
                style={{ 
                  backgroundColor: `${tiposEvento[eventoSeleccionado.type]?.color}20`,
                  borderColor: tiposEvento[eventoSeleccionado.type]?.borderColor
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tiposEvento[eventoSeleccionado.type]?.color }}
                ></div>
                <span 
                  className="text-xs font-medium"
                  style={{ color: tiposEvento[eventoSeleccionado.type]?.color }}
                >
                  {tiposEvento[eventoSeleccionado.type]?.label}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setEventoSeleccionado(null)}
              className="text-muted-foreground hover:text-foreground text-xl font-bold p-1 hover:bg-background rounded"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <strong className="text-sm">ID:</strong> 
              <span className="ml-2 text-sm">{eventoSeleccionado.id}</span>
            </div>
            <div>
              <strong className="text-sm">Tipo:</strong> 
              <span className="ml-2 text-sm">{eventoSeleccionado.type}</span>
            </div>
            <div>
              <strong className="text-sm">Fecha y Hora:</strong>
              <div className="text-sm text-muted-foreground ml-2">
                <div>📅 Inicio: {new Date(eventoSeleccionado.start).toLocaleString('es-ES')}</div>
                <div>🏁 Fin: {new Date(eventoSeleccionado.end).toLocaleString('es-ES')}</div>
              </div>
            </div>
            <div>
              <strong className="text-sm">Descripción:</strong>
              <p className="text-sm text-muted-foreground mt-1 ml-2">
                {eventoSeleccionado.description}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-sm text-muted-foreground space-y-1">
        <p>📅 Haz clic en un evento existente para ver todos los detalles</p>
        <p>🗓️ El calendario muestra {eventosEjemplo.length} eventos programados para junio 2025</p>
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