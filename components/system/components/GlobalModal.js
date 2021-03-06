import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { Boundary } from "~/components/system/components/fragments/Boundary";

const STYLES_BACKGROUND = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(45, 41, 38, 0.6);
  z-index: ${Constants.zindex.modal};
`;

const STYLES_MODAL = css`
  position: relative;
  padding: 8px;
  max-width: 568px;
  width: 100%;
  border-radius: 4px;
  background-color: ${Constants.system.white};
`;

const STYLES_CLOSE_ICON = css`
  height: 24px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;

export class GlobalModal extends React.Component {
  state = {
    modal: null,
  };

  componentDidMount = () => {
    window.addEventListener("create-modal", this._handleCreate);
    window.addEventListener("delete-modal", this._handleDelete);
  };

  componentWillUnmount = () => {
    window.removeEventListener("create-modal", this._handleCreate);
    window.removeEventListener("delete-modal", this._handleDelete);
  };

  _handleCreate = (e) => {
    this.setState({ modal: e.detail.modal });
  };

  _handleDelete = (e) => {
    this.setState({ modal: null });
  };

  render() {
    if (!this.state.modal) return null;
    return (
      <div css={STYLES_BACKGROUND} style={this.props.backgroundStyle}>
        <Boundary
          enabled
          onOutsideRectEvent={this._handleDelete}
          isDataMenuCaptured={true}
        >
          <div css={STYLES_MODAL} style={this.props.style}>
            {this.state.modal}
            <SVG.Dismiss css={STYLES_CLOSE_ICON} onClick={this._handleDelete} />
          </div>
        </Boundary>
      </div>
    );
  }
}
