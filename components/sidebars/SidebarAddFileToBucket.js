import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

const STYLES_FOCUS = css`
  font-size: ${Constants.typescale.lvl1};
  font-family: ${Constants.font.medium};
  overflow-wrap: break-word;
  width: 100%;

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

const STYLES_SUBTEXT = css`
  margin-top: 8px;
  font-size: 12px;
`;

const STYLES_ITEM = css`
  margin-top: 16px;
`;

const STYLES_IMAGE_PREVIEW = css`
  display: block;
  width: 100%;
  margin-top: 48px;
`;

export default class SidebarAddFileToBucket extends React.Component {
  _handleUpload = async (e) => {
    e.persist();
    let file = e.target.files[0];

    if (!file) {
      alert("Something went wrong");
      return;
    }

    await this.props.onSetFile({ file });
  };

  render() {
    return (
      <React.Fragment>
        <System.P style={{ fontFamily: Constants.font.semiBold }}>
          Upload a file to Slate
        </System.P>
        <input
          css={STYLES_FILE_HIDDEN}
          type="file"
          id="file"
          onChange={this._handleUpload}
        />

        <System.ButtonPrimaryFull
          type="label"
          htmlFor="file"
          style={{ marginTop: 24 }}
          loading={this.props.fileLoading}
        >
          Add file
        </System.ButtonPrimaryFull>

        {!this.props.fileLoading ? (
          <System.ButtonSecondaryFull
            style={{ marginTop: 16 }}
            onClick={this.props.onCancel}
          >
            Cancel
          </System.ButtonSecondaryFull>
        ) : null}
      </React.Fragment>
    );
  }
}
