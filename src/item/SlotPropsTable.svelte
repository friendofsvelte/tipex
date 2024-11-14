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
			<td>A slot that accepts a function receiving the TipexEditor instance, rendered above the main editor content
				area
			</td>
		</tr>
		<tr>
			<td>
				<ParamSpan name="controlComponent" />
			</td>
			<td>undefined</td>
			<td>Only used when controls=false</td>
			<td>A custom control component that receives the editor instance. Cannot be used together with the utilities
				prop
			</td>
		</tr>
		<tr>
			<td>
				<ParamSpan name="utilities" />
			</td>
			<td>Utility</td>
			<td>Only used when controls=true</td>
			<td>
				Custom utility components rendered within the default Controls component. Cannot
				be used together with controlComponent
			</td>
		</tr>
		<tr>
			<td>
				<ParamSpan name="foot" />
			</td>
			<td>undefined</td>
			<td>Optional</td>
			<td>
				A slot that accepts a function receiving the TipexEditor instance,
				rendered below the editor content and controls
			</td>
		</tr>
		</tbody>
	</table>
</div>
<blockquote>
	<p class="text-gray-700"><strong>Note:</strong>
		These props are mutually exclusive based on the control mode:
	</p>
	<ul class="list-disc list-inside">
		<li>When <code>controls=true</code>: Only <code>utilities</code> can be used</li>
		<li>When <code>controls=false</code>: Only <code>controlComponent</code> can be used</li>
	</ul>

	<p class="text-gray-700">
		This is enforced by the <code>WithControlsOn</code> and <code>WithControlsOff</code> type interfaces.
	</p>
</blockquote>
