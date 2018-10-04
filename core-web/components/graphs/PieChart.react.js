/** @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactD3 from 'react-d3-components';



export interface PieChartProps {
  label: string;
  data: Array<{ label: string; value: number }>;
  width?: number;
  height?: number;
}

export interface PieChartState {
  width: number;
  height: number;
}

export default class PieChart extends React.Component<PieChartProps, PieChartState> {
  el: Element | null;
  width: number;
  height: number;

  constructor(props: PieChartProps) {
    super(props);
    this.state = { width: 400, height: 400 };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    this.resize();
  }

  resize() {
    let width = this.props.width || 400;
    let height = this.props.height || 400;

    if (this.el) {
      let wrapper: any = ReactDOM.findDOMNode(this.el);
      width = wrapper.offsetWidth;
      height = width;
    }

    this.setState({ width, height });
  }

  getData() {
    let values = this.props.data.map(item => {
      return { x: `${item.label} €${item.value}`, y: item.value };
    });

    return { label: this.props.label, values };
  }

  render() {
    return <ReactD3.PieChart ref={el => this.el = el} data={this.getData()} width={this.state.width}
      height={this.state.height} margin={{ top: 10, bottom: 10, left: 100, right: 100 }} sort={null} />;
  }
}
