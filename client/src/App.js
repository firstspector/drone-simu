import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { size: 5, placed: false, face: 0 };
  }
  componentDidMount() {
    fetch('/drone')
      .then(res => res.json())
      .then(drone => this.setState({board: drone.position}));
  }
  displaceDrone() {
    fetch('/drone?act=displace')
      .then(res => res.json())
      .then(drone => this.updateBoard(drone.position))
    this.setState({ placed: false });
  }
  updateBoard(board) {
    this.setState({ board: board });
  }
  render() {
    return (
      <div className="App">
        <h1>Drone Simulation</h1>
        <p>Click on the squares to place the drone</p>
        {
          this.state && this.state.board ? 
            <Board size={this.state.size} board={this.state.board} placed={this.state.placed} updateBoard={this.updateBoard.bind(this)}/>
            : null
        }
        {/* <input type='submit' value='LEFT' onClick={this.rotateDrone.bind(this, "left")} /> */}
        {/* <input type='submit' value='RIGHT' onClick={this.rotateDrone.bind(this, "right")} /> */}
        {/* <input type='submit' value='MOVE' onClick={this.moveDrone.bind(this)} /> */}
        <input type='submit' value='RESET' onClick={this.displaceDrone.bind(this)} />
      </div>
    );
  }
}

class Board extends React.Component {
  // componentWillMount() {
  //   this.findClickables(this.props.placed);
  // }
  // shouldComponentUpdate() {
  //   return this.findClickables(this.props.placed);
  // }
  // findClickables(placed) {
  //   const zero = 0;
  //   const zeroIndex = 0;
  //   const possibleTopIdx = 0;
  //   const possiblRightIdx = 0;
  //   const possiblBottomIdx = 0;
  //   const possibleLeftIdx = 0;

  //   this.setState({ 
  //     zero: zeroIndex, 
  //     possibleTopIdx: possibleTopIdx, 
  //     possiblRightIdx: possiblRightIdx,
  //     possiblBottomIdx: possiblBottomIdx,
  //     possibleLeftIdx: possibleLeftIdx
  //   });
  //   return !placed;
  // }
  // findClickables(placed) {
  //   const zeroIndex = board.indexOf(0);
  //   const zeroCoordinate = this.getCoordFromIndex(zeroIndex, size);
  //   const possibleTopIdx = zeroCoordinate.row > 0 ? this.getIndexFromCoord(zeroCoordinate.row - 1, zeroCoordinate.column, size) : null;
  //   const possiblRightIdx = zeroCoordinate.column < size ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column + 1, size) : null;
  //   const possiblBottomIdx = zeroCoordinate.row < size ? this.getIndexFromCoord(zeroCoordinate.row + 1, zeroCoordinate.column, size) : null;
  //   const possibleLeftIdx = zeroCoordinate.column > 0 ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column - 1, size) : null;

    // this.setState({ 
    //   zero: zeroIndex, 
    //   possibleTopIdx: possibleTopIdx, 
    //   possiblRightIdx: possiblRightIdx,
    //   possiblBottomIdx: possiblBottomIdx,
    //   possibleLeftIdx: possibleLeftIdx
    // });
  // }
  getCoordFromIndex(idx, size) {
    return {row: Math.floor(idx / size) + 1, column: (idx % size) + 1};
  }
  getIndexFromCoord(row, col, size) {
    return (size * (row - 1)) + col - 1; 
  }
  cellClickHandler(index) {
    console.log(index);
  }
  nextBoard(index, direction) {
    const board = this.props.board.slice();
    const temp = board[index];
    board[index] = board[this.state.zero];
    board[this.state.zero] = temp;
    this.props.updateBoard(board);
  }
  render() {
    const squares = this.props.board.map((val, index) => {
      if ((index + 1) % this.props.size === 0) {
        return (
          <span>
            {<Cell value={val} clickHandler={this.cellClickHandler.bind(this, index)} />}
            <br />
          </span>
        );
      }
      return <Cell value={val} clickHandler={this.cellClickHandler.bind(this, index)} />;
    });
    return (
      <div className='board'> 
        {squares}
      </div>
    );
  }
}

class Cell extends React.Component {
  render() {
    const cls = this.props.value === 1 ? 'square zero' : 'square';
    const text = this.props.value === 1 ? 'x':'.';
    return (
      <span className={cls} onClick={() => this.props.clickHandler()}>{text}</span>
    );
  }
}

export default App;