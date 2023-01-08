import React, { useEffect, useState } from "react"

export default class Bu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          bus: this.props.values,
        };
    }   

    render() {
        return (
            <div>
                {this.state.bus.length > 0 && (
                <select onChange={this.props.handleOnChange}>
                    <option selected value="select">Please Select Business Unit</option>
                    {this.state.bus.map(bu => (
                      <option key={bu} value={bu}>{bu}</option>
                    ))}
                </select>
                )}
            </div>
        );
      }

}