<script>
	import { typescript } from 'svelte-highlight/languages';
	import { Highlight, HighlightSvelte } from 'svelte-highlight';
	import advanceCodes from '$item/codes/advanceCodes.json' with { type: 'json' };
	import codes from '$item/codes/basicCodes.json' with { type: 'json' };
	import customizationCodes from '$item/codes/customizationCodes.json' with { type: 'json' };
	import SlotPropsTable from '$item/SlotPropsTable.svelte';
</script>

<svelte:head>
	<title>Customization Guide | Tipex Editor</title>
	<meta 
		name="description"
		content="Complete customization guide for Tipex Editor. Learn how to customize themes, controls, extensions, and create your own unique editor experience for Svelte applications."
	/>
</svelte:head>

<a href="/" class="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded-lg shadow-sm w-fit">
	<iconify-icon icon="fa6-solid:house" class="text-sm"></iconify-icon>
	Back to Home
</a>

<h1 class="mt-8">Customization Guide</h1>
<p>
	Tipex is architected with customization as a core principle. Every aspect of the editor can be tailored to match your application's 
	design system and functional requirements. This comprehensive guide covers everything from basic styling to advanced extension development.
</p>

<h2 class="mt-8">Quick Customization Overview</h2>
<p>
	Tipex offers multiple layers of customization:
</p>
<ul class="list-disc pl-5 space-y-1 text-black dark:text-white">
	<li><strong>Theme Customization:</strong> Colors, spacing, typography, and visual styling</li>
	<li><strong>Component Replacement:</strong> Replace built-in controls with your own components</li>
	<li><strong>Extension System:</strong> Add new functionality through TipTap extensions</li>
	<li><strong>Event Handling:</strong> Custom behavior through event listeners</li>
	<li><strong>Layout Customization:</strong> Header, footer, and utility area modifications</li>
</ul>

<h2 class="mt-8" id="theme-customization">Theme & Styling Customization</h2>
<p>
	Tipex uses <strong>Tailwind CSS v4</strong> with the modern `@theme` configuration system and CSS custom properties for comprehensive theming. 
	You can override any aspect of the visual design using the new Tailwind v4 architecture:
</p>

<Highlight language={typescript} code={customizationCodes.tailwindThemeConfig} />

<h2 class="mt-8" id="control-customization">Control Component Customization</h2>

<p>
	Tipex provides a single, flexible way to customize the editor controls through the `controlComponent` slot. 
	You can either extend the default controls with custom utilities or completely replace them with your own implementation.
</p>

<figure class="image-tab">
	<img src="https://github.com/friendofsvelte/tipex/assets/42182303/c6feb3c0-9ed8-4f9e-88d2-42b7895a72a8"
			 alt="Tipex Editor control customization options"
			 class="w-full rounded-xl mt-2 shadow-xl border border-neutral-200 dark:border-neutral-700" />
	<figcaption>
		Control component provides complete flexibility for editor customization
	</figcaption>
</figure>

<h3 class="mt-8">Using Default Controls with Built-in Utilities</h3>
<p>
	Include the default controls and utility buttons (copy, link management) in your editor:
</p>
<Highlight language={typescript} code={codes.insertUtils} />

<h3 class="mt-8">Extending Default Controls with Custom Utilities</h3>
<p>
	Add your own custom buttons alongside the built-in utilities:
</p>
<Highlight language={typescript} code={codes.appendUtils} />

<p class="mt-4">
	Here's a more comprehensive example with multiple custom utilities:
</p>

<HighlightSvelte code={customizationCodes.customUtilities} />

<SlotPropsTable />

<h3 id="new_custom_controls" class="mt-8">Complete Control Replacement</h3>
<p>
	Replace the entire control system with your own custom implementation:
</p>
<Highlight language={typescript} code={codes.overrideControl} />

<p class="mt-4">
	Here's a complete custom control implementation:
</p>

<HighlightSvelte code={customizationCodes.customToolbar} />

<h3 class="mt-8">⚠️ Tailwind v4 ONLY - No Legacy Versions!</h3>
<p>
	<strong class="text-red-600 dark:text-red-400">IMPORTANT:</strong> Tipex exclusively uses and requires <strong>Tailwind CSS v4</strong>. 
	We do NOT support older versions (v1.x, v2.x, v3.x) as they lack the modern architecture required for Tipex's advanced theming system.
