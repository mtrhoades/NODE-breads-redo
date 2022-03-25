// INDEX PAGE VIEW ('/breads')

// Imports
const React = require('react');
const Default = require('./layouts/default'); // import default page for html boilerplate set-up.

// Stub function
function Index ( { breads, title } ) {
    return (
      <Default title={title}>
        <h2>Index Page</h2>
        <div className="newButton">
            <a href="/breads/new"><button>Add a new bread</button></a>
        </div>
        {/* <p>I have {breads[0].name} bread!</p> */}
        <ul>
            {
                breads.map((bread, index) => {
                    return (
                        <li key={index}>
                            <a href={`/breads/${index}`}>
                                {bread.name}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
      </Default>
    )
}


// Exports
module.exports = Index