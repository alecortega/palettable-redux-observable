import styles from './ColorList.css';
import CSSModules from 'react-css-modules';
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { requestPalette } from 'redux/actions/dataStatus';
import likedColorsSelector from 'redux/selectors/likedColorsSelector';
import ColorItem from 'components/ColorItem/ColorItem';

class ColorList extends React.Component {
  componentDidMount() {
    const { requestPalette } = this.props;

    requestPalette();
  }
  renderColors() {
    const { likedColors } = this.props;
    console.log(likedColors);
    return likedColors.map((hexCode, index) => {
      const isLastItem = likedColors.length - 1 === index;

      return (
        <ColorItem key={index} hexCode={hexCode} isLastItem={isLastItem} />
      );
    });
  }
  render() {
    return (
      <div styleName="color-list">
        {this.renderColors()}
      </div>
    );
  }
}

ColorList.propTypes = {
  likedColors: PropTypes.array.isRequired,
  requestPalette: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    likedColors: likedColorsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestPalette: () => dispatch(requestPalette()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CSSModules(ColorList, styles)
);
