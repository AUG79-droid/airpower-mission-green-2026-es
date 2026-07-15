"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

type Screen = "welcome" | "map" | "mission" | "debrief" | "final";
type MetricKey = "readiness" | "environment" | "evidence" | "delivery";

type Impact = Partial<Record<MetricKey, number>>;

type Choice = {
  id: string;
  title: string;
  description: string;
  impact: Impact;
  integrity: "strong" | "mixed" | "weak";
  feedback: string;
};

type Decision = {
  title: string;
  prompt: string;
  detail: string;
  choices: Choice[];
};

type Mission = {
  id: string;
  number: string;
  short: string;
  title: string;
  location: string;
  discipline: string;
  objective: string;
  target: string;
  briefing: string;
  symbol: string;
  accent: string;
  decisions: Decision[];
  learning: string[];
  claimCheck: string;
};

type Metrics = Record<MetricKey, number>;

type Completion = {
  choices: string[];
  delta: Metrics;
};

const ZERO_DELTA: Metrics = {
  readiness: 0,
  environment: 0,
  evidence: 0,
  delivery: 0,
};

const INITIAL_METRICS: Metrics = {
  readiness: 52,
  environment: 48,
  evidence: 50,
  delivery: 54,
};

const metricMeta: Record<MetricKey, { label: string; short: string }> = {
  readiness: { label: "Disponibilidad operativa", short: "Disponibilidad" },
  environment: { label: "Desempeño climático y de recursos", short: "Clima / recursos" },
  evidence: { label: "Cumplimiento y evidencia", short: "Evidencia" },
  delivery: { label: "Control de costes y entregas", short: "Coste / entrega" },
};

