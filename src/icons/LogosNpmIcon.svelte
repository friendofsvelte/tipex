<script lang="ts" module>
  export interface LogosNpmIconProps {
    size?: number;
    class?: string;
  }
</script>

<script lang="ts">
  const { size = 0.7, class: className = '' }: LogosNpmIconProps = $props();
</script>

<svg
   xmlns="http://www.w3.org/2000/svg"
   width="{size}em"
   height="{size}em"
   viewBox="0 0 256 256"
   class="{className}">
  <path fill="#C12127" d="M0 256V0h256v256z"/><path fill="#FFF" d="M48 48h160v160h-32V80h-48v128H48z"/>
</svg>