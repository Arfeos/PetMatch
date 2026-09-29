export function openDialog(dialogId) {

    const dialog = document.querySelector(
        `#${dialogId}`
    );

    if (!dialog) {
        return;
    }

    dialog.showModal();
}


export function closeDialog(dialogId) {

    const dialog = document.querySelector(
        `#${dialogId}`
    );

    if (!dialog) {
        return;
    }

    dialog.close();
}


export function showMessage(
    title,
    message
) {

    const titleElement = document.querySelector(
        "#message-title"
    );

    const messageElement = document.querySelector(
        "#message-content"
    );


    titleElement.textContent = title;

    messageElement.textContent = message;


    openDialog("message-dialog");
}


export function setupDialogButtons() {

    const closeButtons = document.querySelectorAll(
        ".close-dialog"
    );


    closeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const dialogId =
                    button.dataset.dialog;

                closeDialog(dialogId);

            }
        );

    });
}