define("gallery/image-loader/0.0.1/image-loader",[],function(e,r,a){var t={thread:3},n=function(e){var r=this;e=e||{},r.threads=e.threads||t.threads,r.queue=[],r.workers=function(){for(var e=[],a=0;a<r.threads;a++)e.push(new Image);return e}()};n.task=function(e,r){var a=this;return a.queue.push({task:e,callback:r}),a},n.process=function(){},a.exports=n});