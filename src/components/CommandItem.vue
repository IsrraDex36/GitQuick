<template>
    <div class="command-card" :class="{'is-essential': isEssential, 'is-dangerous': tags.includes('peligroso')}">
      <transition name="fade">
        <div v-if="showCopied" class="copy-notification">¡Copiado!</div>
      </transition>
      
      <div class="command-header">
        <CommandIcon :command="title" />
        <h3 class="command-title">{{ title }}</h3>
        <span class="command-category">{{ category }}</span>
        <button class="copy-button" @click="copyToClipboard" aria-label="Copiar comando">
          <CopyIcon />
        </button>
        <button class="help-button" @click="showHelpModal = true" aria-label="Ayuda">
          ❔
        </button>
      </div>

      <transition name="modal">
        <div v-if="showHelpModal" class="help-modal-overlay">
          <div class="help-modal">
            <button class="close-modal" @click="showHelpModal = false">✕</button>
            <CommandTutorial 
              :command="title" 
              @close="showHelpModal = false"
            />
          </div>
        </div>
    </transition>
      
      <p class="command-description">{{ description }}</p>
      
      <div class="command-example" v-if="example">
        <span>Ejemplo:</span>
        <pre><code>{{ example }}</code></pre>
      </div>
      
      <div class="command-footer">
        <span class="command-level" :class="'level-' + level">{{ level }}</span>
        <span class="command-tags">
          <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
        </span>
      </div>
    </div>

    

  </template>
  
  <script setup>
  import { ref } from 'vue';
  import CommandIcon from './CommandIcon.vue';
  import CopyIcon from './CopyIcon.vue';
  import CommandTutorial from './CommandTutorial.vue';
  
  const showHelpModal = ref(false);

  const props = defineProps({
    title: String,
    description: String,
    category: {
      type: String,
      default: 'General'
    },
    example: String,
    level: {
      type: String,
      default: 'basic',
      validator: (value) => ['basic', 'intermediate', 'advanced'].includes(value)
    },
    tags: {
      type: Array,
      default: () => []
    },
    isEssential: Boolean
  });
  
  const showCopied = ref(false);
  let copyTimeout = null;
  
  const copyToClipboard = () => {
    const commandToCopy = props.example || props.title;
    
    navigator.clipboard.writeText(commandToCopy)
      .then(() => {
        showCopied.value = true;
        clearTimeout(copyTimeout);
        copyTimeout = setTimeout(() => showCopied.value = false, 2000);
      })
      .catch(err => {
        console.error('Error al copiar:', err);
        // Fallback para navegadores antiguos
        const textarea = document.createElement('textarea');
        textarea.value = commandToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showCopied.value = true;
        setTimeout(() => showCopied.value = false, 2000);
      });
  };
  </script>
  
  <style scoped>
  .command-card {
    --color-primary: #3d83ff;
    --color-basic: #4ade80;
    --color-intermediate: #fbbf24;
    --color-advanced: #f87171;
    
    position: relative;
    background: linear-gradient(145deg, #1e1e20, #252528);
    border-radius: 12px;
    padding: 1.75rem;
    border-left: 4px solid var(--color-primary);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 220px;
    height: 85%;
  }
  .help-button {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
  transition: all 0.2s;
  padding: 0.25rem;
}

.help-button:hover {
  color: #3d83ff;
  transform: scale(1.1);
}

/* Estilos del modal básico */
.help-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.help-modal {
  background: #1e293b;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  max-height: calc(100vh - 4rem);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid #334155;
}
/* Animaciones */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.close-modal {
  position: sticky;
  top: 15px;
  right: 15px;
  float: right;
  background: #334155;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #f8fafc;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-bottom: -32px;
  transform: translateY(15px);
  cursor: pointer;
}

.tutorial-placeholder {
  padding: 1rem 0;
  min-height: 200px;
}
  .command-card.is-essential {
    border-left: 4px solid #f59e0b;
    box-shadow: 0 6px 16px rgba(245, 158, 11, 0.1);
  }
   
  .command-card.is-dangerous {
  border-left: 4px solid #ef4444;
  background: linear-gradient(145deg, #2a1a1a, #251e1e);
}
  .command-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .command-title {
    margin: 0;
    color: #f8fafc;
    font-size: 1.19rem;
    font-weight: 600;
    flex-grow: 1;
  }
  
  .command-category {
    background: rgba(61, 131, 255, 0.15);
    color: var(--color-primary);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .command-description {
    margin: 0.5rem 0;
    color: #94a3b8;
    line-height: 1.2;
    font-size: 0.85rem;
  }
  
  .command-example {
    margin: 1rem 0;
    background: rgba(30, 41, 59, 0.5);
    padding: 1rem;
    margin-top: -7px;
    border-radius: 6px;
    
    border-left: 2px solid #597fc0;
  }
  
  .command-description,
  .command-example code {
    word-wrap: break-word; 
    overflow-wrap: break-word; 
    white-space: normal; 
  }
  .command-example span {
    display: block;
    color: #64748b;
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
  
  .command-example code {
    color: #e2e8f0;
    font-family: 'Fira Code', monospace;
    font-size: 0.75rem; 
    word-break: break-all;
  }
  
  .command-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .command-level {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    text-transform: capitalize;
  }
  
  .level-basic {
    background: rgba(74, 222, 128, 0.15);
    color: var(--color-basic);
  }
  
  .level-intermediate {
    background: rgba(251, 191, 36, 0.15);
    color: var(--color-intermediate);
  }
  
  .level-advanced {
    background: rgba(248, 113, 113, 0.15);
    color: var(--color-advanced);
  }
  
  .command-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  
  .tag {
    font-size: 0.65rem;
    padding: 0.25rem 0.5rem;
    background: rgba(100, 116, 139, 0.15);
    color: #94a3b8;
    border-radius: 4px;
  }
  
  .copy-button {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    width: 32px;
    height: 32px;
    padding: 0.25rem;
    margin-left: auto;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .copy-button:hover {
    background: rgba(61, 131, 255, 0.2);
    border-color: rgba(61, 131, 255, 0.5);
    transform: translateY(-1px);
  }
  
  .copy-button:active {
    transform: translateY(0);
  }
  
  .copy-notification {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.8rem;
    z-index: 10;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    pointer-events: none;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }
  </style>