</p>

<div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mt-4 rounded-r-md">
	<div class="flex">
		<div class="flex-shrink-0">
			<iconify-icon icon="fa6-solid:triangle-exclamation" class="text-red-500 w-5 h-5"></iconify-icon>
		</div>
		<div class="ml-3">
			<h4 class="text-sm font-medium text-red-800 dark:text-red-200">Legacy Tailwind Versions Not Supported</h4>
			<div class="mt-2 text-sm text-red-700 dark:text-red-300">
				<ul class="list-disc pl-5 space-y-1">
					<li>Tailwind v3.x and older lack <code>@theme</code> configuration</li>
					<li>Missing <code>@custom-variant</code> syntax for advanced dark mode</li>
					<li>Inferior performance and larger bundle sizes</li>
					<li>Limited component layer organization</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<h3 class="mt-8">Tailwind v4 Advantages</h3>
<p>
	Tipex exclusively uses Tailwind CSS v4 for superior developer experience and performance:
</p>
<ul class="list-disc pl-5 space-y-2 text-black dark:text-white">
	<li><strong>🚀 Modern Import System:</strong> Clean `@import "tailwindcss"` syntax without configuration files</li>
	<li><strong>🎨 Native CSS Custom Properties:</strong> Direct integration with CSS variables in `@theme` blocks</li>
	<li><strong>⚡ Better Performance:</strong> Faster builds and smaller bundle sizes compared to v3.x</li>
	<li><strong>🛠️ Enhanced DX:</strong> Improved IntelliSense and better error messages</li>
	<li><strong>🌙 Custom Variants:</strong> Powerful `@custom-variant` syntax for complex state handling</li>
	<li><strong>📦 Component Layers:</strong> Better organization with `@layer components` for maintainable styles</li>
	<li><strong>🔮 Future-Proof:</strong> Built for modern CSS features and browser capabilities</li>
</ul>

<div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mt-4 rounded-r-md">
	<div class="flex">
		<div class="flex-shrink-0">
			<iconify-icon icon="fa6-solid:circle-check" class="text-green-500 w-5 h-5"></iconify-icon>
		</div>
		<div class="ml-3">
			<h4 class="text-sm font-medium text-green-800 dark:text-green-200">Tailwind v4 Required</h4>
			<p class="mt-2 text-sm text-green-700 dark:text-green-300">
				Upgrade to Tailwind v4 immediately for the best Tipex experience. The new architecture is essential for Tipex's theming system to function properly.
			</p>
		</div>
	</div>
</div>

<blockquote class="mt-4">
	<p class="text-gray-700 dark:text-gray-300">
		<strong>Migration Note:</strong> If you're using older Tailwind versions (v1.x, v2.x, v3.x), you MUST upgrade to Tailwind v4 
		for Tipex to work correctly. The new architecture provides significantly better performance, developer experience, and maintainability.
	</p>
</blockquote>

<h2 class="mt-8">Advanced Layout Customization</h2>
<p>
	Tipex supports comprehensive layout customization through multiple slot areas:
</p>

<HighlightSvelte code={advanceCodes.addHeadFootComponent} />

<p class="mt-4">
	Here's a practical example with a custom header featuring document statistics:
</p>

<HighlightSvelte code={customizationCodes.layoutCustomization} />

<h2 class="mt-8">Image Upload Customization</h2>
<p>
	Tipex provides flexible image handling. You can customize the upload process, validation, and storage:
</p>

<HighlightSvelte code={customizationCodes.imageUploadCustomization} />

<h2 class="mt-8" id="advanced-customization">Extension System</h2>

<p>
	Leverage TipTap's powerful extension system to add custom functionality. Tipex provides easy access to modify and extend the editor's capabilities:
</p>

<figure class="image-tab">
	<img src="https://github.com/friendofsvelte/tipex/assets/42182303/9aa4814f-b360-473f-85af-ba147d7e6a56"
			 alt="Advanced customization example showing custom extensions and theming in Tipex Editor"
			 class="w-full rounded-xl mt-2 shadow-xl border border-neutral-200 dark:border-neutral-800" />

	<figcaption>
		Advanced customization with custom extensions and theming. 
		<a href="https://github.com/Bishwas-py/tipexed-editor" target="_blank" class="text-blue-600 hover:underline">
			View Source Code
		</a>
	</figcaption>
