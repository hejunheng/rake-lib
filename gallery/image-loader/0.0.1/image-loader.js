/**
 * Request limited image loader
 */
define(function(require, exports, module) {
    var defaultOptions = {
        thread: 3
    }

    var ImageLoader = function(options) {
        var loader = this

        options = options || {}
        loader.threads = options.threads || defaultOptions.threads
        loader.queue = []

        loader.workers = (function() {
            var workers = []

            for(var i = 0; i < loader.threads; i++) {
                workers.push(new Image())
            }

            return workers
        })()
    }

    ImageLoader.task = function(task, cb) {
        var loader = this

        loader.queue.push({
            task: task,
            callback: cb
        })

        return loader
    }

    ImageLoader.process = function(task) {
        var loader = this
    }

    module.exports = ImageLoader
})