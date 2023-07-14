$(document).ready(function () {
    // Enable drag and drop of text files
    let DropfileContent = $('.DropfileContent')[0];
    $(DropfileContent).on('dragover', handleDragOver);
    $(DropfileContent).on('drop', handleFileSelect);

    function handleFiles(files) {
        if (files) {
            for (const element of files) {
                let file = element;
                let reader = new FileReader();

                reader.onload = (function (file) {
                    return function (e) {
                        let contents = e.target.result;
                        let title = file.name + ':\n';
                        let msg = "'''\n" + contents + "\n'''\n\n";
                        $('.DropfileContent').val(function (_, currentValue) {
                            return currentValue + title + msg;
                        });
                    };
                })(file);
                reader.readAsText(file);
            }
        }
    }

    function handleDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
        event.originalEvent.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy operation.
    }

    function handleFileSelect(event) {
        event.stopPropagation();
        event.preventDefault();
        handleFiles(event.originalEvent.dataTransfer.files);
    }
});