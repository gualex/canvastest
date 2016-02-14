/**
 * Created by gualex on 15.02.16.
 */

var Preloader = function () {
    this.useCanvasStore = false;
    this.fakeTextures = 0;
};

_.extend(Preloader.prototype, {
    preloadImage: function (imageDictionary, afterPreloadCallback) {
        var keys = _.keys(imageDictionary);

        if (keys.length === 0) {
            afterPreloadCallback();
            return;
        }

        var finishFunc = _.after(keys.length, afterPreloadCallback);
        var self = this;
        _.each(keys, function (url) {
            var $img = $('<img>');
            $img
                .load(function () {
                    if (self.imageSource === 1 || self.imageSource === 2) {
                        reImage = self.imageSource === 2;
                        if (self.fakeTextures > 0) {
                            for (var i = 0; i < self.fakeTextures; i++) {
                                imageDictionary[url + '_' + i] = getCanvasForImage($img.get(0), i, reImage);
                            }
                        } else {
                            imageDictionary[url] = getCanvasForImage($img.get(0), undefined, reImage);
                        }
                    } else {
                        imageDictionary[url] = $img.get(0);
                    }
                    finishFunc();
                })
                .error(function () {
                    throw new Error('Can\'t load image' + url);
                })
                .attr('src', url);
        });

        function getCanvasForImage(img, fakeIndex, reImage) {
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', img.width);
            canvas.setAttribute('height', img.height);
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);

            if (fakeIndex !== undefined) {
                context.font = "30px serif";
                for (var i = 0; i < 14; i++)
                    context.fillText(fakeIndex, i * 180 + 20, 50);
            }

            if (reImage) {
                var resultImage = document.createElement("img");
                resultImage.src = canvas.toDataURL("image/png");
                return resultImage;
            } else {
                return canvas;
            }
        }
    }
});

var preloader = new Preloader();