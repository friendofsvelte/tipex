<script lang="ts">
	let function_string = '() => {}';
</script>

<div class="overflow-x-auto">
	<table class="table-auto w-full mt-3">
		<thead>
		<tr>
			<th>Prop</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>extensions</td>
			<td>Extensions[]</td>
			<td>defaultExtensions</td>
			<td>Extensions to be used in the editor.</td>
		</tr>
		<tr>
			<td>floating</td>
			<td>boolean</td>
			<td>false</td>
			<td>Determines display of default floating menu.</td>
		</tr>
		<tr>
			<td>oncreate</td>
			<td>function</td>
			<td>{function_string}</td>
			<td>Callback function when the editor is created.</td>
		</tr>
		<tr>
			<td>ondestroy</td>
			<td>function</td>
			<td>{function_string}</td>
			<td>Callback function when the editor is destroyed.</td>
		</tr>
		<tr>
			<td>onupdate</td>
			<td>function</td>
			<td>{function_string}</td>
			<td>Callback function when the editor is updated.</td>
		</tr>
		<tr>
			<td>body</td>
			<td>string</td>
			<td>''</td>
			<td>HTML content to render.</td>
		</tr>
		<tr>
			<td>this</td>
			<td>TipTap</td>
			<td>N/A</td>
			<td>Instance of the editor.</td>
		</tr>
		<tr>
			<td>class</td>
			<td>string</td>
			<td>''</td>
			<td>Additional CSS classes to apply to the editor container.</td>
		</tr>
		<tr>
			<td>style</td>
			<td>string</td>
			<td>''</td>
			<td>Inline styles to apply to the editor container.</td>
		</tr>
		<tr>
			<td>focal</td>
			<td>boolean</td>
			<td>true</td>
			<td>Focus outline when editing (blue ring).</td>
		</tr>
		<tr>
			<td>ctxId</td>
			<td>{'${string}_tipex'}</td>
			<td>_tipex</td>
			<td>Sets context ID to get editor instance via getContext.</td>
		</tr>
		<!-- Add additional props here as necessary -->
		</tbody>
	</table>
</div>

<blockquote>
	<p class="text-gray-700"><strong>Note:</strong>
		For better customization, please have a look at [<a href="/customization#slot-props">Slot Props</a>]
</blockquote>
