var data = {};

function applyTo(containerId) {
    var $originalElement = $('#' + containerId);
    if ($originalElement.length) {
        var dataContainer = createDataContainer();
        var $newContainer = $('<div></div>', {
            class: "dynamic-text-container col-md-5",
            id: containerId
        });
        var inputId = addInputElement(dataContainer, $newContainer, dataContainer.data);
        $originalElement.replaceWith($newContainer);
        $newContainer.after(addContainerButton(inputId, $newContainer, dataContainer.data));
    }
}

function createInputElement(dataContainer, $container, itemArray) {
    var inputElement = {};
    inputElement["id"] = dataContainer.serial + "_input";
    var $inputSpan = $('<span></span>', {
        class: "input-group container-item"
    });
    var $input = $('<input/>', {
        type: "text",
        class: "input-item",
        id: inputElement.id
    });
    $inputSpan.append($input);
    $container.on("click", function () {
        $input.focus();
    });
    $input.on("keydown", {
        itemArray: itemArray,
        container: $container
    }, function (event) {
        var $btnAddContainerItem = $('.btn-container');
        var data = event.data;
        var itemArray = data.itemArray;
        if (event.keyCode == 13 && $(this).val().trim().length > 0) {
            //Create new item
            var newItemText = $(this).val().trim();
            //Add new item to array
            itemArray.push(newItemText);
            //Update items in container

            //Clear text in input
            $(this).val("");
        }
        if ($(this).val().trim().length > 0) {
            if ($btnAddContainerItem.hasClass('disabled'))
                $btnAddContainerItem.toggleClass('disabled');
        } else {
            if (!$btnAddContainerItem.hasClass('disabled'))
                $btnAddContainerItem.toggleClass('disabled');
        }
    });
    $input.on("keyup", function (event) {
        var $btnAddContainerItem = $('.btn-container');
        if ($(this).val().trim().length > 0) {
            if ($btnAddContainerItem.hasClass('disabled'))
                $btnAddContainerItem.toggleClass('disabled');
        } else {
            if (!$btnAddContainerItem.hasClass('disabled'))
                $btnAddContainerItem.toggleClass('disabled');
        }
    });
    inputElement["element"] = $inputSpan;
    return inputElement;
}

function addInputElement(dataContainer, $container, itemArray) {
    var elementCreated = createInputElement(dataContainer, $container, itemArray);
    $container.append(elementCreated.element);
    return elementCreated.id;
}

function createContainerButton(inputId, itemArray) {
    var $input = $('#' + inputId);
    var $btnAddContainerItem = $('<button style="margin-left: 10px;" class="btn btn-success disabled btn-container"></button>');
    var $btnAddContainerItemIcon = $('<span class="glyphicon glyphicon-plus"></span>');
    $btnAddContainerItem.append($btnAddContainerItemIcon);
    $btnAddContainerItem.on("click", {
        itemArray: itemArray,
        input: $input
    }, function (event) {
        var data = event.data;
        var itemArray = data.itemArray;
        if ($input.val().trim().length > 0) {
            //Create new item
            var newItemText = $(this).val().trim();
            //Add new item to array
            itemArray.push(newItemText);
            //Update items in container

            //Clear text in input
            $input.val("");
            if ($input.val().trim().length > 0) {
                if ($btnAddContainerItem.hasClass('disabled'))
                    $btnAddContainerItem.toggleClass('disabled');
            } else {
                if (!$btnAddContainerItem.hasClass('disabled'))
                    $btnAddContainerItem.toggleClass('disabled');
            }
        }
    });
    return $btnAddContainerItem;
}

function addContainerButton(inputId, $container, itemArray) {
    return createContainerButton(inputId, itemArray);
}

function createContainerItem(text, itemArray) {
    var $itemContainerSpan = $('<span></span>', {
        class: "container-item tag label label-info noselect"
    });
    var $itemText = $('<span></span>', {
        text: text
    });
    var $removeButton = $('<a></a>');
    var $removeButtonIcon = $('<i class="remove glyphicon glyphicon-remove-sign glyphicon-white"></i>');
    $removeButton.append($removeButtonIcon);
    $removeButton.on('click', function () {
        $($itemContainerSpan).remove();
        for (var i = 0; i < itemArray.length; i++) {
            if (itemArray[i] == $itemContainerSpan) {
                itemArray.splice(i, 1);
                break;
            }
        }
    });
    $itemContainerSpan.append($itemText);
    $itemContainerSpan.append($removeButton);
    return $itemContainerSpan;
}

function createDataContainer() {
    var dataContainer = {};
    dataContainer["serial"] = generateUDID();
    data[dataContainer.serial] = [];
    dataContainer["data"] = data[dataContainer.serial];
    return dataContainer;
}

function updateContainerItems($container, items, $inputSpan, $input, $btnAddContainerItem) {
    var rowMaxWidth = $container.width();
    var widthItemSumInARow = 0;
    $container.empty();
    for (var i = 0; i < items.length; i++) {
        widthItemSumInARow += getElementWidth(items[i]);
        //popular linha
        while (i < items.length && widthItemSumInARow < (rowMaxWidth - (rowMaxWidth * 0.07))) {
            $container.append(items[i]);
            ++i;
            widthItemSumInARow += getElementWidth(items[i]);
        }
        if (i < items.length) {
            $container.append($('</br>'));
            $container.append($('</br>'));
            $container.append(items[i]);
        }
        widthItemSumInARow = 0;
    }
    $container.append($inputSpan);
    $input.on("keydown", {
        itemArray: items,
        newContainer: $container,
        inputSpan: $inputSpan,
    }, function (event) {
        var data = event.data;
        var itemArray = data.itemArray;
        var $newContainer = data.newContainer;
        var $inputSpan = data.inputSpan;
        if (event.keyCode == 13 && $(this).val().trim().length > 0) {
            //Create new item
            var $newItem = createContainerItem($(this).val().trim(), itemArray);
            //Add new item to array
            itemArray.push($newItem);
            //Update items in container
            updateContainerItems($newContainer, itemArray, $inputSpan, $(this), $btnAddContainerItem);
            //Clear text in input
            $(this).val("");
        }
        if ($(this).val().trim().length > 0) {
            if ($btnAddContainerItem.hasClass('disabled'))
                $btnAddContainerItem.toggleClass('disabled');
        } else {
            if (!$btnAddContainerItem.hasClass('disabled'))
                $btnAddContainerItem.toggleClass('disabled');
        }
    });
    $input.on("keyup", function (event) {
        if ($(this).val().trim().length > 0) {
            if ($btnAddContainerItem.hasClass('disabled'))
                $btnAddContainerItem.toggleClass('disabled');
        } else {
            if (!$btnAddContainerItem.hasClass('disabled'))
                $btnAddContainerItem.toggleClass('disabled');
        }
    });
}

function getElementWidth($element) {
    var el = $($element).clone(false)
    el.css("visibility", "hidden");
    el.css("position", "absolute");
    el.appendTo('body');
    var width = $(el).width();
    el.remove();
    return width;
}

function generateUDID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};