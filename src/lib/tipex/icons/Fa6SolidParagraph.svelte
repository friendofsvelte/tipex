<script lang="ts" module>
  export interface Fa6SolidParagraphProps {
    display?: boolean;
    occupy?: boolean;
    size?: number;
    class?: string;
  }
</script>

<script lang="ts">
  const {display = false, occupy = true, size = 0.7, class: className = ''}: Fa6SolidParagraphProps = $props();
</script>

{#if display}
  <svg
   xmlns="http://www.w3.org/2000/svg"
   width="{size}em"
   height="{size}em"
   viewBox="0 0 448 512"
   class="{className}">
  <path fill="currentColor" d="M192 32h224c17.7 0 32 14.3 32 32s-14.3 32-32 32h-32v352c0 17.7-14.3 32-32 32s-32-14.3-32-32V96h-32v352c0 17.7-14.3 32-32 32s-32-14.3-32-32v-96h-32c-88.4 0-160-71.6-160-160S103.6 32 192 32"/>
</svg>
{:else if occupy}
  <div style="height: {size}em; width: {size}em;"></div>
{/if}