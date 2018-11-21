var columns = {
    'id': 'Anamnese ID',
    'dataConsulta': 'Data da Consulta',
    'breveResumo': 'Motivo (resumo)',
    'medicamentosTratamento': 'Medicamentos (Tratamento)'
}

var hiddenColumns = [
    "id"
];

var data = [{}];

var TestData = {
    data: data,
    columns: columns
}

var table = null;

table = $('#myTable').tableSortable({
    data: TestData.data,
    columns: TestData.columns,
    parsing: true,
    columnsHtml: function (value, key) {
        return value;
    },
    hiddenColumns,
    pagination: 6,
    showPaginationLabel: false,
    prevText: 'Anterior',
    nextText: 'Próximo',
    searchField: $('#search'),
    responsive: [{
            maxWidth: 992,
            minWidth: 769,
            columns: TestData.col,
            pagination: true,
            paginationLength: 3
        },
        {
            maxWidth: 768,
            minWidth: 0,
            columns: TestData.colXS,
            pagination: true,
            paginationLength: 2
        }
    ]
});


function formatDate(str) {
    return moment(str).format('DD/MM/YYYY');
}

function updateTable(endpoint) {
    axios.get(endpoint)
        .then(function (response) {
            var data = response.data;
            var TestData = {
                data: data,
                columns: columns
            }
            for (var i = 0; i < data.length; i++) {
                data[i]["dataConsulta"] = formatDate(data[i]["dataConsulta"]);
            }
            if (table != null) {
                table.updateDataset(data);
            }
            if (data && data.length > 0) {
                $.notify("Anamnese(s) encontrada(s): " + data.length, {
                    type: "info",
                    animate: {
                        enter: 'animated bounceIn',
                        exit: 'animated bounceOut'
                    },
                    delay: 2000
                });
            } else {
                selectedRowId = null;
                table.updateDataset([{}]);
                $.notify("Nenhuma anamnese encontrada", {
                    type: "info",
                    animate: {
                        enter: 'animated bounceIn',
                        exit: 'animated bounceOut'
                    },
                    delay: 2000
                });
            }
        })
        .catch(function (error) {
            selectedRowId = null;
            console.log(error);
            $.notify("Paciente não encontrado", {
                type: "danger",
                animate: {
                    enter: 'animated bounceIn',
                    exit: 'animated bounceOut'
                },
                delay: 2000
            });
            table.updateDataset([{}]);
        });
}