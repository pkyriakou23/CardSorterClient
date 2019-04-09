import {connect} from 'react-redux';

import CreateStudy from './CreateStudy.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    page: parseInt(ownProps.match.params.page),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const CreateStudyContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateStudy);

export default CreateStudyContainer;
