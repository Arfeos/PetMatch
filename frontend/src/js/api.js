import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export async function getAnimals() {
    const response = await axios.get(
        `${API_URL}/animals/`
    );

    return response.data;
}

export async function getShelters() {
    const response = await axios.get(
        `${API_URL}/shelters/`
    );

    return response.data;
}

export async function getAdopters() {

    const response = await axios.get(
        `${API_URL}/adopters/`
    );

    return response.data;
}

export async function createAnimal(animalData) {
    const response = await axios.post(
        `${API_URL}/animals/`,
        animalData
    );

    return response.data;
}
export async function createAdopter(adopterData) {

    const response = await axios.post(
        `${API_URL}/adopters/`,
        adopterData
    );

    return response.data;
}
export async function updateAnimal(
    animalId,
    animalData
) {
    const response = await axios.put(
        `${API_URL}/animals/${animalId}`,
        animalData
    );

    return response.data;
}
export async function updateAdopter(
    adopterId,
    adopterData
) {

    const response = await axios.put(
        `${API_URL}/adopters/${adopterId}`,
        adopterData
    );

    return response.data;
}
export async function deleteAnimal(animalId) {
    return await axios.delete(
        `${API_URL}/animals/${animalId}`
    );
}

export async function deleteAnimalCascade(animalId) {
    return await axios.delete(
        `${API_URL}/animals/${animalId}/cascade`
    );
}
export async function deleteAdopter(adopterId) {

    return await axios.delete(
        `${API_URL}/adopters/${adopterId}`
    );
}
export async function deleteAdopterCascade(
    adopterId
) {

    return await axios.delete(
        `${API_URL}/adopters/${adopterId}/cascade`
    );
}