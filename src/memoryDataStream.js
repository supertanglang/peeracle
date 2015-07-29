/*
 * Copyright (c) 2015 peeracle contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// @exclude
var Peeracle = {
  DataStream: require('./dataStream')
};
// @endexclude

/* eslint-disable */
Peeracle.MemoryDataStream = (function() {
/* eslint-enable */
  /**
   * @class MemoryDataStream
   * @memberof {Peeracle}
   * @constructor
   * @implements {DataStream}
   * @param {Object} options
   * @property {Number} offset - Current stream's offset
   * @property {Uint8Array} buffer
   * @property {DataView} dataview
   * @throws {TypeError}
   */
  function MemoryDataStream(options) {
    this.options = options || {};

    if (!this.options.buffer || !(this.options.buffer instanceof Uint8Array)) {
      throw new TypeError('buffer should be an Uint8Array');
    }

    this.buffer = this.options.buffer;
    this.dataview = new DataView(this.buffer.buffer);
    this.offset = 0;
  }

  MemoryDataStream.prototype = Object.create(Peeracle.DataStream.prototype);
  MemoryDataStream.prototype.constructor = MemoryDataStream;

  /**
   * @function MemoryDataStream#length
   * @return {Number}
   */
  MemoryDataStream.prototype.length = function length() {
    return this.buffer.length;
  };

  /**
   * @function MemoryDataStream#tell
   * @return {Number}
   */
  MemoryDataStream.prototype.tell = function tell() {
    return this.offset;
  };

  /**
   * @function MemoryDataStream#seek
   * @param {Number} position
   * @throws {RangeError}
   * @return {Number}
   */
  MemoryDataStream.prototype.seek = function seek(position) {
    if (position < 0 || position > this.buffer.length) {
      throw new Error('index out of bounds');
    }

    this.offset = position;
    return position;
  };

  /**
   * @function MemoryDataStream#read
   * @param {Number} length
   * @return {Uint8Array}
   * @throws {RangeError}
   */
  MemoryDataStream.prototype.read = function read(length) {
    var bytes;

    bytes = this.peek(length);
    this.offset += length;
    return bytes;
  };

  /**
   * @function MemoryDataStream#readChar
   * @return {Number}
   * @throws {RangeError}
   */
  MemoryDataStream.prototype.readChar = function readChar() {
    var value = this.peekChar();
    this.offset += 1;

    return value;
  };

  /**
   * @function MemoryDataStream#readByte
   * @return {Number}
   * @throws {RangeError}
   */
  MemoryDataStream.prototype.readByte = function readByte() {
    var value = this.peekByte();
    this.offset += 1;

    return value;
  };

  /**
   * @function MemoryDataStream#readShort
   * @return {Number}
   * @throws {RangeError}
   */
  MemoryDataStream.prototype.readShort = function readShort() {
    var value = this.peekShort();
    this.offset += 2;

    return value;
  };

  /**
   * @function MemoryDataStream#readUShort
   * @return {Number}
   * @throws {RangeError}
   */
  MemoryDataStream.prototype.readUShort = function readUShort() {
    var value = this.peekUShort();
    this.offset += 2;

    return value;
  };

  /**
   * @function MemoryDataStream#readInteger
   * @return {Number}
   */
  MemoryDataStream.prototype.readInteger = function readInteger() {
    var value = this.peekInteger();
    this.offset += 4;

    return value;
  };

  /**
   * @function MemoryDataStream#readUInteger
   * @return {Number}
   */
  MemoryDataStream.prototype.readUInteger = function readUInteger() {
    var value = this.peekUInteger();
    this.offset += 4;

    return value;
  };

  /**
   * @function MemoryDataStream#readFloat
   * @return {Number}
   */
  MemoryDataStream.prototype.readFloat = function readFloat() {
    var value = this.peekFloat();
    this.offset += 4;

    return value;
  };

  /**
   * @function MemoryDataStream#readDouble
   * @return {Number}
   */
  MemoryDataStream.prototype.readDouble = function readDouble() {
    var value = this.peekDouble();
    this.offset += 8;

    return value;
  };

  /**
   * @function MemoryDataStream#readString
   * @return {Number}
   */
  MemoryDataStream.prototype.readString = function readString() {
  };

  /**
   * @function MemoryDataStream#peek
   * @param {Number} length
   * @return {Number}
   */
  MemoryDataStream.prototype.peek = function peek(length) {
    if (length < 0 || this.offset + length >= this.buffer.length) {
      throw new RangeError('index out of bounds');
    }

    return this.buffer.subarray(this.offset, this.offset + length);
  };

  /**
   * @function MemoryDataStream#peekChar
   * @return {Number}
   */
  MemoryDataStream.prototype.peekChar = function peekChar() {
    if (this.offset + 1 >= this.buffer.length) {
      throw new RangeError('index out of bounds');
    }

    return this.dataview.getInt8(this.offset);
  };

  /**
   * @function MemoryDataStream#peekByte
   * @return {Number}
   */
  MemoryDataStream.prototype.peekByte = function peekByte() {
    if (this.offset + 1 >= this.buffer.length) {
      throw new RangeError('index out of bounds');
    }

    return this.dataview.getUint8(this.offset);
  };

  /**
   * @function MemoryDataStream#peekShort
   * @return {Number}
   */
  MemoryDataStream.prototype.peekShort = function peekShort() {
    if (this.offset + 2 >= this.buffer.length) {
      throw new RangeError('index out of bounds');
    }

    return this.dataview.getInt16(this.offset);
  };

  /**
   * @function MemoryDataStream#peekUShort
   * @return {Number}
   */
  MemoryDataStream.prototype.peekUShort = function peekUShort() {
    if (this.offset + 2 >= this.buffer.length) {
      throw new RangeError('index out of bounds');
    }

    return this.dataview.getUint16(this.offset);
  };

  /**
   * @function MemoryDataStream#peekInteger
   * @return {Number}
   */
  MemoryDataStream.prototype.peekInteger = function peekInteger() {
    if (this.offset + 4 >= this.buffer.length) {
      throw new RangeError('index out of bounds');
    }

    return this.dataview.getInt32(this.offset);
  };

  /**
   * @function MemoryDataStream#peekUInteger
   * @return {Number}
   */
  MemoryDataStream.prototype.peekUInteger = function peekUInteger() {
    if (this.offset + 4 >= this.buffer.length) {
      throw new RangeError('index out of bounds');
    }

    return this.dataview.getUint32(this.offset);
  };

  /**
   * @function MemoryDataStream#peekFloat
   * @return {Number}
   */
  MemoryDataStream.prototype.peekFloat = function peekFloat() {
    if (this.offset + 4 >= this.buffer.length) {
      throw new RangeError('index out of bounds');
    }

    return this.dataview.getFloat32(this.offset);
  };

  /**
   * @function MemoryDataStream#peekDouble
   * @return {Number}
   */
  MemoryDataStream.prototype.peekDouble = function peekDouble() {
    if (this.offset + 8 >= this.buffer.length) {
      throw new RangeError('index out of bounds');
    }

    return this.dataview.getFloat64(this.offset);
  };

  /**
   * @function MemoryDataStream#peekString
   * @return {Number}
   */
  MemoryDataStream.prototype.peekString = function peekString() {
  };

  /**
   * @function MemoryDataStream#write
   * @return {Number}
   */
  MemoryDataStream.prototype.write = function write(bytes) {
    return bytes;
  };

  /**
   * @function MemoryDataStream#writeChar
   * @return {Number}
   */
  MemoryDataStream.prototype.writeChar = function writeChar(value) {
    return value;
  };

  /**
   * @function MemoryDataStream#writeByte
   * @return {Number}
   */
  MemoryDataStream.prototype.writeByte = function writeByte(value) {
    return value;
  };

  /**
   * @function MemoryDataStream#writeShort
   * @return {Number}
   */
  MemoryDataStream.prototype.writeShort = function writeShort(value) {
    return value;
  };

  /**
   * @function MemoryDataStream#writeUShort
   * @return {Number}
   */
  MemoryDataStream.prototype.writeUShort = function writeUShort(value) {
    return value;
  };

  /**
   * @function MemoryDataStream#writeInteger
   * @return {Number}
   */
  MemoryDataStream.prototype.writeInteger = function writeInteger(value) {
    return value;
  };

  /**
   * @function MemoryDataStream#writeUInteger
   * @return {Number}
   */
  MemoryDataStream.prototype.writeUInteger = function writeUInteger(value) {
    return value;
  };

  /**
   * @function MemoryDataStream#writeFloat
   * @return {Number}
   */
  MemoryDataStream.prototype.writeFloat = function writeFloat(value) {
    return value;
  };

  /**
   * @function MemoryDataStream#writeDouble
   * @return {Number}
   */
  MemoryDataStream.prototype.writeDouble = function writeDouble(value) {
    return value;
  };

  /**
   * @function MemoryDataStream#writeString
   * @return {Number}
   */
  MemoryDataStream.prototype.writeString = function writeString(str) {
    return str;
  };

  return MemoryDataStream;
})();

// @exclude
module.exports = Peeracle.MemoryDataStream;
// @endexclude
