// @flow
import styles from './ColorItemFooter.css';
import CSSModules from 'react-css-modules';
import type { ColorType } from '../../constants/FlowTypes';
import React from 'react';
import classNames from 'classnames';
import UIButton from '../../UILibrary/button/UIButton';
import { connect } from 'react-redux';
import { dislikeColor } from '../../redux/actions/dislikedColors';
import { likeColor } from '../../redux/actions/likedColors';
import likedColorsSelector from '../../redux/selectors/likedColorsSelector';
import ExportButton from '../Export/ExportButton';

type Props = {
  +isAtMaximum: boolean,
  +onLike: () => {},
  +onDislike: () => {},
  +color: ColorType,
  +isLastItem: boolean,
  +isAtMaximum: boolean,
  +active: boolean,
  +styles: Object,
};

class ColorItemFooter extends React.Component<Props> {
  static defaultProps = {
    isLastItem: false,
    isAtMaximum: false,
  }

  renderMessage() {
    const { isAtMaximum } = this.props;

    if (!isAtMaximum) {
      return null;
    }

    return <p styleName="message">Maximum of 5 colors</p>;
  }

  renderExportButton() {
    return <ExportButton />;
  }

  renderLikeButton() {
    const { onLike } = this.props;

    return (
      <UIButton use="positive" onClick={onLike}>
        Like
      </UIButton>
    );
  }

  renderSecondaryActionButton() {
    const { isAtMaximum } = this.props;

    if (isAtMaximum) {
      return this.renderExportButton();
    }

    return this.renderLikeButton();
  }

  renderPrimaryActionButton() {
    const { onDislike, styles } = this.props;

    return (
      <UIButton
        use="negative"
        className={styles['button-dislike']}
        onClick={onDislike}
      >
        Dislike
      </UIButton>
    );
  }

  render() {
    const { active } = this.props;
    const componentClass = classNames({
      active: active,
      inactive: !active,
    });

    return (
      <div styleName={componentClass}>
        {this.renderMessage()}
        <div styleName="buttons">
          {this.renderPrimaryActionButton()}
          {this.renderSecondaryActionButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAtMaximum: likedColorsSelector(state).length >= 5,
});

const mapDispatchToProps = (dispatch, { color }) => {
  return {
    onLike: () => dispatch(likeColor(color)),
    onDislike: () => dispatch(dislikeColor(color)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CSSModules(ColorItemFooter, styles)
);
