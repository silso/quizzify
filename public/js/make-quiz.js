const presets = {
    'Flashcard': {
        columns: [
            {colName: 'Word'},
            {colName: 'Definition'}
        ]
    },
    'Multiple choice': {
        columns: [
            {colName: 'Question'},
            {colName: 'Correct Answer'},
            {colName: 'Wrong Answer 1'},
            {colName: 'Wrong Answer 2'},
            {colName: 'Wrong Answer 3'},
        ]
    },
    'Geography': {
        columns: [
            {colName: 'Name'},
            {colName: 'Region'},
        ]
    },
    'Image': {
        columns: [
            {colName: 'Word'},
            {colName: 'Image URL'},
        ]
    }
}

let jTable = jexcel(document.getElementById('quizDataSpreadsheet'), {
    data: Array.from({length: 10}, () => ['']),
    columns: [{title:'hidden', width: 1}],
    columnSorting: false,
    oninsertcolumn: function(a) {
        const colHeads = document.querySelectorAll('#quizDataSpreadsheet thead > tr > td:not(:first-child)');
        for (let i = 0; i < colHeads.length; i++) {
            let colHead = colHeads[i];
            if (colHead.childElementCount=== 0) {
                colHead.insertAdjacentHTML('beforeend', `
                    <img src='/svg/wrench.svg' data-id='${i-1}' role='button' style = '
                        position: absolute;
                        right: 0.3em;
                        top: 0.4em;
                    ' data-toggle='modal' data-target='#colSettingsModal'>
                `);
            }
        }
    }
});

function autoResizeJexcel(jexcelContainer, jexcelTable) {
    const topRow = jexcelContainer.querySelector(':scope thead tr');
    function getWidths() {
        let widths = [];
        const headers = topRow.childNodes;
        for (let i = 1; i < headers.length; i++) {
            widths.push(headers[i].offsetWidth);
        }
        return widths;
    }

    const resizeObserver = new ResizeObserver(entries => {
        const colWidths = getWidths(topRow);
        const colSum = colWidths.reduce((a, b) => a + b);
        const leftColWidth = document.querySelector('.jexcel_selectall').offsetWidth;
        const newColSum = jexcelContainer.clientWidth - leftColWidth;

        jexcelTable.setWidth(0, 1);
        for (let i = 1; i < colWidths.length; i++) {
            jexcelTable.setWidth(i, Math.max(colWidths[i]*newColSum/colSum, 20));
        }
    });

    resizeObserver.observe(jexcelContainer);
    resizeObserver.observe(jexcelContainer.querySelector(':scope > .jexcel_container'));
}

autoResizeJexcel(document.getElementById('spreadsheetContainer'), jTable);

function applyPreset(table, settings) {
    const numCols = document.querySelectorAll('#quizDataSpreadsheet thead > tr > td').length - 2;
    if (numCols) table.deleteColumn(1, numCols);
    for (col of settings.columns) {
        table.insertColumn(1, -1, false, {title: col.colName});
    }
}

$('#colSettingsModal').on('show.bs.modal', function (e) {
    console.log(e.relatedTarget.dataset.id);
});

const presetSelect = document.getElementById('presetSelect');
presetSelect.addEventListener('change', function(e) {
    applyPreset(jTable, presets[this.value]);
});
presetSelect.dispatchEvent(new Event('change'));