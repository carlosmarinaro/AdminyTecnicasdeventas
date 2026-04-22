import React, { useState, useEffect, useMemo } from 'react';

const FLASHCARDS = [
  // ═══ TIPOS DE VENTA ═══
  { id: 1, cat: 'Tipos de Venta', q: '¿Cuáles son los 4 factores que diferencian las ventas?', a: 'Tipo de cliente, tipo de producto, forma de venta y complejidad del proceso.' },
  { id: 2, cat: 'Tipos de Venta', q: '¿Cuáles son los 4 tipos de empleo en ventas B2B?', a: 'Ventas de gremio, misioneras, consultivas y consultivas técnicas.' },
  { id: 3, cat: 'Tipos de Venta', q: '¿Qué caracteriza a las VENTAS MISIONERAS?', a: 'No cierran la venta en la visita. Su objetivo es generar demanda futura. Ejemplo clásico: visitadores médicos de laboratorios.' },
  { id: 4, cat: 'Tipos de Venta', q: '¿Qué diferencia a la VENTA CONSULTIVA TÉCNICA?', a: 'Productos/servicios técnicos o especializados. El vendedor necesita conocimiento profundo. Se trabaja con equipos multidisciplinarios (ej.: Boeing ↔ GE).' },
  { id: 5, cat: 'Tipos de Venta', q: 'Venta TRANSACCIONAL vs RELACIONAL', a: 'Transaccional: foco en cerrar rápido, volumen, precio, poca relación (ej.: supermercado). Relacional: largo plazo, confianza, fidelización (ej.: bancos, seguros).' },
  { id: 6, cat: 'Tipos de Venta', q: '¿Qué aspectos son comunes a todo vendedor (B2B y B2C)?', a: 'Capacidad de comunicación e interpersonal, conocimiento de productos, capacidad para descubrir necesidades, creatividad y empatía.' },

  // ═══ COMPRAS B2B ═══
  { id: 7, cat: 'Compras B2B', q: '¿Cuáles son los 3 TIPOS de situación de compra organizacional?', a: 'Tarea nueva, readquisición modificada y readquisición directa (de mayor a menor complejidad).' },
  { id: 8, cat: 'Compras B2B', q: 'Definí TAREA NUEVA', a: 'Primera vez que se compra. Alto riesgo e incertidumbre. Se siguen todas las etapas del proceso. Mucha información, muchos participantes, evaluación extensa.' },
  { id: 9, cat: 'Compras B2B', q: 'Definí READQUISICIÓN DIRECTA', a: 'Compra rutinaria, automática, al mismo proveedor. Se saltean etapas. Pocos participantes.' },
  { id: 10, cat: 'Compras B2B', q: '¿Qué es el CENTRO DE COMPRAS?', a: 'Conjunto de personas que participan o influyen en una compra. NO es un área formal, es un grupo interfuncional con diferentes roles y niveles de poder.' },
  { id: 11, cat: 'Compras B2B', q: 'Enumerá los 7 ROLES del centro de compras', a: 'Iniciador, Usuario, Influyente, Portero, Comprador, Decisor, Controlador. ⚠ Una misma persona puede cumplir varios roles.' },
  { id: 12, cat: 'Compras B2B', q: '¿Qué hace el INICIADOR?', a: 'DETECTA la necesidad. Ejemplo: el empleado que avisa que se rompió una máquina.' },
  { id: 13, cat: 'Compras B2B', q: '¿Qué hace el USUARIO?', a: 'USA el producto/servicio. Define las necesidades reales. Muchas veces también es iniciador.' },
  { id: 14, cat: 'Compras B2B', q: '¿Qué hace el INFLUYENTE?', a: 'ASESORA técnicamente. Ejemplo: ingeniero que recomienda especificaciones.' },
  { id: 15, cat: 'Compras B2B', q: '¿Qué hace el PORTERO?', a: 'FILTRA qué información llega al decisor. Tienen poder indirecto muy fuerte. Ejemplo: secretaria que decide a quién derivar una llamada.' },
  { id: 16, cat: 'Compras B2B', q: '¿Qué hace el COMPRADOR?', a: 'EJECUTA la compra formal. Contacta proveedores, negocia precio, contratos y pedidos. Ejemplo: departamento de compras.' },
  { id: 17, cat: 'Compras B2B', q: '¿Qué hace el DECISOR?', a: 'DEFINE. Tiene la autoridad final. Elige proveedor o producto. Ejemplo: director que aprueba una inversión grande.' },
  { id: 18, cat: 'Compras B2B', q: '¿Qué hace el CONTROLADOR?', a: 'FINANCIA. Controla el presupuesto. Ejemplo: gerente financiero.' },
  { id: 19, cat: 'Compras B2B', q: 'Enumerá las 7 ETAPAS del proceso de compra organizacional', a: '1) Necesidad → 2) Producto → 3) Proveedores → 4) Propuestas → 5) Evaluación → 6) Pedido → 7) Desempeño.' },
  { id: 20, cat: 'Compras B2B', q: '¿Qué es la DEMANDA DERIVADA?', a: 'La demanda de productos industriales depende del consumidor final. Ejemplo: si baja el turismo, baja la demanda de valijas.' },

  // ═══ CRM ═══
  { id: 21, cat: 'CRM', q: '¿Qué es el CRM?', a: 'Estrategia de negocio centrada en el cliente que integra marketing, ventas y servicio, utilizando información para mejorar la relación con los clientes.' },
  { id: 22, cat: 'CRM', q: '¿Cuáles son las 4 DIMENSIONES del CRM?', a: 'Filosofía (empresa centrada en el cliente), Estrategia (relaciones a largo plazo), Sistema (base de datos + tecnología), Proceso (integra todas las áreas).' },
  { id: 23, cat: 'CRM', q: '¿Cuáles son los 3 OBJETIVOS del CRM?', a: 'Fidelizar, conocer mejor al cliente y aumentar la rentabilidad.' },
  { id: 24, cat: 'CRM', q: '¿Cuáles son los 3 TIPOS de CRM?', a: 'Operativo, Analítico y Colaborativo.' },
  { id: 25, cat: 'CRM', q: '¿Qué hace el CRM OPERATIVO?', a: 'Automatiza procesos (ventas, marketing, servicio).' },
  { id: 26, cat: 'CRM', q: '¿Qué hace el CRM ANALÍTICO?', a: 'Analiza datos para tomar decisiones. Sirve, por ejemplo, para detectar oportunidades de venta cruzada.' },
  { id: 27, cat: 'CRM', q: '¿Qué hace el CRM COLABORATIVO?', a: 'Integra canales y áreas de la empresa.' },
  { id: 28, cat: 'CRM', q: 'CICLO CRM – versión clásica (4 etapas)', a: 'Atracción → Consideración → Compra → Fidelización.' },
  { id: 29, cat: 'CRM', q: 'CICLO CRM – versión detallada (4 etapas)', a: '1) Atracción/Descubrir conocimiento (puntos de contacto). 2) Consideración/Planear el marketing (mix). 3) Interactuar con los clientes (vender, promociones, soporte). 4) Analizar y afinar (respuestas y ROI).' },
  { id: 30, cat: 'CRM', q: '¿En qué casos el CRM NO conviene?', a: 'En empresas con enfoque transaccional (intercambios independientes) y en empresas que compiten exclusivamente por precio. Tampoco funciona si se lo piensa solo como software.' },
  { id: 31, cat: 'CRM', q: '¿Cuáles son las CLAVES del éxito del CRM?', a: 'Cultura centrada en el cliente, uso correcto de datos, capacitación del equipo e integración de áreas.' },
  { id: 32, cat: 'CRM', q: '¿Cuál es el ERROR COMÚN al pensar en CRM?', a: 'Creer que CRM = solo software. En realidad es filosofía, estrategia, sistema Y proceso.' },
  { id: 33, cat: 'CRM', q: '¿Cuáles son las funciones del CRM por ÁREA?', a: 'Marketing: segmentación, campañas personalizadas. Ventas: seguimiento de oportunidades, gestión de clientes. Servicio: atención postventa, resolución de problemas.' },

  // ═══ PROCESO DE VENTA ═══
  { id: 34, cat: 'Proceso de Venta', q: 'Enumerá las 7 ETAPAS del proceso de venta personal', a: '1) Prospección y calificación → 2) Enfoque previo → 3) Abordar → 4) Presentación → 5) Objeciones → 6) Cierre → 7) Seguimiento.' },
  { id: 35, cat: 'Proceso de Venta', q: '¿Por qué se llama "RUEDA de la Venta Personal"?', a: 'Porque es un ciclo continuo. No termina en el cierre: el seguimiento genera nuevas ventas y reinicia el ciclo.' },
  { id: 36, cat: 'Proceso de Venta', q: '¿Qué es el ARGUMENTARIO DE VENTAS?', a: 'Documento guía que estructura la presentación del producto: qué es, beneficios principales y respuestas a objeciones posibles.' },
  { id: 37, cat: 'Proceso de Venta', q: '¿Qué implica la etapa de ENFOQUE PREVIO?', a: 'Preparar al prospecto (siembra), conseguir la cita, recolectar información, evaluar necesidades, identificar beneficios, elegir estrategia y ENSAYAR el enfoque.' },

  // ═══ TÉCNICAS DE VENTA ═══
  { id: 38, cat: 'Técnicas de Venta', q: '¿Cuáles son las 4 TÉCNICAS de venta?', a: 'Estímulo-Respuesta, AIDA (estados de ánimo), Satisfacción de necesidades, Solución de problemas/Consultiva.' },
  { id: 39, cat: 'Técnicas de Venta', q: '¿Cuáles técnicas están centradas en las VENTAS y cuáles en el CLIENTE?', a: 'En las ventas: Estímulo-Respuesta y AIDA. En el cliente: Satisfacción de necesidades y Solución de problemas/Consultiva.' },
  { id: 40, cat: 'Técnicas de Venta', q: '¿Qué significa AIDA?', a: 'Atención → Interés → Deseo → Acción. Son los estados de ánimo sucesivos que experimenta el cliente frente al mensaje del vendedor.' },
  { id: 41, cat: 'Técnicas de Venta', q: '¿Qué caracteriza a la técnica ESTÍMULO-RESPUESTA?', a: 'El vendedor aprende una presentación estándar y responde según las reacciones del cliente. Ventaja: no requiere experiencia. Desventaja: no consulta necesidades específicas.' },
  { id: 42, cat: 'Técnicas de Venta', q: '¿Qué caracteriza a la VENTA CONSULTIVA / SOLUCIÓN DE PROBLEMAS?', a: 'El vendedor busca, evalúa y recomienda alternativas, INCLUSO SI NO SON SUYAS. Objetivo: relaciones de confianza duraderas.' },

  // ═══ OBJECIONES ═══
  { id: 43, cat: 'Objeciones y Cierres', q: 'Diferenciá OBJECIÓN VÁLIDA vs NO VÁLIDA', a: 'Válida: preocupación sincera que el prospecto debe resolver antes de comprar. No válida: acciones irrelevantes, excusas o razones ocultas para no comprar.' },
  { id: 44, cat: 'Objeciones y Cierres', q: '¿Cuáles son las 6 CATEGORÍAS de objeciones válidas?', a: 'Al producto, al precio, a la promoción, a la distribución, a la fuente y a las necesidades.' },
  { id: 45, cat: 'Objeciones y Cierres', q: '¿Cuáles son las 3 ESTRATEGIAS para manejar objeciones?', a: 'Mostrar pruebas (demos, prueba gratis), Cambio de enfoque (producto alterno, otra pregunta), Compensación (convenir, seguir el humor).' },

  // ═══ CIERRES ═══
  { id: 46, cat: 'Objeciones y Cierres', q: '¿Cuáles son las 3 FAMILIAS de cierres?', a: 'Cierres directos, cierres de aclaración y cierres psicológicos.' },
  { id: 47, cat: 'Objeciones y Cierres', q: '¿Qué es el cierre de SÍ/CUÁNDO?', a: 'Se pide al prospecto que aclare CUÁNDO hará el pedido (no si lo hará). Da por hecho el sí.' },
  { id: 48, cat: 'Objeciones y Cierres', q: '¿Qué es el cierre de SUGERENCIA?', a: 'Sugerir que numerosos clientes que ya compraron reportaron alta satisfacción, invitando al prospecto a hacer lo mismo.' },
  { id: 49, cat: 'Objeciones y Cierres', q: '¿Qué es el cierre de PROBABILIDAD?', a: 'Se le pide al prospecto una probabilidad cuantificada de formar el contrato en un futuro cercano.' },
  { id: 50, cat: 'Objeciones y Cierres', q: '¿Qué es el cierre del ACONTECIMIENTO INMINENTE?', a: 'Advertir al prospecto sobre un acontecimiento próximo (ej.: suba de precios, fin de promo) que hace más ventajoso comprar AHORA.' },

  // ═══ INFORMACIÓN Y MERCADO ═══
  { id: 51, cat: 'Mercado', q: '¿Cuáles son los 4 ELEMENTOS del análisis de oportunidades?', a: '1) Potencial de mercado, 2) Potencial de ventas, 3) Pronóstico de ventas, 4) Cuota de ventas.' },
  { id: 52, cat: 'Mercado', q: '¿Qué es el POTENCIAL DE MERCADO?', a: 'Total esperado de ventas por parte de todos los competidores, en un mercado específico, durante un tiempo determinado, en condiciones ideales. Responde: ¿cuánto se puede vender?' },
  { id: 53, cat: 'Mercado', q: '¿Cuál es la FÓRMULA del potencial de mercado?', a: 'Q = n × q × p. Donde: n = número de compradores, q = cantidad comprada promedio por año, p = precio unitario promedio.' },
  { id: 54, cat: 'Mercado', q: '¿Qué es el POTENCIAL DE VENTAS?', a: 'Porción del potencial de mercado que una empresa espera obtener. Es el límite máximo que MI marca puede alcanzar. Se calcula: Potencial de mercado × cuota de mercado máxima.' },
  { id: 55, cat: 'Mercado', q: '¿Qué es el PRONÓSTICO DE VENTAS?', a: 'Cuánto creo que voy a vender (en dinero o unidades, en un mercado y período). Siempre INFERIOR al potencial de ventas.' },
  { id: 56, cat: 'Mercado', q: '¿Qué es la CUOTA DE VENTAS?', a: 'Meta asignada a una unidad de mercado: vendedor, territorio, sucursal, zona o distribuidor. Responde: ¿cuánto debe vender cada uno?' },
  { id: 57, cat: 'Mercado', q: '¿Para qué sirve un PRONÓSTICO DE VENTAS?', a: 'Es punto de partida para: planeación de ventas y marketing, programación de producción, proyecciones de flujo de efectivo, planeación de RRHH y cálculo de presupuestos.' },
  { id: 58, cat: 'Mercado', q: 'Ordená de MAYOR a MENOR: potencial de mercado, potencial de ventas, pronóstico, cuota', a: 'Potencial de mercado > Potencial de ventas > Pronóstico ≥ Suma de cuotas.' },

  // ═══ MÉTODOS DE PRONÓSTICO ═══
  { id: 59, cat: 'Pronóstico', q: '¿Cuáles son las 2 grandes FAMILIAS de métodos de pronóstico?', a: 'Subjetivas (cualitativas) – basadas en opiniones. Objetivas (cuantitativas) – basadas en análisis cuantitativo.' },
  { id: 60, cat: 'Pronóstico', q: 'Nombrá las 5 TÉCNICAS SUBJETIVAS de pronóstico', a: 'A) Pronóstico ingenuo, B) Expectativas de usuarios, C) Opinión de vendedores, D) Jurado de opinión ejecutiva, E) Técnica DELFOS.' },
  { id: 61, cat: 'Pronóstico', q: 'Nombrá las 3 TÉCNICAS OBJETIVAS de pronóstico', a: 'A) Prueba de mercado, B) Series de tiempo (promedio móvil, suavizamiento exponencial, ARIMA), C) Métodos causales (regresión).' },
  { id: 62, cat: 'Pronóstico', q: '¿Qué es el JURADO DE OPINIÓN EJECUTIVA?', a: 'Se pide a los gerentes clave (marketing, ventas, finanzas, producción, logística) su mejor estimación de ventas y se combinan/promedian. Las divergencias se ajustan en grupo.' },
  { id: 63, cat: 'Pronóstico', q: 'Diferenciá ACUMULACIÓN vs DESGLOSE', a: 'Acumulación (bottom-up): parte del vendedor/territorio; flujo ascendente; usado en empresas con pocos clientes clave. Desglose (top-down): parte de la economía/gerencia; flujo descendente; usado en consumo masivo.' },
  { id: 64, cat: 'Pronóstico', q: '¿Cuáles son los 6 CRITERIOS para evaluar un método de pronóstico?', a: 'Exactitud, Comprensibilidad, Calidad y cantidad de información, Costos/Beneficios, Flexibilidad, Oportunidad.' },
  { id: 65, cat: 'Pronóstico', q: '¿Cuáles son los ERRORES COMUNES al pronosticar?', a: 'Confiar en un solo método, no actualizar el pronóstico, ignorar el contexto. Solución: combinar métodos + escenarios + criterio gerencial.' },

  // ═══ CUOTAS ═══
  { id: 66, cat: 'Cuotas', q: '¿Para qué sirven las CUOTAS de ventas?', a: '1) Planificar: traducir el pronóstico en metas concretas. 2) Evaluar el desempeño del vendedor y facilitar la toma de decisiones gerenciales.' },
  { id: 67, cat: 'Cuotas', q: '¿Cuáles son las 3 FORMAS de fijar cuotas?', a: '1) Por volumen de ventas (dinero / unidades / puntos). 2) Por actividades (visitas, demos). 3) Por criterios financieros (márgenes, rentabilidad).' },
  { id: 68, cat: 'Cuotas', q: '¿Cuándo se usa cuota basada en DINERO?', a: 'Cuando la empresa vende un gran número de productos diferentes. Permite comparar contra gastos de ventas o comisiones.' },
  { id: 69, cat: 'Cuotas', q: '¿Cuándo se usa cuota basada en UNIDADES?', a: 'Para representantes que venden artículos muy costosos, o cuando hay pocos productos con precios inestables.' },
  { id: 70, cat: 'Cuotas', q: '¿Para qué sirve la cuota basada en PUNTOS?', a: 'Para EVITAR que los vendedores concentren esfuerzos en pocos productos fáciles de vender. Asigna puntos variables por producto para incentivar vender ciertos productos sobre otros.' },
  { id: 71, cat: 'Cuotas', q: '¿Cuál es el RIESGO de las cuotas por actividades?', a: 'Que el personal las haga "mecánicamente" sin motivación real. Por eso se sugiere combinarlas con cuotas de volumen de ventas.' },
  { id: 72, cat: 'Cuotas', q: '¿Qué CARACTERÍSTICAS debe tener una buena cuota?', a: 'Realista, clara y precisa, objetiva, fácil de administrar y medible, flexible, equitativa, que incluya solo responsabilidades clave, y que permita retroalimentación regular.' },
];