const missions: Mission[] = [
  {
    id: "route",
    number: "01",
    short: "Ruta inteligente de repuestos",
    title: "Mueve la pieza, no el problema",
    location: "Red logística",
    discipline: "Logística de CO₂",
    objective: "Reduce las emisiones del transporte de repuestos sin comprometer los compromisos de servicio.",
    target: "Objetivo 2026: no superar el valor de 2025 y explorar la optimización de rutas.",
    briefing:
      "Un actuador de control de vuelo debe llegar a una base operativa en un plazo de 36 horas. Una aeronave podría permanecer fuera de servicio si la pieza llega tarde.",
    symbol: "↗",
    accent: "cyan",
    decisions: [
      {
        title: "Selecciona el plan de transporte",
        prompt: "¿Qué ruta autorizas?",
        detail:
          "Las cifras son estimaciones del escenario. Utilizan el mismo límite de envío, pero todavía no incluyen el riesgo de interrupciones.",
        choices: [
          {
            id: "direct-air",
            title: "Transporte aéreo exprés directo",
            description: "La ruta más rápida, con capacidad dedicada y las mayores emisiones y coste estimados.",
            impact: { readiness: 14, environment: -13, evidence: 2, delivery: -9 },
            integrity: "mixed",
            feedback:
              "La justificación operativa es sólida, pero el impacto ambiental debe seguir siendo visible. La urgencia no constituye una alegación de reducción de emisiones.",
          },
          {
            id: "consolidated-air",
            title: "Transporte aéreo regular consolidado",
            description: "Comparte capacidad con otro envío y conserva un margen de ocho horas.",
            impact: { readiness: 7, environment: 7, evidence: 6, delivery: 5 },
            integrity: "strong",
            feedback:
              "Esta opción equilibra la ventana de servicio y la utilización de la carga. El beneficio alegado sigue dependiendo del método de asignación elegido.",
          },
          {
            id: "multimodal",
            title: "Transporte multimodal carretera–ferrocarril",
            description: "Menores emisiones y coste en el escenario, pero con solo dos horas de margen de entrega.",
            impact: { readiness: -6, environment: 12, evidence: 5, delivery: 7 },
            integrity: "mixed",
            feedback:
              "Una ruta de menor impacto no es automáticamente la opción responsable si genera un riesgo operativo inaceptable.",
          },
        ],
      },
      {
        title: "Responde a una interrupción de la red",
        prompt: "Se cancela una conexión. ¿Cuál es tu siguiente paso?",
        detail: "Un centro de servicio regional dispone de una unidad compatible, pero es necesario confirmar sus registros.",
        choices: [
          {
            id: "regional-stock",
            title: "Valida y utiliza el stock regional",
            description: "Confirma la configuración y la trazabilidad y, después, cancela el transporte de larga distancia.",
            impact: { readiness: 11, environment: 10, evidence: 8, delivery: 7 },
            integrity: "strong",
            feedback:
              "El transporte evitado solo es creíble tras confirmar que el repuesto es compatible y que el envío original se ha cancelado realmente.",
          },
          {
            id: "rebook-express",
            title: "Reserva otro tramo exprés",
            description: "Protege el plazo de inmediato y documenta el motivo de la excepción.",
            impact: { readiness: 10, environment: -9, evidence: 5, delivery: -8 },
            integrity: "mixed",
            feedback:
              "Documentar una excepción operativa es transparente. No convierte el transporte adicional en una mejora ambiental.",
          },
          {
            id: "ignore-disruption",
            title: "Mantén el plan original",
            description: "Supón que el transportista recuperará la conexión sin modificar la estimación.",
            impact: { readiness: -13, environment: -2, evidence: -10, delivery: -8 },
            integrity: "weak",
            feedback:
              "Ignorar el cambio de condiciones hace que tanto la previsión de entrega como la comparación ambiental sean poco fiables.",
          },
        ],
      },
    ],
    learning: [
      "Informa tanto de las emisiones absolutas como de una métrica de intensidad, por ejemplo kgCO₂e por tonelada-kilómetro.",
      "Define la línea base, el límite del envío, el método de asignación y el periodo de reporte.",
      "Una declaración sobre emisiones evitadas necesita un escenario contrafactual documentado, no solo una estimación de una ruta mejor.",
    ],
    claimCheck:
      "Di «menores emisiones de transporte estimadas según las hipótesis de ruta indicadas», no «entrega verde».",
  },
  {
    id: "energy",
    number: "02",
    short: "Energía del centro",
    title: "Reduce la intensidad sin ocultar la demanda",
    location: "Centro Internacional de Servicios",
    discipline: "Eficiencia energética",
    objective: "Mejora la eficiencia energética manteniendo operaciones seguras y fiables.",
    target: "Objetivo 2026: reducir un 5 % el consumo de energía por metro cuadrado.",
    briefing:
      "El centro dispone de un presupuesto de inversión fijo. Se espera que la actividad crezca y un verano más caluroso podría aumentar la demanda de refrigeración.",
    symbol: "ϟ",
    accent: "yellow",
    decisions: [
      {
        title: "Elige el primer paquete de medidas",
        prompt: "¿Dónde inviertes primero?",
        detail: "Todos los ahorros son estimaciones modelizadas hasta que se midan y verifiquen después de la implantación.",
        choices: [
          {
            id: "meter-controls",
            title: "Medición + controles HVAC",
            description: "Instala submedición en las zonas prioritarias, ajusta los horarios y verifica el confort y las restricciones operativas.",
            impact: { readiness: 5, environment: 11, evidence: 10, delivery: 5 },
            integrity: "strong",
            feedback:
              "La medición permite comprobar posteriormente las alegaciones. Los controles pueden reducir el consumo sin asumir que todas las zonas se comportan igual.",
          },
          {
            id: "solar-only",
            title: "Solo generación in situ",
            description: "Instala generación, pero aplaza el análisis de la demanda y la submedición.",
            impact: { readiness: 4, environment: 6, evidence: -2, delivery: -5 },
            integrity: "mixed",
            feedback:
              "La generación renovable puede ayudar, pero no demuestra eficiencia energética ni revela el consumo evitable.",
          },
          {
            id: "behaviour-poster",
            title: "Solo campaña de sensibilización",
            description: "Pide a los equipos que ahorren energía sin una línea base cuantificada ni cambios operativos.",
            impact: { readiness: 1, environment: 1, evidence: -8, delivery: 8 },
            integrity: "weak",
            feedback:
              "La sensibilización puede apoyar un programa, pero los cambios de comportamiento no medidos no deben presentarse como ahorros conseguidos.",
          },
        ],
      },
      {
        title: "Interpreta el primer mes de reporte",
        prompt: "La energía por m² baja un 6 %, pero la energía total sube un 2 % al crecer la actividad. ¿Qué comunicas?",
        detail: "Ambos valores utilizan el mismo periodo de reporte y contadores validados.",
        choices: [
          {
            id: "report-both",
            title: "Comunica ambos valores con contexto",
            description: "Muestra la mejora de intensidad, el aumento absoluto, el cambio de actividad y la observación meteorológica.",
            impact: { readiness: 4, environment: 6, evidence: 13, delivery: 3 },
            integrity: "strong",
            feedback:
              "Este es el relato más claro: el objetivo de intensidad mejoró, mientras que la demanda total no disminuyó.",
          },
          {
            id: "only-intensity",
            title: "Publica solo la reducción del 6 %",
            description: "Destaca la métrica objetivo y omite el aumento de la energía total.",
            impact: { readiness: 1, environment: 3, evidence: -13, delivery: 4 },
            integrity: "weak",
            feedback:
              "Una cifra técnicamente correcta puede resultar engañosa si se omite una parte relevante del resultado.",
          },
          {
            id: "call-zero-carbon",
            title: "Declara que el centro está «preparado para cero carbono»",
            description: "Utiliza el resultado de intensidad como un titular ambiental general.",
            impact: { readiness: -2, environment: -2, evidence: -16, delivery: 2 },
            integrity: "weak",
            feedback:
              "El escenario no aporta evidencia para una alegación de cero carbono. La eficiencia y la contabilidad de carbono son cuestiones diferentes.",
          },
        ],
      },
    ],
    learning: [
      "La intensidad energética y el uso absoluto de energía responden a preguntas distintas; muestra ambos cuando cambie la actividad.",
      "Los ahorros previstos deben identificarse como estimaciones hasta que se verifiquen con datos medidos comparables.",
      "El clima, la ocupación, las horas de funcionamiento y los niveles de producción pueden afectar de forma relevante a las comparaciones.",
    ],
    claimCheck: "Di «la intensidad energética medida disminuyó un 6 % durante el periodo»; no lo amplíes hasta convertirlo en una alegación de cero carbono.",
  },
  {
    id: "packaging",
    number: "03",
    short: "Embalaje y papel",
    title: "Protege el componente y la evidencia",
    location: "Almacén central",
    discipline: "Materiales y residuos",
    objective: "Reduce el papel de las entregas y evalúa opciones de embalaje de menor impacto.",
    target: "Objetivo 2026: reducir el papel en la documentación de entrega y evaluar alternativas de embalaje.",
    briefing:
      "Una unidad de aviónica sensible necesita un nuevo embalaje de entrega. La solución debe proteger la pieza, preservar la trazabilidad y reducir el uso de recursos.",
    symbol: "□",
    accent: "lime",
    decisions: [
      {
        title: "Diseña el concepto de embalaje",
        prompt: "¿Qué diseño pasa al piloto?",
        detail: "Las alegaciones de los proveedores presentan distintos niveles de evidencia y la red de retorno todavía no es universal.",
        choices: [
          {
            id: "reusable-pilot",
            title: "Piloto de caja reutilizable",
            description: "Prueba la durabilidad, la tasa de retorno, la limpieza, la logística inversa y las pérdidas antes de ampliar la solución.",
            impact: { readiness: 7, environment: 10, evidence: 11, delivery: 1 },
            integrity: "strong",
            feedback:
              "Un piloto controlado comprueba si la reutilización se produce realmente. La reutilización por sí sola no garantiza un menor impacto de ciclo de vida.",
          },
          {
            id: "lightweight-single",
            title: "Embalaje ligero de un solo uso",
            description: "Reduce la masa y el material, con protección validada pero sin vía de recuperación.",
            impact: { readiness: 8, environment: 4, evidence: 6, delivery: 8 },
            integrity: "mixed",
            feedback:
              "Esto puede reducir la carga de materiales y transporte, pero no debe describirse como circular sin un circuito de recuperación.",
          },
          {
            id: "eco-label",
            title: "«Ecoembalaje» del proveedor",
            description: "Selecciona la opción basándote en una etiqueta genérica sin evidencia sobre la composición o el ciclo de vida.",
            impact: { readiness: 3, environment: -4, evidence: -15, delivery: 5 },
            integrity: "weak",
            feedback:
              "Una etiqueta vaga no es evidencia. Pregunta qué se reduce, respecto a qué, en qué etapas del ciclo de vida y cómo se ha verificado.",
          },
        ],
      },
      {
        title: "Rediseña el registro de entrega",
        prompt: "¿Cómo reduces el papel sin debilitar la trazabilidad?",
        detail: "El almacén necesita firmas, control de revisiones y acceso durante las interrupciones del sistema.",
        choices: [
          {
            id: "digital-controlled",
            title: "Flujo digital controlado",
            description: "Utiliza registros autenticados, control de versiones y un plan de contingencia sin conexión; después, mide el papel evitado.",
            impact: { readiness: 7, environment: 7, evidence: 12, delivery: 8 },
            integrity: "strong",
            feedback:
              "Esto cambia el proceso en lugar de limitarse a escanear papel. El beneficio puede medirse respecto al flujo anterior.",
          },
          {
            id: "scan-paper",
            title: "Imprime, firma y escanea",
            description: "Crea una copia digital manteniendo sin cambios el proceso en papel existente.",
            impact: { readiness: 6, environment: -2, evidence: 3, delivery: 1 },
            integrity: "mixed",
            feedback:
              "La digitalización no implica automáticamente desmaterialización. El proceso sigue consumiendo papel y duplica el almacenamiento.",
          },
          {
            id: "remove-record",
            title: "Elimina el documento",
            description: "Deja de generar el registro antes de confirmar los requisitos de trazabilidad y conservación.",
            impact: { readiness: -10, environment: 5, evidence: -16, delivery: 6 },
            integrity: "weak",
            feedback:
              "La reducción de recursos no puede imponerse a la seguridad, la trazabilidad o los requisitos legales. Rediseña el control, no su finalidad.",
          },
        ],
      },
    ],
    learning: [
      "Una alegación sobre el embalaje debe definir el material, el alcance, la comparación, la ruta de recuperación y el número previsto de usos.",
      "Los fallos de protección, la limpieza, las devoluciones y las cajas perdidas pueden revertir un beneficio material aparente.",
      "Los registros digitales solo reducen el papel cuando el proceso subyacente cambia y permanece controlado.",
    ],
    claimCheck: "Utiliza afirmaciones precisas como «un 20 % menos de masa de embalaje en el diseño validado»; nunca un «ecoembalaje» sin definir.",
  },
  {
    id: "reach",
    number: "04",
    short: "Señal REACH",
    title: "Encuentra la evidencia antes de la liberación",
    location: "Célula de soporte de ingeniería",
    discipline: "REACH & VERUS",
    objective: "Apoya el cumplimiento integral de REACH sin ofrecer garantías que no estén respaldadas.",
    target: "Objetivo 2026: mantener el progreso respecto a los hitos REACH de TAS y reforzar las competencias.",
    briefing:
      "Un proveedor propone un recubrimiento alternativo para una tarea de mantenimiento. Los datos de rendimiento son prometedores, pero el expediente reglamentario está incompleto.",
    symbol: "⌁",
    accent: "orange",
    decisions: [
      {
        title: "Gestiona la sustitución propuesta",
        prompt: "¿Qué autorizas?",
        detail: "Esta simulación no sustituye el proceso de cumplimiento aplicable de Airbus, ECHA o del programa.",
        choices: [
          {
            id: "controlled-review",
            title: "Revisión técnica controlada",
            description: "Detén la liberación, solicita la composición y la evidencia reglamentaria, y evalúa el rendimiento y la exposición de los trabajadores.",
            impact: { readiness: -2, environment: 5, evidence: 15, delivery: -3 },
            integrity: "strong",
            feedback:
              "Una breve espera protege la integridad de la decisión. La sustitución debe considerar conjuntamente el cumplimiento, la seguridad y el rendimiento técnico.",
          },
          {
            id: "supplier-declaration",
            title: "Acepta la declaración del proveedor",
            description: "Continúa porque el producto se comercializa como «más seguro» y «responsable con el medioambiente».",
            impact: { readiness: 5, environment: -3, evidence: -16, delivery: 7 },
            integrity: "weak",
            feedback:
              "El lenguaje comercial no es un expediente reglamentario. La alegación carece del contenido, alcance y verificación necesarios para la liberación.",
          },
          {
            id: "reject-forever",
            title: "Rechaza todas las alternativas",
            description: "Evita la evaluación y conserva indefinidamente el material actual.",
            impact: { readiness: 2, environment: -5, evidence: 2, delivery: 3 },
            integrity: "mixed",
            feedback:
              "Evitar todas las alternativas puede conservar la situación actual, pero no favorece una sustitución informada ni el cumplimiento futuro.",
          },
        ],
      },
      {
        title: "Comunica la decisión",
        prompt: "La revisión es positiva, pero está sujeta a condiciones. ¿Cómo la describes?",
        detail: "Las pruebas de cualificación y un elemento de evidencia del proveedor siguen pendientes.",
        choices: [
          {
            id: "conditional-status",
            title: "Indica las condiciones y la evidencia pendiente",
            description: "Informa de qué se ha superado, qué sigue pendiente, quién es responsable y cuál es el siguiente punto de decisión.",
            impact: { readiness: 5, environment: 3, evidence: 14, delivery: 4 },
            integrity: "strong",
            feedback:
              "Un estado condicionado es útil cuando es específico. Evita tanto la falsa tranquilidad como la alarma innecesaria.",
          },
          {
            id: "fully-compliant",
            title: "Anuncia «cumplimiento total»",
            description: "Considera que la revisión positiva equivale a completar todos los requisitos.",
            impact: { readiness: -2, environment: 0, evidence: -17, delivery: 4 },
            integrity: "weak",
            feedback:
              "La evidencia no respalda una afirmación absoluta mientras sigan pendientes la cualificación y la información del proveedor.",
          },
          {
            id: "no-update",
            title: "No compartas el estado hasta el cierre final",
            description: "Mantén al equipo del proyecto sin información sobre las condiciones actuales y las siguientes acciones.",
            impact: { readiness: -7, environment: 0, evidence: -4, delivery: -5 },
            integrity: "mixed",
            feedback:
              "El silencio reduce la coordinación. Un estado provisional transparente no equivale a una aprobación prematura.",
          },
        ],
      },
    ],
    learning: [
      "La preferencia ambiental no prevalece sobre el rendimiento del producto, la protección de los trabajadores o la evidencia reglamentaria.",
      "Una declaración del proveedor y una evaluación de cumplimiento verificada no son intercambiables.",
      "Las decisiones condicionadas deben identificar la evidencia pendiente, la responsabilidad, el plazo y el siguiente punto de decisión.",
    ],
    claimCheck: "Utiliza «revisado respecto a los requisitos indicados, con dos acciones pendientes», no un «cumplimiento total» sin respaldo.",
  },
  {
    id: "saf",
    number: "05",
    short: "Expediente de vuelo SAF",
    title: "Contabiliza el combustible, no el titular",
    location: "Operaciones de formación",
    discipline: "Investigación sobre SAF",
    objective: "Evalúa el posible uso de SAF en actividades de formación utilizando evidencia del ciclo de vida.",
    target: "Objetivo 2026: investigar el posible uso de SAF en vuelos de formación de filiales.",
    briefing:
      "Un vuelo de formación podría utilizar una mezcla SAF. Compras puede asegurar un lote, pero deben registrarse la vía de producción, la cadena de custodia y el valor de ciclo de vida.",
    symbol: "△",
    accent: "violet",
    decisions: [
      {
        title: "Construye el expediente de evidencia",
        prompt: "¿Qué información se necesita antes de realizar una declaración sobre emisiones?",
        detail: "El comportamiento de ciclo de vida del SAF varía según la vía de producción y no debe confundirse con cero emisiones en el escape.",
        choices: [
          {
            id: "verified-batch",
            title: "Evidencia verificada del lote",
            description: "Registra la cantidad de combustible, la mezcla, la vía de producción, la certificación, la cadena de custodia y el valor de ciclo de vida.",
            impact: { readiness: 5, environment: 10, evidence: 15, delivery: -2 },
            integrity: "strong",
            feedback:
              "Esto crea una base definida para comparar el ciclo de vida. El resultado sigue aplicándose únicamente al combustible y al límite registrados.",
          },
          {
            id: "generic-saf",
            title: "Factura genérica de SAF",
            description: "Registra que se compró SAF, pero no la vía de producción del lote, la mezcla ni el valor de ciclo de vida.",
            impact: { readiness: 6, environment: 3, evidence: -8, delivery: 4 },
            integrity: "mixed",
            feedback:
              "El uso del combustible puede ser real, pero la evidencia es insuficiente para una alegación específica de reducción en el ciclo de vida.",
          },
          {
            id: "marketing-label",
            title: "Confía en la expresión «combustible verde»",
            description: "Utiliza el titular del proveedor sin comprobar la certificación ni la cadena de custodia.",
            impact: { readiness: 3, environment: -4, evidence: -17, delivery: 6 },
            integrity: "weak",
            feedback:
              "Una etiqueta ambiental general no establece la elegibilidad, el comportamiento de ciclo de vida ni la titularidad de la alegación.",
          },
        ],
      },
      {
        title: "Publica la nota de aprendizaje",
        prompt: "¿Qué frase puede respaldarse?",
        detail: "El lote verificado tiene un valor de ciclo de vida documentado, pero la aeronave siguió quemando combustible durante el vuelo.",
        choices: [
          {
            id: "bounded-lifecycle",
            title: "Utiliza una declaración de ciclo de vida delimitada",
            description: "Describe la mezcla registrada y la diferencia estimada de ciclo de vida según la metodología citada.",
            impact: { readiness: 4, environment: 5, evidence: 14, delivery: 3 },
            integrity: "strong",
            feedback:
              "La declaración identifica la cantidad, el límite y la metodología en lugar de insinuar un vuelo de cero emisiones.",
          },
          {
            id: "zero-flight",
            title: "Decláralo vuelo de cero emisiones",
            description: "Utiliza la participación de SAF como prueba de que el vuelo no generó emisiones.",
            impact: { readiness: -3, environment: -3, evidence: -18, delivery: 1 },
            integrity: "weak",
            feedback:
              "Esto no está respaldado. Las alegaciones sobre SAF se refieren al comportamiento de ciclo de vida en condiciones definidas, no a cero emisiones en la aeronave.",
          },
          {
            id: "saf-only",
            title: "Di únicamente «utilizamos SAF»",
            description: "Omite la mezcla, la cantidad, la vía de producción, el periodo de reporte y la naturaleza del beneficio alegado.",
            impact: { readiness: 2, environment: 2, evidence: -7, delivery: 4 },
            integrity: "mixed",
            feedback:
              "La declaración puede ser literalmente cierta, pero omite información necesaria para comprender su importancia.",
          },
        ],
      },
    ],
    learning: [
      "Las declaraciones sobre emisiones relacionadas con SAF dependen de los valores de ciclo de vida, la vía de producción, la cantidad y la cadena de custodia.",
      "Una reducción de ciclo de vida no equivale a eliminar las emisiones de combustión durante un vuelo.",
      "Indica si un valor es medido, certificado, estimado o supuesto.",
    ],
    claimCheck: "Describe el lote de combustible verificado y el límite de ciclo de vida; nunca declares que un vuelo con SAF es de «cero emisiones».",
  },
  {
    id: "greenlight",
    number: "06",
    short: "Proyecto Luz Verde",
    title: "Toma una decisión con datos incompletos",
    location: "Revisión del diseño del servicio",
    discipline: "Datos y transparencia",
    objective: "Evalúa la sostenibilidad de nuevos proyectos de servicios y convierte las carencias en acciones con responsables.",
    target: "Objetivo 2026: evaluación de sostenibilidad para nuevos proyectos de servicios TAS.",
    briefing:
      "Un servicio de mantenimiento móvil se acerca a su aprobación. Puede reducir el tiempo de inactividad de las aeronaves, pero los datos sobre desplazamientos, energía, consumibles y fin de vida están incompletos.",
    symbol: "◎",
    accent: "blue",
    decisions: [
      {
        title: "Elige el enfoque de evaluación",
        prompt: "¿Cómo incorporas la sostenibilidad al punto de decisión?",
        detail: "El equipo del proyecto dispone de dos semanas antes de la revisión del diseño.",
        choices: [
          {
            id: "material-assessment",
            title: "Evaluación de aspectos relevantes + acciones",
            description: "Evalúa ahora los impactos significativos, documenta las hipótesis y asigna responsables a las carencias críticas para la decisión.",
            impact: { readiness: 7, environment: 9, evidence: 14, delivery: 5 },
            integrity: "strong",
            feedback:
              "Esto permite tomar una decisión sin fingir que la evidencia está completa. Las carencias relevantes se convierten en acciones gestionadas.",
          },
          {
            id: "perfect-data",
            title: "Espera a tener datos perfectos",
            description: "Retrasa todas las decisiones hasta disponer de toda la información de ciclo de vida.",
            impact: { readiness: -10, environment: 3, evidence: 5, delivery: -11 },
            integrity: "mixed",
            feedback:
              "Más evidencia es valiosa, pero una espera indefinida puede impedir una actuación proporcionada. Prioriza la incertidumbre relevante para la decisión.",
          },
          {
            id: "good-intention",
            title: "Aprueba basándote en la buena intención",
            description: "Supón que reducir el tiempo de inactividad hace sostenible todo el servicio.",
            impact: { readiness: 8, environment: -5, evidence: -16, delivery: 8 },
            integrity: "weak",
            feedback:
              "Un posible beneficio no puede representar todo el servicio. Los desplazamientos, los recursos, los residuos y los efectos rebote siguen siendo importantes.",
          },
        ],
      },
      {
        title: "Cierra la brecha de datos",
        prompt: "Las emisiones de los desplazamientos todavía no se han medido. ¿Qué se incluye en la revisión?",
        detail: "Un servicio comparable proporciona un rango utilizable, pero no un valor exacto para este proyecto.",
        choices: [
          {
            id: "range-uncertainty",
            title: "Utiliza un rango con incertidumbre",
            description: "Aplica un valor sustitutivo transparente, realiza un análisis de sensibilidad y programa su sustitución por datos medidos.",
            impact: { readiness: 6, environment: 5, evidence: 13, delivery: 6 },
            integrity: "strong",
            feedback:
              "Un rango transparente puede ser útil para decidir. La fuente, el valor sustitutivo y la incertidumbre permanecen visibles.",
          },
          {
            id: "enter-zero",
            title: "Introduce cero hasta que se mida",
            description: "Mantén completo el panel tratando los datos de desplazamientos ausentes como si no hubiera impacto.",
            impact: { readiness: 1, environment: -7, evidence: -18, delivery: 5 },
            integrity: "weak",
            feedback:
              "La ausencia de datos no equivale a cero. Esto crea una falsa precisión y sesga la decisión.",
          },
          {
            id: "hide-project",
            title: "Excluye los desplazamientos del límite",
            description: "Define la evaluación del servicio de modo que la categoría no disponible quede excluida sin explicación.",
            impact: { readiness: 3, environment: -6, evidence: -16, delivery: 6 },
            integrity: "weak",
            feedback:
              "Un límite puede ser legítimo, pero cambiarlo para ocultar un impacto relevante hace que la comparación sea engañosa.",
          },
        ],
      },
    ],
    learning: [
      "Los datos ausentes deben identificarse como ausentes, estimados o aproximados mediante un valor sustitutivo; nunca introducirse silenciosamente como cero.",
      "Los límites de la evaluación deben seguir la decisión, no modificarse para mejorar el resultado.",
      "Un punto de decisión creíble registra los impactos relevantes, las hipótesis, la incertidumbre, las acciones, los responsables y las fechas de revisión.",
    ],
    claimCheck: "Di «evaluado provisionalmente con las hipótesis y carencias de datos indicadas», no «sostenible por diseño».",
  },
];

