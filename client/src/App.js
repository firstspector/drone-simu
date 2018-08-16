import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { board: [1, 2, 3, 4, 5, 6, 7, 8, 0], size: 5, placed: false, face: 0 };
  }
  displaceDrone() {
    var size = this.state.size;
    let board = new Array(size * size);
    for (let i = 0; i < size * size; ++i) board[i] = "";
    this.updateBoard(board, size);
    this.setState({ placed: false });
  }
  updateBoard(board, size) {
    this.setState({ board: board });
  }
  render() {
    return (
      <div className="App">
        <h1>Drone Simulation</h1>
        <p>Click on the squares to place the drone</p>
        {
          this.state && this.state.board ? 
            <Board size={this.state.size} board={this.state.board} updateBoard={this.updateBoard.bind(this)}/>
            : null
        }
        <input type='submit' value='LEFT' onClick={this.rotateDrone.bind(this, "left")} />
        <input type='submit' value='RIGHT' onClick={this.rotateDrone.bind(this, "right")} />
        <input type='submit' value='MOVE' onClick={this.moveDrone.bind(this)} />
        <input type='submit' value='RESET' onClick={this.displaceDrone.bind(this)} />
      </div>
    );
  }
}

class Board extends React.Component {
  componentWillMount() {
    this.findClickables(this.props.board, this.props.size);
  }
  componentWillReceiveProps(nextProps) {
    this.findClickables(nextProps.board, nextProps.size);
  }
  shouldComponentUpdate(nextProps) {
    const curr = this.props.board.join('');
    const next = nextProps.board.join('');
    return curr !== next;
  }

  findClickables(board, size) {
    const zeroIndex = board.indexOf(0);
    const zeroCoordinate = this.getCoordFromIndex(zeroIndex, size);
    const possibleTopIdx = zeroCoordinate.row > 0 ? this.getIndexFromCoord(zeroCoordinate.row - 1, zeroCoordinate.column, size) : null;
    const possiblRightIdx = zeroCoordinate.column < size ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column + 1, size) : null;
    const possiblBottomIdx = zeroCoordinate.row < size ? this.getIndexFromCoord(zeroCoordinate.row + 1, zeroCoordinate.column, size) : null;
    const possibleLeftIdx = zeroCoordinate.column > 0 ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column - 1, size) : null;

    this.setState({ 
      zero: zeroIndex, 
      possibleTopIdx: possibleTopIdx, 
      possiblRightIdx: possiblRightIdx,
      possiblBottomIdx: possiblBottomIdx,
      possibleLeftIdx: possibleLeftIdx
    });
  }
  getCoordFromIndex(idx, size) {
    return {row: Math.floor(idx / size) + 1, column: (idx % size) + 1};
  }
  getIndexFromCoord(row, col, size) {
    return (size * (row - 1)) + col - 1; 
  }
  cellClickHandler(index) {
    if (index === this.state.possibleTopIdx || index === this.state.possiblRightIdx || 
        index === this.state.possiblBottomIdx || index === this.state.possibleLeftIdx) this.nextBoard(index);
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
    const cls = this.props.value === 0 ? 'square zero' : 'square';
    return (
      <span className={cls} onClick={() => this.props.clickHandler()}>{this.props.value}</span>
    );
  }
}

export default App;