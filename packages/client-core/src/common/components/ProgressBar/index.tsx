import React from 'react'
import styled from 'styled-components'

/**
 *
 * @author Robert Long
 */
const ProgressBarContainer = (styled as any).div`
  height: 5px;
  width: 400px;
  position: relative;
  border-radius: 4px;

  & > span {
    display: block;
    height: 100%;
    width: 52%;
    background-color: ${(props) => props.theme.pink};
    position: relative;
    overflow: hidden;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      overflow: hidden;
    }
  }

  & > span > span {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-size: 50px 50px;
    overflow: hidden;
  }

  @keyframes move {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 50px 50px;
    }
  }
`

type PropsType = {
  percentage: number
}

/**
 *
 * @author Robert Long
 * @returns
 */
export class ProgressBar extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props)
  }

  render() {
    return (
      <ProgressBarContainer>
        <span style={{ width: this.props.percentage + '%' }}>
          <span></span>
        </span>
      </ProgressBarContainer>
    )
  }
}

export default ProgressBar
