import ownProperty from 'describe-type/source/has/ownProperty.js';
import merge from './merge.js';
import create from './create.js';
import extend from './extend.js';
import ensureConstructor from './ensureConstructor.js';
import implement from './implement.js';
import shallowMerge from './shallowMerge.js';
import copyShallowObjectsFrom from './copyShallowObjectsFrom.js';

/**
 *
 * @param {Function} Proto - .
 * @param {Function} parent - .
 * @param {Object} protoProps - .
 * @param {Object} staticProps - .
 * @returns {Object}
 */
let numInstances = 0;
export default function inherit(Proto, parent, protoProps, staticProps) {
	const child = ensureConstructor(parent, protoProps);

	shallowMerge(child, parent, staticProps);

	const Surrogate = function () { this.constructor = child; };
	Surrogate.prototype = parent instanceof Proto ? null : parent.prototype;
	child.prototype = create(Surrogate.prototype);

	Proto.size = numInstances;
	numInstances += 1;

	if (protoProps && ownProperty(protoProps, 'implements')) {
		const implementations = implement(Proto.prototype, protoProps.implements);
		child.prototype = extend(child.prototype, implementations);
		delete protoProps.implements;
	}

	if (protoProps) {
		const childObjects = copyShallowObjectsFrom(child.prototype);
		shallowMerge(child.prototype, protoProps, { $protoID: Proto.size });
		merge(false, child.prototype, childObjects);
	}

	child.super = parent.prototype;

	return child;
}
