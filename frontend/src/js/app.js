import {
    getAnimals,
    getShelters,
    getAdopters,
    getAdoptionInterests,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    deleteAnimalCascade,
    createAdopter,
    updateAdopter,
    deleteAdopter,
    deleteAdopterCascade,
    createShelter,
    updateShelter,
    deleteShelter,
    deleteShelterCascade,
    createAdoptionInterest,
    updateAdoptionInterest,
    deleteAdoptionInterest
} from "./api.js";


import {
    openDialog,
    closeDialog,
    showMessage,
    setupDialogButtons
} from "./dialogs.js";


let shelters = [];
let animals = [];
let adopters = [];
let selectedAnimalId = null;
let selectedAdopterId = null;
let selectedAdoptionInterestId = null;
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

const adopterList =
    document.querySelector("#adopter-list");

const adopterForm =
    document.querySelector("#adopter-form");

const editAdopterForm =
    document.querySelector("#edit-adopter-form");

const openCreateAdopterButton =
    document.querySelector("#open-create-adopter");

const confirmDeleteAdopterButton =
    document.querySelector("#confirm-delete-adopter");

const confirmCascadeDeleteAdopterButton =
    document.querySelector(
        "#confirm-cascade-delete-adopter"
    );
let selectedShelterId = null;

const shelterList =
    document.querySelector("#shelter-list");

const shelterForm =
    document.querySelector("#shelter-form");

const editShelterForm =
    document.querySelector("#edit-shelter-form");

const openCreateShelterButton =
    document.querySelector("#open-create-shelter");

const confirmDeleteShelterButton =
    document.querySelector("#confirm-delete-shelter");

const confirmCascadeDeleteShelterButton =
    document.querySelector(
        "#confirm-cascade-delete-shelter"
    );
    const adoptionInterestList =
    document.querySelector("#adoption-interest-list");

const adoptionInterestForm =
    document.querySelector("#adoption-interest-form");

const editAdoptionInterestForm =
    document.querySelector("#edit-adoption-interest-form");

const openCreateAdoptionInterestButton =
    document.querySelector("#open-create-adoption-interest");

const confirmDeleteAdoptionInterestButton =
    document.querySelector("#confirm-delete-adoption-interest");
