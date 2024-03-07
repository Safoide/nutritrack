import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

/**
 * 
 * @param {string} path 
 * @param {File} file 
 * @return {Promise}
 */
export async function uploadFile(path, file) {
    return uploadBytes(
        ref(storage, path), 
        file
    );
}

/**
 * 
 * 
 * @param {string} path 
 * @returns {Promise<string>}
 */
export async function getFileURL(path) {
    return getDownloadURL(ref(storage, path));
}