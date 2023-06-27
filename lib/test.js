document.body.dataset.sl = "canvas-mq"

window.smartlook || (function (d) {
    var o = smartlook = function () { o.api.push(arguments) }, h = d.getElementsByTagName('head')[0];
    var c = d.createElement('script'); o.api = new Array(); c.async = true; c.type = 'text/javascript';
    c.charset = 'utf-8'; c.src = 'https://web-sdk.smartlook.com/recorder.js'; h.appendChild(c);
})(document);
smartlook('init', 'c1ec9e8153f915454a87e1a370115e53634837ba', { region: 'eu' });
