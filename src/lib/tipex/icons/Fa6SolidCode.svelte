<script lang="ts" module>
	export interface Fa6SolidCodeProps {
		size?: number;
		class?: string;
	}
</script>

<script lang="ts">
	const { size = 0.7, class: className = '' }: Fa6SolidCodeProps = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="{size}em"
	height="{size}em"
	viewBox="0 0 640 512"
	class={className}
>
	<path
		fill="currentColor"
		d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6m80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3l89.3 89.4l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3"
	/>
</svg>
