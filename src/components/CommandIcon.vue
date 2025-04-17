<template>
    <div class="command-icon">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" stroke-width="1.5">
  <path d="M12 2L22 12L12 22L2 12L12 2Z" />
  <path d="M8 12L11 15L16 9" />
</svg>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    command: String
  });
  </script>
  
  <style scoped>
  .command-icon {
    color: #3d83ff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>