loadData();

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
function populateAdoptionInterestSelects() {

    const createAdopterSelect =
        document.querySelector(
            "#adoption-interest-adopter"
        );

    const editAdopterSelect =
        document.querySelector(
            "#edit-adoption-interest-adopter"
        );

    const createAnimalSelect =
        document.querySelector(
            "#adoption-interest-animal"
        );

    const editAnimalSelect =
        document.querySelector(
            "#edit-adoption-interest-animal"
        );


    createAdopterSelect.innerHTML = `
        <option value="">
            Select an adopter
        </option>
    `;

    editAdopterSelect.innerHTML = `
        <option value="">
            Select an adopter
        </option>
    `;


    createAnimalSelect.innerHTML = `
        <option value="">
            Select an animal
        </option>
    `;

    editAnimalSelect.innerHTML = `
        <option value="">
            Select an animal
        </option>
    `;


    adopters.forEach(adopter => {

        const createOption =
            document.createElement("option");

        createOption.value = adopter.id;
        createOption.textContent = adopter.name;

        createAdopterSelect.appendChild(
            createOption
        );


        const editOption =
            document.createElement("option");

        editOption.value = adopter.id;
        editOption.textContent = adopter.name;

        editAdopterSelect.appendChild(
            editOption
        );

    });


    animals.forEach(animal => {

        const createOption =
            document.createElement("option");

        createOption.value = animal.id;
        createOption.textContent = animal.name;

        createAnimalSelect.appendChild(
            createOption
        );


        const editOption =
            document.createElement("option");

        editOption.value = animal.id;
        editOption.textContent = animal.name;

        editAnimalSelect.appendChild(
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
function getAnimalName(animalId) {
    const animal = animals.find(
        animal => animal.id === animalId
    );

    return animal
        ? animal.name
        : "Unknown animal";
}
function getAdopterName(adopterId) {
    const adopter = adopters.find(
        adopter => adopter.id === adopterId
    );

    return adopter
        ? adopter.name
        : "Unknown adopter";
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

const pageSections = document.querySelectorAll(
    ".page-section"
);

menuLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();

            const sectionId =
                link.dataset.section;

            pageSections.forEach(section => {

                section.classList.remove(
                    "active"
                );

            });

            const selectedSection =
                document.querySelector(
                    `#${sectionId}`
                );

            if (selectedSection) {

                selectedSection.classList.add(
                    "active"
                );

            }

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


async function loadData() {

    try {

        shelters = await getShelters();

        populateShelterSelects();

        await loadAnimals();

        await loadAdopters();

        await loadShelters();
        await loadAdoptionInterests();

    } catch (error) {

        console.error(error);

        showMessage(
            "Error",
            "Unable to load PetMatch data."
        );
    }
}
async function loadShelters() {

    try {

        shelters = await getShelters();

        populateShelterSelects();

        renderShelters(shelters);

    } catch (error) {

        console.error(error);

        showMessage(
            "Error",
            "Unable to load shelters."
        );
    }
}
async function loadAnimals() {

    try {

        animals = await getAnimals();

        renderAnimals(animals);

    } catch (error) {

        console.error(error);

        showMessage(
            "Error",
            "Unable to load animals."
        );
    }
}
async function loadAdopters() {

    try {

        adopters = await getAdopters();

        renderAdopters(adopters);

    } catch (error) {

        console.error(error);

        showMessage(
            "Error",
            "Unable to load adopters."
        );
    }
}

async function loadAdoptionInterests() {

    try {

        const adoptionInterests =
            await getAdoptionInterests();

        renderAdoptionInterests(
            adoptionInterests
        );

    } catch (error) {

        console.error(error);

        showMessage(
            "Error",
            "Unable to load adoption interests."
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
function renderAdopters(adopters) {

    adopterList.innerHTML = "";

    if (adopters.length === 0) {

        adopterList.innerHTML = `
            <p>
                There are no adopters registered yet.
            </p>
        `;

        return;
    }


    adopters.forEach(adopter => {

        const article =
            document.createElement("article");

        article.classList.add("card");


        article.innerHTML = `

            <header class="card-header">

                <h4>
                    ${adopter.name}
                </h4>

            </header>


            <dl>

                <div>
                    <dt>Email</dt>
                    <dd>${adopter.email}</dd>
                </div>

                <div>
                    <dt>Phone</dt>
                    <dd>${adopter.phone}</dd>
                </div>

            </dl>


            <footer class="card-actions">

                <button
                    type="button"
                    class="primary-button edit-adopter-button"
                    data-id="${adopter.id}"
                >
                    Edit
                </button>

                <button
                    type="button"
                    class="secondary-button delete-adopter-button"
                    data-id="${adopter.id}"
                >
                    Delete
                </button>

                <button
                    type="button"
                    class="danger-button cascade-adopter-button"
                    data-id="${adopter.id}"
                >
                    Delete cascade
                </button>

            </footer>
        `;


        adopterList.appendChild(article);

    });


    setupAdopterButtons();
}
function setupAdopterButtons() {

    const editButtons =
        document.querySelectorAll(
            ".edit-adopter-button"
        );

    const deleteButtons =
        document.querySelectorAll(
            ".delete-adopter-button"
        );

    const cascadeButtons =
        document.querySelectorAll(
            ".cascade-adopter-button"
        );


    editButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const adopterId =
                    Number(button.dataset.id);

                openEditAdopterDialog(
                    adopterId
                );

            }
        );

    });


    deleteButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedAdopterId =
                    button.dataset.id;

                openDialog(
                    "delete-adopter-dialog"
                );

            }
        );

    });


    cascadeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedAdopterId =
                    button.dataset.id;

                openDialog(
                    "cascade-delete-adopter-dialog"
                );

            }
        );

    });
}
async function openEditAdopterDialog(adopterId) {

    try {

        const adopters = await getAdopters();

        const adopter = adopters.find(
            adopter => adopter.id === adopterId
        );

        if (!adopter) {

            showMessage(
                "Error",
                "Adopter not found."
            );

            return;
        }

        selectedAdopterId = adopterId;

        document.querySelector(
            "#edit-adopter-name"
        ).value = adopter.name;

        document.querySelector(
            "#edit-adopter-email"
        ).value = adopter.email;

        document.querySelector(
            "#edit-adopter-phone"
        ).value = adopter.phone;

        openDialog(
            "edit-adopter-dialog"
        );

    } catch (error) {

        console.error(error);

        showMessage(
            "Error",
            "Unable to load the adopter."
        );
    }
}


editAdopterForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        if (!editAdopterForm.checkValidity()) {

            editAdopterForm.reportValidity();

            return;
        }

        const formData =
            new FormData(editAdopterForm);

        const adopterData = {

            name: formData.get("name"),

            email: formData.get("email"),

            phone: formData.get("phone")
        };

        try {

            await updateAdopter(
                selectedAdopterId,
                adopterData
            );

            closeDialog(
                "edit-adopter-dialog"
            );

            selectedAdopterId = null;

            await loadAdopters();

            showMessage(
                "Adopter updated",
                "The adopter has been successfully updated."
            );

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.detail ||
                "Unable to update the adopter.";

            closeDialog(
                "edit-adopter-dialog"
            );

            showMessage(
                "Error",
                message
            );
        }
    }
);


confirmDeleteAdopterButton.addEventListener(
    "click",
    async () => {

        if (!selectedAdopterId) {
            return;
        }

        try {

            await deleteAdopter(
                selectedAdopterId
            );

            closeDialog(
                "delete-adopter-dialog"
            );

            selectedAdopterId = null;

            await loadAdopters();

            showMessage(
                "Adopter deleted",
                "The adopter has been successfully deleted."
            );

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.detail ||
                "Unable to delete the adopter.";

            closeDialog(
                "delete-adopter-dialog"
            );

            showMessage(
                "Cannot delete adopter",
                message
            );
        }
    }
);