</figure>

<h3 class="mt-8">Modifying Default Extensions</h3>
<p>
	Customize the built-in extensions to match your requirements:
</p>

<HighlightSvelte code={advanceCodes.tweakingExtensions} />

<h3 class="mt-8">Creating Custom Extensions</h3>
<p>
	Build your own extensions for specialized functionality:
</p>

<HighlightSvelte code={customizationCodes.customExtensions} />

<h2 class="mt-8">Event-Driven Customization</h2>
<p>
	React to editor events for dynamic behavior and integrations:
</p>

<HighlightSvelte code={customizationCodes.eventDrivenCustomization} />

<h2 class="mt-8">Accessibility Customization</h2>
<p>
	Enhance accessibility with custom ARIA labels, keyboard navigation, and screen reader support:
</p>

<HighlightSvelte code={customizationCodes.accessibilityCustomization} />

<h2 class="mt-8">Performance Optimization with Tailwind v4</h2>
<p>
	Optimize your customized editor using Tailwind v4's performance benefits:
</p>

<ul class="list-disc pl-5 space-y-2 text-black dark:text-white">
	<li><strong>🎯 Tailwind v4 Tree Shaking:</strong> Automatic unused CSS elimination</li>
	<li><strong>⚡ Faster Builds:</strong> Improved build performance over legacy versions</li>
	<li><strong>📦 Smaller Bundles:</strong> More efficient CSS generation</li>
	<li><strong>🔄 Lazy Loading:</strong> Load extensions and components only when needed</li>
	<li><strong>⏱️ Debounced Updates:</strong> Throttle auto-save and real-time features</li>
	<li><strong>🖥️ Virtual Scrolling:</strong> For large documents, implement virtual scrolling</li>
	<li><strong>🧠 Memory Management:</strong> Clean up event listeners and subscriptions</li>
</ul>

<div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mt-4 rounded-r-md">
	<div class="flex">
		<div class="flex-shrink-0">
			<iconify-icon icon="fa6-solid:rocket" class="text-blue-500 w-5 h-5"></iconify-icon>
		</div>
		<div class="ml-3">
			<h4 class="text-sm font-medium text-blue-800 dark:text-blue-200">Tailwind v4 Performance Benefits</h4>
			<p class="mt-2 text-sm text-blue-700 dark:text-blue-300">
				Tailwind v4's modern architecture provides up to 50% faster builds and 30% smaller CSS bundles compared to v3.x, 
				making your Tipex editor load faster and perform better.
			</p>
		</div>
	</div>
</div>

<blockquote class="mt-8">
	<p class="text-gray-700 dark:text-gray-300">
		<strong>Best Practices with Tailwind v4:</strong> When customizing Tipex, leverage Tailwind v4's `@layer components`, 
		`@theme` configuration, and `@custom-variant` features. Always test your changes across different devices and browsers. 
		The modern Tailwind v4 architecture ensures better performance and maintainability compared to legacy versions.
	</p>
</blockquote>

<h2 class="mt-8">Advanced Tailwind v4 Theming</h2>
<p>
	Create sophisticated themes using Tailwind v4's advanced features. Here's a complete example of a premium theme configuration:
</p>

<Highlight language={typescript} code={advanceCodes.tailwindV4Theming} />

<p class="mt-4">
	This example demonstrates Tailwind v4's powerful theming capabilities including gradient backgrounds, 
	advanced shadows, custom scrollbars, and sophisticated component styling that would be much more complex in older Tailwind versions.
</p>

<blockquote class="mt-8">
	<p class="text-gray-700 dark:text-gray-300">
		<strong>🚫 Why Tailwind v4 Only:</strong> Tipex exclusively supports and promotes Tailwind CSS v4 because it represents the future of utility-first CSS. 
		The new architecture provides native CSS custom property integration, better performance, improved developer experience, and more maintainable code. 
		We strongly discourage and do NOT support using older Tailwind versions (v1.x, v2.x, v3.x) as they lack the modern features that make Tipex's theming system possible.
		<br><br>
		<strong class="text-red-600 dark:text-red-400">⚠️ Legacy Tailwind Warning:</strong> Attempting to use Tipex with older Tailwind versions will result in broken styling, 
		missing features, and poor performance. Upgrade to Tailwind v4 immediately.
	</p>
</blockquote>