<template>
    <div class="tutorial-container">
      <h1 class="tutorial-title">¿Cómo funciona <code>{{ command }}</code>?</h1>
      
      <div class="visual" v-html="currentVisual"></div>
      
      <div class="terminal" v-html="formattedTerminal"></div>
      
      <div class="step" v-for="(step, index) in steps" 
           :key="index" 
           :class="{ active: currentStep === index }">
        <h3>{{ step.title }}</h3>
        <div class="step-content" v-html="step.content"></div>
      </div>
      
      <div class="controls">
        <button @click="prevStep" 
                :disabled="currentStep === 0"
                class="control-button prev">
          ← Anterior
        </button>
        <span class="step-counter">
          Paso {{ currentStep + 1 }} de {{ steps.length }}
        </span>
        <button @click="nextStep" 
                :disabled="currentStep === steps.length - 1"
                class="control-button next">
          Siguiente →
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    command: {
      type: String,
      required: true
    }
  });
  const formattedTerminal = computed(() => {
  const terminalText = steps.value[currentStep.value]?.terminal || '';
  return `<pre>${terminalText.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}</pre>`;
});
  // Datos completos del tutorial
  const tutorials = {
    'git init': {
  steps: [
    {
      title: "1. Iniciar un nuevo repositorio",
      content: `<p>Convierte cualquier carpeta en un repositorio Git:</p>
               <ul>
                 <li>🆕 <strong>Crea la estructura básica</strong> para control de versiones</li>
                 <li>📁 <strong>Funciona en cualquier directorio</strong> de tu proyecto</li>
                 <li>⚙️ <strong>Prepara todo</strong> para empezar a guardar cambios</li>
               </ul>`,
      visual: "📦 Carpeta de proyecto\n⬇️\n✨ Repositorio Git",
      terminal: "$ git init",
      tip: "Ejecútalo en la raíz de tu proyecto, donde está tu código fuente"
    },
    {
      title: "2. La carpeta .git",
      content: `<p>Git crea una carpeta oculta con toda la magia:</p>
               <ul>
                 <li>🔒 <strong>.git/</strong> contiene toda la configuración e historial</li>
                 <li>📂 <strong>No la modifiques</strong> manualmente</li>
                 <li>👀 <strong>Oculta por defecto</strong> en sistemas de archivos</li>
               </ul>`,
      visual: "📂 tu-proyecto/\n└── 📂 .git/ (oculto)\n    ├── 📄 config\n    └── 📄 HEAD",
      terminal: "# Ver la carpeta .git (Linux/Mac):\n$ ls -a\n\n# En Windows:\n> dir /a",
      tip: "Usa 'ls -la' para ver archivos ocultos en Linux/Mac"
    },
    {
      title: "3. Estructura interna",
      content: `<p>Partes clave del repositorio:</p>
               <ul>
                 <li>🗃️ <strong>objects/</strong>: Almacena todos los archivos y commits</li>
                 <li>🏷️ <strong>refs/</strong>: Guarda referencias a ramas y tags</li>
                 <li>⚙️ <strong>config</strong>: Configuración específica del proyecto</li>
                 <li>🧭 <strong>HEAD</strong>: Apunta a tu posición actual</li>
               </ul>`,
      visual: "📂 .git/\n├── 🗃️ objects/\n├── 🏷️ refs/\n├── ⚙️ config\n└── 🧭 HEAD",
      terminal: "$ ls .git\nHEAD  config  objects/  refs/",
      tip: "No necesitas entender todo esto para usar Git, pero es bueno saberlo"
    },
    {
      title: "4. Tu primera rama",
      content: `<p>Git crea automáticamente:</p>
               <ul>
                 <li>🌿 <strong>Rama principal</strong> (antes 'master', ahora 'main')</li>
                 <li>📝 <strong>HEAD apunta</strong> a esta rama por defecto</li>
                 <li>🔄 <strong>Puedes cambiar</strong> el nombre inicial</li>
               </ul>`,
      visual: "🌿 main (rama actual)\n↑\n🧭 HEAD",
      terminal: "$ git branch\n* main\n\n$ cat .git/HEAD\nref: refs/heads/main",
      tip: "Configura el nombre predeterminado con: git config --global init.defaultBranch main"
    },
    {
      title: "5. Primeros pasos",
      content: `<p>Ahora puedes empezar a trabajar:</p>
               <ol>
                 <li>🔄 <code>git add</code> para preparar cambios</li>
                 <li>💾 <code>git commit</code> para guardarlos</li>
                 <li>🔍 <code>git status</code> para ver el estado</li>
               </ol>`,
      visual: "🚀 Flujo inicial:\n1. Edita archivos\n2. git add\n3. git commit",
      terminal: "# Ver estado actual:\n$ git status\n\n# Preparar todos los cambios:\n$ git add .\n\n# Guardar (commit):\n$ git commit -m \"Primer commit\"",
      tip: "Haz commits pequeños y frecuentes con mensajes descriptivos"
    },
    {
      title: "6. Configuración inicial",
      content: `<p>Recomendaciones para nuevos repositorios:</p>
               <ul>
                 <li>📜 Crea un <strong>.gitignore</strong> para archivos no deseados</li>
                 <li>📝 Agrega un <strong>README.md</strong> para documentación</li>
                 <li>⚙️ Configura <strong>usuario/email</strong> si no lo has hecho</li>
               </ul>`,
      visual: "⚙️ Configuración inicial:\n📄 .gitignore\n📄 README.md\n👤 user/email",
      terminal: "# Configurar usuario (si no está configurado globalmente):\n$ git config user.name \"Tu Nombre\"\n$ git config user.email \"tu@email.com\"\n\n# Crear archivos importantes:\n$ touch .gitignore README.md",
      tip: "Usa plantillas de .gitignore para tu lenguaje (https://gitignore.io)"
    }
  ]
},
'git commit': {
  steps: [
    {
      title: "1. Preparar los cambios",
      content: `<p>Antes de guardar (commit), debes decirle a Git qué cambios quieres incluir:</p>
               <ul>
                 <li>📌 <code>git add archivo.txt</code> - Prepara un archivo específico</li>
                 <li>📦 <code>git add .</code> - Prepara todos los cambios (cuidado)</li>
                 <li>🔍 <code>git add -p</code> - Selecciona cambios interactivamente</li>
               </ul>`,
      visual: "📄 Tus cambios\n⬇️\n📦 Área de preparación (staging)",
      terminal: "# Preparar un archivo específico:\n$ git add index.html\n\n# Ver qué está preparado:\n$ git status",
      tip: "Usa 'git status' frecuentemente para no perder el control de tus cambios"
    },
    {
      title: "2. Crear un commit básico",
      content: `<p>Guarda los cambios preparados en el historial:</p>
               <ul>
                 <li>💾 <code>git commit -m "mensaje"</code> - Guarda con mensaje corto</li>
                 <li>📝 <strong>Mensajes claros</strong> en presente: "Agrega función" no "Agregué"</li>
                 <li>🔢 <strong>Límite de 50 caracteres</strong> para el título ideal</li>
               </ul>`,
      visual: "📦 Cambios preparados\n⬇️\n💾 Commit guardado",
      terminal: "$ git commit -m \"Corrige error en el formulario de contacto\"\n\n# Ver el commit creado:\n$ git log -1",
      tip: "Escribe mensajes como si ordenaras al proyecto qué hacer, no qué hiciste"
    },
    {
      title: "3. Commit con mensaje detallado",
      content: `<p>Para cambios importantes, usa un editor de texto:</p>
               <ol>
                 <li>✏️ <code>git commit</code> (sin -m) abre tu editor</li>
                 <li>📝 Primera línea: Título corto (<=50 chars)</li>
                 <li>📄 Línea vacía</li>
                 <li>📝 Descripción detallada (por qué, no qué)</li>
               </ol>`,
      visual: "📄 Título (qué)\n⬇️\n📄 Descripción (por qué)",
      terminal: "$ git commit\n# [Se abrirá tu editor preferido]",
      tip: "Configura tu editor favorito con: git config --global core.editor \"code --wait\""
    },
    {
      title: "4. Corregir el último commit",
      content: `<p>Si olvidaste algo o el mensaje tiene errores:</p>
               <ul>
                 <li>🔄 <code>git commit --amend</code> - Modifica el último commit</li>
                 <li>📌 <strong>Primero</strong> prepara los cambios adicionales con git add</li>
                 <li>⚠️ <strong>No uses</strong> esto en commits ya compartidos</li>
               </ul>`,
      visual: "✏️ Commit anterior\n⬇️\n🔄 Commit corregido",
      terminal: "# Agregar cambios olvidados:\n$ git add archivo-olvidado.js\n$ git commit --amend --no-edit\n\n# Cambiar solo el mensaje:\n$ git commit --amend -m \"Nuevo mensaje\"",
      tip: "--no-edit mantiene el mismo mensaje, solo agrega los cambios"
    },
    {
      title: "5. Buenas prácticas",
      content: `<p>Consejos para commits efectivos:</p>
               <ul>
                 <li>🧩 <strong>Commits atómicos</strong> - Un cambio lógico por commit</li>
                 <li>📚 <strong>Mensajes claros</strong> - "Fix login bug" vs "Updates"</li>
                 <li>🧪 <strong>Incluye tests</strong> - Cuando corresponda</li>
                 <li>🔍 <strong>Revisa siempre</strong> con git diff --cached</li>
               </ul>`,
      visual: "✅ Commits ideales:\n- Atómicos\n- Claros\n- Probados",
      terminal: "# Ver qué vas a commitear:\n$ git diff --cached\n\n# Ejemplo de flujo completo:\n$ git add .\n$ git diff --cached\n$ git commit -m \"Implementa validación de email\"",
      tip: "Si no puedes explicar el cambio en 50 caracteres, quizás es muy grande"
    }
  ]
},
'git clone': {
  steps: [
    {
      title: "1. Descargar un proyecto completo",
      content: `<p>Obtén una copia exacta de un repositorio remoto:</p>
               <ul>
                 <li>✅ <strong>Copia todos los archivos</strong> del proyecto</li>
                 <li>🕰️ <strong>Incluye todo el historial</strong> de cambios</li>
                 <li>📁 <strong>Crea una carpeta</strong> con el nombre del repositorio</li>
               </ul>`,
      visual: "🌐 Repositorio remoto\n⬇️\n💻 Copia local completa",
      terminal: "$ git clone https://github.com/usuario/proyecto.git",
      tip: "En GitHub/GitLab, usa el botón verde 'Code' para copiar la URL"
    },
    {
      title: "2. Personalizar la carpeta local",
      content: `<p>Elige un nombre diferente para tu copia local:</p>
               <ul>
                 <li>🏷️ <strong>Organiza mejor</strong> tus proyectos</li>
                 <li>📌 <strong>Usa nombres claros</strong> como 'frontend' o 'app-mobile'</li>
                 <li>⚠️ Evita espacios en nombres (usa guiones)</li>
               </ul>`,
      visual: "📁 proyecto/\n⬇️\n📁 mi-frontend/",
      terminal: "$ git clone https://github.com/usuario/proyecto.git mi-frontend",
      tip: "Los nombres con minúsculas y guiones son estándar (ej: mi-proyecto)"
    },
    {
      title: "3. Clonar solo lo necesario",
      content: `<p>Opciones para descargas más rápidas:</p>
               <ul>
                 <li>🌿 <code>--branch rama</code>: Descarga solo una rama específica</li>
                 <li>🚀 <code>--depth 1</code>: Solo el último estado (sin historial)</li>
                 <li>📦 <code>--single-branch</code>: Ideal para proyectos grandes</li>
               </ul>`,
      visual: "🌳 main\n🌿 desarrollo [SELECCIONADA]\n🍃 feature/login",
      terminal: "# Solo la rama 'develop' sin historial:\n$ git clone --branch develop --depth 1 https://github.com/usuario/proyecto.git",
      tip: "Usa --depth 1 para proyectos con mucho historial que no necesitas"
    },
    {
      title: "4. Primeros pasos después de clonar",
      content: `<p>Chequeos iniciales recomendados:</p>
               <ol>
                 <li>📂 <code>cd nombre-proyecto</code> - Entrar al directorio</li>
                 <li>🔍 <code>git status</code> - Ver estado del repositorio</li>
                 <li>🌿 <code>git branch -a</code> - Ver todas las ramas disponibles</li>
                 <li>📜 <code>git log</code> - Explorar historial de cambios</li>
               </ol>`,
      visual: "🚀 Iniciando:\n1. cd proyecto\n2. git status\n3. git branch",
      terminal: "$ cd proyecto\n$ git status\n$ git branch -a\n$ git log --oneline",
      tip: "Usa 'git log --oneline' para un historial compacto y legible"
    },
    {
      title: "5. Protocolos: HTTPS vs SSH",
      content: `<p>Diferentes formas de conectarte:</p>
               <table>
                 <tr><th>HTTPS</th><th>SSH</th></tr>
                 <tr>
                   <td>✅ Más fácil para principiantes</td>
                   <td>🔒 Más seguro</td>
                 </tr>
                 <tr>
                   <td>🔑 Pide usuario/contraseña</td>
                   <td>🗝️ Usa keys configuradas</td>
                 </tr>
               </table>`,
      visual: "🔗 HTTPS: https://github.com/...\n🔐 SSH: git@github.com:...",
      terminal: "# HTTPS (recomendado para empezar):\n$ git clone https://github.com/usuario/proyecto.git\n\n# SSH (requiere configuración previa):\n$ git clone git@github.com:usuario/proyecto.git",
      tip: "Si ves errores de permiso, prueba cambiando entre HTTPS y SSH"
    },
    {
      title: "6. Solución de problemas comunes",
      content: `<p>Soluciones para errores frecuentes:</p>
               <ul>
                 <li>🔒 <strong>Permisos denegados</strong>: Verifica tu acceso al repositorio</li>
                 <li>🐌 <strong>Proyecto muy grande</strong>: Usa --depth 1 o --filter</li>
                 <li>📁 <strong>Carpeta no vacía</strong>: Asegúrate de clonar en directorios vacíos</li>
               </ul>`,
      visual: "⚠️ Error común → 🛠️ Solución",
      terminal: "# Para repositorios grandes:\n$ git clone --filter=blob:none https://github.com/usuario/proyecto-grande.git\n\n# Si falla por permisos:\n$ git config --global http.postBuffer 524288000",
      tip: "Si tienes problemas, copia el mensaje de error y búscalo en Google"
    }
  ]
},
    'git branch': {
  steps: [
    {
      title: "1. Ver ramas locales y remotas",
      content: `<p>Comandos para explorar la estructura de ramas:</p>
               <ul>
                 <li>🌿 <code>git branch</code> - Lista ramas locales (rama actual en verde)</li>
                 <li>🌐 <code>git branch -a</code> - Muestra todas las ramas (locales y remotas)</li>
                 <li>🔍 <code>git branch -vv</code> - Detalle con última commit y rama remota</li>
               </ul>`,
      visual: "🌿 main (current)\n🌿 feature/login\n🌐 origin/main (remota)",
      terminal: "# Ver ramas locales:\n$ git branch\n\n# Ver todas las ramas:\n$ git branch -a\n\n# Ver información detallada:\n$ git branch -vv",
      tip: "Las ramas remotas aparecen en rojo y con formato 'remotes/origin/rama'"
    },
    {
      title: "2. Creación de ramas",
      content: `<p>Diferentes formas de crear ramas:</p>
               <ul>
                 <li>✨ <code>git branch nueva-rama</code> - Crea pero no cambia</li>
                 <li>🚀 <code>git checkout -b nueva-rama</code> - Crea y cambia (más usado)</li>
                 <li>📌 <code>git branch rama-desde-commit abc123</code> - Desde commit específico</li>
               </ul>`,
      visual: "🌿 main\n⬇️\n✨ feature/auth (nueva)",
      terminal: "# Crear y cambiar a nueva rama:\n$ git checkout -b feature/auth\n\n# Crear rama desde commit:\n$ git branch hotfix abc123def",
      tip: "Usa nombres descriptivos como 'fix/header' o 'feature/user-profile'"
    },
    {
      title: "3. Eliminación segura de ramas",
      content: `<p>Mantén tu repositorio limpio:</p>
               <ul>
                 <li>🗑️ <code>git branch -d rama</code> - Elimina solo si está fusionada (safe)</li>
                 <li>💥 <code>git branch -D rama</code> - Elimina aunque no esté fusionada</li>
                 <li>🧹 <code>git remote prune origin</code> - Limpia ramas remotas eliminadas</li>
               </ul>`,
      visual: "🌿 feature/old (eliminada)\n❌\n[rama eliminada]",
      terminal: "# Eliminar rama local (seguro):\n$ git branch -d feature/old\n\n# Forzar eliminación:\n$ git branch -D experimento-fallido\n\n# Limpiar ramas remotas:\n$ git remote prune origin",
      tip: "Nunca elimines la rama main/master ni ramas de otros colaboradores"
    },
    {
      title: "4. Trabajar con ramas remotas",
      content: `<p>Sincroniza tu trabajo con el equipo:</p>
               <ul>
                 <li>⬇️ <code>git fetch</code> - Obtiene ramas remotas sin fusionar</li>
                 <li>🌿 <code>git checkout --track origin/rama</code> - Crea rama local que sigue a remota</li>
                 <li>🔄 <code>git push origin --delete rama</code> - Elimina rama remota</li>
               </ul>`,
      visual: "🌿 local/main ← 🔄 → 🌐 origin/main",
      terminal: "# Traer rama remota y crear local:\n$ git checkout --track origin/feature\n\n# Eliminar rama remota:\n$ git push origin --delete rama-vieja",
      tip: "Usa 'git fetch -p' para actualizar y limpiar ramas remotas obsoletas"
    },
    {
      title: "5. Buenas prácticas con ramas",
      content: `<p>Convenciones para trabajo eficiente:</p>
               <ul>
                 <li>🏷️ <strong>Nombres descriptivos</strong>: feature/login, fix/header, docs/update</li>
                 <li>🧹 <strong>Mantenimiento</strong>: Elimina ramas fusionadas</li>
                 <li>🔀 <strong>Flujo</strong>: Rama principal siempre estable</li>
                 <li>📝 <strong>Documentación</strong>: README.md con convenciones del equipo</li>
               </ul>`,
      visual: "🌿 main (stable)\n├─ 🌿 feature/*\n├─ 🌿 fix/*\n└─ 🌿 release/*",
      terminal: "# Ver ramas ya fusionadas a main:\n$ git branch --merged main\n\n# Eliminar múltiples ramas fusionadas:\n$ git branch --merged main | grep -v 'main' | xargs git branch -d",
      tip: "Crea plantillas de ramas con 'git config init.templateDir' para tu equipo"
    },
    {
      title: "6. Resolución de problemas",
      content: `<p>Soluciones para situaciones comunes:</p>
               <ul>
                 <li>⚠️ <strong>Error al eliminar</strong>: Asegúrate de no estar en la rama</li>
                 <li>🔀 <strong>Rama divergente</strong>: Haz rebase en lugar de merge</li>
                 <li>🔍 <strong>Rama perdida</strong>: Usa <code>git reflog</code> para recuperar</li>
               </ul>`,
      visual: "⚠️ Error: No puedes eliminar la rama actual\n💡 Solución: Cambia a otra rama primero",
      terminal: "# Si no puedes eliminar una rama:\n$ git checkout main\n$ git branch -d rama-problema\n\n# Recuperar rama eliminada:\n$ git reflog\n$ git checkout -b rama-recuperada abc123",
      tip: "Usa 'git branch -m nombre-viejo nombre-nuevo' para renombrar ramas"
    }
  ]
},

  'git checkout': {
  steps: [
    {
      title: "1. Cambiar entre ramas existentes",
      content: `<p>Navega por el historial de tu proyecto:</p>
               <ul>
                 <li>🔀 <code>git checkout rama</code> - Cambia a otra rama</li>
                 <li>📦 <strong>Requiere</strong> que tu espacio de trabajo esté limpio</li>
                 <li>🔄 <strong>Actualiza</strong> archivos al estado de esa rama</li>
               </ul>`,
      visual: "🌿 main (actual)\n⬇️\n🌿 feature/login (nueva actual)",
      terminal: "# Cambiar a rama existente:\n$ git checkout desarrollo\n\n# Ver ramas disponibles:\n$ git branch",
      tip: "Usa 'git stash' si tienes cambios no commitados antes de cambiar"
    },
    {
      title: "2. Crear y cambiar a nueva rama",
      content: `<p>Flujo rápido para empezar a trabajar:</p>
               <ul>
                 <li>✨ <code>-b</code> crea y cambia en un solo paso</li>
                 <li>🌐 <code>--track</code> configura seguimiento de rama remota</li>
                 <li>📌 <strong>Se crea</strong> desde la rama actual</li>
               </ul>`,
      visual: "🌿 main\n⬇️\n✨ feature/search (nueva)",
      terminal: "# Crear y cambiar a nueva rama:\n$ git checkout -b feature/search\n\n# Crear rama que sigue a remota:\n$ git checkout -b hotfix --track origin/hotfix",
      tip: "Las ramas nuevas deberían crearse desde main/develop, no desde otras features"
    },
    {
      title: "3. Descartar cambios locales",
      content: `<p>Vuelve al último estado guardado:</p>
               <ul>
                 <li>🗑️ <code>-- archivo</code> descarta cambios no commitados</li>
                 <li>⚠️ <strong>Peligroso</strong>: Cambios se pierden permanentemente</li>
                 <li>🔍 <strong>Alternativa segura</strong>: Usa git stash primero</li>
               </ul>`,
      visual: "📄 archivo.txt (modificado)\n⬇️\n🗑️ Se descartan cambios\n⬇️\n📄 archivo.txt (versión original)",
      terminal: "# Descartar cambios en un archivo:\n$ git checkout -- styles.css\n\n# Descartar todos los cambios:\n$ git checkout .",
      tip: "Usa 'git diff' primero para ver qué cambios vas a perder"
    },
    {
      title: "4. Trabajar con commits específicos",
      content: `<p>Explora estados anteriores temporalmente:</p>
               <ul>
                 <li>⏪ <code>git checkout abc123</code> - Inspecciona un commit antiguo</li>
                 <li>💡 <strong>Modo 'detached HEAD'</strong> - Solo para inspección</li>
                 <li>🔄 <code>git checkout -b nueva-rama</code> - Para guardar cambios</li>
               </ul>`,
      visual: "🕰️ Commit abc123\n⬇️\n💻 (detached HEAD)\n⚠️ ¡No hagas commits aquí!",
      terminal: "# Inspeccionar commit antiguo:\n$ git checkout abc123\n\n# Crear rama desde aquí si es necesario:\n$ git checkout -b experimento",
      tip: "Usa 'git log --oneline' para encontrar hashes de commits"
    },
    {
      title: "5. Restaurar archivos desde otra rama",
      content: `<p>Trae versiones específicas de archivos:</p>
               <ul>
                 <li>📂 <code>git checkout rama -- archivo</code> - Copia un archivo</li>
                 <li>🔄 <strong>No cambia</strong> de rama, solo el archivo</li>
                 <li>💡 Útil para recuperar versiones anteriores</li>
               </ul>`,
      visual: "🌿 feature/login\n📄 config.json\n⬇️\n🌿 main\n📄 config.json (actualizado)",
      terminal: "# Traer archivo desde otra rama:\n$ git checkout desarrollo -- src/config.js\n\n# Traer archivo desde un commit:\n$ git checkout abc123 -- index.html",
      tip: "Combina con 'git add' para incluir en tu próximo commit"
    },
    {
      title: "6. Buenas prácticas y alternativas",
      content: `<p>Recomendaciones para trabajo moderno:</p>
               <ul>
                 <li>🆕 <code>git switch</code> - Alternativa moderna para cambiar ramas</li>
                 <li>🆕 <code>git restore</code> - Alternativa moderna para descartar cambios</li>
                 <li>🔀 <strong>Mantén HEAD claro</strong> - Evita detached HEAD prolongados</li>
                 <li>📝 <strong>Documenta</strong> - Anota commits importantes con tags</li>
               </ul>`,
      visual: "🆕 Comandos modernos:\ngit switch → Cambiar ramas\ngit restore → Restaurar archivos",
      terminal: "# Alternativas modernas:\n$ git switch desarrollo\n$ git restore --source=main -- config.js\n\n# Crear tag para marcador importante:\n$ git tag -a v1.0 -m \"Versión estable\" abc123",
      tip: "Git 2.23+ introdujo 'switch' y 'restore' para hacer checkout más intuitivo"
    }
  ]
},

  'git merge': {
  steps: [
    {
      title: "1. Fusión básica de ramas",
      content: `<p>Combina los cambios de una rama a tu rama actual:</p>
               <ul>
                 <li>🔀 <strong>No destructivo</strong> - Preserva el historial completo</li>
                 <li>📦 <strong>Crea un commit de merge</strong> automáticamente</li>
                 <li>🌿 <strong>Primero actualiza</strong> tu rama con <code>git pull</code></li>
               </ul>`,
      visual: "🌿 main (actual)\n⬅️\n🌿 feature/login (a fusionar)",
      terminal: "# Fusionar feature a main:\n$ git checkout main\n$ git merge feature/login\n\n# Ver el historial combinado:\n$ git log --graph --oneline",
      tip: "Siempre haz merge desde la rama de destino (ej: main), no al revés"
    },
    {
      title: "2. Tipos de merge",
      content: `<p>Diferentes estrategias de fusión:</p>
               <ul>
                 <li>🚀 <strong>Fast-forward</strong>: Cuando no hay divergencias (sin commit de merge)</li>
                 <li>🔄 <strong>3-way merge</strong>: Crea nuevo commit cuando hay cambios en ambas ramas</li>
                 <li>📌 <code>--no-ff</code>: Fuerza commit de merge incluso en fast-forward</li>
               </ul>`,
      visual: "Fast-forward: 🌿 main → 🌿 feature\n3-way merge: 🌿 main ⬅️↖️ 🌿 feature",
      terminal: "# Forzar commit de merge siempre:\n$ git merge --no-ff feature/login\n\n# Ver tipo de merge posible:\n$ git merge-base --is-ancestor main feature/login && echo \"Fast-forward posible\"",
      tip: "Usa --no-ff en merges a main para mantener contexto histórico"
    },
    {
      title: "3. Resolución de conflictos",
      content: `<p>Cuando Git no puede fusionar automáticamente:</p>
               <ol>
                 <li>🔍 <code>git status</code> - Identifica archivos conflictivos</li>
                 <li>✏️ Edita archivos - Elimina marcadores <<<<<<<, =======, >>>>>>></li>
                 <li>✅ <code>git add</code> - Marca los conflictos como resueltos</li>
                 <li>💾 <code>git commit</code> - Completa el merge</li>
               </ol>`,
      visual: "⚠️ Conflicto en:\nindex.html\n<<<<<<< HEAD\ntu código\n=======\ncódigo fusionado\n>>>>>>> feature",
      terminal: "# Después de resolver conflictos:\n$ git add index.html\n$ git commit\n\n# Ver diferencias durante conflicto:\n$ git diff",
      tip: "Usa herramientas como VS Code o 'git mergetool' para ayuda visual"
    },
    {
      title: "4. Merge vs Rebase",
      content: `<p>Cuándo usar cada uno:</p>
               <table>
                 <tr><th>Merge</th><th>Rebase</th></tr>
                 <tr>
                   <td>✅ Preserva historial exacto</td>
                   <td>✅ Historial lineal más limpio</td>
                 </tr>
                 <tr>
                   <td>🚩 Crea commits de merge</td>
                   <td>⚠️ Reescribe historial (peligroso en ramas compartidas)</td>
                 </tr>
                 <tr>
                   <td>💡 Ideal para ramas públicas</td>
                   <td>💡 Mejor para trabajo local</td>
                 </tr>
               </table>`,
      visual: "Merge: 🌿 main ⬅️↖️ 🌿 feature\nRebase: 🌿 feature → reescrito sobre main",
      terminal: "# Alternativa con rebase:\n$ git checkout feature\n$ git rebase main\n$ git checkout main\n$ git merge feature",
      tip: "Nunca hagas rebase de commits ya pusheados a repositorios compartidos"
    },
    {
      title: "5. Estrategias avanzadas",
      content: `<p>Técnicas para casos especiales:</p>
               <ul>
                 <li>🧩 <code>--squash</code>: Combina todos los cambios en un solo commit</li>
                 <li>⚡ <code>octopus merge</code>: Fusiona múltiples ramas simultáneamente</li>
                 <li>🔧 <code>ours/theirs</code>: Resuelve conflictos automáticamente</li>
               </ul>`,
      visual: "Squash: múltiples commits → un commit\nOctopus: 🌿 main ← 🌿 A + 🌿 B",
      terminal: "# Squash merge:\n$ git merge --squash feature\n$ git commit -m \"Todos los cambios de feature\"\n\n# Merge ours (mantener nuestra versión):\n$ git merge -X ours feature",
      tip: "Usa squash para features con muchos commits pequeños antes de mergear a main"
    },
    {
      title: "6. Flujo profesional recomendado",
      content: `<p>Buenas prácticas para equipos:</p>
               <ol>
                 <li>🔄 <code>git pull --rebase</code> - Actualiza tu rama local</li>
                 <li>🧪 Ejecuta pruebas - Asegura que todo funciona</li>
                 <li>🔀 <code>git merge --no-ff</code> - Fusiona con historial claro</li>
                 <li>🚀 <code>git push</code> - Comparte los cambios</li>
               </ol>`,
      visual: "🔄 Actualizar → 🧪 Probar → 🔀 Fusionar → 🚀 Publicar",
      terminal: "# Flujo completo:\n$ git checkout main\n$ git pull --rebase\n$ git merge --no-ff feature/login\n$ git push",
      tip: "Configura CI/CD para que corra pruebas automáticas antes de aceptar merges"
    }
  ]
},

  'git pull': {
  steps: [
    {
      title: "1. Sincronizar cambios básicos",
      content: `<p>Descarga los últimos cambios y los fusiona automáticamente:</p>
               <ul>
                 <li>⬇️ <strong>Descarga</strong> cambios del repositorio remoto</li>
                 <li>🔄 <strong>Fusiona</strong> con tu rama local automáticamente</li>
                 <li>📦 <strong>Origin main</strong> = repositorio y rama principales</li>
               </ul>`,
      visual: "☁️ Repositorio remoto\n⬇️\n💻 Copia local\n🔄 Fusión automática",
      terminal: "# Sincronizar con la rama principal:\n$ git pull origin main\n\n# Ver cambios entrantes:\n$ git log --oneline origin/main..HEAD",
      tip: "Ejecuta 'git fetch' primero para ver cambios sin fusionar"
    },
    {
      title: "2. Pull con rebase (recomendado)",
      content: `<p>Mantén un historial limpio y lineal:</p>
               <ul>
                 <li>⏩ <strong>Reubica</strong> tus commits sobre los nuevos cambios</li>
                 <li>📜 <strong>Evita</strong> commits de merge innecesarios</li>
                 <li>🔍 <strong>Más fácil</strong> para seguir el historial</li>
               </ul>`,
      visual: "Tus commits 🆕\n⬇️\nSe reposicionan sobre\nCambios remotos ⬆️",
      terminal: "# Actualizar con rebase:\n$ git pull --rebase origin main\n\n# Configurar como predeterminado:\n$ git config --global pull.rebase true",
      tip: "Configúralo como predeterminado: git config --global pull.rebase true"
    },
    {
      title: "3. Resolver conflictos (merge)",
      content: `<p>Cuando Git no puede fusionar automáticamente:</p>
               <ol>
                 <li>🔍 <code>git status</code> - Identifica archivos conflictivos</li>
                 <li>✏️ Edita los archivos - Busca marcadores <<<<<<<</li>
                 <li>✅ <code>git add</code> - Marca los conflictos resueltos</li>
                 <li>🔄 <code>git commit</code> - Completa la fusión</li>
               </ol>`,
      visual: "⚠️ Conflicto en:\narchivo.txt\n✏️ Editar → ✅ git add",
      terminal: "# Después de resolver conflictos:\n$ git add archivo-conflictivo.txt\n$ git commit",
      tip: "Usa 'git mergetool' para ayudas visuales de resolución"
    },
    {
      title: "4. Resolver conflictos (rebase)",
      content: `<p>Proceso diferente cuando usas --rebase:</p>
               <ol>
                 <li>✏️ Resuelve los conflictos en cada commit</li>
                 <li>✅ <code>git add</code> los archivos resueltos</li>
                 <li>⏩ <code>git rebase --continue</code></li>
                 <li>🔄 Repite hasta completar todos los commits</li>
               </ol>`,
      visual: "🔄 Rebase en progreso\n✏️ Commit 1/3 → ✅ Resolver → ⏩ Continuar",
      terminal: "# Durante rebase interactivo:\n$ git add .\n$ git rebase --continue\n\n# Para cancelar:\n$ git rebase --abort",
      tip: "Usa 'git diff' para entender los cambios durante el rebase"
    },
    {
      title: "5. Flujo profesional recomendado",
      content: `<p>Mantén tu historial limpio:</p>
               <ol>
                 <li>🔍 <code>git fetch</code> - Ver cambios sin fusionar</li>
                 <li>🧹 <code>git stash</code> - Guarda cambios temporales (opcional)</li>
                 <li>⏩ <code>git pull --rebase</code> - Actualiza con rebase</li>
                 <li>🧪 Ejecuta pruebas</li>
                 <li>🚀 <code>git push</code> - Publica tus cambios</li>
               </ol>`,
      visual: "🔍 Fetch → 🧹 Stash → ⏩ Rebase → 🧪 Test → 🚀 Push",
      terminal: "# Flujo completo seguro:\n$ git fetch\n$ git stash\n$ git pull --rebase origin main\n$ git stash pop\n$ npm test\n$ git push",
      tip: "Crea un alias: git config --global alias.sync '!git stash && git pull --rebase && git stash pop'"
    },
    {
      title: "6. Pull en ramas específicas",
      content: `<p>Trabajando con múltiples ramas:</p>
               <ul>
                 <li>🌿 <code>git checkout rama</code> - Cambia a la rama</li>
                 <li>⬇️ <code>git pull origin rama</code> - Sincroniza esa rama</li>
                 <li>🔀 <code>--no-ff</code> - Evita fusiones rápidas cuando sea necesario</li>
               </ul>`,
      visual: "🌿 feature/login\n⬇️\n$ git pull origin feature/login",
      terminal: "# Sincronizar rama específica:\n$ git checkout desarrollo\n$ git pull origin desarrollo\n\n# Pull con merge explícito:\n$ git pull --no-ff origin desarrollo",
      tip: "Usa 'git branch -vv' para ver ramas locales y sus remotos"
    }
  ]
},

  'git push': {
  steps: [
    {
      title: "1. Publicar tus cambios",
      content: `<p>Envía tus commits locales al repositorio remoto:</p>
               <ul>
                 <li>🔄 <strong>Sincroniza tu trabajo</strong> con el equipo</li>
                 <li>☁️ <strong>Origin</strong> es el nombre estándar del remoto</li>
                 <li>🌿 <strong>main</strong> es la rama principal (puede variar)</li>
               </ul>`,
      visual: "💻 Tu computadora → ☁️ Repositorio remoto",
      terminal: "# Enviar cambios a la rama principal:\n$ git push origin main\n\n# Ver remotos configurados:\n$ git remote -v",
      tip: "Haz 'git pull' antes de push para evitar conflictos"
    },
    {
      title: "2. Publicar una rama nueva",
      content: `<p>Comparte una rama local por primera vez:</p>
               <ul>
                 <li>📡 <code>-u</code> establece la rama de seguimiento</li>
                 <li>🔗 Crea una conexión permanente con la rama remota</li>
                 <li>🔄 Luego podrás usar solo <code>git push</code></li>
               </ul>`,
      visual: "🌿 feature/login (local)\n⬆️\n🌿 origin/feature/login (remota)",
      terminal: "# Publicar y conectar una rama nueva:\n$ git push -u origin mi-nueva-funcionalidad\n\n# Push simplificado después:\n$ git push",
      tip: "Usa nombres descriptivos para ramas (ej: fix/header-alignment)"
    },
    {
      title: "3. Manejo de errores comunes",
      content: `<p>Soluciones para problemas frecuentes:</p>
               <ul>
                 <li>⚠️ <strong>Rechazado</strong>: Haz pull primero si hay cambios nuevos</li>
                 <li>🔄 <strong>Divergencia</strong>: Usa <code>git pull --rebase</code></li>
                 <li>📦 <strong>Sin upstream</strong>: Agrega <code>-u</code> en primer push</li>
               </ul>`,
      visual: "⚠️ Error → 🔄 Solución\n💻 git pull → ☁️ git push",
      terminal: "# Si el push es rechazado:\n$ git pull origin main\n$ git push origin main\n\n# Para rebasar tus cambios:\n$ git pull --rebase origin main\n$ git push origin main",
      tip: "Configura push.default con 'git config --global push.default current'"
    },
    {
      title: "4. Forzar push (¡Precaución!)",
      content: `<p>Solo cuando es absolutamente necesario:</p>
               <ul>
                 <li>💥 <strong>Reescribe el historial</strong> remoto</li>
                 <li>🚨 <strong>Puede causar problemas</strong> en equipo</li>
                 <li>🔒 <code>--force-with-lease</code> es más seguro</li>
               </ul>`,
      visual: "💥 Historial original\n⬇️\n🔄 Historial reescrito",
      terminal: "# Alternativa más segura:\n$ git push --force-with-lease origin main\n\n# Recuperar después de force push:\n$ git reflog # Encontrar commit perdido\n$ git cherry-pick abc123",
      tip: "Nunca hagas force push en ramas compartidas con otros"
    },
    {
      title: "5. Flujo profesional recomendado",
      content: `<p>Buenas prácticas para trabajar en equipo:</p>
               <ol>
                 <li>🔍 <code>git status</code> - Verifica tus cambios</li>
                 <li>🔄 <code>git pull --rebase</code> - Actualiza localmente</li>
                 <li>🧪 Ejecuta pruebas</li>
                 <li>🚀 <code>git push</code> - Publica tus cambios</li>
               </ol>`,
      visual: "🔄 Pull → 🧪 Test → 🚀 Push",
      terminal: "# Flujo completo:\n$ git status\n$ git pull --rebase origin main\n$ npm test\n$ git push origin main",
      tip: "Configura CI/CD para que corra pruebas automáticas antes de mergear"
    },
    {
      title: "6. Tags y releases",
      content: `<p>Publicar versiones específicas:</p>
               <ul>
                 <li>🏷️ <code>git tag v1.0.0</code> - Crea tag local</li>
                 <li>🚀 <code>git push --tags</code> - Publica todos los tags</li>
                 <li>🔄 <code>git push origin v1.0.0</code> - Publica tag específico</li>
               </ul>`,
      visual: "🏷️ v1.0.0 (local)\n⬆️\n🏷️ origin/v1.0.0 (remoto)",
      terminal: "# Crear y publicar un tag:\n$ git tag -a v1.2.3 -m \"Versión estable\"\n$ git push origin v1.2.3\n\n# Publicar todos los tags:\n$ git push --tags",
      tip: "Usa versionado semántico (semver.org) para nombres de tags"
    }
  ]
},

'git stash': {
  steps: [
    {
      title: "1. Guardar cambios rápidamente",
      content: `<p>Guarda temporalmente cambios no commitados:</p>
               <ul>
                 <li>📦 <code>git stash</code> - Guarda todo (incluyendo untracked con -u)</li>
                 <li>🔍 <code>git stash save "mensaje"</code> - Guarda con descripción</li>
                 <li>💡 <strong>Ideal</strong> para cambiar de rama con trabajo en progreso</li>
               </ul>`,
      visual: "📄 Archivos modificados\n⬇️\n📦 Guardados en stash (WIP)",
      terminal: "# Guardar cambios actuales:\n$ git stash\n\n# Guardar incluyendo archivos nuevos:\n$ git stash -u\n\n# Guardar con mensaje descriptivo:\n$ git stash save \"Trabajo en formulario\"",
      tip: "Usa 'git status' antes de stash para ver qué se guardará"
    },
    {
      title: "2. Administrar múltiples stashes",
      content: `<p>Gestiona tus cambios guardados:</p>
               <ul>
                 <li>📜 <code>git stash list</code> - Muestra todos los stashes</li>
                 <li>🔍 <code>git stash show stash@{1}</code> - Ver cambios en un stash</li>
                 <li>🧹 <code>git stash clear</code> - Elimina todos los stashes</li>
               </ul>`,
      visual: "📦 stash@{0}: On main - Mensaje1\n📦 stash@{1}: On feature - Mensaje2",
      terminal: "# Ver lista de stashes:\n$ git stash list\n\n# Ver cambios en stash específico:\n$ git stash show stash@{1}\n\n# Eliminar todos los stashes:\n$ git stash clear",
      tip: "Agrega mensajes descriptivos para identificar stashes fácilmente"
    },
    {
      title: "3. Recuperar cambios guardados",
      content: `<p>Diferentes formas de aplicar stashes:</p>
               <ul>
                 <li>🔄 <code>git stash pop</code> - Aplica y elimina el último stash</li>
                 <li>📌 <code>git stash apply</code> - Aplica pero mantiene en la lista</li>
                 <li>🔀 <code>git stash branch</code> - Crea rama nueva desde un stash</li>
               </ul>`,
      visual: "📦 stash@{0}\n⬇️\n💻 Cambios recuperados\n❌ (eliminado con pop)",
      terminal: "# Aplicar último stash y eliminarlo:\n$ git stash pop\n\n# Aplicar stash específico:\n$ git stash apply stash@{1}\n\n# Crear rama desde stash:\n$ git stash branch nueva-rama stash@{0}",
      tip: "Si hay conflictos al aplicar, Git te avisará para resolverlos"
    },
    {
      title: "4. Stash selectivo",
      content: `<p>Guarda solo partes de tus cambios:</p>
               <ul>
                 <li>✂️ <code>git stash push -p</code> - Guarda cambios interactivamente</li>
                 <li>📁 <code>git stash push archivo</code> - Guarda solo archivos específicos</li>
                 <li>🚫 <code>git stash --keep-index</code> - No guarda cambios ya en staging</li>
               </ul>`,
      visual: "📄 archivo1.js (modificado)\n📄 archivo2.css (modificado)\n❓ ¿Qué guardar? (interactivo)",
      terminal: "# Stash interactivo:\n$ git stash push -p\n\n# Stash de archivo específico:\n$ git stash push src/components/Header.js\n\n# Guardar solo cambios no staged:\n$ git stash push --keep-index",
      tip: "Perfecto cuando solo quieres guardar algunos cambios temporalmente"
    },
    {
      title: "5. Flujo profesional con stash",
      content: `<p>Cómo usar stash en situaciones reales:</p>
               <ol>
                 <li>🔀 Necesitas cambiar de rama urgentemente</li>
                 <li>📦 <code>git stash</code> - Guarda tu trabajo actual</li>
                 <li>🌿 Cambia de rama y haz tu tarea</li>
                 <li>↩️ Vuelve y recupera con <code>git stash pop</code></li>
               </ol>`,
      visual: "1. Trabajo en progreso\n2. 📦 Stash\n3. 🔄 Cambio de rama\n4. 🚀 git stash pop",
      terminal: "# Ejemplo completo:\n$ git stash\n$ git checkout main\n$ git pull\n$ git checkout mi-rama\n$ git stash pop",
      tip: "Usa 'git stash' antes de pull/rebase para evitar conflictos"
    },
    {
      title: "6. Recuperación de stashes perdidos",
      content: `<p>Si accidentalmente limpias tus stashes:</p>
               <ul>
                 <li>🔍 <code>git fsck --unreachable</code> - Encuentra commits perdidos</li>
                 <li>📜 <code>git log --graph --oneline</code> - Busca tus stashes</li>
                 <li>🔄 <code>git stash apply abc123</code> - Recupera desde commit</li>
               </ul>`,
      visual: "⚠️ stash eliminado\n🔍 Buscar en commits huérfanos\n✅ Recuperar cambios",
      terminal: "# Buscar stashes perdidos:\n$ git fsck --unreachable | grep commit\n$ git show abc123\n\n# Aplicar stash desde commit:\n$ git stash apply abc123",
      tip: "Los stashes son realmente commits, por lo que pueden recuperarse"
    }
  ]
},
  'git status': {
  steps: [
    {
      title: "1. Ver el estado actual",
      content: `<p>Muestra todo lo que está ocurriendo en tu proyecto:</p>
               <ul>
                 <li>📝 <strong>Archivos modificados:</strong> Cambios que aún no guardas</li>
                 <li>✅ <strong>Archivos preparados:</strong> Cambios listos para guardar (commit)</li>
                 <li>❓ <strong>Archivos nuevos:</strong> Archivos que Git no conoce</li>
               </ul>`,
      visual: "📦 Tu proyecto\n├─ 📝 Modificados\n├─ ✅ Preparados\n└─ ❓ No rastreados",
      terminal: "$ git status",
      tip: "Usa esto frecuentemente para no perderte cambios importantes"
    },
    {
      title: "2. Versión simplificada",
      content: `<p>Un resumen rápido con códigos de colores:</p>
               <ul>
                 <li><code>M</code> = Modificado</li>
                 <li><code>A</code> = Añadido (staged)</li>
                 <li><code>??</code> = No rastreado</li>
                 <li>Rojo = Cambios no preparados</li>
                 <li>Verde = Cambios preparados</li>
               </ul>`,
      visual: "🔍 M file.txt (rojo)\n🔍 A file2.txt (verde)\n🔍 ?? new-file.txt",
      terminal: "$ git status -s",
      tip: "Perfecto cuando quieres una vista rápida sin muchos detalles"
    },
    {
      title: "3. Archivos ignorados",
      content: `<p>Muestra archivos que Git está ignorando:</p>
               <ul>
                 <li>Revisa si tu <code>.gitignore</code> funciona correctamente</li>
                 <li>Identifica archivos que quizás no deberían ignorarse</li>
               </ul>`,
      visual: "👀 Archivos ignorados:\n- node_modules/\n- .env\n- *.log",
      terminal: "$ git status --ignored",
      tip: "Si ves archivos importantes aquí, revisa tu archivo .gitignore"
    },
    {
      title: "4. Consejos prácticos",
      content: `<p>Usos avanzados que te ahorrarán tiempo:</p>
               <ul>
                 <li><code>git status -sb</code>: Muestra la rama actual y estado resumido</li>
                 <li><code>git status --show-stash</code>: Incluye cambios guardados temporalmente</li>
                 <li>Configura <code>status.short</code> para cambiar el formato predeterminado</li>
               </ul>`,
      visual: "⚡ Tips productivos:\n- -sb → Rama + estado\n- --show-stash → Incluye temporales",
      terminal: "# Ver rama y estado:\n$ git status -sb\n\n# Incluir cambios guardados:\n$ git status --show-stash",
      tip: "Agrega alias como 'git st' para status -sb en tu configuración"
    }
  ]
},

  'git add': {
  steps: [
    {
      title: "1. Preparar archivos individuales",
      content: `<p>Selecciona archivos específicos para incluirlos en tu próximo commit:</p>
               <ul>
                 <li>📌 <strong>Prepara cambios concretos</strong> antes de guardarlos</li>
                 <li>🔍 <strong>Control preciso</strong> sobre lo que se incluirá</li>
                 <li>💡 <strong>Recomendado</strong> para commits organizados</li>
               </ul>`,
      visual: "📄 archivo.html\n📄 script.js → 📦 Stage",
      terminal: "$ git add index.html\n$ git add styles/main.css",
      tip: "Puedes agregar múltiples archivos separándolos con espacios"
    },
    {
      title: "2. Agregar todos los cambios",
      content: `<p>Prepara todo lo modificado de una vez (usa con cuidado):</p>
               <ul>
                 <li>⚠️ <strong>Incluye todo</strong> en el directorio actual</li>
                 <li>🚀 <strong>Rápido</strong> pero poco específico</li>
                 <li>🔎 <strong>Verifica</strong> siempre con git status después</li>
               </ul>`,
      visual: "📄 Todos los archivos → 📦 Stage",
      terminal: "$ git add .\n# O alternativamente:\n$ git add -A",
      tip: "Usa 'git add .' para el directorio actual o '-A' para todo el proyecto"
    },
    {
      title: "3. Modo interactivo (recomendado)",
      content: `<p>Controla exactamente qué cambios incluir:</p>
               <ol>
                 <li>Examina cada cambio (y = sí, n = no)</li>
                 <li>Divide cambios grandes en partes (s = dividir)</li>
                 <li>Edita cambios manualmente (e = editar)</li>
               </ol>`,
      visual: "❓ Cambio en línea 15\n➕ Añadir? (y/n) [y]",
      terminal: "$ git add -p",
      tip: "Perfecto para separar cambios no relacionados en commits distintos"
    },
    {
      title: "4. Consejos profesionales",
      content: `<p>Flujo de trabajo eficiente:</p>
               <ul>
                 <li>🔀 <code>git add -u</code>: Solo archivos rastreados (modificados/eliminados)</li>
                 <li>📁 <code>git add directorio/</code>: Agrega todo un directorio</li>
                 <li>🔍 <code>git add *.js</code>: Usa patrones para archivos específicos</li>
               </ul>`,
      visual: "⚡ Tips productivos:\n- -u → Solo modificados\n- *.ext → Por extensión",
      terminal: "# Agregar solo archivos JavaScript:\n$ git add *.js\n\n# Agregar todos los archivos en src:\n$ git add src/",
      tip: "Combina con git status para ver exactamente qué estás agregando"
    }
  ]
},

  'git rebase': {
  steps: [
    {
      title: "1. Rebase básico",
      content: `<p>Reorganiza tu rama sobre la rama objetivo:</p>
               <ul>
                 <li>⏩ <strong>Historial lineal</strong> - Elimina commits de merge innecesarios</li>
                 <li>🧹 <strong>Limpia el historial</strong> - Ideal antes de hacer pull requests</li>
                 <li>⚠️ <strong>Peligroso</strong> - Nunca uses en ramas compartidas</li>
               </ul>`,
      visual: "🌿 main (actualizada)\n⬆️\n🌿 feature (tus commits reubicados)",
      terminal: "# Actualizar tu rama feature con main:\n$ git checkout feature\n$ git rebase main\n\n# Ver historial limpio:\n$ git log --oneline --graph",
      tip: "Haz 'git pull --rebase' para actualizar tu rama local sin merges"
    },
    {
      title: "2. Rebase interactivo",
      content: `<p>Edita, reorganiza o combina commits:</p>
               <ul>
                 <li>✏️ <code>-i</code> - Modo interactivo (abre editor)</li>
                 <li>🔄 <strong>pick</strong> - Incluir commit</li>
                 <li>🧩 <strong>squash</strong> - Combinar con commit anterior</li>
                 <li>✂️ <strong>edit</strong> - Modificar commit</li>
               </ul>`,
      visual: "📝 Editor interactivo\npick abc123 Commit 1\nsquash def456 Commit 2",
      terminal: "# Rebase interactivo (últimos 3 commits):\n$ git rebase -i HEAD~3\n\n# Durante rebase para un commit 'edit':\n$ git commit --amend\n$ git rebase --continue",
      tip: "Usa 'git rebase -i --autosquash' para commits con 'fixup!' o 'squash!'"
    },
    {
      title: "3. Resolución de conflictos",
      content: `<p>Proceso paso a paso durante rebase:</p>
               <ol>
                 <li>🔍 <code>git status</code> - Identifica archivos conflictivos</li>
                 <li>✏️ Edita archivos - Resuelve los conflictos</li>
                 <li>✅ <code>git add</code> - Marca como resuelto</li>
                 <li>⏩ <code>git rebase --continue</code> - Continúa el proceso</li>
               </ol>`,
      visual: "🔄 Rebase en progreso (commit 2/5)\n⚠️ Conflicto en: utils.js\n✅ Resuelto → ⏩ Continuar",
      terminal: "# Después de resolver conflictos:\n$ git add archivo-conflicto.js\n$ git rebase --continue\n\n# Omitir commit que causa conflicto:\n$ git rebase --skip",
      tip: "Usa 'git diff' para ver cambios durante la resolución de conflictos"
    },
    {
      title: "4. Manejo de errores",
      content: `<p>Opciones cuando algo sale mal:</p>
               <ul>
                 <li>🛑 <code>--abort</code> - Cancela todo y vuelve al estado original</li>
                 <li>⏭️ <code>--skip</code> - Omite el commit problemático</li>
                 <li>📜 <code>reflog</code> - Recupera estado anterior si es necesario</li>
               </ul>`,
      visual: "⚠️ Error en rebase\n🛑 Abortar → Estado original\n⏭️ Omitir → Continuar sin commit",
      terminal: "# Cancelar rebase:\n$ git rebase --abort\n\n# Recuperar rama después de error:\n$ git reflog\n$ git reset --hard HEAD@{1}",
      tip: "Si pierdes commits, siempre puedes recuperarlos con git reflog"
    },
    {
      title: "5. Buenas prácticas",
      content: `<p>Cuándo y cómo usar rebase correctamente:</p>
               <ul>
                 <li>✅ <strong>Localmente</strong> - Antes de compartir cambios</li>
                 <li>🚫 <strong>Nunca</strong> - En ramas compartidas o públicas</li>
                 <li>🧪 <strong>Prueba siempre</strong> - Después de reorganizar commits</li>
                 <li>📌 <strong>--onto</strong> - Para mover ramas entre bases</li>
               </ul>`,
      visual: "🌿 main (base segura)\n⬆️\n🌿 feature (trabajo local)\n🚫 origin/feature (no rebasear)",
      terminal: "# Mover rama a nueva base:\n$ git rebase --onto nueva-base vieja-base rama\n\n# Actualizar feature con main:\n$ git checkout feature\n$ git rebase main\n$ git push --force-with-lease",
      tip: "Configura 'git config --global pull.rebase true' para pulls más limpios"
    },
    {
      title: "6. Rebase vs Merge",
      content: `<p>Comparación de estrategias:</p>
               <table>
                 <tr><th>Rebase</th><th>Merge</th></tr>
                 <tr>
                   <td>📜 Historial lineal</td>
                   <td>🔄 Preserva historial exacto</td>
                 </tr>
                 <tr>
                   <td>⚠️ Reescribe commits</td>
                   <td>✅ Seguro para ramas compartidas</td>
                 </tr>
                 <tr>
                   <td>💡 Ideal para trabajo local</td>
                   <td>💡 Mejor para integración</td>
                 </tr>
               </table>`,
      visual: "Rebase: Commits reescritos\nMerge: Commits preservados con merge commit",
      terminal: "# Alternativa con merge:\n$ git checkout main\n$ git merge feature\n\n# Ver diferencias:\n$ git log --graph --oneline --all",
      tip: "En equipos, acuerden cuándo usar cada método para evitar problemas"
    }
  ]
},

  'git reset': {
  steps: [
    {
      title: "1. Reset Soft - Reescribe el historial conservando cambios",
      content: `<p>Retrocede el puntero HEAD pero mantiene todos los cambios en staging:</p>
               <ul>
                 <li>⏪ <strong>Deshace commits</strong> pero preserva los cambios</li>
                 <li>📦 <strong>Cambios quedan staged</strong> listos para rehacer commit</li>
                 <li>💡 <strong>Perfecto para:</strong> Reorganizar commits mal mensajeados</li>
               </ul>`,
      visual: "🕰️ Historial: A-B-C (HEAD)\n⬇️\nSoft reset a B\n📦 Cambios de C en staging",
      terminal: "# Deshacer último commit pero mantener cambios:\n$ git reset --soft HEAD~\n\n# Ver estado actual:\n$ git status",
      tip: "Combínalo con 'git commit --amend' para corregir el commit anterior"
    },
    {
      title: "2. Reset Mixed (predeterminado) - Deshace commits pero no staging",
      content: `<p>La opción por defecto que deshace commits y saca cambios del staging:</p>
               <ul>
                 <li>📝 <strong>Cambios preservados</strong> pero como modificados no staged</li>
                 <li>🔍 <strong>Revisión intermedia</strong> antes de rehacer commits</li>
                 <li>🔄 <strong>Uso típico:</strong> Cuando necesitas reestructurar commits</li>
               </ul>`,
      visual: "📦 Commit C deshecho\n⬇️\n📄 Cambios de C como modificados",
      terminal: "# Deshacer último commit (equivalente a --mixed):\n$ git reset HEAD~\n\n# Sacar archivos específicos del staging:\n$ git reset HEAD archivo.txt",
      tip: "Es el comportamiento predeterminado si no especificas --soft o --hard"
    },
    {
      title: "3. Reset Hard - Eliminación permanente (¡Peligroso!)",
      content: `<p>Elimina commits y todos los cambios asociados:</p>
               <ul>
                 <li>💥 <strong>Destructivo</strong> - Cambios locales se pierden permanentemente</li>
                 <li>🛑 <strong>Solo para:</strong> Descartar trabajo local no deseado</li>
                 <li>🔙 <strong>Alternativa segura:</strong> Usa 'git stash' primero</li>
               </ul>`,
      visual: "🕰️ Historial: A-B-C (HEAD)\n💥 Reset hard a B\n🗑️ Cambios de C eliminados",
      terminal: "# Descartar todos los cambios locales:\n$ git reset --hard HEAD\n\n# Retroceder 2 commits y eliminar cambios:\n$ git reset --hard HEAD~2",
      warning: "⚠️ ¡Este comando no se puede deshacer! Usa con extrema precaución."
    },
    {
      title: "4. Reset a un commit específico",
      content: `<p>Viaja en el tiempo a cualquier punto del historial:</p>
               <ul>
                 <li>🔍 <code>git log --oneline</code> - Encuentra el hash del commit</li>
                 <li>⏳ <code>git reset abc123</code> - Retrocede a ese commit</li>
                 <li>📌 <strong>Puedes combinar</strong> con --soft, --mixed o --hard</li>
               </ul>`,
      visual: "🕰️ A-B-C-D-E (HEAD)\n⬇️\nReset a C\n🔄 Historial reescrito",
      terminal: "# Ver commits disponibles:\n$ git log --oneline\n\n# Reset suave a commit específico:\n$ git reset --soft abc123\n\n# Reset duro para descartar todo después de C:\n$ git reset --hard abc123",
      tip: "Usa 'git reflog' si necesitas encontrar commits 'perdidos' después de reset"
    },
    {
      title: "5. Recuperación después de reset",
      content: `<p>Cómo recuperar trabajo accidentalmente eliminado:</p>
               <ul>
                 <li>📜 <code>git reflog</code> - Muestra todo lo que has hecho</li>
                 <li>🔄 <code>git reset HEAD@{1}</code> - Vuelve al estado anterior</li>
                 <li>💾 <code>git fsck --lost-found</code> - Busca commits huérfanos</li>
               </ul>`,
      visual: "⚠️ ¡Oh no! Reset accidental\n🔍 Buscar en reflog\n🔄 Restaurar estado",
      terminal: "# Ver historial de acciones:\n$ git reflog\n\n# Restaurar al estado antes del reset:\n$ git reset --hard HEAD@{1}\n\n# Buscar commits perdidos:\n$ git fsck --lost-found",
      tip: "Los IDE modernos como VSCode tienen herramientas visuales para explorar el reflog"
    },
    {
      title: "6. Buenas prácticas con reset",
      content: `<p>Cuándo y cómo usar reset adecuadamente:</p>
               <ul>
                 <li>✅ <strong>Localmente</strong> - Antes de hacer push</li>
                 <li>🚫 <strong>Nunca</strong> - En commits ya compartidos</li>
                 <li>🔀 <strong>Alternativas:</strong> 'git revert' para cambios públicos</li>
                 <li>📝 <strong>Commits atomicos</strong> - Facilita el uso de reset</li>
               </ul>`,
      visual: "✅ Buen uso: Trabajo local\n🚫 Mal uso: Commits pusheados\n🔀 Revert para cambios públicos",
      terminal: "# Alternativa segura para cambios públicos:\n$ git revert abc123\n\n# Ver diferencia con reset:\n$ git log --oneline",
      tip: "En equipos, usa 'git revert' en lugar de reset para cambios ya compartidos"
    }
  ]
},

  'git log': {
  steps: [
    {
      title: "1. Visualización básica del historial",
      content: `<p>Explora el historial completo de commits:</p>
               <ul>
                 <li>📜 <strong>Orden cronológico inverso</strong> (más recientes primero)</li>
                 <li>👤 Muestra <strong>autor</strong>, <strong>fecha</strong> y <strong>mensaje</strong></li>
                 <li>🔍 <strong>Navegación</strong>: Espacio para avanzar, 'q' para salir</li>
               </ul>`,
      visual: "🕰️ Commit abc123\n├─ Author: Juan Pérez\n├─ Date:   Ayer\n└─ Mensaje: Fix header styles",
      terminal: "# Ver historial completo:\n$ git log\n\n# Navegar con paginador:\n[Space]: Avanzar • [Q]: Salir • [/]: Buscar",
      tip: "Personaliza tu editor con 'git config --global core.pager 'less -iSXR'"
    },
    {
      title: "2. Formatos personalizados",
      content: `<p>Diferentes formas de visualizar los commits:</p>
               <ul>
                 <li>📦 <code>--oneline</code> - Versión ultra compacta</li>
                 <li>📝 <code>--pretty=format:"..."</code> - Diseño personalizado</li>
                 <li>🎨 <code>--graph</code> - Muestra ramas como ASCII art</li>
               </ul>`,
      visual: "🔍 abc123 (HEAD -> main) Fix bug\n📦 def456 Add user auth\n🎨 * | merge feature/login",
      terminal: "# Formato compacto:\n$ git log --oneline\n\n# Formato personalizado:\n$ git log --pretty=format:'%C(yellow)%h %C(blue)%ad %C(reset)%s' --date=short\n\n# Con gráfico de ramas:\n$ git log --graph --oneline --all",
      tip: "Crea alias para tus formatos favoritos: git config --global alias.lg 'log --oneline --graph --decorate'"
    },
    {
      title: "3. Filtrado inteligente",
      content: `<p>Encuentra commits específicos:</p>
               <ul>
                 <li>⏳ <code>--since="2023-01-01"</code> - Por rango de fechas</li>
                 <li>👤 <code>--author="nombre"</code> - Por autor</li>
                 <li>🔍 <code>-S"función"</code> - Busca cambios en código (pickaxe)</li>
               </ul>`,
      visual: "📅 Últimos 2 semanas\n👤 Commits de María\n🔍 Que modificaron 'calculateTax'",
      terminal: "# Commits de los últimos 7 días:\n$ git log --since='1 week ago'\n\n# Commits de un autor:\n$ git log --author='Maria'\n\n# Commits que cambiaron una función:\n$ git log -S'calculateTax'",
      tip: "Combina filtros: git log --author=Juan --since=2023-01-01 -S'API'"
    },
    {
      title: "4. Inspección de cambios",
      content: `<p>Ver qué cambió en cada commit:</p>
               <ul>
                 <li>📄 <code>-p</code> - Muestra diferencias (patch)</li>
                 <li>📊 <code>--stat</code> - Estadísticas de archivos modificados</li>
                 <li>🔎 <code>-- path/to/file</code> - Historial de un archivo específico</li>
               </ul>`,
      visual: "📄 src/utils.js\n+ añadió función\n- eliminó código obsoleto\n📊 2 archivos cambiados, 15 inserciones(+)",
      terminal: "# Ver cambios en cada commit:\n$ git log -p\n\n# Solo estadísticas:\n$ git log --stat\n\n# Historial de un archivo:\n$ git log -- src/components/Header.js",
      tip: "Usa 'git log -p -S'palabra'' para ver cambios que introdujeron términos específicos"
    },
    {
      title: "5. Búsqueda avanzada",
      content: `<p>Técnicas profesionales para encontrar commits:</p>
               <ul>
                 <li>🐛 <code>--grep="fix"</code> - Busca en mensajes de commit</li>
                 <li>🔄 <code>branchA..branchB</code> - Commits entre dos ramas</li>
                 <li>🔧 <code>--merges</code>/<code>--no-merges</code> - Filtrar merges</li>
               </ul>`,
      visual: "🔍 fix: en mensajes\n🔄 main..feature/login\n🔧 solo commits regulares",
      terminal: "# Buscar commits que arreglaron bugs:\n$ git log --grep='fix'\n\n# Commits en feature que no están en main:\n$ git log main..feature/login\n\n# Solo commits de merge:\n$ git log --merges",
      tip: "Combina --grep con -i para búsqueda case-insensitive"
    },
    {
      title: "6. Visualización gráfica avanzada",
      content: `<p>Configuración profesional para entender ramas:</p>
               <ul>
                 <li>🌐 <code>--all</code> - Muestra todas las ramas</li>
                 <li>🎨 <code>--graph</code> - Conecta líneas de desarrollo</li>
                 <li>🏷️ <code>--decorate</code> - Muestra tags y ramas</li>
                 <li>🕒 <code>--date-order</code> - Ordena por fecha correctamente</li>
               </ul>`,
      visual: "🌐 * main\n🌐 | * feature/login\n🌐 |/  \n🌐 * init commit",
      terminal: "# Vista profesional del historial:\n$ git log --all --graph --decorate --oneline --date-order\n\n# Alias recomendado:\n$ git config --global alias.lg \"log --color --all --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative\"",
      tip: "El alias 'lg' mostrado es famoso por su utilidad - ¡configúralo!"
    }
  ]
},

  'git rebase -i': {
  steps: [
    {
      title: "1. Iniciar rebase interactivo",
      content: `<p>Reorganiza commits locales antes de compartirlos:</p>
               <ul>
                 <li>⏳ <code>HEAD~3</code> - Trabaja con los últimos 3 commits</li>
                 <li>🔧 <code>--autosquash</code> - Combina automáticamente commits "fixup!"</li>
                 <li>📌 <strong>Precaución</strong>: Nunca uses en commits ya pusheados</li>
               </ul>`,
      visual: "🕰️ Commits recientes:\n1. Add login\n2. Fix header\n3. Update styles\n⬇️\n✏️ Editor interactivo",
      terminal: "# Reorganizar últimos 3 commits:\n$ git rebase -i HEAD~3\n\n# Con autosquash para commits fixup:\n$ git rebase -i --autosquash HEAD~5",
      tip: "Usa 'git log --oneline' primero para identificar los commits a modificar"
    },
    {
      title: "2. Comandos interactivos completos",
      content: `<p>Opciones en el editor de rebase:</p>
               <table>
                 <tr><th>Comando</th><th>Función</th><th>Uso típico</th></tr>
                 <tr><td><code>pick</code></td><td>Incluir commit sin cambios</td><td>Mantener commit importante</td></tr>
                 <tr><td><code>reword</code></td><td>Editar mensaje</td><td>Corregir typos o clarificar</td></tr>
                 <tr><td><code>edit</code></td><td>Pausar para modificar</td><td>Añadir cambios olvidados</td></tr>
                 <tr><td><code>squash</code></td><td>Combinar con anterior</td><td>Unir commits pequeños</td></tr>
                 <tr><td><code>fixup</code></td><td>Combinar y descartar mensaje</td><td>Para commits "typo" o "fix"</td></tr>
                 <tr><td><code>drop</code></td><td>Eliminar commit</td><td>Remover cambios no deseados</td></tr>
               </table>`,
      visual: "📝 Editor abierto:\npick abc123 Feat: Login\nreword def456 Fix header\nsquash hij789 Update styles",
      terminal: "# Ejemplo de archivo de rebase:\npick abc123 Feat: Add login\nreword def456 Fix header margin\nsquash hij789 Fix typo in css",
      tip: "Puedes reordenar líneas para cambiar el orden de los commits"
    },
    {
      title: "3. Flujo de trabajo detallado",
      content: `<p>Proceso completo para cada operación:</p>
               <ol>
                 <li><strong>Edit</strong>:
                   <ol>
                     <li>Git pausa al llegar al commit</li>
                     <li>Haz tus cambios con <code>git add</code></li>
                     <li>Continúa con <code>git rebase --continue</code></li>
                   </ol>
                 </li>
                 <li><strong>Squash/Fixup</strong>:
                   <ol>
                     <li>Git combina los commits</li>
                     <li>Te pide editar el mensaje final</li>
                   </ol>
                 </li>
               </ol>`,
      visual: "🔧 Modo 'edit':\n1. ✏️ Hacer cambios\n2. ✅ git add\n3. 🔄 git rebase --continue\n\n🧩 Squash:\n1. 📝 Unir mensajes\n2. 💾 Guardar",
      terminal: "# Durante pausa por 'edit':\n$ git add .\n$ git commit --amend\n$ git rebase --continue\n\n# Después de squash (editar mensaje combinado):\n# [Editor se abre automáticamente]",
      tip: "Para squash automático, nombra commits con 'fixup! mensaje-anterior'"
    },
    {
      title: "4. Resolución de conflictos",
      content: `<p>Si Git encuentra conflictos durante el rebase:</p>
               <ol>
                 <li>🔍 <code>git status</code> - Identifica archivos problemáticos</li>
                 <li>✏️ Edita archivos - Resuelve los conflictos</li>
                 <li>✅ <code>git add</code> - Marca como resuelto</li>
                 <li>⏩ <code>git rebase --continue</code> - Prosigue</li>
               </ol>`,
      visual: "⚠️ Conflicto en rebase:\n<<<<<<< HEAD\ntu código\n=======\ncódigo entrante\n>>>>>>>",
      terminal: "# Después de resolver conflictos:\n$ git add archivo-conflicto.js\n$ git rebase --continue\n\n# Para omitir este commit:\n$ git rebase --skip\n\n# Para cancelar todo:\n$ git rebase --abort",
      tip: "Configura 'git config --global rerere.enabled true' para recordar resoluciones"
    },
    {
      title: "5. Buenas prácticas profesionales",
      content: `<p>Consejos para un uso efectivo:</p>
               <ul>
                 <li>🧩 <strong>Commits atómicos</strong> - Haz rebase de commits pequeños y enfocados</li>
                 <li>📝 <strong>Mensajes claros</strong> - Usa formato convencional (feat:, fix:, etc.)</li>
                 <li>🔀 <strong>Flujo ideal</strong>:
                   <ol>
                     <li>Trabaja en ramas feature</li>
                     <li>Haz rebase sobre main frecuentemente</li>
                     <li>Resuelve conflictos gradualmente</li>
                   </ol>
                 </li>
               </ul>`,
      visual: "✅ Commits ideales:\nfeat: Add login\nfix: Correct header style\n📌 Nunca en main\n🔄 Rebase sobre main",
      terminal: "# Flujo profesional completo:\n$ git checkout feature/login\n$ git fetch origin\n$ git rebase -i origin/main\n# Resolver conflictos si los hay\n$ git push --force-with-lease",
      tip: "Usa '--force-with-lease' en lugar de --force para push después de rebase"
    },
    {
      title: "6. Recuperación de errores",
      content: `<p>Si algo sale mal durante el rebase:</p>
               <ul>
                 <li>📜 <code>git reflog</code> - Encuentra el estado anterior</li>
                 <li>↩️ <code>git reset --hard HEAD@{1}</code> - Retrocede al paso previo</li>
                 <li>🔄 <code>git rebase --abort</code> - Vuelve al estado pre-rebase</li>
               </ul>`,
      visual: "⚠️ Error en rebase\n🔍 git reflog\n🛑 git rebase --abort\n↩️ git reset --hard ORIG_HEAD",
      terminal: "# Ver historial de acciones:\n$ git reflog\n\n# Restaurar rama:\n$ git reset --hard HEAD@{5}\n\n# O usar:\n$ git reset --hard ORIG_HEAD",
      tip: "ORIG_HEAD es una referencia especial que Git guarda antes de operaciones peligrosas"
    }
  ]
},

  'git cherry-pick': {
    steps: [
      {
        title: "1. Aplicar commit específico",
        content: `<p>Copia un commit de otra rama a la actual:</p>`,
        visual: "🍒 commit-copiado",
        terminal: "$ git cherry-pick abc123"
      },
      {
        title: "2. Resolver conflictos",
        content: `<p>Si hay conflictos:</p>
                 <ol>
                   <li>Resuelve los archivos</li>
                   <li><code>git add</code> los archivos</li>
                   <li><code>git cherry-pick --continue</code></li>
                 </ol>`,
        visual: "⚠️ conflictos-resueltos",
        terminal: "$ git add .\n$ git cherry-pick --continue"
      },
      {
        title: "3. Abortar cherry-pick",
        content: `<p>Si algo sale mal:</p>`,
        visual: "🛑 operación-cancelada",
        terminal: "$ git cherry-pick --abort"
      }
    ]
  },

  'git bisect': {
    steps: [
      {
        title: "1. Iniciar búsqueda binaria",
        content: `<p>Encuentra el commit que introdujo un bug:</p>`,
        visual: "🔍 buscando-bug",
        terminal: "$ git bisect start"
      },
      {
        title: "2. Marcar commits buenos/malos",
        content: `<p>Primero marca un commit conocido bueno y uno malo:</p>`,
        visual: "✅ commit-bueno\n❌ commit-malo",
        terminal: "$ git bisect good v1.0\n$ git bisect bad HEAD"
      },
      {
        title: "3. Proceso automático",
        content: `<p>Git te guiará probando commits intermedios.</p>
                 <p>Marca cada prueba como good o bad hasta encontrar el culpable.</p>`,
        visual: "⚡ prueba-automática",
        terminal: "$ git bisect good\n$ git bisect bad"
      }
    ]
  },

  'git reflog': {
    steps: [
      {
        title: "1. Historial de referencias",
        content: `<p>Muestra todos los movimientos de HEAD (útil para recuperar commits perdidos):</p>`,
        visual: "📜 registro-de-acciones",
        terminal: "$ git reflog"
      },
      {
        title: "2. Recuperar commits",
        content: `<p>Encuentra el hash del commit perdido y:</p>`,
        visual: "⏮️ commit-recuperado",
        terminal: "$ git checkout abc123\n# Luego crea una rama si es necesario"
      },
      {
        title: "3. Tiempo relativo",
        content: `<p>Ver el reflog con tiempos relativos:</p>`,
        visual: "🕒 hace-2-horas",
        terminal: "$ git reflog --date=relative"
      }
    ]
  },
  'git worktree': {
    steps: [
      {
        title: "1. Crear nuevo worktree",
        content: `<p>Trabaja en múltiples ramas simultáneamente en directorios separados:</p>`,
        visual: "📂 proyecto/ (main)\n└── 📂 feature/ (rama-feature)",
        terminal: "$ git worktree add ../feature-directory branch-name"
      },
      {
        title: "2. Listar worktrees",
        content: `<p>Muestra todos los worktrees activos:</p>`,
        visual: "📋 lista-de-worktrees",
        terminal: "$ git worktree list"
      },
      {
        title: "3. Eliminar worktree",
        content: `<p>Cuando termines de trabajar en esa rama:</p>`,
        visual: "🗑️ worktree-eliminado",
        terminal: "$ git worktree remove ../feature-directory"
      }
    ]
  },

  'git push --force': {
    steps: [
      {
        title: "1. Precaución con force push",
        content: `<p><strong>¡Advertencia!</strong> Reescribe el historial remoto:</p>
                 <p>Solo usar cuando sea absolutamente necesario.</p>`,
        visual: "⚠️ 💥 historial-remoto-modificado",
        terminal: "$ git push --force origin branch-name"
      },
      {
        title: "2. Alternativa más segura",
        content: `<p>Usa <code>--force-with-lease</code> para evitar sobrescribir cambios nuevos:</p>`,
        visual: "🔒 push-seguro",
        terminal: "$ git push --force-with-lease origin branch-name"
      },
      {
        title: "3. Recuperar después de force push",
        content: `<p>Si alguien hizo push después de tu force push:</p>
                 <ol>
                   <li><code>git reflog</code> para encontrar tu commit</li>
                   <li><code>git cherry-pick</code> para recuperar cambios</li>
                 </ol>`,
        visual: "🔄 cambios-recuperados",
        terminal: "$ git reflog\n$ git cherry-pick abc123"
      }
    ]
  },

  'git revert': {
  steps: [
    {
      title: "1. Revertir cambios de forma segura",
      content: `<p>Deshace cambios mediante un nuevo commit (sin modificar historial):</p>
               <ul>
                 <li>🔁 <strong>Crea un commit inverso</strong> que cancela los cambios</li>
                 <li>📜 <strong>Mantiene el historial</strong> intacto (ideal para trabajo en equipo)</li>
                 <li>🔍 <strong>Identifica el commit</strong> con <code>git log --oneline</code></li>
               </ul>`,
      visual: "🕰️ Commit abc123 (original)\n⬇️\n⏪ Commit xyz789 (revert)",
      terminal: "# Revertir un commit específico:\n$ git revert abc123def\n\n# Ver commits disponibles:\n$ git log --oneline",
      tip: "Usa 'git show abc123' para inspeccionar el commit antes de revertir"
    },
    {
      title: "2. Revisión antes de confirmar",
      content: `<p>Flujo para revertir con control total:</p>
               <ul>
                 <li>✋ <code>--no-commit</code> - Aplica cambios pero no crea commit</li>
                 <li>🔍 <code>git diff</code> - Verifica los cambios de reversión</li>
                 <li>💾 <code>git commit</code> - Confirma manualmente</li>
               </ul>`,
      visual: "✏️ Modificaciones en staging\n🔍 Revisar diferencias\n✅ Confirmar con mensaje personalizado",
      terminal: "# Revertir sin commit automático:\n$ git revert --no-commit abc123\n\n# Ver cambios y confirmar:\n$ git diff\n$ git commit -m \"Revert: Cambio problemático en formulario\"",
      tip: "Perfecto cuando necesitas ajustar la reversión o combinar múltiples reverts"
    },
    {
      title: "3. Revertir commits de merge",
      content: `<p>Caso especial para fusiones (necesita especificar parent):</p>
               <ul>
                 <li>🌿 <code>-m 1</code> - Usa la rama principal como referencia</li>
                 <li>🔢 <strong>Identifica el parent</strong> con <code>git show</code></li>
                 <li>⚠️ <strong>Complejo</strong> - Requiere entender la estructura del merge</li>
               </ul>`,
      visual: "🌿 main (parent 1)\n🔀 ← 🌿 feature (parent 2)\n⬇️\n⏪ Revertir hacia parent 1",
      terminal: "# Identificar parents de merge:\n$ git show abc123\n\n# Revertir merge (usando parent 1 - main):\n$ git revert -m 1 abc123",
      tip: "Usa 'git log --merges' para encontrar commits de merge específicos"
    },
    {
      title: "4. Manejo de conflictos al revertir",
      content: `<p>Cuando Git no puede revertir automáticamente:</p>
               <ol>
                 <li>✏️ Edita archivos conflictivos (busca marcadores)</li>
                 <li>✅ <code>git add</code> los archivos resueltos</li>
                 <li>💾 <code>git revert --continue</code> completa el proceso</li>
               </ol>`,
      visual: "⚠️ Conflicto en:\nstyles.css\n✏️ Resolver → ✅ Marcar → 🔄 Continuar",
      terminal: "# Después de resolver conflictos:\n$ git add styles.css\n$ git revert --continue\n\n# Para cancelar:\n$ git revert --abort",
      tip: "Los conflictos al revertir suelen ser los inversos a los del commit original"
    },
    {
      title: "5. Revertir múltiples commits",
      content: `<p>Estrategias para deshacer varios cambios:</p>
               <ul>
                 <li>⏪ <code>git revert abc123 xyz789</code> - Revertir en secuencia</li>
                 <li>🔀 <code>..</code> - Rango de commits (en orden inverso)</li>
                 <li>📌 <strong>Importante</strong>: Revierte del más nuevo al más antiguo</li>
               </ul>`,
      visual: "🕰️ C → B → A (orden original)\n⬇️\n⏪ Revert A → B → C (orden correcto)",
      terminal: "# Revertir rango de commits (nuevo a viejo):\n$ git revert abc123..xyz789\n\n# Revertir múltiples específicos:\n$ git revert abc123 def456 hij789",
      tip: "Usa 'git revert -n' para múltiples reverts y luego un solo commit"
    },
    {
      title: "6. Buenas prácticas y alternativas",
      content: `<p>Cuándo usar revert vs otros comandos:</p>
               <table>
                 <tr><th>Revert</th><th>Reset</th><th>Cherry-pick</th></tr>
                 <tr>
                   <td>✅ Historial intacto</td>
                   <td>🔧 Reescritura local</td>
                   <td>🍒 Copia selectiva</td>
                 </tr>
                 <tr>
                   <td>💡 Ideal para público</td>
                   <td>🚫 Peligroso en remoto</td>
                   <td>🔄 Para reintroducir cambios</td>
                 </tr>
               </table>`,
      visual: "✅ Revert: Seguro para equipo\n🚫 Reset: Solo local\n🔄 Cherry-pick: Para recuperar",
      terminal: "# Alternativa: Reset duro (solo local):\n$ git reset --hard abc123\n\n# Recuperar cambio revertido:\n$ git cherry-pick abc123",
      tip: "En equipos, siempre prefiere revert sobre reset para cambios compartidos"
    }
  ]
},

  'git config alias': {
    steps: [
      {
        title: "1. Crear alias",
        content: `<p>Crea atajos para comandos frecuentes:</p>`,
        visual: "⚡ alias-creado",
        terminal: "$ git config --global alias.st 'status -s'"
      },
      {
        title: "2. Alias complejos",
        content: `<p>Puedes encadenar comandos con <code>!</code>:</p>`,
        visual: "🔗 comandos-encadenados",
        terminal: "$ git config --global alias.ll '!git log --oneline --graph --all'"
      },
      {
        title: "3. Listar alias",
        content: `<p>Ver todos tus alias configurados:</p>`,
        visual: "📜 lista-de-alias",
        terminal: "$ git config --get-regexp alias"
      }
    ]
  },

  'git blame': {
  steps: [
    {
      title: "1. Rastreo detallado de autoría",
      content: `<p>Identifica el último cambio en cada línea de código:</p>
               <ul>
                 <li>🔍 <strong>Por línea</strong>: Muestra commit, autor y fecha</li>
                 <li>👤 <strong>Responsabilidad</strong>: Ideal para entender cambios complejos</li>
                 <li>📜 <strong>Historial</strong>: Vincula cada línea con su commit original</li>
               </ul>`,
      visual: "📄 config.js\n├─ 👤 abc123 Juan (2023-01-15) export const API_URL = ...\n├─ 👤 def456 María (2023-02-20) const TIMEOUT = 5000;\n└─ 👤 ghi789 Carlos (2023-03-10) // Feature flag",
      terminal: "# Analizar autoría de un archivo:\n$ git blame src/config.js\n\n# Ver con colores para mejor legibilidad:\n$ git blame -c src/utils.js",
      tip: "Usa 'git config --global blame.coloring highlightRecent' para resaltar cambios recientes"
    },
    {
      title: "2. Filtrado avanzado por líneas",
      content: `<p>Enfoque en secciones específicas del código:</p>
               <ul>
                 <li>📏 <code>-L</code>: Rango de líneas (inicio,fin o inicio,+count)</li>
                 <li>🔭 <strong>Regex</strong>: Busca patrones con <code>-L '/patrón/'</code></li>
                 <li>📌 <strong>Ejemplos útiles</strong>:
                   <ul>
                     <li>Función específica</li>
                     <li>Bloque de configuración</li>
                     <li>Sección problemática</li>
                   </ul>
                 </li>
               </ul>`,
      visual: "🔍 Líneas 45-60\n📌 Función calculateTax\n🕵️ Buscar cambios recientes",
      terminal: "# Analizar líneas 100-150:\n$ git blame -L 100,150 src/services/api.js\n\n# Buscar función específica:\n$ git blame -L '/calculateTotal/' src/utils/math.js\n\n# 20 líneas desde la 80:\n$ git blame -L 80,+20 package.json",
      tip: "Combina con grep: 'git blame -L 50,100 file.js | grep -A2 -B2 'pattern'"
    },
    {
      title: "3. Personalización de salida",
      content: `<p>Formatos alternativos para diferentes necesidades:</p>
               <ul>
                 <li>⏱️ <code>-s</code>: Oculta nombres (solo hash commit)</li>
                 <li>📅 <code>-e</code>: Muestra email del autor</li>
                 <li>📝 <code>-l</code>: Muestra hash completo del commit</li>
                 <li>🎨 <code>--color-lines</code>: Colorea por antigüedad</li>
               </ul>`,
      visual: "🖥️ Salida personalizada:\nabc123def (2023-01-15 10:30) línea de código\n⬇️\nabc123 (15/01) línea de código",
      terminal: "# Solo hash de commit y línea:\n$ git blame -s src/app.js\n\n# Mostrar emails de autores:\n$ git blame -e components/Header.js\n\n# Hash completo y fechas relativas:\n$ git blame -l --date=relative config/webpack.js",
      tip: "Configura alias como 'gb' para tu formato favorito: git config --global alias.gb 'blame -e -l'"
    },
    {
      title: "4. Análisis histórico",
      content: `<p>Ver cómo evolucionó una línea en el tiempo:</p>
               <ul>
                 <li>🕰️ <code>--contents &lt;file&gt; &lt;rev&gt;</code>: Versión pasada del archivo</li>
                 <li>🔄 <code>-C</code>: Detecta código movido/renombrado</li>
                 <li>📜 <code>git log -L</code>: Historial específico de una línea</li>
               </ul>`,
      visual: "📄 config.js v1.0 → v2.0\n🔍 Línea 42: API_URL cambiada 3 veces\n👤 Autor1 → Autor2 → Autor3",
      terminal: "# Ver blame en versión antigua:\n$ git blame v1.0 -- src/config.js\n\n# Buscar código movido entre archivos:\n$ git blame -C -L 50,60 src/new/location.js\n\n# Historial completo de una línea:\n$ git log -L 42,42:src/config.js",
      tip: "Usa 'git blame --reverse v1.0..HEAD -- file' para ver qué commits afectaron una línea"
    },
    {
      title: "5. Integración con herramientas",
      content: `<p>Flujos profesionales con blame:</p>
               <ul>
                 <li>🔗 <strong>GitHub/GitLab</strong>: Blame integrado en la UI</li>
                 <li>🛠️ <strong>IDEs</strong>: VSCode/IntelliJ tienen blame visual</li>
                 <li>📊 <strong>Estadísticas</strong>: Combina con awk para análisis</li>
               </ul>`,
      visual: "🖥️ VSCode: GitLens blame\n🌐 GitHub: Blame view\n📊 Estadísticas por autor",
      terminal: "# Generar estadísticas de autoría:\n$ git blame --line-porcelain src/app.js | grep '^author ' | sort | uniq -c | sort -nr\n\n# Abrir blame en editor:\n$ code --goto src/utils.js:10:1",
      tip: "En VSCode, instala la extensión GitLens para blame avanzado"
    },
    {
      title: "6. Solución de problemas",
      content: `<p>Casos avanzados y solución de errores:</p>
               <ul>
                 <li>🔍 <strong>Archivos renombrados</strong>: Usa <code>-C -C -C</code> para tracking profundo</li>
                 <li>📌 <strong>Commits borrados</strong>: Recupera con <code>git reflog</code></li>
                 <li>🔄 <strong>Mejor rendimiento</strong>: Usa <code>--progress</code> en repos grandes</li>
               </ul>`,
      visual: "⚠️ Error: Archivo movido\n🔄 Usar -C -C -C\n✅ Rastrear código a través de renombres",
      terminal: "# Blame con tracking de código movido:\n$ git blame -C -C -C src/new/path.js\n\n# Para repositorios muy grandes:\n$ git blame --progress src/large-file.js",
      tip: "Si blame es lento, considera usar 'git blame --since=1.year' para limitar el historial"
    }
  ]
},

  'git show': {
  steps: [
    {
      title: "1. Inspección detallada de commits",
      content: `<p>Revela toda la información de un commit específico:</p>
               <ul>
                 <li>📜 <strong>Metadatos</strong>: Autor, fecha, mensaje</li>
                 <li>🔄 <strong>Cambios</strong>: Diferencias introducidas (patch)</li>
                 <li>🔍 <strong>Contexto</strong>: Hash padre, firma GPG si existe</li>
               </ul>`,
      visual: "📄 Commit abc123\n├─ 👤 Autor: María González\n├─ 📅 Fecha:  3 días atrás\n├─ 📝 Mensaje: Fix authentication bug\n└─ 🔄 2 archivos cambiados (+15 -7)",
      terminal: "# Ver commit específico:\n$ git show abc123def\n\n# Ver con formato personalizado:\n$ git show --pretty=fuller abc123",
      tip: "Usa 'git log --oneline' primero para encontrar hashes de commits interesantes"
    },
    {
      title: "2. Exploración de cambios específicos",
      content: `<p>Diferentes formas de visualizar modificaciones:</p>
               <ul>
                 <li>📊 <code>--stat</code>: Estadísticas de cambios (archivos/líneas)</li>
                 <li>📝 <code>--pretty=oneline</code>: Solo mensaje y hash</li>
                 <li>🔍 <code>-p</code>: Muestra el patch completo (predeterminado)</li>
                 <li>🎨 <code>--color-words</code>: Resalta cambios a nivel de palabras</li>
               </ul>`,
      visual: "📊 src/auth.js | 5 +++--\n📊 test/auth.test.js | 10 ++++++++-\n🔄 @@ -15,6 +15,7 @@ function login()",
      terminal: "# Solo estadísticas de cambios:\n$ git show --stat abc123\n\n# Patch con colores por palabras:\n$ git show --color-words abc123\n\n# Cambios en un archivo específico del commit:\n$ git show abc123:src/utils.js",
      tip: "Combina con 'git diff-tree --no-commit-id --name-only -r abc123' para solo nombres de archivos"
    },
    {
      title: "3. Inspección de objetos Git",
      content: `<p>Accede directamente a cualquier elemento del repositorio:</p>
               <ul>
                 <li>📂 <code>abc123:ruta/</code>: Contenido de directorios en commits antiguos</li>
                 <li>📄 <code>abc123:archivo</code>: Versión histórica de un archivo</li>
                 <li>🌳 <code>abc123^{tree}</code>: Explora el árbol de archivos completo</li>
                 <li>🏷️ <code>v1.0.0</code>: Inspecciona tags anotados</li>
               </ul>`,
      visual: "🗃️ Commit abc123\n├─ 📂 src/\n│  └─ 📄 utils.js (v1.2)\n└─ 📄 package.json (antiguo)",
      terminal: "# Ver archivo en commit antiguo:\n$ git show abc123:src/config.js\n\n# Explorar estructura de directorios:\n$ git show abc123^{tree}\n\n# Ver contenido de un tag anotado:\n$ git show v1.0.0",
      tip: "Usa 'git ls-tree abc123' para ver la estructura de archivos sin contenido"
    },
    {
      title: "4. Comparaciones avanzadas",
      content: `<p>Analiza diferencias entre versiones:</p>
               <ul>
                 <li>🔄 <code>abc123..def456</code>: Cambios entre dos commits</li>
                 <li>📌 <code>--format=\"\"</code>: Salida cruda para scripting</li>
                 <li>📅 <code>--since=\"1 month ago\"</code>: Filtra por fecha</li>
               </ul>`,
      visual: "🔍 Comparando:\n🕰️ v1.0.0..v1.1.0\n📄 3 archivos modificados\n➕ 42 líneas añadidas",
      terminal: "# Cambios entre dos tags:\n$ git show v1.0.0..v1.1.0\n\n# Salida raw para procesamiento:\n$ git show --format=\"%H %s\" abc123\n\n# Commits recientes con cambios:\n$ git show --since=\"2 weeks ago\"",
      tip: "Para ver solo el mensaje de commit: git show --format=\"%B\" -s abc123"
    },
    {
      title: "5. Integración con otras herramientas",
      content: `<p>Flujos profesionales con git show:</p>
               <ul>
                 <li>🔗 <strong>GitHub/GitLab</strong>: Complementa la UI web</li>
                 <li>🛠️ <strong>IDEs</strong>: Integración con VSCode/IntelliJ</li>
                 <li>📜 <strong>Scripting</strong>: Generación de changelogs</li>
               </ul>`,
      visual: "🖥️ IDE: Abrir versión histórica\n📜 Script: Generar reporte\n🌐 Web: Comparar con interfaz gráfica",
      terminal: "# Abrir commit en editor:\n$ git show abc123:src/file.js | code -\n\n# Generar mini changelog:\n$ git show --format=\"- %s (%ad)\" --date=short abc123",
      tip: "En VSCode, usa 'Git: Open File at Revision' para ver versiones históricas gráficamente"
    },
    {
      title: "6. Solución de problemas",
      content: `<p>Técnicas para depuración avanzada:</p>
               <ul>
                 <li>🐛 <code>-L</code>: Historial de una función/línea específica</li>
                 <li>🔍 <code>--name-status</code>: Solo nombres y tipos de cambio</li>
                 <li>🔄 <code>--first-parent</code>: Ignora commits de merge en historial</li>
               </ul>`,
      visual: "🐛 Línea 42: utils.js\n🕰️ Commit1 → Commit2 → Commit3\n🔍 Buscando introducción de bug",
      terminal: "# Ver evolución de una función:\n$ git show -L '/functionName/',+10:src/file.js\n\n# Solo archivos modificados:\n$ git show --name-status abc123\n\n# Ignorar ramas secundarias:\n$ git show --first-parent main",
      tip: "Combina con 'git bisect' para encontrar commits problemáticos eficientemente"
    }
  ]
},

'git gc': {
  steps: [
    {
      title: "1. Limpieza y optimización del repositorio",
      content: `<p>Recolección de basura de Git (Garbage Collection):</p>
               <ul>
                 <li>🧹 <strong>Compactación</strong>: Reduce tamaño del repositorio</li>
                 <li>⚡ <strong>Optimización</strong>: Mejora rendimiento de comandos</li>
                 <li>🗑️ <strong>Limpieza</strong>: Elimina objetos huérfanos</li>
               </ul>`,
      visual: "🛠️ Optimizando repositorio...\n📉 De 1.2GB → 850MB\n⚡ Mejorando performance",
      terminal: "# Ejecución básica:\n$ git gc\n\n# Ver estadísticas de optimización:\n$ git gc --verbose",
      tip: "Git ejecuta auto-gc periódicamente, pero puedes forzarlo manualmente"
    },
    {
      title: "2. Limpieza agresiva (casos especiales)",
      content: `<p>Para repositorios con historia compleja:</p>
               <ul>
                 <li>🔍 <strong>Análisis profundo</strong>: Revisa todo el historial</li>
                 <li>⏳ <strong>Tarda más</strong>: Minutos en vez de segundos</li>
                 <li>📦 <strong>Mayor compresión</strong>: Ideal para repositorios antiguos</li>
               </ul>`,
      visual: "🧼 Limpieza profunda iniciada...\n⏳ Esto puede tomar varios minutos\n📦 Optimizando almacenamiento delta",
      terminal: "# Limpieza agresiva:\n$ git gc --aggressive\n\n# Con ajustes personalizados:\n$ git gc --aggressive --window=250 --depth=50",
      tip: "Usar solo después de operaciones masivas (imports, filter-branch)"
    },
    {
      title: "3. Mantenimiento avanzado",
      content: `<p>Opciones para administradores de repositorios:</p>
               <ul>
                 <li>⏱️ <code>--prune=now</code>: Limpieza inmediata (sin esperar 2 semanas)</li>
                 <li>🚫 <code>--no-repack</code>: Solo limpieza sin reempaquetar</li>
                 <li>📅 <code>--auto</code>: Ejecuta solo si es necesario</li>
               </ul>`,
      visual: "⚙️ Configurando limpieza...\n🗑️ Eliminando 1.4GB de objetos\n🔧 Reconstruyendo índices",
      terminal: "# Limpieza inmediata completa:\n$ git gc --prune=now --aggressive\n\n# Solo limpieza sin reempaquetar:\n$ git gc --no-repack",
      tip: "Configura auto-gc con 'git config gc.auto 1' (valor predeterminado)"
    }
  ]
},

'git fsck': {
  steps: [
    {
      title: "1. Verificación de integridad del repositorio",
      content: `<p>File System ChecK - Diagnóstico completo:</p>
               <ul>
                 <li>🩺 <strong>Examen</strong>: Detecta objetos corruptos</li>
                 <li>🔗 <strong>Conectividad</strong>: Verifica referencias</li>
                 <li>⚠️ <strong>Reporte</strong>: Objetos colgantes/inaccesibles</li>
               </ul>`,
      visual: "🔍 Escaneando repositorio...\n✅ 3421 objetos verificados\n⚠️ 2 objetos inaccesibles",
      terminal: "# Verificación básica:\n$ git fsck\n\n# Con estadísticas detalladas:\n$ git fsck --verbose",
      tip: "Ejecuta regularmente en repositorios críticos"
    },
    {
      title: "2. Modo de operación avanzada",
      content: `<p>Opciones para recuperación de datos:</p>
               <ul>
                 <li>🔎 <code>--full</code>: Verificación exhaustiva</li>
                 <li>🧩 <code>--unreachable</code>: Solo objetos inaccesibles</li>
                 <li>🗃️ <code>--dangling</code>: Objetos no referenciados</li>
               </ul>`,
      visual: "🛠️ Modo avanzado activado...\n🧩 5 commits inaccesibles\n🗃️ 3 blobs en lost-found",
      terminal: "# Verificación completa:\n$ git fsck --full\n\n# Solo objetos no alcanzables:\n$ git fsck --unreachable\n\n# Recuperar objetos específicos:\n$ git show <hash-objeto>",
      tip: "Los objetos en .git/lost-found pueden ser recuperables"
    },
    {
      title: "3. Reparación de corrupción",
      content: `<p>Flujo para problemas graves:</p>
               <ol>
                 <li>📊 <code>git fsck</code>: Identifica errores</li>
                 <li>⚙️ <code>git prune</code>: Elimina objetos corruptos</li>
                 <li>🔄 <code>git reflog expire</code>: Limpia referencias</li>
                 <li>📦 <code>git repack</code>: Reconstruye paquetes</li>
               </ol>`,
      visual: "🚨 Corrupción detectada!\n⚙️ Ejecutando secuencia de reparación...\n✅ Repositorio recuperado",
      terminal: "# Secuencia de reparación:\n$ git fsck\n$ git prune\n$ git reflog expire --all\n$ git repack -a -d -l",
      tip: "Siempre haz backup antes de operaciones de reparación (.git folder)"
    }
  ]
},

'git fetch --prune': {
  steps: [
    {
      title: "1. Sincronización inteligente con remotos",
      content: `<p>Actualiza referencias y limpia ramas obsoletas:</p>
               <ul>
                 <li>🌍 <strong>Conexión</strong>: Descarga nuevos objetos</li>
                 <li>🔄 <strong>Actualización</strong>: Nueva información de ramas</li>
                 <li>🗑️ <strong>Limpieza</strong>: Elimina ramas remotas borradas</li>
               </ul>`,
      visual: "🔄 Sincronizando con origin...\n📥 Descargando 15 nuevos commits\n🗑️ Eliminando 3 ramas obsoletas",
      terminal: "# Sincronización con limpieza:\n$ git fetch --prune\n\n# Alternativa equivalente:\n$ git fetch -p",
      tip: "Prefiere '--prune' sobre borrar manualmente ramas"
    },
    {
      title: "2. Vista previa y configuración",
      content: `<p>Controla el comportamiento de limpieza:</p>
               <ul>
                 <li>👀 <code>--dry-run</code>: Simula sin hacer cambios</li>
                 <li>⚙️ <code>fetch.prune</code>: Configuración global</li>
                 <li>⏱️ <code>prune.expire</code>: Define cuando se consideran obsoletas</li>
               </ul>`,
      visual: "⚙️ Configurando auto-limpieza...\n👀 Ramas que serían eliminadas:\n• old-feature\n• fix/login-bug",
      terminal: "# Simular limpieza:\n$ git fetch --prune --dry-run\n\n# Configurar auto-prune:\n$ git config --global fetch.prune true\n\n# Ajustar expiración:\n$ git config --global fetch.pruneExpire 7.days",
      tip: "Combina con 'git remote show origin' para ver estado completo"
    },
    {
      title: "3. Flujo de trabajo profesional",
      content: `<p>Integración con CI/CD y equipos:</p>
               <ul>
                 <li>🤖 <strong>Pipelines</strong>: Previene builds con ramas obsoletas</li>
                 <li>👥 <strong>Equipos</strong>: Mantiene sincronizados todos los miembros</li>
                 <li>📅 <strong>Cron</strong>: Ejecución periódica automática</li>
               </ul>`,
      visual: "🚀 Pipeline CI/CD:\n✅ Fetch con prune\n🔍 Verificando ramas actualizadas\n⚡ Ejecutando tests",
      terminal: "# En scripts CI:\ngit fetch --prune || exit 1\n\n# Programar limpieza diaria (crontab):\n0 3 * * * cd /repo && git fetch --prune",
      tip: "En equipos grandes, coordina horarios de prune para evitar conflictos"
    }
  ]
},

'git submodule': {
  steps: [
    {
      title: "1. Gestión de dependencias embebidas",
      content: `<p>Repositorios dentro de repositorios:</p>
               <ul>
                 <li>📦 <strong>Independencia</strong>: Mantiene historial separado</li>
                 <li>📌 <strong>Versión</strong>: Registra commit exacto</li>
                 <li>🔄 <strong>Sincronización</code>: Actualización manual</li>
               </ul>`,
      visual: "📁 Proyecto Principal\n└── 📂 libs/dependencia (commit abc123)\n    └── 📄 archivos...",
      terminal: "# Añadir nuevo submodule:\n$ git submodule add https://url/repo.git path/to/submodule\n\n# Inicializar después de clonar:\n$ git submodule update --init --recursive",
      tip: "Usa rutas claras como 'libs/' o 'vendor/' para submodules"
    },
    {
      title: "2. Ciclo de vida completo",
      content: `<p>Flujo de trabajo típico:</p>
               <ol>
                 <li>📥 <code>add</code>: Incorporar dependencia</li>
                 <li>🔄 <code>update</code>: Sincronizar cambios</li>
                 <li>✏️ <code>status</code>: Ver estado actual</li>
                 <li>🧹 <code>deinit</code>: Remover cuando ya no se necesita</li>
               </ol>`,
      visual: "🔄 Actualizando submodules...\n📌 libs/dep1 @ v1.2.3\n📌 libs/dep2 @ v4.5.6",
      terminal: "# Ver estado actual:\n$ git submodule status\n\n# Actualizar todos:\n$ git submodule update --remote --recursive\n\n# Eliminar submodule (4 pasos):\n$ git submodule deinit path/to/sub\n$ git rm path/to/sub\n$ rm -rf .git/modules/path/to/sub\n$ git commit -m \"Remove submodule X\"",
      tip: "Nunca edites código de submodules directamente en el proyecto padre"
    },
    {
      title: "3. Configuración avanzada",
      content: `<p>Personalización para casos complejos:</p>
               <ul>
                 <li>🌳 <code>--recursive</code>: Submodules anidados</li>
                 <li>🔄 <code>update --remote</code>: Trae últimos commits</li>
                 <li>📌 <code>.gitmodules</code>: Archivo de configuración</li>
               </ul>`,
      visual: "⚙️ Configurando submodules...\n📄 .gitmodules:\n[submodule \"libs/dep\"]\n  path = libs/dep\n  url = https://...",
      terminal: "# Configurar branch por defecto:\n$ git config -f .gitmodules submodule.libs/dep.branch main\n\n# Clonar recursivo en un paso:\n$ git clone --recurse-submodules https://repo.git\n\n# Actualizar con rebase:\n$ git submodule update --remote --rebase",
      tip: "Usa 'foreach' para ejecutar comandos en todos los submodules"
    }
  ]
},

'git shortlog': {
  steps: [
    {
      title: "1. Análisis de contribuciones",
      content: `<p>Resumen de actividad por autor:</p>
               <ul>
                 <li>👤 <strong>Agrupado</strong>: Commits por persona</li>
                 <li>📅 <strong>Fechas</strong>: Filtrar por período</li>
                 <li>📊 <strong>Estadísticas</strong>: Conteos rápidos</li>
               </ul>`,
      visual: "📊 Resumen de contribuciones:\n👤 María (12 commits)\n👤 Juan (8 commits)\n👤 Ana (5 commits)",
      terminal: "# Resumen básico:\n$ git shortlog\n\n# Solo conteos ordenados:\n$ git shortlog -sn\n\n# Con emails:\n$ git shortlog -sne",
      tip: "Perfecto para informes de actividad mensual"
    },
    {
      title: "2. Filtrado avanzado",
      content: `<p>Segmentación por múltiples criterios:</p>
               <ul>
                 <li>📅 <code>--since/--until</code>: Rango de fechas</li>
                 <li>📌 <code>tag1..tag2</code>: Entre versiones</li>
                 <li>📂 <code>-- path/</code>: Por directorio/archivo</li>
               </ul>`,
      visual: "🔍 Filtrado por:\n🕰️ Últimos 3 meses\n📂 Solo src/components/\n👤 5 autores activos",
      terminal: "# Por rango de fechas:\n$ git shortlog -sn --since=\"2023-01-01\" --until=\"2023-03-31\"\n\n# Entre tags releases:\n$ git shortlog -sn v1.0.0..v2.0.0\n\n# Por archivo específico:\n$ git shortlog -sn -- src/utils/helpers.js",
      tip: "Combina con 'git log --pretty=format:\"%an\"' para más flexibilidad"
    },
    {
      title: "3. Generación de reportes",
      content: `<p>Formatos para diferentes usos:</p>
               <ul>
                 <li>📄 <code>--format</code>: Personalización completa</li>
                 <li>📊 <code>--group</code>: Agrupación alternativa</li>
                 <li>📋 <code>--no-merges</code>: Ignora merge commits</li>
               </ul>`,
      visual: "📝 Reporte personalizado:\n✨ Features - 15 commits\n🐛 Bugs Fixed - 8 commits\n📚 Docs - 3 commits",
      terminal: "# Formato markdown:\n$ git shortlog --format=\"- %s (%an)\"\n\n# Agrupar por categoría:\n$ git shortlog --group=category\n\n# Para changelogs:\n$ git shortlog --no-merges -s",
      tip: "Exporta a CSV: 'git shortlog -sne | sed 's/\\t/,/g' > contribs.csv'"
    }
  ]
}
  };
  
  const currentStep = ref(0);
  const steps = computed(() => tutorials[props.command]?.steps || []);
  const currentVisual = computed(() => steps.value[currentStep.value]?.visual.replace(/\n/g, '<br>') || '');
  const currentTerminal = computed(() => steps.value[currentStep.value]?.terminal.replace(/\n/g, '<br>') || '');
  
  const nextStep = () => {
    if (currentStep.value < steps.value.length - 1) {
      currentStep.value++;
    }
  };
  
  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  };
  </script>
  
  <style scoped>
  .tutorial-container {
    font-family: 'Inter', sans-serif;
    max-width: 680px;
    margin: 0 auto;
    padding: 2rem;
    padding-top: 1rem;
    color: #e2e8f0;
  }
  
  .tutorial-title {
    font-size: 1.39rem;
    text-align: center;
    margin-bottom: 1.5rem;
    color: #f8fafc;
  }
  
  .tutorial-title code {
    background: rgba(61, 131, 255, 0.2);
    color: #3d83ff;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-family: 'Fira Code', monospace;
  }
  
  .visual {
    text-align: center;
    font-size: 1.1rem;
    margin: 1.5rem 0;
    min-height: 60px;
    line-height: 1.4;
  }
  
  .terminal {
    background: #0f172a;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    max-height: 200px;
    overflow-y: auto;
    font-family: 'Fira Code', monospace;
    color: #4ade80;
    white-space: pre-wrap;
  }

  .step {
    display: none;
    padding: 1.5rem;
    background: #0f172a;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-family: "Comfortaa", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    font-size: 13px;
    border-left: 4px solid #3d83ff;
  }
  
  .step.active {
    display: block;
    animation: fadeIn 0.3s ease;
  }
  
  .step h3 {
    font-size: 1rem;
    margin-top: 0;
    color: #f8fafc;
  }
  
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    gap: 1rem;
  }
  
  .control-button {
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    flex: 1;
    max-width: 150px;
  }
  
  .control-button.prev {
    background: #334155;
    color: #f8fafc;
  }
  
  .control-button.next {
    background: #3d83ff;
    color: white;
  }
  
  .control-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .control-button:not(:disabled):hover { 
    box-shadow: 0 4px 8px rgba(241, 239, 239, 0.1);
  }
  
  .step-counter {
    color: #94a3b8;
    font-size: 0.875rem;
  }
  

  .step-content :deep(.folder) {
    color: #3d83ff;
    font-weight: bold;
  }
  
  .step-content :deep(.file) {
    color: #4ade80;
  }
  
  .step-content :deep(code) {
    background: rgba(255, 255, 255, 0.1);
    color: #f8fafc;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 640px) {
    .controls {
      flex-direction: column;
    }
    
    .control-button {
      max-width: 100%;
      width: 100%;
    }
  }
  </style>