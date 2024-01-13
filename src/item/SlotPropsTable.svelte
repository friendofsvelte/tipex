<h2 class="mt-6" id="slot-props">Slots props</h2>
<div class="overflow-x-auto">
    <table class="table-auto w-full mt-3">
        <thead>
        <tr>
            <th>Slot Name</th>
            <th>Default</th>
            <th>Condition</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>headComponent</td>
            <td>null</td>
            <td>N/A</td>
            <td>Slot for rendering a component at the head of the editor.</td>
        </tr>
        <tr>
            <td>controlComponent</td>
            <td>DefaultControls</td>
            <td>if $$slots.controlComponent</td>
            <td>Slot for customizing the control element of the editor. If not provided, DefaultControls are used.</td>
        </tr>
        <tr>
            <td>utilities</td>
            <td>Utility</td>
            <td>if $$slots.utilities within DefaultControls</td>
            <td>Slot within the DefaultControls for adding extra utility controls. If not provided, default Utility is
                used.
            </td>
        </tr>
        <tr>
            <td>footComponent</td>
            <td>null</td>
            <td>N/A</td>
            <td>Slot for rendering a component at the foot of the editor.</td>
        </tr>
        </tbody>
    </table>
</div>

<blockquote>
    <p class="text-gray-700"><strong>Note:</strong>
        The <code>utilities</code> slot is only available if the <code>$$slots.controlComponent</code> slot is not
        provided. The <code>$$slots.controlComponent</code> overrides the default controls, and makes the
        <code>utilities</code>
        slot unavailable.
</blockquote>
