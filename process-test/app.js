angular.module('app', [])
    .controller('mainCtrl', mainController)
    .directive('wistiaUploader', wistiaUploader);

function mainController() {
    var vm = this;
    activate();

    function activate() {

    }
}

function wistiaUploader() {

    return {
        templateUrl: "wistiaUploader.tpl.html",
        link: function (scope, element, attrs) {
            var form = element.find('form');
            console.log(form);
            var creds = {'api_password': "06c389e8c1b15341ba436295b83d9379658ebceb11e8ab63a87566e0084d11a6"};
            $(form).fileupload({
                xhrFields: {
                    withCredentials: false
                },
                url: "https://upload.wistia.com",
                method: 'POST',
                dataType: 'json',
                formData: creds,
                autoUpload: true
                //acceptFileTypes: /(\.|\/)(mp4)$/i,
                //maxFileSize: 40000000, // 40 MB//
                //previewMaxWidth: 300,
                //previewMaxHeight: 200
            }).on('fileuploadprogressall', function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    console.log(progress);
                    $('#progress .progress-bar').css(
                        'width',
                        progress + '%'
                    );
                })
                .on('fileuploaddone', function (e, data) {
                    console.log(data);
                    if(e.result){
                        return;
                    }
                    scope.videoPreviewUrl = 'wistia_async_' + data.result.hashed_id;
                    scope.$apply();
                });

        }
    }
}