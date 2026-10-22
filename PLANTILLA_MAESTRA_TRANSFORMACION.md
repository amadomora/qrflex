# Plantilla Maestra de Transformación de Prompts a Agentes Autónomos (`/transform-agents`)

> **Propósito:** Esta plantilla es un **ejecutor maestro** diseñado para portarse a cualquier proyecto nuevo. Su misión es escanear una carpeta tradicional de prompts (`Agentes/`), extraer su conocimiento conceptual y **transformar automáticamente cada archivo en un Agente / Skill Autónomo e Interconectado** dentro de la arquitectura `.agents/skills/`, configurando además el protocolo global de orquestación cruzada.

---

## ⚡ Instrucciones de Ejecución Automática para la IA (`System Directive`)

Cuando el usuario copie este archivo a un nuevo proyecto e indique en el chat:  
**`"Aplica la PLANTILLA_MAESTRA_TRANSFORMACION"`** o **`"/transform-agents"`** (o invoque este documento), la IA **DEBE ejecutar inmediatamente y de forma autónoma el siguiente flujo de 4 fases**, creando todos los archivos necesarios:

---

### FASE 1: Exploración y Diagnóstico (`Discovery`)
1. Ejecuta la herramienta `list_dir` en el directorio raiz y en el directorio `Agentes/` (o la carpeta donde residan los `.md` de roles).
2. Para cada archivo `.md` encontrado (ej. `master-dev.md`, `master-db.md`, `master-pos.md`, `master-security.md`, etc.), ejecuta `view_file` para extraer:
   - El nombre del rol (`name`).
   - El propósito y dominio técnico (`description`).
   - Las reglas y restricciones de aceptación propias de ese proyecto.

---

### FASE 2: Creación de la Constitución Multi-Agente (`AGENTS.md`)
Crea el archivo global de reglas del espacio de trabajo en **`.agents/AGENTS.md`** con el siguiente formato, adaptando la matriz a las especialidades detectadas en la Fase 1:

```markdown
# Reglas y Protocolo de Orquestación Multi-Agente del Proyecto

Este documento establece el **Protocolo Obligatorio de Interacción y Delegación entre Agentes (Skills)** en el espacio de trabajo. Cuando la IA ejecuta cualquier tarea, DEBE acatar estas directrices para que los agentes operen como un equipo sincronizado.

## 1. Regla de Delegación Activa e Invocación Cruzada (`Cross-Skill Routing`)
Ningún agente debe actuar en un área que no sea su especialidad principal. Siempre que el flujo de ejecución toque un dominio especializado, el agente en curso **DEBE invocar y cargar el SKILL.md de ese especialista** usando `view_file` antes de ejecutar los cambios.

### Mecanismo de Invocación Inter-Agente:
Para llamar a otro agente durante una tarea, ejecuta `view_file` sobre su `SKILL.md`:
- `[nombre-agente-1]`: [SKILL.md](file:///.agents/skills/[nombre-agente-1]/SKILL.md)
- `[nombre-agente-2]`: [SKILL.md](file:///.agents/skills/[nombre-agente-2]/SKILL.md)
(Incluir aquí todos los agentes descubiertos en FASE 1)

## 2. Matriz Obligatoria de Interacciones (`Cross-Delegation Matrix`)
- Si un agente general (`master-dev`) modifica o crea estructuras de base de datos ➔ **Invoca obligatoriamente a `master-db`**.
- Si la tarea involucra finanzas, dinero, contabilidad, inventario o caja ➔ **Invoca obligatoriamente a `master-pos`**.
- Si se crean endpoints, logins, rutas o manejo de sesiones/tokens ➔ **Invoca obligatoriamente a `master-security`** para auditoría.
- Si se construyen o editan interfaces gráficas y layouts ➔ **Invoca obligatoriamente a `master-ui`**.
- Si se requiere redacción de manuales o diagramas de flujo Mermaid ➔ **Invoca obligatoriamente a `master-doc`**.

## 3. Reporte de Orquestación en la Salida
En el bloque `RESULTADO`, la IA especificará qué agentes interactuaron en la solución.
```

---

### FASE 3: Generación Estructurada de Skills (`SKILL.md`)
Para cada archivo identificado en `Agentes/<nombre>.md`, crea un nuevo directorio y archivo en **`.agents/skills/<nombre>/SKILL.md`**.  
El contenido de cada `SKILL.md` generado **DEBE integrar obligatoriamente estos 5 pilares**:

1. **Frontmatter YAML:**
   ```yaml
   ---
   name: <nombre_del_agente>
   description: <descripción_concisa_de_cuándo_se_activa_y_su_propósito>
   ---
   ```
2. **Sección 1: Conjunto de Herramientas (`Tools & Capabilities`)**  
   Especificar qué herramientas de consola (`run_command`), archivos (`replace_file_content`, `grep_search`) o inspección debe usar según su rol (ej. `master-dev` compila; `master-db` inspecciona esquemas; `master-security` hace escaneo estático).
3. **Sección 2: Bucle de Razonamiento Iterativo (`ReAct Loop`)**  
   Definir su ciclo de autogestión: Pensar ➔ Actuar ➔ Observar el resultado (ej. logs de build o linter) ➔ Autocorregir errores si surgen sin intervención manual del usuario.
4. **Sección 3: Enrutamiento e Invocación Cruzada (`Cross-Skill Delegation`)**  
   Incluir enlaces directos `file:///.agents/skills/<otro>/SKILL.md` y la obligación de llamar con `view_file` a los agentes complementarios del proyecto.
5. **Sección 4: Estructura de Respuesta en 6 Bloques (`Los 6 Bloques`)**  
   Establecer que al responder al usuario se deben usar los bloques:
   `CONTEXTO ➔ ROL ➔ TAREA ➔ FLUJO ➔ REGLAS ➔ RESULTADO`.

---

### FASE 4: Confirmación y Reporte de Despliegue
Al concluir la escritura de todos los `SKILL.md` y de `AGENTS.md`, presenta un reporte en forma de tabla indicando:
- Lista de Skills convertidas y activadas.
- Matriz de interacciones enlazadas.
- Confirmación de que el ecosistema está listo y autodescubierto por la IA.
