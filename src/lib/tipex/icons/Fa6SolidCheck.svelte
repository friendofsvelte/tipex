<script lang="ts" module>
  export interface Fa6SolidCheckProps {
    size?: number;
    class?: string;
  }
</script>

<script lang="ts">
  const {size = 0.7, class: className = ''}: Fa6SolidCheckProps = $props();
</script>

<svg
 xmlns="http://www.w3.org/2000/svg"
   width="{size}em"
   height="{size}em"
   viewBox="0 0 448 512"
   class="{className}">
  <path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z"/>
</svg>
