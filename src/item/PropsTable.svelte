<script>
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
            <td>htmlContent</td>
            <td>string</td>
            <td>''</td>
            <td>HTML content to be rendered in the editor.</td>
        </tr>
        <tr>
            <td>style</td>
            <td>string</td>
            <td>''</td>
            <td>Style to be applied to the editor.</td>
        </tr>
        <tr>
            <td>className</td>
            <td>string</td>
            <td>''</td>
            <td>Class to be applied to the editor.</td>
        </tr>
        <tr>
            <td>focusOnEdit</td>
            <td>boolean</td>
            <td>true</td>
            <td>Focus on the editor when it is clicked to edit.</td>
        </tr>
        <tr>
            <td>controlElement</td>
            <td>ComponentType</td>
            <td>DefaultControls</td>
            <td>If provided, gets rendered as a control element in the editor.</td>
        </tr>
        <tr>
            <td>headComponent</td>
            <td>ComponentType</td>
            <td>null</td>
            <td>If provided, gets rendered as a head element in the editor.</td>
        </tr>
        <tr>
            <td>footComponent</td>
            <td>ComponentType</td>
            <td>null</td>
            <td>If provided, gets rendered as a foot element in the editor.</td>
        </tr>
    </table>
</div>

<blockquote>
    <p class="text-gray-700"><strong>Note:</strong>
        The <code>headComponent</code> and <code>footComponent</code> props are
        components that are rendered inside the editor. There three components are prioritized while rendering
        compared to their <code>slot</code> equivalent.
</blockquote>

<p>
    For <code>controlElement</code>, it renders <code>DefaultControls.svelte</code> by default, where you can
    pass <code>utilities</code> named slot to render your own extra controls. If you want to render your own
    set of controls, you can pass your own component to the <code>controlElement</code> prop.
</p>