confirmCascadeDeleteAdopterButton.addEventListener(
    "click",
    async () => {

        if (!selectedAdopterId) {
            return;
        }

        try {

            await deleteAdopterCascade(
                selectedAdopterId
            );

            closeDialog(
                "cascade-delete-adopter-dialog"
            );

            selectedAdopterId = null;

            await loadAdopters();

            showMessage(
                "Adopter deleted",
                "The adopter and its adoption interests have been deleted."
            );

        } catch (error) {

            console.error(error);

            closeDialog(
                "cascade-delete-adopter-dialog"
            );

            showMessage(
                "Error",
                "Unable to delete the adopter in cascade."
            );
        }
    }
);
openCreateAdopterButton.addEventListener(
    "click",
    () => {

        openDialog(
            "create-adopter-dialog"
        );

    }
);
adopterForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        if (!adopterForm.checkValidity()) {

            adopterForm.reportValidity();

            return;
        }


        const formData =
            new FormData(adopterForm);


        const adopterData = {

            name: formData.get("name"),

            email: formData.get("email"),

            phone: formData.get("phone")

        };


        try {

            await createAdopter(
                adopterData
            );

            adopterForm.reset();

            closeDialog(
                "create-adopter-dialog"
            );

            await loadAdopters();

            showMessage(
                "Adopter added",
                "The adopter has been successfully registered."
            );

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.detail ||
                "Unable to create the adopter.";

            closeDialog(
                "create-adopter-dialog"
            );

            showMessage(
                "Error",
                message
            );
        }

    }
);
function renderShelters(shelters) {

    shelterList.innerHTML = "";

    if (shelters.length === 0) {

        shelterList.innerHTML = `
            <p>
                There are no shelters registered yet.
            </p>
        `;

        return;
    }


    shelters.forEach(shelter => {

        const article =
            document.createElement("article");

        article.classList.add("card");


        article.innerHTML = `

            <header class="card-header">

                <h4>
                    ${shelter.name}
                </h4>

            </header>


            <dl>

                <div>
                    <dt>City</dt>
                    <dd>${shelter.city}</dd>
                </div>

                <div>
                    <dt>Phone</dt>
                    <dd>${shelter.phone}</dd>
                </div>

            </dl>


            <footer class="card-actions">

                <button
                    type="button"
                    class="primary-button edit-shelter-button"
                    data-id="${shelter.id}"
                >
                    Edit
                </button>


                <button
                    type="button"
                    class="secondary-button delete-shelter-button"
                    data-id="${shelter.id}"
                >
                    Delete
                </button>


                <button
                    type="button"
                    class="danger-button cascade-shelter-button"
                    data-id="${shelter.id}"
                >
                    Delete cascade
                </button>

            </footer>
        `;


        shelterList.appendChild(article);

    });


    setupShelterButtons();
}
function setupShelterButtons() {

    const editButtons =
        document.querySelectorAll(
            ".edit-shelter-button"
        );

    const deleteButtons =
        document.querySelectorAll(
            ".delete-shelter-button"
        );

    const cascadeButtons =
        document.querySelectorAll(
            ".cascade-shelter-button"
        );


    editButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const shelterId =
                    Number(button.dataset.id);

                openEditShelterDialog(
                    shelterId
                );

            }
        );

    });


    deleteButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedShelterId =
                    button.dataset.id;

                openDialog(
                    "delete-shelter-dialog"
                );

            }
        );

    });


    cascadeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedShelterId =
                    button.dataset.id;

                openDialog(
                    "cascade-delete-shelter-dialog"
                );

            }
        );

    });
}
openCreateShelterButton.addEventListener(
    "click",
    () => {

        openDialog(
            "create-shelter-dialog"
        );

    }
);
shelterForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        if (!shelterForm.checkValidity()) {

            shelterForm.reportValidity();

            return;
        }


        const formData =
            new FormData(shelterForm);


        const shelterData = {

            name: formData.get("name"),

            city: formData.get("city"),

            phone: formData.get("phone")

        };


        try {

            await createShelter(
                shelterData
            );


            shelterForm.reset();


            closeDialog(
                "create-shelter-dialog"
            );


            await loadShelters();


            showMessage(
                "Shelter added",
                "The shelter has been successfully registered."
            );

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.detail ||
                "Unable to create the shelter.";

            closeDialog(
                "create-shelter-dialog"
            );

            showMessage(
                "Error",
                message
            );
        }

    }
);
async function openEditShelterDialog(
    shelterId
) {

    try {

        const shelters =
            await getShelters();

        const shelter =
            shelters.find(
                shelter =>
                    shelter.id === shelterId
            );


        if (!shelter) {

            showMessage(
                "Error",
                "Shelter not found."
            );

            return;
        }


        selectedShelterId =
            shelterId;


        document.querySelector(
            "#edit-shelter-name"
        ).value = shelter.name;


        document.querySelector(
            "#edit-shelter-city"
        ).value = shelter.city;


        document.querySelector(
            "#edit-shelter-phone"
        ).value = shelter.phone;


        openDialog(
            "edit-shelter-dialog"
        );

    } catch (error) {

        console.error(error);

        showMessage(
            "Error",
            "Unable to load the shelter."
        );
    }
}
editShelterForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        if (!editShelterForm.checkValidity()) {

            editShelterForm.reportValidity();

            return;
        }


        const formData =
            new FormData(editShelterForm);


        const shelterData = {

            name: formData.get("name"),

            city: formData.get("city"),

            phone: formData.get("phone")

        };


        try {

            await updateShelter(
                selectedShelterId,
                shelterData
            );


            closeDialog(
                "edit-shelter-dialog"
            );


            selectedShelterId = null;


            await loadShelters();


            showMessage(
                "Shelter updated",
                "The shelter has been successfully updated."
            );

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.detail ||
                "Unable to update the shelter.";

            closeDialog(
                "edit-shelter-dialog"
            );

            showMessage(
                "Error",
                message
            );
        }

    }
);
confirmDeleteShelterButton.addEventListener(
    "click",
    async () => {

        if (!selectedShelterId) {
            return;
        }


        try {

            await deleteShelter(
                selectedShelterId
            );


            closeDialog(
                "delete-shelter-dialog"
            );


            selectedShelterId = null;


            await loadShelters();


            showMessage(
                "Shelter deleted",
                "The shelter has been successfully deleted."
            );

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.detail ||
                "Unable to delete the shelter.";


            closeDialog(
                "delete-shelter-dialog"
            );


            showMessage(
                "Cannot delete shelter",
                message
            );
        }

    }
);
confirmCascadeDeleteShelterButton.addEventListener(
    "click",
    async () => {

        if (!selectedShelterId) {
            return;
        }


        try {

            await deleteShelterCascade(
                selectedShelterId
            );


            closeDialog(
                "cascade-delete-shelter-dialog"
            );


            selectedShelterId = null;


            await loadShelters();


            showMessage(
                "Shelter deleted",
                "The shelter and its animals have been deleted."
            );

        } catch (error) {

            console.error(error);


            closeDialog(
                "cascade-delete-shelter-dialog"
            );


            const message =
                error.response?.data?.detail ||
                "Unable to delete the shelter in cascade.";


            showMessage(
                "Error",
                message
            );
        }

    }
);
function renderAdoptionInterests(
    adoptionInterests
) {

    adoptionInterestList.innerHTML = "";


    if (adoptionInterests.length === 0) {

        adoptionInterestList.innerHTML = `
            <p>
                There are no adoption interests registered yet.
            </p>
        `;

        return;
    }


    adoptionInterests.forEach(
        adoptionInterest => {

            const article =
                document.createElement("article");

            article.classList.add("card");


            article.innerHTML = `

                <header class="card-header">

                    <h4>
                        Adoption interest
                    </h4>

                    <span class="card-badge">
                        ${adoptionInterest.status}
                    </span>

                </header>


                <dl>

                    <div>
                        <dt>Adopter</dt>
                        <dd>
                            ${getAdopterName(
                                adoptionInterest.adopter_id
                            )}
                        </dd>
                    </div>


                    <div>
                        <dt>Animal</dt>
                        <dd>
                            ${getAnimalName(
                                adoptionInterest.animal_id
                            )}
                        </dd>
                    </div>


                    <div>
                        <dt>Date</dt>
                        <dd>
                            ${adoptionInterest.date}
                        </dd>
                    </div>


                    <div>
                        <dt>Status</dt>
                        <dd>
                            ${adoptionInterest.status}
                        </dd>
                    </div>

                </dl>


                <footer class="card-actions">

                    <button
                        type="button"
                        class="primary-button edit-adoption-interest-button"
                        data-id="${adoptionInterest.id}"
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        class="secondary-button delete-adoption-interest-button"
                        data-id="${adoptionInterest.id}"
                    >
                        Delete
                    </button>

                </footer>
            `;


            adoptionInterestList.appendChild(
                article
            );

        }
    );


    setupAdoptionInterestButtons();
}
function setupAdoptionInterestButtons() {

    const editButtons =
        document.querySelectorAll(
            ".edit-adoption-interest-button"
        );

    const deleteButtons =
        document.querySelectorAll(
            ".delete-adoption-interest-button"
        );


    editButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const adoptionInterestId =
                    Number(button.dataset.id);

                openEditAdoptionInterestDialog(
                    adoptionInterestId
                );

            }
        );

    });


    deleteButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedAdoptionInterestId =
                    button.dataset.id;

                openDialog(
                    "delete-adoption-interest-dialog"
                );

            }
        );

    });
}
openCreateAdoptionInterestButton.addEventListener(
    "click",
    () => {

        populateAdoptionInterestSelects();

        openDialog(
            "create-adoption-interest-dialog"
        );

    }
);
adoptionInterestForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        if (!adoptionInterestForm.checkValidity()) {
            adoptionInterestForm.reportValidity();
            return;
        }

        const formData =
            new FormData(adoptionInterestForm);

        const adoptionInterestData = {
            adopter_id: Number(
                formData.get("adopter_id")
            ),
            animal_id: Number(
                formData.get("animal_id")
            ),
            date: formData.get("date"),
            status: formData.get("status")
        };

        try {

            await createAdoptionInterest(
                adoptionInterestData
            );

            adoptionInterestForm.reset();

            closeDialog(
                "create-adoption-interest-dialog"
            );

            await loadAdoptionInterests();

            showMessage(
                "Adoption interest added",
                "The adoption interest has been successfully registered."
            );

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.detail ||
                "Unable to create the adoption interest.";

            closeDialog(
                "create-adoption-interest-dialog"
            );

            showMessage(
                "Error",
                message
            );
        }
    }
);
confirmDeleteAdoptionInterestButton.addEventListener(
    "click",
    async () => {

        if (!selectedAdoptionInterestId) {
            return;
        }

        try {

            await deleteAdoptionInterest(
                selectedAdoptionInterestId
            );

            closeDialog(
                "delete-adoption-interest-dialog"
            );

            selectedAdoptionInterestId = null;

            await loadAdoptionInterests();

            showMessage(
                "Adoption interest deleted",
                "The adoption interest has been successfully deleted."
            );

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.detail ||
                "Unable to delete the adoption interest.";

            closeDialog(
                "delete-adoption-interest-dialog"
            );

            showMessage(
                "Error",
                message
            );
        }
    }
);
async function openEditAdoptionInterestDialog(
    adoptionInterestId
) {

    try {

        const adoptionInterests =
            await getAdoptionInterests();


        const adoptionInterest =
            adoptionInterests.find(
                adoptionInterest =>
                    adoptionInterest.id === adoptionInterestId
            );


        if (!adoptionInterest) {

            showMessage(
                "Error",
                "Adoption interest not found."
            );

            return;
        }


        selectedAdoptionInterestId =
            adoptionInterestId;


        populateAdoptionInterestSelects();


        document.querySelector(
            "#edit-adoption-interest-adopter"
        ).value =
            adoptionInterest.adopter_id;


        document.querySelector(
            "#edit-adoption-interest-animal"
        ).value =
            adoptionInterest.animal_id;


        document.querySelector(
            "#edit-adoption-interest-date"
        ).value =
            adoptionInterest.date;


        document.querySelector(
            "#edit-adoption-interest-status"
        ).value =
            adoptionInterest.status;


        openDialog(
            "edit-adoption-interest-dialog"
        );


    } catch (error) {

        console.error(error);

        showMessage(
            "Error",
            "Unable to load the adoption interest."
        );
    }
}
editAdoptionInterestForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        if (!editAdoptionInterestForm.checkValidity()) {

            editAdoptionInterestForm.reportValidity();

            return;
        }


        const formData =
            new FormData(
                editAdoptionInterestForm
            );


        const adoptionInterestData = {

            adopter_id: Number(
                formData.get("adopter_id")
            ),

            animal_id: Number(
                formData.get("animal_id")
            ),

            date: formData.get("date"),

            status: formData.get("status")

        };


        try {

            await updateAdoptionInterest(
                selectedAdoptionInterestId,
                adoptionInterestData
            );


            closeDialog(
                "edit-adoption-interest-dialog"
            );


            selectedAdoptionInterestId = null;


            await loadAdoptionInterests();


            showMessage(
                "Adoption interest updated",
                "The adoption interest has been successfully updated."
            );


        } catch (error) {

            console.error(error);


            const message =
                error.response?.data?.detail ||
                "Unable to update the adoption interest.";


            closeDialog(
                "edit-adoption-interest-dialog"
            );


            showMessage(
                "Error",
                message
            );
        }

    }
);
