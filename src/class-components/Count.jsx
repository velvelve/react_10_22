import React from "react";

export class Count extends React.Component {
    state = {
        count: 1,
    }

    handleClick = () => {
        this.setState({ count: this.state.count + 1 })
    }


    render() {
        return <div>
            <p>Count: {this.state.count}</p>
            <p>Count props: {this.props.count}</p>
            <button type="button" onClick={this.handleClick}>Increase count</button>
        </div>
    }
}