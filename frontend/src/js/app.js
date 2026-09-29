import {
    getAnimals,
    getShelters,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    deleteAnimalCascade
} from "./api.js";


import {
    openDialog,
    closeDialog,
    showMessage,
    setupDialogButtons
} from "./dialogs.js";


let shelters = [];

let selectedAnimalId = null;

const animalList = document.querySelector(
    "#animal-list"
);

const animalForm = document.querySelector(
    "#animal-form"
);


const openCreateAnimalButton =
    document.querySelector(
        "#open-create-animal"
    );


const confirmDeleteButton =
    document.querySelector(
        "#confirm-delete"
    );


const confirmCascadeDeleteButton =
    document.querySelector(
        "#confirm-cascade-delete"
    );

const editAnimalForm =
    document.querySelector(
        "#edit-animal-form"
    );

const menuToggle = document.querySelector(
    "#menu-toggle"
);

const mainMenu = document.querySelector(
    "#main-menu"
);



setupDialogButtons();

function populateShelterSelects() {

    const createSelect =
        document.querySelector(
            "#animal-shelter"
        );

    const editSelect =
        document.querySelector(
            "#edit-animal-shelter"
        );

    createSelect.innerHTML = `
        <option value="">
            Select a shelter
        </option>
    `;

    editSelect.innerHTML = `
        <option value="">
            Select a shelter
        </option>
    `;

    shelters.forEach(shelter => {

        const createOption =
            document.createElement("option");

        createOption.value = shelter.id;
        createOption.textContent =
            shelter.name;

        createSelect.appendChild(
            createOption
        );


        const editOption =
            document.createElement("option");

        editOption.value = shelter.id;
        editOption.textContent =
            shelter.name;

        editSelect.appendChild(
            editOption
        );

    });
}
function getShelterName(shelterId) {

    const shelter = shelters.find(
        shelter => shelter.id === shelterId
    );

    return shelter
        ? shelter.name
        : "Unknown shelter";
}
openCreateAnimalButton.addEventListener(
    "click",
    () => {

        openDialog(
            "create-animal-dialog"
        );

    }
);
menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            mainMenu.classList.toggle(
                "menu-open"
            );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );
    }
);
const menuLinks = document.querySelectorAll(
    "#main-menu a"
);

menuLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            mainMenu.classList.remove(
                "menu-open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    );

});
loadData();



async function loadAnimals() {

    try {

        const animals = await getAnimals();

        renderAnimals(animals);

    } catch (error) {

        console.error(error);

        showMessage(
            "Error",
            "Unable to load animals."
        );
    }
}

async function loadData() {

    try {

        shelters = await getShelters();

        populateShelterSelects();

        const animals = await getAnimals();

        renderAnimals(animals);

    } catch (error) {

        console.error(error);

        showMessage(
            "Error",
            "Unable to load PetMatch data."
        );
    }
}


function renderAnimals(animals) {

    animalList.innerHTML = "";


    if (animals.length === 0) {

        animalList.innerHTML = `
            <p>
                There are no animals registered yet.
            </p>
        `;

        return;
    }


    animals.forEach(animal => {

        const article =
            document.createElement("article");


        article.classList.add(
            "card"
        );


        article.innerHTML = `
    <header class="card-header">

        <h4>
            ${animal.name}
        </h4>

        <span class="card-badge">
            ${animal.species}
        </span>

    </header>

    <dl>

        <div>
            <dt>Breed</dt>
            <dd>${animal.breed}</dd>
        </div>

        <div>
            <dt>Age</dt>
            <dd>${animal.age}</dd>
        </div>

        <div>
            <dt>Shelter</dt>
            <dd>${getShelterName(
            animal.shelter_id
        )}</dd>
        </div>

        <div>
            <dt>Status</dt>
            <dd>
                ${animal.adopted
                ? "Adopted"
                : "Available"
            }
            </dd>
        </div>

    </dl>

    <footer class="card-actions">

        <button
            type="button"
            class="primary-button edit-button"
            data-id="${animal.id}"
        >
            Edit
        </button>

        <button
            type="button"
            class="secondary-button delete-button"
            data-id="${animal.id}"
        >
            Delete
        </button>

        <button
            type="button"
            class="danger-button cascade-button"
            data-id="${animal.id}"
        >
            Delete cascade
        </button>

    </footer>
`;


        animalList.appendChild(
            article
        );

    });


    setupAnimalButtons();
}





function setupAnimalButtons() {

    const deleteButtons =
        document.querySelectorAll(
            ".delete-button"
        );


    const cascadeButtons =
        document.querySelectorAll(
            ".cascade-button"
        );
    const editButtons =
        document.querySelectorAll(
            ".edit-button"
        );

    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {

            selectedAnimalId = button.dataset.id;

            openDialog("delete-dialog");
        });
    });


    cascadeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedAnimalId =
                    button.dataset.id;

                openDialog(
                    "cascade-delete-dialog"
                );

            }
        );

    });
    editButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const animalId =
                Number(button.dataset.id);

            openEditAnimalDialog(
                animalId
            );

        }
    );

});
}




