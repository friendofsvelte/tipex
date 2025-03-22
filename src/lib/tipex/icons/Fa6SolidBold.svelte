<script lang="ts" module>
  export interface Fa6SolidBoldProps {
    size?: number;
    class?: string;
  }
</script>

<script lang="ts">
  const { size = 0.7, class: className = '' }: Fa6SolidBoldProps = $props();
</script>

<svg
   xmlns="http://www.w3.org/2000/svg"
   width="{size}em"
   height="{size}em"
   viewBox="0 0 384 512"
   class="{className}">
  <path fill="currentColor" d="M0 64c0-17.7 14.3-32 32-32h192c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V96H32C14.3 96 0 81.7 0 64m224 160c35.3 0 64-28.7 64-64s-28.7-64-64-64H112v128zm-112 64v128h144c35.3 0 64-28.7 64-64s-28.7-64-64-64z"/>
</svg>