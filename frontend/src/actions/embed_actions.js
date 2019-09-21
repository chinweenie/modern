import { getEmbedData } from '../util/embed_util';

export const RECEIVE_EMBED = "RECEIVE_EMBED";
export const RECEIVE_EMBED_ERRORS = "RECEIVE_EMBED_ERRORS";

export const receiveEmbed = embed => ({
    type: RECEIVE_EMBED,
    embed
});

export const receiveEmbedErrors = errors => ({
    type: RECEIVE_EMBED_ERRORS,
    errors
});

export const getEmbedDocumentByURL = URL => dispatch => {
    return getEmbedData(URL).then(response => {
        return dispatch(receiveEmbed(response.data))
    }, error => {
        dispatch(receiveEmbedErrors(error.response.data));
    });
};