export type DeepBlock = { title: string; body: string };
export type DeepChoice = { id: string; title: string; description: string; feedback: string; integrity: "strong" | "mixed" | "weak"; impact: Partial<Record<"readiness" | "environment" | "evidence" | "delivery", number>> };
export type DeepDecision = { title: string; prompt: string; detail: string; choices: DeepChoice[] };
export type DeepModule = { intro: string; before: DeepBlock[]; checklist: string[]; insights: string[]; decisions: DeepDecision[]; after: DeepBlock[] };
/** Escenarios didácticos ficticios; no son datos, autorizaciones ni resultados operativos de Airbus. */
export const deepModules: Record<string, DeepModule> = {
  "route": {
    "intro": "Un actuador de control de vuelo debe llegar a una base en 36 horas. No basta con seleccionar el transporte con menos emisiones: hay que respetar la configuración aprobada, la trazabilidad, el plazo y todos los tramos incluidos en el cálculo. Las cifras son ficticias y no representan operaciones reales de Airbus.",
    "before": [
      {
        "title": "1 · Comparar transportes equivalentes",
        "body": "La comparación debe utilizar la misma pieza, cantidad, origen, destino, plazo y requisitos técnicos. Explica cómo se estiman los kg de CO₂ equivalente, qué tramos se incluyen y cómo se asignan emisiones a cargas compartidas. Una cifra sin límites y método documentados no es una comparación sólida."
      },
      {
        "title": "2 · Disponibilidad y trazabilidad",
        "body": "Una pieza localizada en otro almacén no es automáticamente intercambiable. Verifica configuración, elegibilidad, documentación y margen de entrega. Una ruta con bajas emisiones pero un riesgo inaceptable de inmovilización no cumple la misma función que una opción operativamente viable."
      },
      {
        "title": "3 · Aprender de las urgencias repetidas",
        "body": "Los expedites recurrentes pueden deberse a previsiones deficientes, mala visibilidad de existencias, bloqueos de reparación o decisiones tardías. Una mejora sostenible puede consistir en evitar transportes innecesarios mediante mejores procesos, no en prohibir sin excepciones el transporte rápido."
      },
      {
        "title": "4 · Evidencia y declaraciones prudentes",
        "body": "Distingue movimientos planificados, reservados y realizados. Incluye desvíos, cancelaciones y reasignaciones en el balance. Solo se puede hablar de transporte evitado si el trayecto original no se realizó. No publiques porcentajes de ahorro basados en presupuestos que usan metodologías distintas."
      }
    ],
    "checklist": [
      "Verificar plazo y conformidad de la pieza.",
      "Comparar límites y asignación de emisiones equivalentes.",
      "Confirmar existencias alternativas y cancelaciones.",
      "Investigar las causas de las urgencias recurrentes."
    ],
    "insights": [
      "Compara rutas viables y homogéneas, no cifras aisladas.",
      "Una conexión cancelada cambia las hipótesis: hay que reevaluar el plan.",
      "El ahorro exige un mismo perímetro de cálculo.",
      "La urgencia justificada debe documentarse con transparencia.",
      "La mejora duradera actúa sobre las causas de los expedites."
    ],
    "decisions": [
      {
        "title": "Validar las estimaciones",
        "prompt": "Dos transportistas presentan emisiones diferentes, pero uno omite un tramo intermedio.",
        "detail": "También utilizan métodos distintos para repartir la carga compartida.",
        "choices": [
          {
            "id": "route-common",
            "title": "Recalcular con límites equivalentes",
            "description": "Incluir todos los tramos y un método de asignación coherente, indicando incertidumbre.",
            "feedback": "Correcto. Sin una comparación homogénea no puede sostenerse la reducción anunciada.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "route-headline",
            "title": "Elegir la cifra más baja",
            "description": "Publicar el ahorro anunciado sin revisar el alcance.",
            "feedback": "La cifra más baja no demuestra una mejora si los límites del cálculo difieren.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "route-dismiss",
            "title": "Ignorar las emisiones",
            "description": "Decidir únicamente por rapidez al encontrar datos inconsistentes.",
            "feedback": "La disponibilidad importa, pero la diferencia metodológica debe resolverse o explicarse.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Documentar una excepción",
        "prompt": "Solo el transporte aéreo urgente cumple el plazo aprobado.",
        "detail": "Las otras rutas no llegan a tiempo ni con sus márgenes de seguridad.",
        "choices": [
          {
            "id": "route-record",
            "title": "Autorizar y registrar la contrapartida",
            "description": "Anotar el requisito operativo, impacto estimado, responsable y acción preventiva.",
            "feedback": "Una excepción necesaria puede ser responsable sin convertirse en beneficio ambiental.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "route-spin",
            "title": "Describirlo como transporte sostenible",
            "description": "Presentar la urgencia como prueba de mejora climática.",
            "feedback": "La necesidad operativa no elimina el impacto del envío excepcional.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "route-risk",
            "title": "Elegir la ruta lenta en cualquier caso",
            "description": "Incumplir el compromiso para minimizar la cifra de emisiones.",
            "feedback": "Una cifra ambiental más favorable no compensa automáticamente un riesgo operativo inadmisible.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Evitar la siguiente urgencia",
        "prompt": "Se han producido tres expedites de la misma familia de componentes.",
        "detail": "Los registros sugieren problemas repetidos de previsión y visibilidad.",
        "choices": [
          {
            "id": "route-learn",
            "title": "Analizar causas y mejorar la información",
            "description": "Asignar acciones y medir las urgencias antes y después del cambio.",
            "feedback": "La mejora se demuestra reduciendo movimientos evitables sin perjudicar el servicio.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "route-ban",
            "title": "Prohibir todos los envíos urgentes",
            "description": "Aplicar un objetivo sin contemplar excepciones técnicas.",
            "feedback": "Una prohibición absoluta puede trasladar el riesgo a operaciones.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "route-buy",
            "title": "Duplicar existencias en todas partes",
            "description": "Comprar stock adicional sin analizar criticidad y demanda.",
            "feedback": "El exceso puede aumentar obsolescencia y recursos consumidos.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      }
    ],
    "after": [
      {
        "title": "Método para una decisión logística",
        "body": "Empieza por la configuración aprobada, la trazabilidad y el plazo. Compara únicamente alternativas operativamente viables y con el mismo perímetro de emisiones. Documenta incertidumbre, desvíos y excepciones. No presentes como ambientalmente positiva una opción que solo es imprescindible desde el punto de vista del servicio."
      },
      {
        "title": "Cómo verificar una mejora",
        "body": "Conserva masas, tramos, fechas, factores, reservas y evidencias de cancelación. Analiza varios envíos comparables antes de atribuir menos expedites a una mejora de procesos. La puntuación de este juego no prueba una reducción real de emisiones de Airbus."
      },
      {
        "title": "Traslado al puesto de trabajo",
        "body": "Logística, planificación, gestión de configuración y programas pueden acordar un proceso común para revisar incidencias recurrentes. El resultado útil es una decisión trazable, discutible y mejorable, no la alternativa con la etiqueta más verde."
      }
    ]
  },
  "energy": {
    "intro": "Un centro de servicio debe mejorar su eficiencia energética mientras crece la actividad y varían las temperaturas. Aprende a distinguir consumo total, indicadores de intensidad y ahorros modelizados antes de seleccionar medidas.",
    "before": [
      {
        "title": "1 · Crear una línea base útil",
        "body": "Define contadores, superficie, periodo, turnos y condiciones de operación. El kWh total y el kWh/m² responden a preguntas diferentes. Una reducción de intensidad puede coexistir con un aumento del consumo absoluto, por lo que deben mostrarse ambos resultados."
      },
      {
        "title": "2 · Identificar los usos significativos",
        "body": "Ventilación, calefacción, refrigeración, aire comprimido y equipos de ensayo tienen perfiles distintos. No se debe reducir una extracción necesaria para cumplir un objetivo numérico. Analiza los usos antes de actuar sobre horarios, control o submedición."
      },
      {
        "title": "3 · Verificar en lugar de suponer",
        "body": "Los catálogos y modelos predicen ahorros; los contadores posteriores permiten comprobarlos. Normaliza cuando cambien clima, producción u horarios e identifica los periodos estimados. Una caída observada no demuestra por sí sola que la medida la haya provocado."
      },
      {
        "title": "4 · No confundir energía con carbono",
        "body": "La compra de electricidad renovable, la reducción de kWh y el cálculo de emisiones son cuestiones diferentes. Incluso una reducción de intensidad validada no permite declarar una instalación sin emisiones sin pruebas adicionales y un alcance definido."
      }
    ],
    "checklist": [
      "Mostrar energía absoluta e intensidad normalizada.",
      "Respetar condiciones de seguridad y proceso.",
      "Identificar estimaciones y huecos de contador.",
      "Verificar bajo condiciones comparables."
    ],
    "insights": [
      "La medición permite comprobar medidas de eficiencia.",
      "Mejor intensidad no implica menos kWh totales.",
      "Un dato ausente nunca equivale a consumo cero.",
      "La seguridad del proceso es un límite obligatorio.",
      "La atribución exige considerar clima y actividad."
    ],
    "decisions": [
      {
        "title": "Reparar la línea base",
        "prompt": "Un subcontador falló durante nueve días del mes.",
        "detail": "El contador superior y las horas de uso permiten una estimación acotada.",
        "choices": [
          {
            "id": "energy-gap",
            "title": "Marcar el hueco y estimarlo justificadamente",
            "description": "Recuperar datos o usar una estimación transparente con incertidumbre.",
            "feedback": "Es fundamental distinguir valores medidos y estimados.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "energy-zero",
            "title": "Introducir consumo cero",
            "description": "Contabilizar la ausencia de datos como ahorro.",
            "feedback": "Un hueco de información no es una reducción de consumo.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "energy-omit",
            "title": "Excluir la zona sin avisar",
            "description": "Presentar una tendencia con perímetro diferente.",
            "feedback": "Los cambios de límite deben explicarse y hacerse comparables.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Mantener la extracción adecuada",
        "prompt": "Un cambio de horarios de climatización podría afectar a una extracción industrial.",
        "detail": "El responsable del proceso aún no ha validado la medida.",
        "choices": [
          {
            "id": "energy-test",
            "title": "Validar las condiciones y ensayar",
            "description": "Comprobar caudales, calidad del aire, seguridad y límites de operación.",
            "feedback": "Solo cabe optimizar dentro de las condiciones técnicas seguras.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "energy-force",
            "title": "Aplicar ya la reducción",
            "description": "Confiar en el modelo porque el ahorro previsto es elevado.",
            "feedback": "Una estimación no sustituye los requisitos de extracción segura.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "energy-abandon",
            "title": "Descartar cualquier mejora de HVAC",
            "description": "Renunciar a analizar alternativas.",
            "feedback": "El riesgo exige estudio, no abandonar cualquier mejora posible.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Interpretar resultados",
        "prompt": "La intensidad baja un 8 %, pero el trimestre ha sido más suave.",
        "detail": "También han cambiado las horas de funcionamiento.",
        "choices": [
          {
            "id": "energy-adjust",
            "title": "Normalizar y documentar incertidumbre",
            "description": "Comparar clima y actividad equivalentes y comunicar consumo absoluto.",
            "feedback": "La atribución necesita condiciones homogéneas.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "energy-claim",
            "title": "Atribuir el 8 % íntegro al proyecto",
            "description": "Publicar un único titular sin matices.",
            "feedback": "El cambio observado puede deberse a varios factores.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "energy-silent",
            "title": "No publicar nada durante un año",
            "description": "Ocultar información provisional útil.",
            "feedback": "Se puede informar de resultados provisionales debidamente acotados.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      }
    ],
    "after": [
      {
        "title": "Plan de medición y verificación",
        "body": "Define usos significativos, contadores y línea base reproducible. Acuerda condiciones de seguridad, ejecuta la actuación y compara consumo posterior ajustando las condiciones. Presenta kWh totales e intensidad e identifica huecos y estimaciones."
      },
      {
        "title": "El error habitual de comunicación",
        "body": "Una mejora del 5 % en kWh/m² no significa necesariamente un 5 % menos de electricidad total. Cambiar el origen de compra de electricidad puede modificar emisiones calculadas sin cambiar el consumo. Nunca mezcles indicadores."
      },
      {
        "title": "Aplicación real",
        "body": "Un equipo de instalaciones puede convertir esta secuencia en una ficha de medida y verificación. El valor está en establecer datos comparables y decisiones justificadas, no en proclamar una mejora con la puntuación de la simulación."
      }
    ]
  },
  "packaging": {
    "intro": "Una unidad de aviónica necesita embalaje protector y documentación trazable. Compara materiales y digitalización sin comprometer resistencia, recuperación de embalajes ni controles documentales.",
    "before": [
      {
        "title": "1 · Comparar protección equivalente",
        "body": "La unidad funcional es una pieza conforme entregada intacta bajo condiciones de manipulación definidas. Reducir peso no sirve si falla la protección frente a vibración, impactos o humedad. Un daño puede multiplicar los recursos y el retrabajo."
      },
      {
        "title": "2 · El coste real de reutilizar",
        "body": "Un contenedor reutilizable necesita devolución, limpieza, inspección, reparación y seguimiento. La vida útil anunciada por el proveedor no equivale al número de ciclos reales. Incluye pérdidas y transporte de retorno."
      },
      {
        "title": "3 · Digitalizar sin perder el control",
        "body": "Un flujo digital debe conservar autenticación, revisiones, firmas, retención y contingencias. Imprimir, firmar y escanear de nuevo puede crear trabajo adicional sin eliminar papel. La mejora exige cambiar el proceso, no solo el formato."
      },
      {
        "title": "4 · Una etiqueta no demuestra menor impacto",
        "body": "La afirmación ambiental debe definir con qué alternativa se compara, la unidad funcional, materiales y recuperación. Solicita pruebas, ensaya la solución y evita utilizar etiquetas vagas como prueba de mejores resultados."
      }
    ],
    "checklist": [
      "Verificar ensayos de protección.",
      "Medir reutilizaciones reales y devoluciones.",
      "Conservar la trazabilidad exigida.",
      "Comparar funciones equivalentes."
    ],
    "insights": [
      "La reutilización necesita un circuito probado.",
      "El registro digital controlado transforma el proceso.",
      "Menos material no sirve si falla la protección.",
      "Usa rotaciones observadas, no prometidas.",
      "Prepara una contingencia documental verificable."
    ],
    "decisions": [
      {
        "title": "Comprobar la protección",
        "prompt": "El embalaje ligero no ha superado ensayos representativos de vibración.",
        "detail": "Una unidad dañada podría exigir sustitución y nuevos transportes.",
        "choices": [
          {
            "id": "pack-verify",
            "title": "Ensayar antes de liberar",
            "description": "Mantener la solución cualificada hasta disponer de evidencia de aceptación.",
            "feedback": "La protección técnica precede a cualquier ventaja ambiental calculada.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "pack-early",
            "title": "Liberarlo por pesar menos",
            "description": "Suponer que bajar masa garantiza menor impacto.",
            "feedback": "Un posible daño invalida la comparación y compromete la disponibilidad.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "pack-no",
            "title": "Prohibir embalajes más ligeros",
            "description": "No estudiar ninguna alternativa.",
            "feedback": "La cualificación es imprescindible, pero no impide investigar opciones.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Medir la reutilización",
        "prompt": "Un embalaje diseñado para 20 viajes solo se ha reutilizado cuatro veces.",
        "detail": "También precisa limpieza y transporte de retorno.",
        "choices": [
          {
            "id": "pack-full",
            "title": "Evaluar impacto por entrega intacta",
            "description": "Incluir fabricación, ciclos reales, pérdidas y retornos.",
            "feedback": "La comparación depende del uso conseguido, no del uso prometido.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "pack20",
            "title": "Afirmar que se usó 20 veces",
            "description": "Usar la vida de diseño como dato de operación.",
            "feedback": "La capacidad teórica no demuestra rotaciones realizadas.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "pack-weight",
            "title": "Comparar solo el peso",
            "description": "Ignorar retornos y limpieza.",
            "feedback": "La masa es relevante, pero no representa el ciclo completo.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Gestionar una interrupción digital",
        "prompt": "El sistema de registros cae durante la liberación de un envío.",
        "detail": "La configuración y las autorizaciones siguen siendo obligatorias.",
        "choices": [
          {
            "id": "pack-contingency",
            "title": "Aplicar el procedimiento controlado sin conexión",
            "description": "Registrar autoridades y campos exigidos y reconciliar al recuperar el servicio.",
            "feedback": "Una contingencia adecuada mantiene trazabilidad y resiliencia.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "pack-skip",
            "title": "Enviar sin evidencia",
            "description": "Asumir que digitalizar elimina el control.",
            "feedback": "Las obligaciones de registro no desaparecen.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "pack-allpaper",
            "title": "Duplicar papel de forma permanente",
            "description": "Volver a imprimir todo por defecto.",
            "feedback": "Una contingencia excepcional no justifica duplicación habitual.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      }
    ],
    "after": [
      {
        "title": "Cómo comparar el ciclo de vida",
        "body": "Empieza por igual protección y trazabilidad. Considera fabricación, transporte, retornos, limpieza y reutilizaciones comprobadas. Expresa el efecto por envío correcto, no solo por kilogramo de embalaje. Sin red real de retorno, la reutilización declarada aporta poca evidencia."
      },
      {
        "title": "Controles operativos",
        "body": "Mantén ensayos de vibración, requisitos de la pieza, control de versiones, firmas autorizadas y recuperación ante incidencias. Mide cuánto papel se elimina de verdad y si desaparecen tareas repetidas."
      },
      {
        "title": "Actividad transferible",
        "body": "Compara dos opciones técnicamente válidas sobre un conjunto equivalente de envíos con pérdidas y ciclos registrados. Analiza qué hipótesis puede invertir la preferencia y define una revisión antes del despliegue."
      }
    ]
  },
  "reach": {
    "intro": "Un recubrimiento sustitutivo parece prometedor, pero faltan evidencias regulatorias y ensayos de cualificación. Practica cómo justificar una decisión sin confundir una FDS, una declaración del proveedor y una aprobación técnica.",
    "before": [
      {
        "title": "1 · Identificar obligaciones",
        "body": "Las obligaciones varían según sea sustancia, mezcla o artículo y según el papel y uso en la cadena. La ficha de datos de seguridad no es un certificado universal de cumplimiento REACH. Determina la obligación relevante."
      },
      {
        "title": "2 · Separar cumplimiento y prestaciones",
        "body": "Un sustituto puede tener documentación química adecuada y fallar resistencia a corrosión o compatibilidad. También puede superar ensayos y dejar preguntas abiertas sobre exposición o restricciones. Ambos planos deben resolverse antes de liberar."
      },
      {
        "title": "3 · Elaborar un expediente trazable",
        "body": "Registra composición o divulgación controlada, versiones, fechas, alcance de declaraciones, restricciones pertinentes, controles de proceso, ensayos y responsables. La publicidad del proveedor no sustituye al expediente."
      },
      {
        "title": "4 · Comunicar condiciones",
        "body": "Un estado provisional debe distinguir aspectos superados, pendientes, responsables y actividades que todavía no pueden autorizarse. No proclames cumplimiento global porque hayan funcionado algunas pruebas."
      }
    ],
    "checklist": [
      "Identificar producto, uso y responsable.",
      "Separar obligaciones químicas y técnica.",
      "Revisar exposición y proceso.",
      "Anotar puertas de aprobación y pendientes."
    ],
    "insights": [
      "La primera decisión exige evaluación técnica y regulatoria controlada.",
      "La revisión condicionada no equivale a autorización completa.",
      "Una FDS no prueba todas las obligaciones REACH.",
      "La sustitución afecta a personas y proceso.",
      "El siguiente paso necesita responsables y condiciones."
    ],
    "decisions": [
      {
        "title": "Evaluar el expediente",
        "prompt": "El proveedor aporta una FDS, pero no aclara su relación con el uso propuesto.",
        "detail": "El cambio de recubrimiento requiere comprobación técnica.",
        "choices": [
          {
            "id": "reach-specific",
            "title": "Relacionar evidencias con obligaciones",
            "description": "Identificar producto, uso, requisitos, revisión y carencias.",
            "feedback": "Así se pueden revisar y cerrar de forma trazable las cuestiones pendientes.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "reach-automatic",
            "title": "Aceptar la FDS como aprobación total",
            "description": "Suponer que un documento cumple todo.",
            "feedback": "Una FDS no sustituye el conjunto de autorizaciones regulatorias y técnicas.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "reach-infinite",
            "title": "Suspender sin definir acciones",
            "description": "No indicar qué documentación se debe solicitar.",
            "feedback": "Una retención debe tener alcance, responsables y próximos pasos.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Validar el nuevo proceso",
        "prompt": "El curado cambia ventilación y posible exposición del trabajador.",
        "detail": "La ingeniería de proceso todavía no lo ha aprobado.",
        "choices": [
          {
            "id": "reach-controls",
            "title": "Validar materiales, proceso y seguridad",
            "description": "Revisar extracción, exposición, parámetros y autorización técnica.",
            "feedback": "La sustitución afecta al producto y a cómo se aplica.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "reach-field",
            "title": "Probar directamente en un avión operativo",
            "description": "Tomar un ensayo de laboratorio como aprobación en servicio.",
            "feedback": "La promesa del laboratorio no sustituye datos aprobados ni prevención.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "reach-oldonly",
            "title": "Conservar el producto anterior para siempre",
            "description": "Rechazar cualquier evaluación de alternativas.",
            "feedback": "Ignorar opciones puede aumentar riesgos futuros de cumplimiento y suministro.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Decidir el siguiente hito",
        "prompt": "Los ensayos técnicos pasan, pero falta una declaración exigida del proveedor.",
        "detail": "Planificación necesita conocer el estado actual.",
        "choices": [
          {
            "id": "reach-status",
            "title": "Comunicar un estado condicionado, sin liberar",
            "description": "Identificar lo comprobado, pendiente, dueño y siguiente decisión.",
            "feedback": "Permite planificar sin fingir una aprobación completa.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "reach-green",
            "title": "Anunciar cumplimiento total",
            "description": "Tratar los ensayos técnicos como cierre regulatorio.",
            "feedback": "La cualificación técnica y la obligación química son distintas.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "reach-hide",
            "title": "No comunicar avances",
            "description": "Dejar al resto del proyecto sin información.",
            "feedback": "El silencio dificulta coordinación y escalado.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      }
    ],
    "after": [
      {
        "title": "Estructura del registro de decisión",
        "body": "Identifica material y aplicación, obligaciones, evidencia del proveedor, ensayos técnicos y controles de exposición. Distingue resultados cerrados de pendientes y deja constancia de quién tiene autoridad para aprobar. Usa los procedimientos corporativos y referencias ECHA actualizadas."
      },
      {
        "title": "Errores que hay que evitar",
        "body": "La declaración de proveedor necesita revisión, una FDS no equivale a certificado REACH universal y una cualificación técnica no resuelve automáticamente todas las obligaciones. Cada conclusión requiere fecha, alcance y responsable."
      },
      {
        "title": "Aplicación profesional",
        "body": "Ingeniería de Materiales, Compras, Calidad y Compliance pueden usar este ejercicio para practicar revisión de evidencias y comunicación. El simulador no sustituye una liberación jurídica o técnicamente autorizada."
      }
    ]
  },
  "saf": {
    "intro": "Una propuesta de combustible sostenible de aviación exige datos de lote y metodología de ciclo de vida. Aprende a separar compra documentada, atribución de beneficios y efectos atmosféricos no cubiertos.",
    "before": [
      {
        "title": "1 · Qué se compara",
        "body": "Registra mezcla, lote, ruta de producción, cantidad, comparador fósil, metodología de ciclo de vida y periodo. Las rutas SAF difieren: una factura genérica no acredita un porcentaje concreto de reducción."
      },
      {
        "title": "2 · Ciclo de vida no significa cero en escape",
        "body": "Un avión que utiliza SAF sigue emitiendo CO₂ en la combustión. El cálculo de GEI de ciclo de vida compara límites definidos, no demuestra vuelo sin emisiones. Otros efectos climáticos no CO₂ pueden requerir análisis separados."
      },
      {
        "title": "3 · Cadena de custodia y derecho a comunicar",
        "body": "Comprueba si la entrega física o el mecanismo de asignación aplicable permite atribuir el beneficio. Las reglas difieren y no debe suponerse que una sola cantidad pueda atribuirse varias veces."
      },
      {
        "title": "4 · Comunicar límites",
        "body": "Un buen resultado debe referirse a la metodología concreta y a los datos del lote. No pueden promediarse porcentajes de métodos no equivalentes. Declara aquello que no se calculó."
      }
    ],
    "checklist": [
      "Registrar lote, mezcla y cantidad.",
      "Verificar asignación y custodia.",
      "No equiparar SAF con cero emisiones en vuelo.",
      "Explicar límites y efectos no incluidos."
    ],
    "insights": [
      "La evidencia del lote sostiene un cálculo de ciclo de vida.",
      "La declaración debe delimitar lo realmente calculado.",
      "La atribución depende de reglas verificadas.",
      "El comparador y la metodología deben ser homogéneos.",
      "No ocultes efectos ajenos al cálculo."
    ],
    "decisions": [
      {
        "title": "Comprobar la atribución",
        "prompt": "La compra declara un beneficio, pero no explica la asignación.",
        "detail": "Entrega física y titularidad contable pueden diferir.",
        "choices": [
          {
            "id": "saf-verify",
            "title": "Comprobar esquema y titularidad",
            "description": "Confirmar reglas, atribución única y formulación permitida.",
            "feedback": "Hay que probar que el beneficio corresponde a la actividad descrita.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "saf-multiply",
            "title": "Atribuirlo a todos los vuelos",
            "description": "Suponer que una compra permite afirmar beneficio de toda la flota.",
            "feedback": "Sin reglas verificadas no puede multiplicarse un mismo beneficio.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "saf-ignore",
            "title": "Descartar toda evidencia",
            "description": "Suponer que ningún dato puede comunicarse.",
            "feedback": "Puede existir una afirmación factual limitada, si se comprueba.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Comparar estimaciones",
        "prompt": "Dos documentos utilizan comparadores fósiles y periodos diferentes.",
        "detail": "Ambos anuncian porcentajes de reducción llamativos.",
        "choices": [
          {
            "id": "saf-method",
            "title": "Usar una metodología homogénea",
            "description": "Alinear cantidad, periodo, comparador y alcance.",
            "feedback": "Solo la equivalencia metodológica sostiene la comparación.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "saf-maximum",
            "title": "Elegir el porcentaje mayor",
            "description": "Publicar la cifra más impactante.",
            "feedback": "Puede no corresponder al lote y alcance considerado.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "saf-mean",
            "title": "Promediar los porcentajes",
            "description": "Evitar revisar metodologías incompatibles.",
            "feedback": "La media de cifras no comparables carece de interpretación defendible.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Explicar las limitaciones",
        "prompt": "El cálculo incluye GEI de ciclo de vida, pero no efectos no CO₂ validados.",
        "detail": "Se prepara la comunicación del ejercicio.",
        "choices": [
          {
            "id": "saf-bounded",
            "title": "Explicar alcance y ausencias",
            "description": "Indicar el método y lo no evaluado.",
            "feedback": "No atribuyas al cálculo más cobertura de la que tiene.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "saf-total",
            "title": "Declarar vuelo climáticamente neutro",
            "description": "Tratar el resultado parcial como impacto total.",
            "feedback": "No existe evidencia de eliminación de los otros efectos ni de emisiones de combustión.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "saf-delete",
            "title": "Omitir las limitaciones",
            "description": "Publicar solo el porcentaje positivo.",
            "feedback": "Una cifra correctamente calculada puede inducir a error sin límites.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      }
    ],
    "after": [
      {
        "title": "Expediente de combustible defendible",
        "body": "Conserva cantidad, mezcla, ruta, esquema, custodia, metodología, comparador, periodo, responsable e incertidumbre. Distingue valores medidos, certificados, asignados y estimados, verificando la normativa aplicable."
      },
      {
        "title": "Cómo redactar una afirmación precisa",
        "body": "Describe el lote documentado y su límite de ciclo de vida; utiliza solo diferencias acreditadas por el factor y método pertinentes. Un cálculo de GEI no demuestra cero emisiones en el avión ni cubre todos los efectos climáticos no CO₂."
      },
      {
        "title": "Aplicación profesional",
        "body": "Utiliza estas preguntas para revisar proveedores y propuestas de comunicación. La contabilidad corporativa y la autorización operativa deben seguir sus propios procedimientos."
      }
    ]
  },
  "greenlight": {
    "intro": "Un nuevo servicio móvil de mantenimiento podría mejorar la disponibilidad, pero faltan datos de desplazamientos, materiales y retrabajos. Compara funciones equivalentes y transforma incertidumbre en acciones asignadas.",
    "before": [
      {
        "title": "1 · Definir la función",
        "body": "Compara resultados de mantenimiento completados con igual calidad y disponibilidad. Incluye viajes, energía, consumibles, repuestos, residuos y repetición de tareas pertinentes. Una reducción aislada de indisponibilidad no prueba menor impacto global."
      },
      {
        "title": "2 · Identificar aspectos relevantes",
        "body": "Prioriza impactos que puedan cambiar la decisión en vez de esperar todos los datos posibles. Define el perímetro y distingue valores medidos, estimados y ausentes. No ocultes exclusiones significativas."
      },
      {
        "title": "3 · Trabajar con incertidumbre",
        "body": "Cuando falten mediciones, emplea rangos justificables y análisis de sensibilidad. Si distintos niveles de utilización o transporte cambian la opción preferida, convierte esas variables en condiciones de revisión."
      },
      {
        "title": "4 · Gobernanza y mejora",
        "body": "La evaluación debe generar responsables, acciones, condiciones de parada y nueva fecha de revisión. Un titular optimista no sustituye la aprobación técnica ni la decisión empresarial."
      }
    ],
    "checklist": [
      "Definir funciones de mantenimiento equivalentes.",
      "Identificar impactos de ciclo de vida relevantes.",
      "Explicar proxies, supuestos e incertidumbre.",
      "Asignar responsables y revisión posterior."
    ],
    "insights": [
      "Una revisión proporcional admite huecos controlados.",
      "Los viajes no medidos no son cero.",
      "Los cambios de perímetro no deben esconder impactos.",
      "La utilización y los viajes repetidos cambian la comparación.",
      "Las decisiones basadas en estimaciones deben revisarse."
    ],
    "decisions": [
      {
        "title": "Comparar servicios equivalentes",
        "prompt": "Una propuesta supone una visita móvil y otra reparación en taller.",
        "detail": "Puede haber diferencias en repetición de trabajos y transportes.",
        "choices": [
          {
            "id": "gate-function",
            "title": "Definir un resultado comparable",
            "description": "Comparar eventos de mantenimiento completos y conformes.",
            "feedback": "La unidad funcional determina qué actividades deben incluirse.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "gate-count",
            "title": "Comparar una visita y una reparación",
            "description": "Omitir diferencias de calidad y repetición.",
            "feedback": "No se pueden comparar impactos de resultados distintos sin ajustes.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "gate-ignore",
            "title": "Excluir la calidad técnica",
            "description": "Considerar irrelevante la conformidad.",
            "feedback": "La función técnica es indispensable para una comparación válida.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Probar incertidumbre",
        "prompt": "Los desplazamientos son relevantes y la utilización podría variar mucho.",
        "detail": "La opción preferida cambia bajo hipótesis plausibles.",
        "choices": [
          {
            "id": "gate-range",
            "title": "Calcular escenarios bajo, central y alto",
            "description": "Establecer umbrales e información pendiente.",
            "feedback": "La sensibilidad revela qué incertidumbre merece investigarse.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "gate-best",
            "title": "Elegir el escenario más optimista",
            "description": "Usar solo el dato que favorece la propuesta.",
            "feedback": "Seleccionar hipótesis favorables no es una evaluación neutral.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "gate-average",
            "title": "Introducir un valor único sin explicación",
            "description": "Evitar distintos escenarios.",
            "feedback": "Una media aislada oculta posibles cambios de conclusión.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      },
      {
        "title": "Controlar el seguimiento",
        "prompt": "La revisión condicionada permite continuar el análisis.",
        "detail": "Ya se pueden medir viajes, consumos y reparaciones reales.",
        "choices": [
          {
            "id": "gate-owner",
            "title": "Asignar indicadores, responsables y fechas",
            "description": "Comparar operación real con supuestos y reabrir dudas ante desviaciones.",
            "feedback": "La evaluación se convierte en un proceso de mejora verificable.",
            "integrity": "strong",
            "impact": {
              "readiness": 3,
              "environment": 4,
              "evidence": 7,
              "delivery": 2
            }
          },
          {
            "id": "gate-close",
            "title": "Dar la evaluación por cerrada para siempre",
            "description": "Tratar la primera estimación como prueba definitiva.",
            "feedback": "Las condiciones reales pueden invalidar el escenario previsto.",
            "integrity": "weak",
            "impact": {
              "readiness": -5,
              "environment": -4,
              "evidence": -9,
              "delivery": -2
            }
          },
          {
            "id": "gate-dashboard",
            "title": "Recopilar datos sin responsables",
            "description": "Crear cuadros de mando sin acciones ni criterios.",
            "feedback": "La información sin responsabilidades difícilmente mejora decisiones.",
            "integrity": "mixed",
            "impact": {
              "readiness": 2,
              "environment": 0,
              "evidence": -2,
              "delivery": 1
            }
          }
        ]
      }
    ],
    "after": [
      {
        "title": "Cómo realizar una revisión de proyecto",
        "body": "Define función, impactos de ciclo de vida, alternativas, fuentes, límites, supuestos y datos pendientes capaces de modificar la decisión. Separa aprobación técnica, cumplimiento y comparación ambiental."
      },
      {
        "title": "Gestión de la información incompleta",
        "body": "Utiliza estimaciones claramente marcadas cuando proceda y comprueba sensibilidad. Toda decisión condicionada requiere responsables, fecha y un motivo objetivo para revisarla."
      },
      {
        "title": "Aplicación profesional",
        "body": "Un equipo de programa o diseño de servicios puede incorporar estas preguntas a su control de decisiones. El simulador enseña un método, pero las aprobaciones reales siguen correspondiendo a las funciones competentes."
      }
    ]
  }
};
