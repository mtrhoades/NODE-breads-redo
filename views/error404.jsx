// Imports
const React = require('react');
const Default = require('./layouts/default'); // import default page 

// Stub Function
function error404 () {
    return (
        <Default>
            <h1>ERROR 404 NOT FOUND!</h1>
            <img src="/images/404cat.jpeg" alt="404"></img>
            <p>Turn the fuck!.. back around, your lost pal, 404 NOT FOUND</p>
        </Default>
    )
}

// Exports
module.exports = error404;