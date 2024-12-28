var cy = cytoscape({
    container: $('#cy'),
  
    style: [{
      selector: 'node',
      style: {
        'background-color': '#F5F5F5'
      }
    }, {
      selector: 'edge',
      style: {
        'width': 5,
        'line-color': '#F5F5F5',
        'curve-style': 'haystack'
      }
    }]
  
  });
  
  var counter = 0;
  
  function Node(parent, t) {
    this.parent = parent;
    this.t = t;
    this.active = false;
    this.id = counter;
    counter++;
  }
  
  var n0 = new Node(null, 1);
  
  cy.add([{
    group: "nodes",
    data: {
      id: n0.id
    }
  }]);
  
  AddLayer(n0, 0, 5);
  
  function AddLayer(parent, currentLayer, maxLayers) {
    if (currentLayer < maxLayers) {
      currentLayer++;
      for (var j = 0; j < Math.ceil(3); j++) {
        var n = new Node(parent, 1);
        cy.add([{
          group: "nodes",
          data: {
            id: n.id,
          }
        }]);
        cy.add([{
          group: "edges",
          data: {
            id: parent.id + "-" + n.id,
            source: parent.id,
            target: n.id
          }
        }]);
        AddLayer(n, currentLayer, maxLayers)
      }
    }
  }
  
  cy.layout({
    name: 'cose'
  });
  
  cy.on('tap', function(event) {
    var evtTarget = event.cyTarget;
    if (evtTarget != cy) {
  
      var a = evtTarget.animation({
        style: {
          'background-color': '#2196F3',
          'line-color': '#2196F3'
        },
        duration: 300
      });
  
      var nodes = evtTarget.incomers();
  
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] != evtTarget) {
          nodes[i].emit('tap');
        }
      }
      a.play().promise('completed').then(function(evtTarget) {
        a.reverse();
        a.play();
      });
    }
  });
  
  window.setInterval(function() {
    var a = Math.ceil(Math.random() * counter);
    cy.$('#' + a).emit('tap');
  }, 100);