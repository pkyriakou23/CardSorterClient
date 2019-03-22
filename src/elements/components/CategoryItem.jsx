import React from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';

import {itemTypes} from '../../staticContent/dragConstants';
import CardItem from './CardItem.jsx';
import parseCards from '../../helpers/cardParser';

const categoryTarget = {
  drop(props, monitor) {
    const card = monitor.getItem();
    props.onCardDrop(card.id, card.position, props.id);
  },
};

/**
 *
 * @param {*} connect
 * @param {*} monitor
 * @return {*}
 */
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const CategoryItem = ({id, title, cards, onClick, showTitleBox,
  onCardDrop, onTitleClick, onTitleChange, onTitleFinish,
  descriptionID, connectDropTarget, isOver}) => {
  cards = parseCards(cards).cards;
  return connectDropTarget(
      <li className='category'>
        {
          showTitleBox &&
          <input type='text' defaultValue={title}
            onChange={(e)=>onTitleChange(e, id)}
            onKeyPress={(e)=>onTitleFinish(e)}
            onClick={(e)=>e.stopPropagation()}></input>
        }
        {
          !showTitleBox &&
          <h3 onClick={(e)=>onTitleClick(e, id)}>{title}</h3>
        }
        <ul>{
          cards.map((card) => (
            <CardItem key={card.id} id={card.id} title={card.title}
              description={card.description} minimized={true}
              position={id}
              onClick={(event) => onClick(event, card.id)}
              showDescription={card.id===descriptionID}/>
          ))
        }</ul>
      </li>
  );
};

CategoryItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DropTarget(itemTypes.CARD,
    categoryTarget, collect)(CategoryItem);
