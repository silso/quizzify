data = [
    ['Mazda', 2001, 2000],
    ['Pegeout', 2010, 5000],
    ['Honda Fit', 2009, 3000],
    ['Honda CRV', 2010, 6000],
];
 
let jTable = jexcel(document.getElementById('mySpreadsheet'), {
    data:data,
    columns:[
        { title:'Model'},
        { title:'Price'},
        { title:'Model'}
    ]
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
        console.log(colSum);

        for (let i = 0; i < colWidths.length; i++) {
            jexcelTable.setWidth(i, Math.max(colWidths[i]*newColSum/colSum, 20));
        }
    });

    resizeObserver.observe(jexcelContainer);
    resizeObserver.observe(jexcelContainer.querySelector(':scope > .jexcel_container'));
}

autoResizeJexcel(document.getElementById('spreadsheetContainer'), jTable);