const CATEGORIES = ['Todas', 'Tipos de Venta', 'Compras B2B', 'CRM', 'Proceso de Venta', 'Técnicas de Venta', 'Objeciones y Cierres', 'Mercado', 'Pronóstico', 'Cuotas'];

const STORAGE_KEY = 'ventas-flashcards-progress-v1';

export default function FlashcardsApp() {
  const [filter, setFilter] = useState('Todas');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState(new Set());
  const [shuffled, setShuffled] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load progress
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY);
        if (result && result.value) {
          const data = JSON.parse(result.value);
          if (data.known) setKnownIds(new Set(data.known));
        }
      } catch (e) {
        // First visit - no data yet
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Save progress
  useEffect(() => {
    if (loading) return;
    (async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify({ known: Array.from(knownIds) }));
      } catch (e) {}
    })();
  }, [knownIds, loading]);

  const filtered = useMemo(() => {
    let list = FLASHCARDS.filter((c) => filter === 'Todas' || c.cat === filter);
    if (shuffled) {
      const seeded = [...list];
      // Seeded shuffle
      let s = shuffleSeed;
      for (let i = seeded.length - 1; i > 0; i--) {
        s = (s * 9301 + 49297) % 233280;
        const j = Math.floor((s / 233280) * (i + 1));
        [seeded[i], seeded[j]] = [seeded[j], seeded[i]];
      }
      return seeded;
    }
    return list;
  }, [filter, shuffled, shuffleSeed]);

  // Reset index when filter changes
  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [filter, shuffled, shuffleSeed]);

  const card = filtered[index];
  const total = filtered.length;
  const knownInFilter = filtered.filter((c) => knownIds.has(c.id)).length;

  const goNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, 150);
  };

  const goPrev = () => {
    setFlipped(false);
    setTimeout(() => {
      setIndex((i) => (i - 1 + total) % total);
    }, 150);
  };

  const markKnown = () => {
    if (!card) return;
    const next = new Set(knownIds);
    next.add(card.id);
    setKnownIds(next);
    goNext();
  };

  const markUnknown = () => {
    if (!card) return;
    const next = new Set(knownIds);
    next.delete(card.id);
    setKnownIds(next);
    goNext();
  };

  const toggleShuffle = () => {
    setShuffled((s) => !s);
    setShuffleSeed(Date.now() % 100000);
  };

  const resetProgress = () => {
    if (confirm('¿Reiniciar todo el progreso? Se borrarán las tarjetas marcadas como sabidas.')) {
      setKnownIds(new Set());
    }
  };

  const progressPct = total > 0 ? (knownInFilter / total) * 100 : 0;

  if (loading) {
    return (
      <div style={{ backgroundColor: '#F2EADF' }} className="min-h-screen flex items-center justify-center">
        <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#3D2914' }} className="text-lg">
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600&display=swap');

        .paper-texture {
          background-color: #F2EADF;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(61, 41, 20, 0.06) 1px, transparent 0);
          background-size: 18px 18px;
        }

        .flip-card {
          perspective: 1200px;
        }
        .flip-inner {
          transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform-style: preserve-3d;
          position: relative;
        }
        .flip-inner.flipped {
          transform: rotateY(180deg);
        }
        .flip-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .flip-face.back {
          transform: rotateY(180deg);
        }

        .card-shadow {
          box-shadow:
            0 1px 2px rgba(61, 41, 20, 0.04),
            0 8px 24px rgba(61, 41, 20, 0.08),
            0 24px 48px rgba(61, 41, 20, 0.06);
        }

        .btn-primary:hover { background-color: #6B2818; }
        .btn-primary:active { transform: translateY(1px); }

        .btn-ghost:hover { background-color: rgba(61, 41, 20, 0.06); }

        .pill:hover { background-color: rgba(125, 46, 26, 0.1); }
        .pill.active { background-color: #7D2E1A; color: #F2EADF; }

        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .scroll-x::-webkit-scrollbar { height: 0; }
        .scroll-x { scrollbar-width: none; }
      `}</style>

      <div className="paper-texture min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="max-w-2xl mx-auto px-4 py-6 pb-32">

          {/* Header */}
          <header className="mb-6">
            <div className="flex items-baseline justify-between mb-1">
              <div>
                <div style={{ fontFamily: 'Fraunces, serif', color: '#7D2E1A', letterSpacing: '0.15em' }} className="text-[11px] font-semibold uppercase">
                  Fichas de estudio
                </div>
                <h1 style={{ fontFamily: 'Fraunces, serif', color: '#3D2914' }} className="text-[28px] font-bold leading-tight">
                  Ventas <span style={{ fontStyle: 'italic', fontWeight: 400 }}>· UADE</span>
                </h1>
              </div>
              <button
                onClick={resetProgress}
                className="btn-ghost px-2 py-1 rounded text-xs transition-colors"
                style={{ color: '#6B4423' }}
                title="Reiniciar progreso"
              >
                ↺ reset
              </button>
            </div>

            {/* Stats bar */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span style={{ color: '#6B4423' }} className="text-xs font-medium">
                    {knownInFilter} de {total} sabidas
                  </span>
                  <span style={{ color: '#7D2E1A', fontFamily: 'Fraunces, serif' }} className="text-xs font-semibold">
                    {Math.round(progressPct)}%
                  </span>
                </div>
                <div className="h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(61, 41, 20, 0.1)' }}>
                  <div
                    className="h-full transition-all duration-500"
                    style={{ width: `${progressPct}%`, backgroundColor: '#7D2E1A' }}
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Filter pills */}
          <div className="scroll-x overflow-x-auto mb-5 -mx-4 px-4">
            <div className="flex gap-2 pb-1" style={{ width: 'max-content' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`pill px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${filter === cat ? 'active' : ''}`}
                  style={{
                    backgroundColor: filter === cat ? '#7D2E1A' : 'rgba(61, 41, 20, 0.05)',
                    color: filter === cat ? '#F2EADF' : '#6B4423',
                    border: filter === cat ? '1px solid #7D2E1A' : '1px solid rgba(61, 41, 20, 0.1)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Card counter + shuffle */}
          <div className="flex items-center justify-between mb-3">
            <div style={{ fontFamily: 'Fraunces, serif', color: '#6B4423' }} className="text-sm">
              <span className="font-semibold">{index + 1}</span>
              <span style={{ opacity: 0.5 }}> / {total}</span>
            </div>
            <button
              onClick={toggleShuffle}
              className="text-xs px-3 py-1 rounded-full transition-all flex items-center gap-1.5"
              style={{
                color: shuffled ? '#F2EADF' : '#6B4423',
                backgroundColor: shuffled ? '#3D2914' : 'transparent',
                border: shuffled ? '1px solid #3D2914' : '1px solid rgba(61, 41, 20, 0.2)',
              }}
            >
              <span style={{ fontSize: '0.9em' }}>⇌</span>
              {shuffled ? 'Mezclado' : 'Mezclar'}
            </button>
          </div>

          {/* THE CARD */}
          {card && (
            <div className="flip-card w-full" style={{ minHeight: '380px' }}>
              <div
                className={`flip-inner w-full h-full ${flipped ? 'flipped' : ''}`}
                style={{ minHeight: '380px' }}
                onClick={() => setFlipped((f) => !f)}
              >
                {/* FRONT - Question */}
                <div
                  className="flip-face front card-shadow rounded-2xl p-7 cursor-pointer fade-in"
                  style={{
                    backgroundColor: '#FEFCF7',
                    border: '1px solid rgba(61, 41, 20, 0.08)',
                  }}
                  key={`front-${card.id}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      style={{
                        fontFamily: 'Fraunces, serif',
                        color: '#7D2E1A',
                        letterSpacing: '0.1em',
                      }}
                      className="text-[10px] font-semibold uppercase"
                    >
                      {card.cat}
                    </div>
                    {knownIds.has(card.id) && (
                      <div
                        style={{ color: '#4A7C3A', fontFamily: 'Fraunces, serif' }}
                        className="text-xs font-semibold flex items-center gap-1"
                      >
                        ✓ sabida
                      </div>
                    )}
                  </div>

                  <div style={{ color: 'rgba(61, 41, 20, 0.3)', fontFamily: 'Fraunces, serif' }} className="text-xs mb-3 italic">
                    Pregunta
                  </div>

                  <p
                    style={{
                      fontFamily: 'Fraunces, serif',
                      color: '#2A1A0A',
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                    className="text-2xl sm:text-3xl"
                  >
                    {card.q}
                  </p>

                  <div
                    className="absolute bottom-6 left-7 right-7 flex items-center justify-between"
                    style={{ color: 'rgba(61, 41, 20, 0.4)' }}
                  >
                    <span className="text-[11px]">Tocá para ver respuesta</span>
                    <span style={{ fontSize: '1.2em' }}>↻</span>
                  </div>
                </div>

                {/* BACK - Answer */}
                <div
                  className="flip-face back card-shadow rounded-2xl p-7 cursor-pointer"
                  style={{
                    backgroundColor: '#1F1710',
                    border: '1px solid #3D2914',
                  }}
                  key={`back-${card.id}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      style={{
                        fontFamily: 'Fraunces, serif',
                        color: '#C8956D',
                        letterSpacing: '0.1em',
                      }}
                      className="text-[10px] font-semibold uppercase"
                    >
                      {card.cat}
                    </div>
                    <div
                      style={{ color: '#C8956D', fontFamily: 'Fraunces, serif', opacity: 0.7 }}
                      className="text-[10px] uppercase tracking-wider"
                    >
                      #{card.id}
                    </div>
                  </div>

                  <div style={{ color: 'rgba(242, 234, 223, 0.4)', fontFamily: 'Fraunces, serif' }} className="text-xs mb-3 italic">
                    Respuesta
                  </div>

                  <p
                    style={{
                      fontFamily: 'Fraunces, serif',
                      color: '#F2EADF',
                      lineHeight: 1.5,
                    }}
                    className="text-lg sm:text-xl"
                  >
                    {card.a}
                  </p>

                  <div
                    className="absolute bottom-6 left-7 right-7 text-center"
                    style={{ color: 'rgba(242, 234, 223, 0.3)' }}
                  >
                    <span className="text-[11px]">Tocá para volver a la pregunta</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom navigation */}
          <div className="mt-6 space-y-3">
            {/* Know / Don't know buttons (only when flipped) */}
            {flipped && (
              <div className="grid grid-cols-2 gap-3 fade-in">
                <button
                  onClick={markUnknown}
                  className="py-3 rounded-xl font-medium text-sm transition-all"
                  style={{
                    backgroundColor: 'rgba(61, 41, 20, 0.08)',
                    color: '#6B4423',
                    border: '1px solid rgba(61, 41, 20, 0.15)',
                  }}
                >
                  😕 Repasar
                </button>
                <button
                  onClick={markKnown}
                  className="py-3 rounded-xl font-medium text-sm transition-all text-white"
                  style={{
                    backgroundColor: '#4A7C3A',
                  }}
                >
                  ✓ Sabía
                </button>
              </div>
            )}

            {/* Prev / Flip / Next */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={goPrev}
                className="py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: 'rgba(61, 41, 20, 0.05)',
                  color: '#6B4423',
                  border: '1px solid rgba(61, 41, 20, 0.12)',
                }}
              >
                ← Anterior
              </button>
              <button
                onClick={() => setFlipped((f) => !f)}
                className="py-3 rounded-xl text-sm font-semibold btn-primary transition-all text-white"
                style={{
                  backgroundColor: '#7D2E1A',
                  fontFamily: 'Fraunces, serif',
                }}
              >
                {flipped ? 'Pregunta' : 'Respuesta'}
              </button>
              <button
                onClick={goNext}
                className="py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: 'rgba(61, 41, 20, 0.05)',
                  color: '#6B4423',
                  border: '1px solid rgba(61, 41, 20, 0.12)',
                }}
              >
                Siguiente →
              </button>
            </div>
          </div>

          {/* Footer hint */}
          <div
            className="text-center mt-8 pt-6"
            style={{
              color: 'rgba(61, 41, 20, 0.4)',
              borderTop: '1px dashed rgba(61, 41, 20, 0.15)',
              fontFamily: 'Fraunces, serif',
              fontStyle: 'italic',
            }}
          >
            <p className="text-xs">
              Tu progreso se guarda automáticamente entre sesiones.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
