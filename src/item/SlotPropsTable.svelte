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
			<td>head()</td>
			<td>null</td>
			<td>N/A</td>
			<td>Snippet for rendering a component at the head of the editor.</td>
		</tr>
		<tr>
			<td>controlComponent()</td>
			<td>Controls</td>
			<td>if controlComponent</td>
			<td>Snippet for customizing the control element of the editor. If not provided, Controls are used.</td>
		</tr>
		<tr>
			<td>utilities()</td>
			<td>Utility</td>
			<td>if utilities within Controls</td>
			<td>Snippet within the Controls for adding extra utility controls. If not provided, default Utility is
				used.
			</td>
		</tr>
		<tr>
			<td>foot()</td>
			<td>null</td>
			<td>N/A</td>
			<td>Snippet for rendering a component at the foot of the editor.</td>
		</tr>
		</tbody>
	</table>
</div>

<blockquote>
	<p class="text-gray-700"><strong>Note:</strong>
		The <code>utilities</code> Snippet is only available if the <code>controlComponent()</code> Snippet is not
		provided. The <code>controlComponent()</code> overrides the default controls, and makes the
		<code>utilities</code>
		Snippet unavailable.
</blockquote>
