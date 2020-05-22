console.warn( "THREE.BrightnessContrastShader: As part of the transition to ES6 Modules, the files in 'examples/js' have been deprecated in r117 (May 2020) and will be deleted in r124 (December 2020). You can find more information about developing using ES6 Modules in https://threejs.org/docs/index.html#manual/en/introduction/Import-via-modules." );
/**
 * @author tapio / http://tapio.github.com/
 *
 * Brightness and contrast adjustment
 * https://github.com/evanw/glfx.js
 * brightness: -1 to 1 (-1 is solid black, 0 is no change, and 1 is solid white)
 * contrast: -1 to 1 (-1 is solid gray, 0 is no change, and 1 is maximum contrast)
 */

THREE.BrightnessContrastShader = {

	uniforms: {

		"tDiffuse": { value: null },
		"brightness": { value: 0 },
		"contrast": { value: 0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

		"	vUv = uv;",

		"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float brightness;",
		"uniform float contrast;",

		"varying vec2 vUv;",

		"void main() {",

		"	gl_FragColor = texture2D( tDiffuse, vUv );",

		"	gl_FragColor.rgb += brightness;",

		"	if (contrast > 0.0) {",
		"		gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) / (1.0 - contrast) + 0.5;",
		"	} else {",
		"		gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) * (1.0 + contrast) + 0.5;",
		"	}",

		"}"

	].join( "\n" )

};