const integrityRules = [
  "Veraces y precisas",
  "Claras e inequívocas",
  "Sin omisiones relevantes",
  "Comparaciones justas y equivalentes",
  "Ciclo de vida relevante considerado",
  "Alegaciones respaldadas por evidencia",
];

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function addImpact(base: Metrics, impact: Impact): Metrics {
  return {
    readiness: base.readiness + (impact.readiness ?? 0),
    environment: base.environment + (impact.environment ?? 0),
    evidence: base.evidence + (impact.evidence ?? 0),
    delivery: base.delivery + (impact.delivery ?? 0),
  };
}

function deltaClass(value: number) {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [callSign, setCallSign] = useState("Equipo Falcon");
  const [mode, setMode] = useState<"team" | "solo">("team");
  const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);
  const [completed, setCompleted] = useState<Record<string, Completion>>({});
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [runDelta, setRunDelta] = useState<Metrics>(ZERO_DELTA);
  const [runChoices, setRunChoices] = useState<string[]>([]);
  const [showEvidence, setShowEvidence] = useState(false);
  const [showBriefing, setShowBriefing] = useState(false);

  const activeMission = missions.find((mission) => mission.id === activeMissionId) ?? null;
  const completedCount = Object.keys(completed).length;
  const progress = Math.round((completedCount / missions.length) * 100);

  const currentDecision = activeMission?.decisions[decisionIndex] ?? null;

  const averageScore = useMemo(() => {
    const values = Object.values(metrics);
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }, [metrics]);

  function begin() {
    setCallSign((value) => value.trim() || (mode === "team" ? "Equipo Falcon" : "Falcon Uno"));
    setScreen("map");
    setShowBriefing(true);
  }

  function openMission(missionId: string) {
    setActiveMissionId(missionId);
    setDecisionIndex(0);
    setSelectedChoice(null);
    setRunDelta(ZERO_DELTA);
    setRunChoices([]);
    setScreen(completed[missionId] ? "debrief" : "mission");
  }

  function choose(choice: Choice) {
    if (selectedChoice) return;
    setSelectedChoice(choice);
    setRunDelta((current) => addImpact(current, choice.impact));
    setRunChoices((current) => [...current, choice.id]);
  }

  function continueDecision() {
    if (!activeMission || !selectedChoice) return;
    if (decisionIndex < activeMission.decisions.length - 1) {
      setDecisionIndex((value) => value + 1);
      setSelectedChoice(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setScreen("debrief");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function completeMission() {
    if (!activeMission) return;
    if (!completed[activeMission.id]) {
      setMetrics((current) => ({
        readiness: clamp(current.readiness + runDelta.readiness),
        environment: clamp(current.environment + runDelta.environment),
        evidence: clamp(current.evidence + runDelta.evidence),
        delivery: clamp(current.delivery + runDelta.delivery),
      }));
      setCompleted((current) => ({
        ...current,
        [activeMission.id]: { choices: runChoices, delta: runDelta },
      }));
    }
    setScreen("map");
    setActiveMissionId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetSimulation() {
    setMetrics(INITIAL_METRICS);
    setCompleted({});
    setActiveMissionId(null);
    setDecisionIndex(0);
    setSelectedChoice(null);
    setRunDelta(ZERO_DELTA);
    setRunChoices([]);
    setScreen("welcome");
  }

  function goToFinal() {
    setScreen("final");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {screen !== "welcome" && (
        <header className="topbar">
          <button className="brand-button" onClick={() => setScreen("map")} aria-label="Volver al mapa de misiones">
            <span className="brand-mark">M26</span>
            <span>
              <strong>AIRPOWER</strong>
              <small>MISIÓN VERDE 2026</small>
            </span>
          </button>
          <div className="topbar-right">
            <span className="simulation-chip">SIMULACIÓN FORMATIVA</span>
            <button className="text-button" onClick={() => setShowEvidence(true)}>
              Protocolo de evidencia
            </button>
            <div className="operator-chip">
              <span className="operator-dot" />
              {callSign}
            </div>
          </div>
        </header>
      )}

      {screen === "welcome" && (
        <section className="welcome-screen">
          <nav className="welcome-nav">
            <div className="wordmark">
              <span className="brand-mark large">M26</span>
              <span>
                <strong>AIRPOWER</strong>
                <small>EXPERIENCIA DE APRENDIZAJE</small>
              </span>
            </div>
            <button className="text-button" onClick={() => setShowEvidence(true)}>
              Protocolo contra el blanqueo ecológico ↗
            </button>
          </nav>

          <div className="welcome-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span /> OBJETIVOS DE SOSTENIBILIDAD 2026</div>
              <h1>
                Cada decisión
                <br />
                <em>cambia la misión.</em>
              </h1>
              <p className="hero-lede">
                Entra en seis escenarios de Airpower Services. Protege la disponibilidad operativa mientras tomas decisiones ambientales específicas, respaldadas por evidencia y honestas.
              </p>

              <div className="launch-panel">
                <div className="mode-switch" role="group" aria-label="Modo de simulación">
                  <button className={mode === "team" ? "active" : ""} onClick={() => setMode("team")}>Misión de equipo</button>
                  <button className={mode === "solo" ? "active" : ""} onClick={() => setMode("solo")}>Misión individual</button>
                </div>
                <label>
                  <span>{mode === "team" ? "Identificador del equipo" : "Tu identificador"}</span>
                  <input value={callSign} onChange={(event) => setCallSign(event.target.value)} maxLength={28} />
                </label>
                <button className="primary-button launch-button" onClick={begin}>
                  Iniciar misión <span>→</span>
                </button>
              </div>

              <p className="micro-disclaimer">
                Escenarios formativos ilustrativos. Las puntuaciones no son datos de desempeño ambiental de Airbus ni una certificación.
              </p>
            </div>

            <div className="mission-orbit" aria-label="Vista previa de las disciplinas de misión">
              <div className="orbit-header">
                <span>SISTEMA DE MISIONES</span>
                <span className="live-dot">LISTO</span>
              </div>
              <div className="radar">
                <div className="radar-sweep" />
                <div className="radar-core">
                  <strong>6</strong>
                  <span>MISIONES</span>
                </div>
                {missions.map((mission, index) => (
                  <div key={mission.id} className={`orbit-node node-${index + 1}`}>
                    <span>{mission.symbol}</span>
                    <small>{mission.discipline}</small>
                  </div>
                ))}
              </div>
              <div className="integrity-strip">
                <span className="shield-icon">◇</span>
                <div>
                  <small>REGLA DE INTEGRIDAD</small>
                  <strong>Evidencia antes que alegaciones</strong>
                </div>
                <span className="status-ok">ACTIVO</span>
              </div>
            </div>
          </div>

          <div className="welcome-objectives">
            <span>LOGÍSTICA DE CO₂</span><i />
            <span>ENERGÍA</span><i />
            <span>MATERIALES</span><i />
            <span>REACH</span><i />
            <span>SAF</span><i />
            <span>DATOS</span>
          </div>
        </section>
      )}

      {screen === "map" && (
        <section className="map-screen page-width">
          <div className="map-heading">
            <div>
              <div className="eyebrow"><span /> CONTROL DE MISIONES / 2026</div>
              <h1>Elige tu siguiente zona de decisión.</h1>
              <p>Completa las seis misiones para desbloquear la revisión formativa. No existe una respuesta ambiental perfecta, solo compensaciones transparentes.</p>
            </div>
            <div className="progress-module" style={{ "--progress": `${progress * 3.6}deg` } as CSSProperties}>
              <div className="progress-ring"><span>{progress}%</span></div>
              <div>
                <small>PROGRESO DE LA MISIÓN</small>
                <strong>{completedCount} / {missions.length} completadas</strong>
                <span>{completedCount === missions.length ? "Revisión final desbloqueada" : `${missions.length - completedCount} zonas de decisión pendientes`}</span>
              </div>
            </div>
          </div>

          <div className="scoreboard">
            {(Object.keys(metricMeta) as MetricKey[]).map((key) => (
              <div className="score-item" key={key}>
                <div className="score-label"><span>{metricMeta[key].label}</span><strong>{metrics[key]}</strong></div>
                <div className="score-track"><i style={{ width: `${metrics[key]}%` }} /></div>
              </div>
            ))}
            <button className="info-button" onClick={() => setShowEvidence(true)} aria-label="Cómo funciona la puntuación">?</button>
          </div>

          <div className="mission-grid">
            {missions.map((mission) => {
              const isComplete = Boolean(completed[mission.id]);
              return (
                <article className={`mission-card accent-${mission.accent} ${isComplete ? "complete" : ""}`} key={mission.id}>
                  <div className="card-topline">
                    <span className="mission-number">M-{mission.number}</span>
                    <span className="mission-status">{isComplete ? "COMPLETADA" : "DISPONIBLE"}</span>
                  </div>
                  <div className="mission-symbol">{isComplete ? "✓" : mission.symbol}</div>
                  <small className="mission-location">{mission.location}</small>
                  <h2>{mission.short}</h2>
                  <p>{mission.objective}</p>
                  <div className="target-line"><span>OBJETIVO</span>{mission.target.replace("Objetivo 2026: ", "")}</div>
                  <button onClick={() => openMission(mission.id)}>
                    {isComplete ? "Revisar aprendizaje" : "Entrar en la misión"} <span>→</span>
                  </button>
                </article>
              );
            })}
          </div>

          <div className="map-footer">
            <div>
              <span className="shield-icon">◇</span>
              <p><strong>Protocolo de integridad activo.</strong> Las alegaciones vagas reducen la puntuación de cumplimiento y evidencia, aunque parezcan positivas.</p>
            </div>
            <button className="secondary-button" disabled={completedCount < missions.length} onClick={goToFinal}>
              Abrir revisión final {completedCount < missions.length ? `· ${missions.length - completedCount} pendientes` : "→"}
            </button>
          </div>
        </section>
      )}

      {screen === "mission" && activeMission && currentDecision && (
        <section className="mission-screen page-width">
          <button className="back-button" onClick={() => setScreen("map")}>← Salir al control de misiones</button>
          <div className="mission-header">
            <div className={`large-symbol accent-${activeMission.accent}`}>{activeMission.symbol}</div>
            <div>
              <div className="eyebrow"><span /> MISIÓN {activeMission.number} / {activeMission.discipline}</div>
              <h1>{activeMission.title}</h1>
              <p>{activeMission.briefing}</p>
            </div>
            <div className="mission-objective-box">
              <small>OBJETIVO 2026</small>
              <strong>{activeMission.target.replace("Objetivo 2026: ", "")}</strong>
              <span>Escenario formativo · valores ilustrativos</span>
            </div>
          </div>

          <div className="decision-layout">
            <aside className="decision-rail">
              <span className="rail-label">RUTA DE DECISIÓN</span>
              {activeMission.decisions.map((decision, index) => (
                <div className={`rail-step ${index === decisionIndex ? "active" : ""} ${index < decisionIndex ? "done" : ""}`} key={decision.title}>
                  <span>{index < decisionIndex ? "✓" : index + 1}</span>
                  <div><small>PASO {index + 1}</small><strong>{decision.title}</strong></div>
                </div>
              ))}
              <div className="rail-rule">
                <small>INTEGRIDAD DE LAS ALEGACIONES</small>
                <p>Elige aquello que la evidencia disponible pueda respaldar realmente.</p>
              </div>
            </aside>

            <div className="decision-main">
              <div className="decision-context">
                <div><span>PASO {decisionIndex + 1} DE {activeMission.decisions.length}</span><h2>{currentDecision.prompt}</h2></div>
                <p>{currentDecision.detail}</p>
              </div>

              <div className="choice-list">
                {currentDecision.choices.map((choice, index) => {
                  const isSelected = selectedChoice?.id === choice.id;
                  const isMuted = Boolean(selectedChoice && !isSelected);
                  return (
                    <button
                      key={choice.id}
                      className={`choice-card ${isSelected ? `selected integrity-${choice.integrity}` : ""} ${isMuted ? "muted" : ""}`}
                      onClick={() => choose(choice)}
                      disabled={Boolean(selectedChoice)}
                    >
                      <span className="choice-index">{String.fromCharCode(65 + index)}</span>
                      <span className="choice-copy"><strong>{choice.title}</strong><small>{choice.description}</small></span>
                      <span className="choice-arrow">{isSelected ? "✓" : "→"}</span>
                    </button>
                  );
                })}
              </div>

              {selectedChoice && (
                <div className={`consequence-panel integrity-${selectedChoice.integrity}`}>
                  <div className="consequence-top">
                    <div>
                      <small>EFECTO DE LA DECISIÓN</small>
                      <strong>{selectedChoice.integrity === "strong" ? "La evidencia se sostiene" : selectedChoice.integrity === "mixed" ? "La compensación requiere contexto" : "Advertencia sobre la integridad de la alegación"}</strong>
                    </div>
                    <div className="impact-chips">
                      {(Object.keys(metricMeta) as MetricKey[]).map((key) => {
                        const value = selectedChoice.impact[key] ?? 0;
                        return <span key={key} className={deltaClass(value)}>{metricMeta[key].short} {value > 0 ? "+" : ""}{value}</span>;
                      })}
                    </div>
                  </div>
                  <p>{selectedChoice.feedback}</p>
                  <button className="primary-button" onClick={continueDecision}>
                    {decisionIndex < activeMission.decisions.length - 1 ? "Continuar la misión" : "Abrir conclusiones"} <span>→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {screen === "debrief" && activeMission && (
        <section className="debrief-screen page-width">
          <button className="back-button" onClick={() => setScreen("map")}>← Control de misiones</button>
          <div className="debrief-hero">
            <div className={`debrief-icon accent-${activeMission.accent}`}>{completed[activeMission.id] ? "✓" : activeMission.symbol}</div>
            <div>
              <div className="eyebrow"><span /> MISIÓN {activeMission.number} / CONCLUSIONES</div>
              <h1>{activeMission.short}</h1>
              <p>{completed[activeMission.id] ? "Revisa las reglas de evidencia de esta misión completada." : "El escenario está completo. Convierte la decisión en conocimiento reutilizable."}</p>
            </div>
            <div className="debrief-stamp"><span>{completed[activeMission.id] ? "REVISIÓN" : "DECISIÓN"}</span><strong>{completed[activeMission.id] ? "REGISTRADA" : "COMPLETADA"}</strong></div>
          </div>

          <div className="debrief-grid">
            <div className="learning-panel">
              <small className="panel-kicker">QUÉ LLEVAR AL TRABAJO DIARIO</small>
              <h2>Tres aspectos importantes.</h2>
              <ol>
                {activeMission.learning.map((item, index) => (
                  <li key={item}><span>0{index + 1}</span><p>{item}</p></li>
                ))}
              </ol>
            </div>
            <div className="claim-panel">
              <div className="claim-header"><span className="shield-icon">◇</span><small>CONTROL CONTRA EL BLANQUEO ECOLÓGICO</small></div>
              <h2>Realiza únicamente la alegación que respalde la evidencia.</h2>
              <blockquote>{activeMission.claimCheck}</blockquote>
              <div className="claim-rules">
                <span>LÍNEA BASE</span><span>LÍMITE</span><span>MÉTODO</span><span>FECHA</span><span>INCERTIDUMBRE</span>
              </div>
            </div>
          </div>

          {!completed[activeMission.id] && (
            <div className="delta-summary">
              <div><small>IMPACTO DE LA MISIÓN / SIMULADO</small><strong>Balance de tus decisiones</strong></div>
              {(Object.keys(metricMeta) as MetricKey[]).map((key) => (
                <span key={key} className={deltaClass(runDelta[key])}>{metricMeta[key].short}<strong>{runDelta[key] > 0 ? "+" : ""}{runDelta[key]}</strong></span>
              ))}
            </div>
          )}

          <div className="debrief-actions">
            <p>Esta finalización solo registra el progreso formativo. No constituye una certificación ambiental ni una aprobación operativa.</p>
            <button className="primary-button" onClick={completeMission}>{completed[activeMission.id] ? "Volver al mapa de misiones" : "Registrar la misión y continuar"} <span>→</span></button>
          </div>
        </section>
      )}

      {screen === "final" && (
        <section className="final-screen page-width">
          <div className="final-orbit"><div className="final-core"><span>6/6</span><small>MISIONES</small></div></div>
          <div className="eyebrow centered"><span /> REVISIÓN FORMATIVA FINAL</div>
          <h1>Misión completada.<br /><em>La evidencia sigue activa.</em></h1>
          <p className="final-lede">{callSign} ha completado la simulación de decisiones de sostenibilidad 2026 con un balance general del escenario de <strong>{averageScore}/100</strong>.</p>

          <div className="final-scores">
            {(Object.keys(metricMeta) as MetricKey[]).map((key) => (
              <div key={key}>
                <small>{metricMeta[key].label}</small>
                <strong>{metrics[key]}</strong>
                <div><i style={{ width: `${metrics[key]}%` }} /></div>
              </div>
            ))}
          </div>

          <div className="final-message">
            <span className="shield-icon">◇</span>
            <div><small>TU REGLA DE ACTUACIÓN</small><strong>Lo específico supera a lo impresionante. La evidencia supera a la intención. El contexto supera a un titular.</strong></div>
          </div>

          <p className="final-disclaimer">Finalización exclusivamente formativa. Este resultado no demuestra desempeño ambiental, estado de cumplimiento ni cualificación profesional.</p>
          <div className="final-actions">
            <button className="secondary-button" onClick={() => setScreen("map")}>Revisar el mapa de misiones</button>
            <button className="primary-button" onClick={resetSimulation}>Iniciar una nueva simulación <span>↻</span></button>
          </div>
        </section>
      )}

      {showBriefing && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Instrucciones de la misión">
          <div className="briefing-modal">
            <button className="modal-close" onClick={() => setShowBriefing(false)} aria-label="Cerrar instrucciones">×</button>
            <div className="briefing-code">INSTRUCCIONES / M26-2026</div>
            <h2>Tu misión no consiste en elegir la opción que suene más verde.</h2>
            <p>Protege el servicio mientras tomas decisiones capaces de superar un análisis riguroso. Cada escenario evalúa cuatro dimensiones.</p>
            <div className="briefing-metrics">
              {(Object.keys(metricMeta) as MetricKey[]).map((key, index) => (
                <div key={key}><span>0{index + 1}</span><strong>{metricMeta[key].label}</strong></div>
              ))}
            </div>
            <div className="briefing-rule"><span className="shield-icon">◇</span><p><strong>Protocolo contra el blanqueo ecológico:</strong> las alegaciones deben ser específicas, delimitadas y estar respaldadas. No deben ocultarse compensaciones importantes.</p></div>
            <button className="primary-button full" onClick={() => setShowBriefing(false)}>Confirmar y entrar en el control de misiones <span>→</span></button>
          </div>
        </div>
      )}

      {showEvidence && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Protocolo de evidencia">
          <div className="evidence-modal">
            <button className="modal-close" onClick={() => setShowEvidence(false)} aria-label="Cerrar protocolo de evidencia">×</button>
            <div className="eyebrow"><span /> PROTOCOLO DE INTEGRIDAD DE LAS ALEGACIONES</div>
            <h2>El lenguaje ambiental no debe ir por delante de la evidencia.</h2>
            <p className="modal-intro">La simulación utiliza seis principios adaptados de directrices reconocidas sobre alegaciones ambientales.</p>
            <div className="rule-grid">
              {integrityRules.map((rule, index) => <div key={rule}><span>0{index + 1}</span><strong>{rule}</strong></div>)}
            </div>
            <div className="evidence-note">
              <strong>Dentro de esta simulación</strong>
              <p>Todas las cifras operativas son ilustrativas. No representan el desempeño de Airbus. Las decisiones REACH deben seguir el proceso empresarial y reglamentario aplicable. Las comparaciones sobre SAF requieren una metodología de ciclo de vida definida y una cadena de evidencia.</p>
            </div>
            <div className="source-links">
              <a href="https://www.gov.uk/government/publications/green-claims-code-making-environmental-claims/environmental-claims-on-goods-and-services" target="_blank" rel="noreferrer">Código de alegaciones ambientales de la CMA ↗</a>
              <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L0825" target="_blank" rel="noreferrer">Directiva UE 2024/825 ↗</a>
              <a href="https://chem.echa.europa.eu/obligation-lists/candidateList" target="_blank" rel="noreferrer">Lista de sustancias candidatas de ECHA ↗</a>
              <a href="https://www.icao.int/CORSIA/fuels-lifecycle" target="_blank" rel="noreferrer">Ciclo de vida del SAF según OACI ↗</a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
