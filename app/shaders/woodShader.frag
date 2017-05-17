varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 uVv;
uniform vec3 pointLightPosition; // in world space
uniform vec3 clight;
uniform sampler2D specularMap;
uniform sampler2D diffuseMap;
uniform sampler2D roughnessMap;
uniform vec2 textureRepeat;
const float PI = 3.14159;

vec3 cdiff;
vec3 cspec;
float roughness;

vec3 FSchlick(float lDoth) {
  return (cspec + (vec3(1.0)-cspec)*pow(1.0 - lDoth,5.0));
}

float DGGX(float nDoth, float alpha) {
  float alpha2 = alpha*alpha;
  float d = nDoth*nDoth*(alpha2-1.0)+1.0;
  return (  alpha2 / (PI*d*d));
}

float G1(float dotProduct, float k) {
  return (dotProduct / (dotProduct*(1.0-k) + k) );
}

float GSmith(float nDotv, float nDotl) {
    float k = roughness*roughness;
    return G1(nDotl,k)*G1(nDotv,k);
}

void main() {
  vec4 lPosition = viewMatrix * vec4( pointLightPosition, 1.0 );
  vec3 l = normalize(lPosition.xyz - vPosition.xyz);
  vec3 n = normalize( vNormal );  // interpolation destroys normalization, so we have to normalize
  vec3 v = normalize( -vPosition);
  vec3 h = normalize( v + l);
  // small quantity to prevent divisions by 0
  float nDotl = max(dot( n, l ),0.000001);
  float lDoth = max(dot( l, h ),0.000001);
  float nDoth = max(dot( n, h ),0.000001);
  float vDoth = max(dot( v, h ),0.000001);
  float nDotv = max(dot( n, v ),0.000001);

  cdiff = texture2D( diffuseMap, uVv*textureRepeat ).rgb;
  // texture in sRGB, linearize
  cdiff = pow( cdiff, vec3(2.2));
  cspec = texture2D( specularMap, uVv*textureRepeat ).rgb;
  // texture in sRGB, linearize
  cspec = pow( cspec, vec3(2.2));
  roughness = texture2D( roughnessMap, uVv*textureRepeat).r; // no need to linearize roughness map

  vec3 fresnel = FSchlick(lDoth);
  vec3 BRDF = (vec3(1.0)-fresnel)*cdiff/PI + fresnel*GSmith(nDotv,nDotl)*DGGX(nDoth,roughness*roughness)/
    (4.0*nDotl*nDotv);
  vec3 outRadiance = PI* clight * nDotl * BRDF;
  // gamma encode the final value
  gl_FragColor = vec4(pow( outRadiance, vec3(1.0/2.2)), 1.0);
}