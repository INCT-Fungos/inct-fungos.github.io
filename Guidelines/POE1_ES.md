<p align="center"> <img src="https://inct-fungos.imd.ufrn.br/img/Fungos_BR.png" alt="Descrição" width="150" /> </p>

# INCT Hongos de Brasil

# POE 1: Extracción, Análisis de Calidad y Envío de ADN

> **Aviso:** *Este documento fue traducido con el apoyo de IA generativa (Gemini).*

## Manual del Usuario

### Objetivo:

Orientar a los investigadores de la red INCT Hongos de Brasil sobre protocolos de extracción, purificación y requisitos mínimos de calidad y cantidad para el envío de muestras de ADN genómico destinadas a secuenciación (*PCR-free library prep* Illumina).

## 1. Verificación de la Pureza de los Cultivos

> **ATENCIÓN:** Este es un paso indispensable previo a cualquier extracción de ADN. La secuenciación genómica es altamente sensible y detectará cualquier contaminante presente. Un genoma contaminado con ADN de bacterias, levaduras u otros hongos compromete el ensamblaje y análisis, derivando en pérdida de recursos y necesidad de resecuenciación.

### 1.1. Obtención de Cultivos Monospóricos (Fuertemente Recomendado)

Para garantizar la pureza genética, se recomienda enfáticamente extraer ADN a partir de cultivos monospóricos (derivados de una sola espora). Esto asegura que todo el material proviene de un único individuo, eliminando mezclas de genotipos dentro de una misma especie. Cultivos derivados de fragmentos miceliales o múltiples esporas pueden albergar polimorfismos que entorpecen el ensamblaje *de novo*.

### 1.2. Inspección Visual y Microbiológica Previa

Antes de extraer ADN, realice una rigurosa inspección:

| **Tipo de Cultivo**       | **Qué Inspeccionar**                                                                                   | **Signos de Contaminación (NO extraer)**                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Medio Sólido (Placa)**  | Colonia con morfología, color y textura homogéneas. Ausencia de colonias satélite o sectores atípicos. | Colonias bacterianas (brillantes, mucoides); desarrollo de hongos secundarios de morfología distinta; bordes irregulares pigmentados. |
| **Medio Líquido (Caldo)** | Crecimiento micelial homogéneo (pellets o masa compacta). Caldo translúcido entre masas.               | Turbidez en el medio (indicador clásico de bacterias); biopelícula superficial; viraje de color o mal olor; estructuras atípicas.     |

### 1.3. Procedimiento ante Sospecha de Contaminación

Si sospecha de contaminación, suspenda la extracción y aplique las siguientes medidas:

- Repicar a medio fresco tomando micelio de una zona limpia (punta de hifa).

- Realizar un nuevo aislamiento monospórico.

- Si el hongo no esporula, realizar diluciones seriadas de fragmentos de hifas y resembrar en placa.

- Aguardar el desarrollo completo y repetir el control visual antes de proceder a la extracción.

### 1.4. Confirmación Opcional por Microscopía

Se sugiere examinar una alícuota al microscopio óptico (400x a 1000x) para descartar presencia de bacterias (bacilos o cocos) asociadas a las hifas.

## 2. Directrices para la Extracción de ADN

La obtención de ADN íntegro y de alto peso molecular es fundamental para el éxito del proyecto.

- **Método de Extracción:** No se exige un kit comercial específico, pero es obligatorio declarar el protocolo empleado en la planilla de envío (ej. CTAB, Qiagen DNeasy Plant Kit, Zymo Research Kit, Fenol-Cloroformo, etc.) para facilitar el diagnóstico técnico si ocurren fallas en la secuenciación.

**Recomendaciones Generales:**

| **Aspecto**                | **Recomendación**                                                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Material de Partida**    | Usar cultivos jóvenes (3–7 días para la mayoría de hongos filamentosos) y vigorosos para reducir polisacáridos y metabolitos secundarios.                      |
| **Lisis Celular**          | Evitar agitación mecánica prolongada (vórtex) para no fragmentar el ADN. Priorizar maceración con nitrógeno líquido o disrupción por perlas con pulsos breves. |
| **Hongos Melanizados**     | En especies melanizadas o ricas en polisacáridos, incorporar purificaciones adicionales (ej. precipitación con CTAB/NaCl o columnas de purificación).          |
| **Tratamiento con ARNasa** | Tratar con ARNasa A para eliminar ARN residual, el cual interfiere con la cuantificación y preparación de librerías.                                           |
| **Almacenamiento**         | Conservar a -20°C (corto plazo) o -80°C (largo plazo). Evitar descongelamientos sucesivos.                                                                     |

## 3. Criterios Mínimos de Calidad y Cantidad de ADN

| **Parámetro**              | **Requisito Mínimo**                  | **Observaciones**                                                                                                 |
| -------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Cantidad Total de ADN**  | ≥ 500 ng                              | Requisito indispensable para *PCR-free library prep*.                                                             |
| **Concentración Mínima**   | ≥ 10 ng/µL                            | Se recomienda enviar concentraciones mayores si es posible.                                                       |
| **Volumen de Muestra**     | 20 µL a 50 µL                         | —                                                                                                                 |
| **Tampón de Suspensión**   | Agua ultrapura o tampón LIBRE DE EDTA | Prohibido usar tampón TE estándar; el EDTA inhibe las reacciones enzimáticas posteriores.                         |
| **Pureza (A260/A280)**     | 1.6 a 2.0                             | Medido por NanoDrop o espectrofotómetro equivalente.                                                              |
| **Pureza (A260/A230)**     | ≥ 1.8                                 | Medido por NanoDrop. Ratios menores indican contaminación por polisacáridos, sales o fenol.                       |
| **Integridad (Tamaño)**    | > 50% de fragmentos > 2 kb            | Verificado en gel de agarosa (0.8% a 1%) o TapeStation/Bioanalyzer. El ADN no debe presentar degradación visible. |
| **Cuantificación Oficial** | Ensayo Fluorométrico (ej. Qubit)      | La concentración final reportada debe ser fluorométrica. El NanoDrop sobreestima la concentración real.           |

## 4. Acondicionamiento Local de Muestras

Almacenar en microtubos estériles de 1.5 mL o 2.0 mL libres de ADNasas y ARNasas. Identificar claramente tapa y lateral con el **Código de la Muestra** (idéntico al registrado en la planilla) usando marcador indeleble resistente a solventes y congelamiento. Mantener a -20°C o -80°C hasta su entrega al Punto Focal/Hub Regional.

## 5. Laboratorios sin Acceso a Qubit o NanoDrop

El INCT Hongos de Brasil trabaja en red. Si su laboratorio carece de equipo fluorométrico (Qubit) o espectrofotométrico (NanoDrop), consulte el Plan de Logística Nacional: extraiga el ADN, realice el control preliminar en gel de agarosa y envíe la muestra a su Hub Regional de Apoyo para la validación final antes de su remisión al Punto Focal Nacional.

## 6. Documentación Requerida

Cada envío debe contar con la **Planilla 1: Envío de Muestras de ADN** completada digitalmente y remitida al Comité, adjuntando una copia física dentro del paquete refrigerado.



![](/home/jpmslima/coding/inct-fungos.github.io/img/banner-bottom.png)