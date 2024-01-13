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
            <td>floatingMenu</td>
            <td>boolean</td>
            <td>false</td>
            <td>Determines if the default floating menu should be displayed.</td>
        </tr>
        <tr>
            <td>onEditorCreate</td>
            <td>function</td>
            <td>{function_string}</td>
            <td>Callback function when the editor is created.</td>
        </tr>
        <tr>
            <td>onEditorDestroy</td>
            <td>function</td>
            <td>{function_string}</td>
            <td>Callback function when the editor is destroyed.</td>
        </tr>
        <tr>
            <td>onEditorUpdate</td>
            <td>function</td>
            <td>{function_string}</td>
            <td>Callback function when the editor is updated.</td>
        </tr>
        <tr>
            <td>htmlContent</td>
            <td>string</td>
            <td>''</td>
            <td>Initial HTML content to be rendered in the editor.</td>
        </tr>
        <tr>
            <td>className</td>
            <td>string</td>
            <td>''</td>
            <td>Class to be applied to the editor.</td>
        </tr>
        <tr>
            <td>style</td>
            <td>string</td>
            <td>''</td>
            <td>Style to be applied to the editor.</td>
        </tr>
        <tr>
            <td>focusOnEdit</td>
            <td>boolean</td>
            <td>true</td>
            <td>Determines whether to focus on the editor when it is clicked to edit; default blue outline.</td>
        </tr>
        <tr>
            <td>displayDefaultControls</td>
            <td>boolean</td>
            <td>true</td>
            <td>Determines if the default controls should be displayed.</td>
        </tr>
        <!-- Add additional props here as necessary -->
        </tbody>
    </table>
</div>

<blockquote>
    <p class="text-gray-700"><strong>Note:</strong>
        For better customization, please have a look at [<a href="/customization#slot-props">Slot Props</a>]
</blockquote>
