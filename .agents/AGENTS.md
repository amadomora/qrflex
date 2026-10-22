# Constitución y Protocolo de Orquestación Multi-Agente: QRFlex Turismo Santander

Este documento establece el **Protocolo Obligatorio de Interacción y Delegación entre Agentes (Skills)** en el espacio de trabajo `/var/www/html/qrflex`. Todos los agentes operan como un equipo multidisciplinario altamente especializado en la intersección entre tecnología web moderna (Node.js + React + Apache) y el patrimonio turístico y cultural de Santander y Colombia.

---

## 1. Catálogo de Agentes Especialistas Disponibles

Para invocar a un especialista durante la ejecución de una tarea, la IA o el agente activo DEBE leer su directriz mediante su enlace directo:

1. **`turismo-santander`**: [SKILL.md](file:///var/www/html/qrflex/.agents/skills/turismo-santander/SKILL.md)  
   *Dominio:* Curaduría histórica, geográfica, biológica y cultural de Santander (Cañón del Chicamocha, Guanes, PANACHI, Barichara, biodiversidad y contenido bilingüe/trilingüe verificado).
2. **`dev-fullstack`**: [SKILL.md](file:///var/www/html/qrflex/.agents/skills/dev-fullstack/SKILL.md)  
   *Dominio:* Arquitectura e implementación Node.js (Express API) + React (Tailwind CSS, i18next en caliente, audioguía Web Speech API, PWA offline para zonas rurales).
3. **`qr-engine`**: [SKILL.md](file:///var/www/html/qrflex/.agents/skills/qr-engine/SKILL.md)  
   *Dominio:* Generación de QR dinámicos vectoriales (SVG) y rasterizados (PNG 300 DPI), composición gráfica para carteles y señalética física con banderas al pie.
4. **`devops-apache`**: [SKILL.md](file:///var/www/html/qrflex/.agents/skills/devops-apache/SKILL.md)  
   *Dominio:* Configuración de Apache HTTP Server, VirtualHosts, ProxyPass hacia Node.js, mod_rewrite, compresión gzip/brotli y gestión de certificados SSL.
5. **`db-geo`**: [SKILL.md](file:///var/www/html/qrflex/.agents/skills/db-geo/SKILL.md)  
   *Dominio:* Modelado de datos JSONB multilingüe (ES/EN/FR), taxonomía de sitios (cañón, parque, colonial, arqueológico), georreferenciación GPS y métricas de escaneo.

---

## 2. Matriz Obligatoria de Interacciones Cruzadas (`Cross-Delegation Matrix`)

Ningún agente debe asumir responsabilidades fuera de su competencia primaria. Se aplican las siguientes reglas de enrutamiento estricto:

* 🏞️ **Cuando se redacte, revise o traduzca información sobre sitios turísticos:**  
  ➔ **Invocar obligatoriamente a `turismo-santander`** para garantizar precisión geográfica, histórica, nombres de especies y recomendaciones viales.
* ⚛️ **Cuando se diseñen o codifiquen componentes React, estado global o endpoints Express:**  
  ➔ **Invocar obligatoriamente a `dev-fullstack`**.
* 📲 **Cuando se altere la estructura de URLs de escaneo, generación de QR o señalética para imprenta:**  
  ➔ **Invocar obligatoriamente a `qr-engine`**.
* 🌐 **Cuando se configure el servidor web, VirtualHost de Apache, puertos proxy o cabeceras HTTP:**  
  ➔ **Invocar obligatoriamente a `devops-apache`**.
* 🗄️ **Cuando se definan o modifiquen esquemas de datos, consultas o persistencia multilingüe:**  
  ➔ **Invocar obligatoriamente a `db-geo`**.

---

## 3. Protocolo de Ejecución de Tareas

Toda intervención del ecosistema debe seguir el ciclo:
1. **Recepción y Triaje:** Determinar qué agentes son requeridos.
2. **Delegación Cruzada:** Cargar las directrices de los agentes involucrados.
3. **Bucle ReAct (Pensar ➔ Actuar ➔ Observar ➔ Autocorregir):** Probar el código, endpoints y configuraciones antes de dar por terminada la tarea.
4. **Respuesta Estructurada en 6 Bloques:**
   `CONTEXTO ➔ ROL ➔ TAREA ➔ FLUJO ➔ REGLAS ➔ RESULTADO`.