confirmDeleteButton.addEventListener(
    "click",
    async () => {

        if (!selectedAnimalId) {
            return;
        }

        try {
            await deleteAnimal(selectedAnimalId);

            closeDialog("delete-dialog");

            selectedAnimalId = null;

            await loadAnimals();

            showMessage(
                "Animal deleted",
                "The animal has been successfully deleted."
            );

        } catch (error) {

            console.error(error);

            closeDialog("delete-dialog");

            const message =
                error.response?.data?.detail ||
                "Unable to delete the animal.";

            showMessage(
                "Cannot delete animal",
                message
            );
        }
    }
);




confirmCascadeDeleteButton.addEventListener(
    "click",
    async () => {

        if (!selectedAnimalId) {
            return;
        }


        try {

            await deleteAnimalCascade(
                selectedAnimalId
            );


            closeDialog(
                "cascade-delete-dialog"
            );


            selectedAnimalId = null;


            await loadAnimals();


            showMessage(
                "Animal deleted",
                "The animal and its adoption interests have been deleted."
            );

        } catch (error) {

            console.error(error);


            closeDialog(
                "cascade-delete-dialog"
            );


            showMessage(
                "Error",
                "Unable to delete the animal in cascade."
            );
        }

    }
);



animalForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        if (!animalForm.checkValidity()) {

            animalForm.reportValidity();

            return;
        }


        const formData =
            new FormData(animalForm);


        const animalData = {

            name: formData.get(
                "name"
            ),

            species: formData.get(
                "species"
            ),

            breed: formData.get(
                "breed"
            ),

            age: Number(
                formData.get("age")
            ),

            adopted: false,

            shelter_id: Number(
                formData.get("shelter_id")
            )
        };


        try {

            await createAnimal(
                animalData
            );


            animalForm.reset();


            closeDialog(
                "create-animal-dialog"
            );


            await loadAnimals();


            showMessage(
                "Animal added",
                "The animal has been successfully registered."
            );

        } catch (error) {

            console.error(error);


            if (
                error.response?.status === 404
            ) {

                showMessage(
                    "Shelter not found",
                    "The shelter you selected does not exist."
                );

            } else if (
                error.response?.status === 422
            ) {

                showMessage(
                    "Invalid data",
                    "Please check the information entered."
                );

            } else {

                showMessage(
                    "Error",
                    "Unable to create the animal."
                );
            }

        }

    }
);

async function openEditAnimalDialog(
    animalId
) {

    try {

        const animals = await getAnimals();

        const animal = animals.find(
            animal =>
                animal.id === animalId
        );

        if (!animal) {

            showMessage(
                "Error",
                "Animal not found."
            );

            return;
        }

        selectedAnimalId = animalId;

        document.querySelector(
            "#edit-animal-name"
        ).value = animal.name;

        document.querySelector(
            "#edit-animal-species"
        ).value = animal.species;

        document.querySelector(
            "#edit-animal-breed"
        ).value = animal.breed;

        document.querySelector(
            "#edit-animal-age"
        ).value = animal.age;

        document.querySelector(
            "#edit-animal-shelter"
        ).value = animal.shelter_id;

        document.querySelector(
            "#edit-animal-adopted"
        ).value =
            String(animal.adopted);

        openDialog(
            "edit-animal-dialog"
        );

    } catch (error) {

        console.error(error);

        showMessage(
            "Error",
            "Unable to load the animal."
        );
    }
}
editAnimalForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        if (!editAnimalForm.checkValidity()) {
            editAnimalForm.reportValidity();
            return;
        }

        const formData =
            new FormData(editAnimalForm);

        const animalData = {

            name: formData.get("name"),

            species: formData.get(
                "species"
            ),

            breed: formData.get(
                "breed"
            ),

            age: Number(
                formData.get("age")
            ),

            adopted:
                formData.get(
                    "adopted"
                ) === "true",

            shelter_id: Number(
                formData.get(
                    "shelter_id"
                )
            )
        };

        try {

            await updateAnimal(
                selectedAnimalId,
                animalData
            );

            closeDialog(
                "edit-animal-dialog"
            );

            selectedAnimalId = null;

            await loadAnimals();

            showMessage(
                "Animal updated",
                "The animal has been successfully updated."
            );

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.detail ||
                "Unable to update the animal.";

            closeDialog(
                "edit-animal-dialog"
            );

            showMessage(
                "Error",
                message
            );
        }
    }
);