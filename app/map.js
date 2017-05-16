import textureParameters from './textureParameters';
import loadTexture from './loader/loadTexture';

const map = {
  diffusive:  loadTexture('app/textures/wood_mahogany_Diffuse.png'),
  specular:   loadTexture('app/textures/wood_mahogany_Specular.png'),
  roughness:  loadTexture('app/textures/wood_mahogany_Roughness.png'),
};

export default map;
