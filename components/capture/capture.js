angular
  .module('capture', [])
  .component('capture', {
      templateUrl: '/components/capture/capture.html',
      bindings: {
        cb: '&'
      },
      controller: CaptureController
    }
  )

function CaptureController(){
  Webcam.set({
    width: 320,
    height: 240,
    image_format: 'png'
  });
  Webcam.attach( '#my_camera' );

  var ctrl = this;
  this.takeSnapshot = function() {
      // take snapshot and get image data
      Webcam.snap( function(dataURI) {
          // display results in page
          ctrl.dataURI = dataURI;
          ctrl.cb({img:dataURI});

      } );
  }
}
