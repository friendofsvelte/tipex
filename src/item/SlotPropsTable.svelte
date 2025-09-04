<script>
	import ParamSpan from '$item/ParamSpan.svelte';
</script>

<h2 class="mt-6" id="Snippet-props">Tipex Props</h2>
<div class="overflow-x-auto">
	<table class="table-auto w-full mt-3">
		<thead>
			<tr>
				<th>Prop Name</th>
				<th>Default</th>
				<th>Condition</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<ParamSpan name="head" />
				</td>
				<td>undefined</td>
				<td>Optional</td>
				<td
					>A slot that accepts a function receiving the TipexEditor instance, rendered above the
					main editor content area
				</td>
			</tr>
			<tr>
				<td>controlComponent</td>
				<td>
					<code>Snippet&lt;[TipexEditor]&gt;</code>
				</td>
				<td>Only used when you want to replace default controls entirely</td>
			</tr>
			<tr>
				<td>utilities</td>
				<td>
					<code>Snippet&lt;[TipexEditor]&gt;</code>
				</td>
				<td>Only used when you want to customize the default controls toolbar</td>
			</tr>
			<tr>
				<td>
					<ParamSpan name="foot" />
				</td>
				<td>undefined</td>
				<td>Optional</td>
				<td>
					A slot that accepts a function receiving the TipexEditor instance, rendered below the
					editor content and controls
				</td>
			</tr>
		</tbody>
	</table>
</div>
<div
	class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
>
	<h4 class="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Control System</h4>
	<p class="text-sm text-blue-700 dark:text-blue-300 mb-2">
		Tipex automatically detects which control system to use:
	</p>
	<ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
		<li>When <code>controlComponent</code> is provided: Uses your custom control component</li>
		<li>
			When <code>controlComponent</code> is not provided: Shows default controls with optional
			<code>utilities</code>
		</li>
	</ul>
	<p class="text-sm text-blue-600 dark:text-blue-400 mt-2">
		This ensures a clean API where you don't need to manage boolean flags.
	</p>
</div>
