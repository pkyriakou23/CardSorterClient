// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import StudyMenu from '../components/studyPageElements/StudyMenu.jsx';
// eslint-disable-next-line no-unused-vars
import DataTable from '../components/studyPageElements/DataTable.jsx';
// eslint-disable-next-line no-unused-vars
import BarGraph from '../components/studyPageElements/BarGraph.jsx';
// eslint-disable-next-line no-unused-vars
import NoParticipants from './studyPageElements/NoParticipants.jsx';
// eslint-disable-next-line no-unused-vars
import SimilarityMatrix from './studyPageElements/SimilarityMatrix.jsx';
// eslint-disable-next-line no-unused-vars
import Dendrogram from './studyPageElements/Dendrogram.jsx';
import L from '../../localization/LocalizedText';

/**
 *
 */
class Study extends Component {
  /**
   *
   */
  componentDidMount() {
    this.props.loadStudy();
    this.props.loadClusters();
  }

  /**
   *
   * @return {ReactDOM}
   */
  render() {
    const {isFetching, title, isLive, launched, menuValues,
      menuDispatch, graphValues, tableValues, shareUrl,
      clustersPage, noParticipants, similarityPage, copyUrl,
      similarityMatrix, similarityHover, selectedCards,
      clusters, clustersFetching} = this.props;

    if (isFetching || isFetching === undefined) {
      return <p>Loading...</p>;
    }

    let content;
    if (noParticipants) {
      content = <NoParticipants shareUrl={shareUrl} copyUrl={copyUrl}/>;
    } else {
      content = (
        <>
        <StudyMenu selectedNo={menuValues.selectedNo} onClicks=
          {menuDispatch.onClicks}/>
        {
          clustersPage &&
          <Dendrogram data={clusters} fetcing={clustersFetching}/>
        }
        {
          similarityPage &&
          <SimilarityMatrix data={similarityMatrix} onHover={similarityHover}
            selected={selectedCards}/>
        }
        {
          !(similarityPage || clustersPage) &&
            <div className="content">
              <BarGraph percentage={graphValues.percentage}
                sub={graphValues.sub}
                total={graphValues.total} entity={graphValues.entity}
                title={graphValues.title} action={graphValues.action}/>
              <DataTable headers={tableValues.headers} data={tableValues.data}/>
            </div>
        }
        </>
      );
    }

    return (
      <div className="study-page">
        {/* Header */}
        <span className="header">
          <h1>{title}</h1>
          <button className="edit unfunctional"></button>
        </span>
        <span className="active">
          {
            isLive &&
            <div className="active-container">
              <span className='activeSquare isLive'></span>
              <p>{L.text.active}</p>
            </div>
          }
          {
            !isLive &&
            <div className="active-container">
              <span className='activeSquare notLive'></span>
              <p>{L.text.inactive}</p>
            </div>
          }
          <h2 className="date">{L.text.launchedOn} {launched.getDate()} {
            launched.getMonth()} {launched.getFullYear()}</h2>
        </span>
        {/* Content */}
        {content}
      </div>
    );
  };
}

Study.propTypes = {
  loadStudy: PropTypes.func.isRequired,
  loadClusters: PropTypes.func.isRequired,
  title: PropTypes.string,
  isLive: PropTypes.bool,
  launched: PropTypes.objectOf(Date),
  menuValues: PropTypes.object.isRequired,
  menuDispatch: PropTypes.object.isRequired,
  graphValues: PropTypes.object.isRequired,
  tableValues: PropTypes.object.isRequired,
  clustersPage: PropTypes.bool,
  clusters: PropTypes.object,
  clustersFetching: PropTypes.bool,
};

export default Study;
