<script lang="ts">
	import Tipex from '$lib/tipex/Tipex.svelte';
	import '$lib/tipex/styles/index.css';
	import StarterKit from '@tiptap/starter-kit';
</script>

<Tipex body="<p>default</p>" class="editor-default" />

<Tipex
	extensions={[StarterKit.configure({ heading: { levels: [1] } })]}
	body="<p>custom</p>"
	class="editor-custom"
/>
