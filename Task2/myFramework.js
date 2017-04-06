/**
 * Base object constructor
 * @param selector
 */
var domEl = function(selector) {
    this.selector = selector;
    this.element = null;
};

domEl.prototype = {
    init: function() {
        this.element = document.querySelector(this.selector);
    },

    hide: function () {
        this.element.style.display = 'none';
    },

    show: function () {
        this.element.style.display = 'inherit';
    },

    bgcolor: function (color) {
        this.element.style.background = color;
    },

    size: function (width, height) {
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
    },

    click: function(callback) {
        this.element.addEventListener('click', callback, false);
    }
};

/**
* Assign initialization of new dom element to "fn"
 * @param {String} selector
 * @returns {Object} - new domEl object
*/
fn = function(selector) {
    var elem = new domEl(selector);
    elem.init();
    return elem;
};

