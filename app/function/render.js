import renderer from '../threeComponent/renderer'
import scene from '../threeComponent/scene'
import camera from '../threeComponent/camera'

export default function render() {
  // updateUniforms();
  requestAnimationFrame(render);
  renderer.render( scene, camera );

}
