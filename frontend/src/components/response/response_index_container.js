import { createResponse, fetchResponses } from '../../actions/stories_actions';
import { connect } from 'react-redux';
import ResponseIndex from './response_index';
import { selectResponsesArray } from '../../reducers/selectors';

const mapStateToProps = state => {
    // fetch all responses based on storyId
    const responses = selectResponsesArray(state.entities.responses)

    return {
        responses
    };
}
const mapDispatchToProps = (dispatch) => ({
    action: (storyId, response) => dispatch(createResponse(storyId, response)),
    fetchResponses: storyId => dispatch(fetchResponses(storyId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponseIndex);