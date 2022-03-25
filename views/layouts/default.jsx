// HTML BOILER PLATE - default FOR ALL VIEWS PAGES

// IMPORTS
const React = require('react'); // import react

// STUB FUNCTION (for the html rendered when viewed.)
function Default(html) {
  return (
    <html>
    <head>
      <title>{html.title || 'breadCRUD'}</title>
    </head>
    <body>
      <h1>HTML Rendered!</h1>
      <div className="container">
        {html.children}
      </div>
    </body>
    </html>
  )
}


// EXPORTS
module.exports = Default