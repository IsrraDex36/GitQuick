<template>
  <main class="wrapper">
    <header class="app-header">
      <h1>
        <GitIcon />
        Comandos Esenciales de Git
      </h1>
      <p class="subtitle">Referencia completa para el control de versiones</p>
    </header>
    
    <div class="filters">
      <button 
        v-for="level in ['all', 'basic', 'intermediate', 'advanced']" 
        :key="level"
        @click="filterLevel = level"
        :class="{ active: filterLevel === level }"
      >
        {{ level === 'all' ? 'All' : level }}
      </button>
    </div>
    
    <!-- Añadimos el transition-group -->
    <transition-group name="fade" tag="div" class="container">
      <CommandItem
        v-for="(cmd) in filteredCommands"
        :key="cmd.title" 
        v-bind="cmd"
      />
    </transition-group>
    <Guiagit />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import CommandItem from './components/CommandItem.vue'
import GitIcon from './components/GitIcon.vue'
import Guiagit from './components/Guiagit.vue'
import commands from './data/gitCommands.js'

const filterLevel = ref('all')

const filteredCommands = computed(() => {
  if (filterLevel.value === 'all') return commands
  return commands.filter(cmd => cmd.level === filterLevel.value)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px); 
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0); 
}
.wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem; 
  min-height: 100vh;
  color: white;
}

.app-header {
  text-align: center;
  margin-bottom: 3rem;
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: #f8fafc;
}

.subtitle {
  color: #b8bfc9;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filters button {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #e2e8f0;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: capitalize;
}

.filters button:hover {
  background: rgba(61, 131, 255, 0.2);
}

.filters button.active {
  background: #08337c;
  color: white;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.6rem;
  padding: 1.5rem 0; 
  margin: 0 auto;
  max-width: 100%;
}

@media (max-width: 768px) {
  
  .app-header h1 {
  font-size: 2rem;
}
  .container {
    gap: 4.6rem;
    padding: 1rem;
  }
}
</style>