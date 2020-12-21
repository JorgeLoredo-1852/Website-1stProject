import jsonPlaceHolder from '../apis/jsonPlaceHolder';

export const fecthPosts = async () => {
    const response = await jsonPlaceHolder.get("/posts");
    return ({
        type: "FETCH_POSTS",
        payload: response
    });
}