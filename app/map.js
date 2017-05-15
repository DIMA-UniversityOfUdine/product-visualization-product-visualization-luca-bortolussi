import textureParameters from './textureParameters'
import loadTexture from './loader/loadTexture'

const map = {
  diffusive: loadTexture( "app/textures/" + textureParameters.material + "_Diffuse.png" ),
  specular: loadTexture( "app/textures/" + textureParameters.material + "_Specular.png" ),
  roughness: loadTexture( "app/textures/" + textureParameters.material + "_Roughness.png" ),
}

export default map;
