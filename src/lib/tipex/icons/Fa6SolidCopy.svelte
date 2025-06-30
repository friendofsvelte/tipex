<script lang="ts" module>
  export interface Fa6SolidCopyProps {
    size?: number;
    class?: string;
  }
</script>

<script lang="ts">
  const {size = 0.7, class: className = ''}: Fa6SolidCopyProps = $props();
</script>

<svg
 xmlns="http://www.w3.org/2000/svg"
 width="{size}em"
 height="{size}em"
 viewBox="0 0 448 512"
 class="{className}">
  <path fill="currentColor" d="M208 0h124.1C344.8 0 357 5.1 366 14.1L433.9 82c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48M48 128h80v64H64v256h192v-32h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48"/>
</svg>
