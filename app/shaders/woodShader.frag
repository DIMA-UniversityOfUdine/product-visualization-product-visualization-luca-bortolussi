varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 uVv;
uniform vec3 frontLight;
uniform vec3 fillLight;
uniform vec3 backLight;
uniform vec3 clight;
uniform sampler2D specularMap;
uniform sampler2D diffuseMap;
uniform sampler2D roughnessMap;
uniform sampler2D normalMap;
uniform vec2 normalScale;
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

#extension GL_OES_standard_derivatives : enable

vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {

  vec3 q0 = dFdx( eye_pos.xyz );
  vec3 q1 = dFdy( eye_pos.xyz );
  vec2 st0 = dFdx( uVv.st );
  vec2 st1 = dFdy( uVv.st );

  vec3 S = normalize(  q0 * st1.t - q1 * st0.t );
  vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
  vec3 N =  surf_norm ;

  vec3 mapN = normalize(texture2D( normalMap, uVv ).xyz * 2.0 - 1.0);
  mapN.xy = normalScale * mapN.xy;
  mat3 tsn = mat3( S, T, N );
  return normalize( tsn * mapN );

}

void main() {
  vec4 frontLightPosition = viewMatrix * vec4( frontLight, 1.0 );
  vec4 fillLightPosition = viewMatrix * vec4( fillLight, 1.0 );
  vec4 backLightPosition = viewMatrix * vec4( backLight, 1.0 );

  // trova il vettore che va dalla luce all'oggetto
  vec3 l1 = normalize(frontLightPosition.xyz - vPosition.xyz);
  vec3 l2 = normalize(fillLightPosition.xyz - vPosition.xyz);
  vec3 l3 = normalize(backLightPosition.xyz - vPosition.xyz);

  // vec3 n = normalize( vNormal );
  vec3 n = perturbNormal2Arb( vPosition, normalize( vNormal ));

  vec3 v = normalize( -vPosition);

  // calcola il vettore h
  vec3 h1 = normalize( v + l1);
  vec3 h2 = normalize( v + l2);
  vec3 h3 = normalize( v + l3);

  // previene la divisione per 0
  float nDotv = max(dot( n, v ),0.000001);

  float nDotl1 = max(dot( n, l1 ),0.000001);
  float lDoth1 = max(dot( l1, h1 ),0.000001);
  float nDoth1 = max(dot( n, h1 ),0.000001);
  float vDoth1 = max(dot( v, h1 ),0.000001);

  float nDotl2 = max(dot( n, l2 ),0.000001);
  float lDoth2 = max(dot( l2, h2 ),0.000001);
  float nDoth2 = max(dot( n, h2 ),0.000001);
  float vDoth2 = max(dot( v, h2 ),0.000001);

  float nDotl3 = max(dot( n, l3 ),0.000001);
  float lDoth3 = max(dot( l3, h3 ),0.000001);
  float nDoth3 = max(dot( n, h3 ),0.000001);
  float vDoth3 = max(dot( v, h3 ),0.000001);

  cdiff = texture2D( diffuseMap, uVv*textureRepeat ).rgb;
  // texture in sRGB, linearize
  cdiff = pow( cdiff, vec3(2.2));

  cspec = texture2D( specularMap, uVv*textureRepeat ).rgb;
  // texture in sRGB, linearize
  cspec = pow( cspec, vec3(2.2));

  roughness = texture2D( roughnessMap, uVv*textureRepeat).r;
  // non c'è bisogno di linearizzare la roughness map

  vec3 fresnel1 = FSchlick(lDoth1);
  vec3 fresnel2 = FSchlick(lDoth2);
  vec3 fresnel3 = FSchlick(lDoth3);

  vec3 BRDF1 = (vec3(1.0)-fresnel1)*cdiff/PI + fresnel1*GSmith(nDotv,nDotl1)*DGGX(nDoth1,roughness*roughness) / (4.0*nDotl1*nDotv);
  vec3 BRDF2 = (vec3(1.0)-fresnel2)*cdiff/PI + fresnel2*GSmith(nDotv,nDotl2)*DGGX(nDoth2,roughness*roughness) / (4.0*nDotl2*nDotv);
  vec3 BRDF3 = (vec3(1.0)-fresnel3)*cdiff/PI + fresnel3*GSmith(nDotv,nDotl3)*DGGX(nDoth3,roughness*roughness) / (4.0*nDotl3*nDotv);

  vec3 outRadiance = (PI* clight * nDotl1 * BRDF1) + (PI* clight * nDotl2 * BRDF2) + (PI* clight * nDotl3 * BRDF3);
  // gamma encode the final value
  gl_FragColor = vec4(pow( outRadiance, vec3(1.0/2.2)), 1.0);
}
