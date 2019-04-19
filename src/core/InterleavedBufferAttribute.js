import { Vector3 } from '../math/Vector3.js';

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */

var _vector = new Vector3();

function InterleavedBufferAttribute( interleavedBuffer, itemSize, offset, normalized ) {

	this._data = interleavedBuffer;
	this._itemSize = itemSize;
	this._offset = offset;

	this._normalized = normalized === true;

	this.version2 = 0;

}

Object.defineProperties( InterleavedBufferAttribute.prototype, {

	count: {

		get: function () {

			return this.data.count;

		}

	},

	array: {

		get: function () {

			return this.data.array;

		}

	},

	data: {

		get: function () {

			return this._data;

		},

		set: function ( value ) {

			this._data = value;
			this.version2 ++;

		}

	},

	itemSize: {

		get: function () {

			return this._itemSize;

		},

		set: function ( value ) {

			this._itemSize = value;
			this.version2 ++;

		}

	},

	offset: {

		get: function () {

			return this._offset;

		},

		set: function ( value ) {

			this._offset = value;
			this.version2 ++;

		}

	},

	normalized: {

		get: function () {

			return this._normalized;

		},

		set: function ( value ) {

			this._normalized = value;
			this.version2 ++;

		}

	}

} );

Object.assign( InterleavedBufferAttribute.prototype, {

	isInterleavedBufferAttribute: true,

	applyMatrix4: function ( m ) {

		for ( var i = 0, l = this.data.count; i < l; i ++ ) {

			_vector.x = this.getX( i );
			_vector.y = this.getY( i );
			_vector.z = this.getZ( i );

			_vector.applyMatrix4( m );

			this.setXYZ( i, _vector.x, _vector.y, _vector.z );

		}

		return this;

	},

	setX: function ( index, x ) {

		this.data.array[ index * this.data.stride + this.offset ] = x;

		return this;

	},

	setY: function ( index, y ) {

		this.data.array[ index * this.data.stride + this.offset + 1 ] = y;

		return this;

	},

	setZ: function ( index, z ) {

		this.data.array[ index * this.data.stride + this.offset + 2 ] = z;

		return this;

	},

	setW: function ( index, w ) {

		this.data.array[ index * this.data.stride + this.offset + 3 ] = w;

		return this;

	},

	getX: function ( index ) {

		return this.data.array[ index * this.data.stride + this.offset ];

	},

	getY: function ( index ) {

		return this.data.array[ index * this.data.stride + this.offset + 1 ];

	},

	getZ: function ( index ) {

		return this.data.array[ index * this.data.stride + this.offset + 2 ];

	},

	getW: function ( index ) {

		return this.data.array[ index * this.data.stride + this.offset + 3 ];

	},

	setXY: function ( index, x, y ) {

		index = index * this.data.stride + this.offset;

		this.data.array[ index + 0 ] = x;
		this.data.array[ index + 1 ] = y;

		return this;

	},

	setXYZ: function ( index, x, y, z ) {

		index = index * this.data.stride + this.offset;

		this.data.array[ index + 0 ] = x;
		this.data.array[ index + 1 ] = y;
		this.data.array[ index + 2 ] = z;

		return this;

	},

	setXYZW: function ( index, x, y, z, w ) {

		index = index * this.data.stride + this.offset;

		this.data.array[ index + 0 ] = x;
		this.data.array[ index + 1 ] = y;
		this.data.array[ index + 2 ] = z;
		this.data.array[ index + 3 ] = w;

		return this;

	}

} );


export { InterleavedBufferAttribute };
