import textureParameters from './textureParameters'

const map = {
  diffusive: loadTexture( "textures/" + textureParameters.material + "_Diffuse.png" );
  specular: loadTexture( "textures/" + textureParameters.material + "_Specular.png" );
  roughness: loadTexture( "textures/" + textureParameters.material + "_Roughness.png" );
}

export default map;
