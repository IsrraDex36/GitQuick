<template>
    <div class="guide-section">
      <h2 class="guide-title">Guía Práctica de Git</h2>
      <p class="guide-subtitle">Referencia rápida de comandos esenciales organizados por temas</p>
      
      <div class="guide-cards">
        <!-- Secciones principales ordenadas por contenido -->
        <div 
          class="guide-card" 
          v-for="(section, sectionIndex) in sortedMainSections" 
          :key="section.title"
          :data-item-count="section.items.length"
          :style="{ '--hue-rotate': randomHue(section.title) }"
        >
          <h3 class="section-title">{{ section.title }}</h3>
          <div class="command-group" v-for="(item, i) in section.items" :key="i">
            <p class="command-description" v-if="item.description">{{ item.description }}</p>
            <code class="command-example" v-if="item.command" @click="copyToClipboard(item.command, `${sectionIndex}-${i}`)">
              <!-- Notificación encima del comando -->
              <span 
                v-if="activeNotification === `${sectionIndex}-${i}`" 
                class="inline-notification"
              >
                ¡Copiado!
              </span>
              {{ item.command }}
              <span class="copy-hint">Click para copiar</span>
            </code>
          </div>
        </div>
        
        <!-- Sección de consejos finales (siempre al final) -->
        <div 
          class="guide-card final-tips"
          :data-item-count="finalTipsSection.items.length"
        >
          <h3 class="section-title">{{ finalTipsSection.title }}</h3>
          <div class="command-group" v-for="(item, i) in finalTipsSection.items" :key="i">
            <p class="command-description" v-if="item.description">{{ item.description }}</p>
            <code class="command-example" v-if="item.command" @click="copyToClipboard(item.command)">
              {{ item.command }}
              <span class="copy-hint">Click para copiar</span>
            </code>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const guideSections = [
    {
      title: "Inspeccionar el Repositorio",
      items: [
        {
          description: "Mostrar archivos nuevos o modificados sin confirmar",
          command: "git status"
        },
        {
          description: "Mostrar cambios en archivos no preparados",
          command: "git diff"
        },
        {
          description: "Mostrar cambios en archivos preparados",
          command: "git diff --cached"
        },
        {
          description: "Mostrar todos los cambios (preparados y no preparados)",
          command: "git diff HEAD"
        },
        {
          description: "Mostrar diferencias entre dos commits",
          command: "git diff commit1 commit2"
        },
        {
          description: "Mostrar historial de cambios por autor para un archivo",
          command: "git blame [archivo]"
        },
        {
          description: "Mostrar cambios de un commit específico",
          command: "git show [commit]:[archivo]"
        },
        {
          description: "Mostrar historial completo de cambios",
          command: "git log"
        },
        {
          description: "Mostrar historial de cambios con diferencias para un archivo/directorio",
          command: "git log -p [archivo/directorio]"
        }
      ]
    },
    {
      title: "Trabajar con Ramas",
      items: [
        {
          description: "Listar todas las ramas locales",
          command: "git branch"
        },
        {
          description: "Listar todas las ramas (locales y remotas)",
          command: "git branch -av"
        },
        {
          description: "Cambiar a una rama y actualizar el directorio de trabajo",
          command: "git checkout mi_rama"
        },
        {
          description: "Crear una nueva rama",
          command: "git branch nueva_rama"
        },
        {
          description: "Eliminar una rama",
          command: "git branch -d mi_rama"
        },
        {
          description: "Fusionar rama_a en rama_b",
          command: "git checkout rama_b\ngit merge rama_a"
        },
        {
          description: "Etiquetar el commit actual",
          command: "git tag mi_etiqueta"
        }
      ]
    },
    {
      title: "Realizar Cambios",
      items: [
        {
          description: "Preparar un archivo para commit",
          command: "git add [archivo]"
        },
        {
          description: "Preparar todos los archivos modificados",
          command: "git add ."
        },
        {
          description: "Confirmar cambios con un mensaje",
          command: "git commit -m 'mensaje descriptivo'"
        },
        {
          description: "Confirmar todos los archivos rastreados",
          command: "git commit -am 'mensaje descriptivo'"
        },
        {
          description: "Quitar archivos del área de preparación (sin perder cambios)",
          command: "git reset [archivo]"
        },
        {
          description: "Revertir todo al último commit (pérdida de cambios)",
          command: "git reset --hard"
        }
      ]
    },
    {
      title: "Crear un Repositorio",
      items: [
        {
          description: "Desde cero - Crear un nuevo repositorio local",
          command: "git init [nombre del proyecto]"
        },
        {
          description: "Descargar desde un repositorio existente",
          command: "git clone mi_url"
        }
      ]
    },
    {
      title: "Sincronizar Cambios",
      items: [
        {
          description: "Obtener cambios del repositorio remoto (sin fusionar)",
          command: "git fetch"
        },
        {
          description: "Obtener cambios y fusionarlos con la rama actual",
          command: "git pull"
        },
        {
          description: "Obtener cambios y reorganizar commits locales",
          command: "git pull --rebase"
        },
        {
          description: "Enviar cambios locales al repositorio remoto",
          command: "git push"
        }
      ]
    },
    {
      title: "¡Consejos Finales!",
      items: [
        {
          description: "Cuando tengas dudas, usa la ayuda de Git",
          command: "git comando --help"
        },
        {
          description: "Visita el entrenamiento oficial de GitHub",
          command: ""
        },
        {
          description: "Enlace: https://training.github.com/",
          command: ""
        }
      ]
    }
  ];
  
  // Separamos los consejos finales
  const finalTipsSection = computed(() => {
    return guideSections.find(section => section.title === "¡Consejos Finales!");
  });
  
  // Ordenamos las demás secciones por cantidad de items (de mayor a menor)
  const sortedMainSections = computed(() => {
    return [...guideSections]
      .filter(section => section.title !== "¡Consejos Finales!")
      .sort((a, b) => b.items.length - a.items.length);
  });
  
  // Función para generar un tono único basado en el título
  const randomHue = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `${(hash % 60) - 30}deg`; // Rango de -30 a 30 grados
  };
  
  // Estado para rastrear qué comando muestra la notificación
  const activeNotification = ref(null);
  
  // Función para copiar al portapapeles
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      // Mostrar notificación para el comando copiado
      activeNotification.value = index;
  
      // Ocultar notificación después de 2 segundos
      setTimeout(() => {
        activeNotification.value = null;
      }, 2000);
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  };
  </script>
  
  <style scoped>
  .guide-section {
    margin-top: 4rem;
    padding: 2rem 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .guide-title {
    font-size: 2rem;
    color: #f8fafc;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  
  .guide-subtitle {
    color: #94a3b8;
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.1rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .guide-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
    align-items: start;
  }
  
  .guide-card {
    background: linear-gradient(145deg, #1e1e20, #252528);
    border-radius: 12px;
    padding: 1.5rem;
    border-left: 4px solid hsl(217, 100%, 65%);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    filter: hue-rotate(var(--hue-rotate, 0deg));
  }
  

  
  .section-title {
    color: #f8fafc;
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
  }
  
  .section-title::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 50px;
    height: 2px;
    background: #3d83ff;
  }
  
  .command-group {
    margin-bottom: 1.5rem;
    break-inside: avoid;
  }
  
  .command-description {
    color: #94a3b8;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
  
  .command-example {
    display: block;
    background: rgba(30, 41, 59, 0.6);
    color: #e2e8f0;
    padding: 0.8rem;
    border-radius: 6px;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    white-space: pre-wrap;
    word-break: break-word;
    border-left: 2px solid #597fc0;
    margin-top: 0.5rem;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .command-example:hover {
    background: rgba(30, 41, 59, 0.8);
  }
  
  .command-example:hover .copy-hint {
    opacity: 1;
  }
  
  .copy-hint {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    font-size: 0.7rem;
    background: rgba(0, 0, 0, 0.6);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  /* Estilo para la notificación en línea */
  .inline-notification {
    display: block;
    position: absolute;
    top: -1.5rem;
    right: 0;
    background: #4caf50;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 10;
    animation: fade-in-out 2s ease;
  }
  
  @keyframes fade-in-out {
    0% { opacity: 0; transform: translateY(-5px); }
    10%, 90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-5px); }
  }
  
  /* Estilos para la sección final */
  .final-tips {
    border-left-color: #f59e0b !important;
    grid-column: 1 / -1;
    background: linear-gradient(145deg, #1e1e20, #252528) !important;
    filter: none !important;
  }
  
  .final-tips .section-title::after {
    background: #f59e0b;
  }
  
  .final-tips .command-example {
    border-left-color: #d97706;
  }
  
  /* Asignación dinámica de altura basada en contenido */
  .guide-card[data-item-count="9"] { min-height: 420px; }
  .guide-card[data-item-count="7"] { min-height: 380px; }
  .guide-card[data-item-count="6"] { min-height: 340px; }
  .guide-card[data-item-count="5"] { min-height: 300px; }
  .guide-card[data-item-count="4"] { min-height: 260px; }
  .guide-card[data-item-count="3"] { min-height: 220px; }
  .guide-card[data-item-count="2"] { min-height: 180px; }
  
  @media (max-width: 768px) {
    .guide-cards {
      grid-template-columns: 1fr;
    }
    
    .guide-card {
      min-height: auto !important;
      padding: 1.25rem;
    }
    
    .final-tips {
      grid-column: auto;
    }
    
    .command-example {
      font-size: 0.8rem;
      padding: 0.7rem;
    }
  }
  
  @media (min-width: 1200px) {
    .guide-cards {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
    
    .guide-card[data-item-count="9"] { grid-column: span 2; min-height: 380px; }
  }
  </style>