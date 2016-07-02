var RenderTree = React.createClass({

  numberOfElementsInRow: function(row) {
    return Math.pow(2, row)
  },

  numberOfRowsInArray: function(arrayLength) {
    var result = 0;
    
    while (arrayLength > 0) {
      var numElements = this.numberOfElementsInRow(result);
      arrayLength -= numElements;
      result += 1;
    }

    return result;
  },

  render: function() {
    var treeArray = this.props.treeArray.slice(0)
    var result = [];
    var row = 0;
    var numberOfRows = this.numberOfRowsInArray(this.props.treeArray.length);

    while (treeArray.length > 0) {
      var numElements = this.numberOfElementsInRow(row);
      var rowHtml = [];
      for (var i=0; i<numElements; i++) {
        rowHtml.push(<span className="node-holder">{treeArray.shift()}</span>);
      }
      result.push(<div className="row-holder">{rowHtml}</div>);
      row += 1;
    }

    return (
      <div className="tree-holder">
        { result }
      </div>
    );
  }
});

var Tree = React.createClass({
  getInitialState: function() {
    var myState;
    var storedData = sessionStorage.getItem( 'data' );

    if (storedData == null) {
      myState = {
        tree: [],
        newNodeValue: null
      };
    } else  {
      myState = JSON.parse(storedData);
    }

    return myState;
  },

  handleChange: function(event) {
    this.setState({newNodeValue: event.target.value});
  },

  addToTree: function(e) {
    e.preventDefault();

    var tree = this.state.tree;
    tree.push(Number(this.state.newNodeValue));
    this.setState({tree: tree});

    this.setState({newNodeValue: null});
  },

  clearTree: function() {
    this.setState({tree: []});
  },

  componentDidUpdate: function() {
    sessionStorage.setItem( 'data', JSON.stringify(this.state) );
  },

  render: function() {
    return (
      <div>
        Add to tree:
        <br/>
        <form onSubmit={this.addToTree}>
          <input className="integer-input" type="number" min="0" max="99999" step="1" value={this.state.newNodeValue} onChange={this.handleChange} placeholder="Enter integer"/>
          &nbsp;&nbsp;&nbsp;
          <button type="submit">Add</button>
        </form>
        <br/>

        Tree in array form:
        <br/>
        { JSON.stringify(this.state.tree) }
        &nbsp;&nbsp;&nbsp;
        <button onClick={this.clearTree}>Clear tree</button>
        <br/><br/>

        Tree in visual form:
        <RenderTree treeArray={this.state.tree}/>
      </div>
    );
  }
});

React.render(<Tree/>, document.body);