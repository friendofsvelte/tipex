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
            <td>class</td>
            <td>string</td>
            <td>''</td>
            <td>Class to be applied to the editor.</td>
        </tr>
        <tr>
            <td>placeholder</td>
            <td>string</td>
            <td>''</td>
            <td>Placeholder to be shown in the editor.</td>
        </tr>
        <tr>
            <td>focusOnEdit</td>
            <td>boolean</td>
            <td>true</td>
            <td>Focus on the editor when it is clicked to edit.</td>
        </tr>
        </tbody>
    </table>
</div>
<style lang="postcss">
    table {
        @apply border-collapse;
    }

    th {
        @apply px-4 py-2;
        @apply text-left;
        @apply border;
        @apply border-neutral-200 dark:border-stone-900;
        @apply bg-neutral-100 dark:bg-neutral-800;
        @apply text-neutral-700 dark:text-neutral-200;
    }

    td {
        @apply px-4 py-2;
        @apply border;
        @apply border-neutral-300 dark:border-stone-900;
        @apply text-neutral-700 dark:text-neutral-200;
    }

    tr {
        @apply even:bg-neutral-100 even:dark:bg-neutral-800;
        @apply odd:bg-neutral-200 odd:dark:bg-neutral-700;
    }
</style>