export default [
    {
      title: 'git init',
      description: 'Inicializa un nuevo repositorio Git en el directorio actual.',
      category: 'Inicialización',
      example: 'git init',
      level: 'basic',
      tags: ['inicio', 'repositorio'],
      isEssential: true
    },
    {
      title: 'git clone',
      description: 'Clona un repositorio existente desde una URL remota.',
      category: 'Repositorio',
      example: 'git clone https://github.com/usuario/repo.git',
      level: 'basic',
      tags: ['remoto', 'descarga']
    },
    {
      title: 'git status',
      description: 'Muestra el estado del árbol de trabajo, incluyendo cambios rastreados y no rastreados.',
      category: 'Inspección',
      example: 'git status -s',
      level: 'basic',
      tags: ['consulta', 'estado'],
      isEssential: true
    },
    {
      title: 'git add',
      description: 'Añade cambios del directorio de trabajo al área de staging.',
      category: 'Staging',
      example: 'git add archivo.txt || git add .',
      level: 'basic',
      tags: ['preparación', 'cambios']
    },
    {
      title: 'git commit',
      description: 'Guarda los cambios del área de staging en el historial del repositorio.',
      category: 'Guardado',
      example: 'git commit -m "Mensaje descriptivo"',
      level: 'basic',
      tags: ['historial', 'snapshot'],
      isEssential: true
    },
    {
      title: 'git push',
      description: 'Envía los commits locales a un repositorio remoto.',
      category: 'Sincronización',
      example: 'git push origin main',
      level: 'basic',
      tags: ['remoto', 'subir']
    },
    {
      title: 'git pull',
      description: 'Obtiene e integra cambios de un repositorio remoto.',
      category: 'Sincronización',
      example: 'git pull origin main',
      level: 'basic',
      tags: ['remoto', 'bajar']
    },
    {
      title: 'git branch',
      description: 'Lista, crea o elimina ramas.',
      category: 'Ramas',
      example: 'git branch nueva-rama',
      level: 'intermediate',
      tags: ['ramificación', 'gestión']
    },
    {
      title: 'git checkout',
      description: 'Cambia entre ramas o restaura archivos del árbol de trabajo.',
      category: 'Ramas',
      example: 'git checkout -b nueva-rama',
      level: 'intermediate',
      tags: ['navegación', 'cambio']
    },
    {
      title: 'git merge',
      description: 'Combina el historial de ramas.',
      category: 'Ramas',
      example: 'git merge feature-branch',
      level: 'intermediate',
      tags: ['combinación', 'unión']
    },
    {
      title: 'git rebase',
      description: 'Reaplica commits encima de otra rama base.',
      category: 'Ramas',
      example: 'git rebase main',
      level: 'advanced',
      tags: ['historial', 'reorganización']
    },
    {
      title: 'git stash',
      description: 'Guarda temporalmente cambios sin commit.',
      category: 'Temporal',
      example: 'git stash pop',
      level: 'intermediate',
      tags: ['almacenamiento', 'temporal']
    },
    {
      title: 'git reset',
      description: 'Deshace commits o cambios en el área de staging.',
      category: 'Deshacer',
      example: 'git reset --hard HEAD~1',
      level: 'advanced',
      tags: ['revertir', 'peligroso']
    },
    {
      title: 'git log',
      description: 'Muestra el historial de commits con diversas opciones de formato.',
      category: 'Inspección',
      example: 'git log --oneline --graph --all',
      level: 'intermediate',
      tags: ['historial', 'consulta']
    },
    {
      title: 'git rebase -i',
      description: 'Reorganiza, edita o combina commits interactivamente (¡cuidado con esto en ramas públicas!).',
      category: 'Ramas',
      example: 'git rebase -i HEAD~3',
      level: 'advanced',
      tags: ['historial', 'rebase'],
      isEssential: false
    },
    {
      title: 'git cherry-pick',
      description: 'Aplica un commit específico de otra rama a tu rama actual.',
      category: 'Ramas',
      example: 'git cherry-pick abc123',
      level: 'advanced',
      tags: ['commit', 'selectivo']
    },
    {
      title: 'git bisect',
      description: 'Ayuda a encontrar el commit que introdujo un bug usando búsqueda binaria.',
      category: 'Depuración',
      example: 'git bisect start\n git bisect bad\n git bisect good v1.0',
      level: 'advanced',
      tags: ['debug', 'bug']
    },
    {
      title: 'git reflog',
      description: 'Muestra un registro de todos los movimientos de HEAD (útil para recuperar commits perdidos).',
      category: 'Rescate',
      example: 'git reflog',
      level: 'intermediate',
      tags: ['historial', 'emergencia'],
      isEssential: true
    },
    {
      title: 'git worktree',
      description: 'Permite trabajar con múltiples ramas en directorios separados simultáneamente.',
      category: 'Productividad',
      example: 'git worktree add ../feature-ruta feature/ruta',
      level: 'advanced',
      tags: ['ramas', 'paralelo']
    },
    {
      title: 'git push --force',
      description: 'Fuerza el push sobrescribiendo el remoto (¡puede borrar trabajo de otros!).',
      category: 'Sincronización',
      example: 'git push --force origin main',
      level: 'advanced',
      tags: ['peligroso', 'remoto']
    },
    {
      title: 'git revert',
      description: 'Crea un nuevo commit que deshace cambios de un commit anterior (más seguro que reset).',
      category: 'Deshacer',
      example: 'git revert abc123',
      level: 'intermediate',
      tags: ['seguro', 'emergencia'],
      isEssential: true
    },
    {
      title: 'git config alias',
      description: 'Crea atajos personalizados para comandos frecuentes.',
      category: 'Configuración',
      example: 'git config --global alias.st "status -s"',
      level: 'intermediate',
      tags: ['productividad', 'alias']
    },
    {
      title: 'git blame',
      description: 'Muestra quién modificó cada línea de un archivo y en qué commit.',
      category: 'Inspección',
      example: 'git blame archivo.txt',
      level: 'intermediate',
      tags: ['autores', 'historial']
    },
    {
      title: 'git show',
      description: 'Muestra información detallada de un commit específico.',
      category: 'Inspección',
      example: 'git show abc123',
      level: 'intermediate',
      tags: ['detalles', 'commit']
    },
    {
      title: 'git gc',
      description: 'Optimiza el repositorio (recolector de basura).',
      category: 'Mantenimiento',
      example: 'git gc --aggressive',
      level: 'advanced',
      tags: ['optimización', 'limpieza']
    },
    {
      title: 'git fsck',
      description: 'Verifica la integridad del sistema de archivos Git.',
      category: 'Mantenimiento',
      example: 'git fsck --full',
      level: 'advanced',
      tags: ['reparación', 'verificación']
    },
    {
      title: 'git fetch --prune',
      description: 'Sincroniza ramas remotas y elimina las que ya no existen.',
      category: 'Sincronización',
      example: 'git fetch --prune',
      level: 'intermediate',
      tags: ['limpieza', 'remoto']
    },
    {
      title: 'git submodule',
      description: 'Gestiona repositorios anidados dentro de tu proyecto.',
      category: 'Avanzado',
      example: 'git submodule update --init --recursive',
      level: 'advanced',
      tags: ['dependencias', 'modulos']
    },
    {
      title: 'git shortlog',
      description: 'Muestra un resumen de commits por autor.',
      category: 'Inspección',
      example: 'git shortlog -sn',
      level: 'intermediate',
      tags: ['estadísticas', 'equipo']
    }
  ]