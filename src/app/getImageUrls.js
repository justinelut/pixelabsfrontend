export const imageurl = (collectionId, id, filename) => {
    return process.env.NEXT_PUBLIC_API_FILES_URL + '/api/files/' + collectionId + '/' + id + '/' + filename
}