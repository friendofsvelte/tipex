<script lang="ts" module>
  export interface Fa6SolidItalicProps {
    display?: boolean;
    occupy?: boolean;
    size?: number;
    class?: string;
  }
</script>

<script lang="ts">
  const {display = false, occupy = true, size = 0.7, class: className = ''}: Fa6SolidItalicProps = $props();
</script>

{#if display}
  <svg
   xmlns="http://www.w3.org/2000/svg"
   width="{size}em"
   height="{size}em"
   viewBox="0 0 384 512"
   class="{className}">
  <path fill="currentColor" d="M128 64c0-17.7 14.3-32 32-32h192c17.7 0 32 14.3 32 32s-14.3 32-32 32h-58.7L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h58.7L224 96h-64c-17.7 0-32-14.3-32-32"/>
</svg>
{:else if occupy}
  <div style="height: {size}em; width: {size}em;"></div>
{/if}