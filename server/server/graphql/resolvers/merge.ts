/**
 * Primary file for extracting proper schema structured objects
 * @author László Tófalvi <tofalvi.laszlo@gmail.com>
 */

import dateToString from '../../helpers/date';
import {User} from '../../models/user';

/**
 * Get user object with schema typing
 * @param id
 */
const getUser = async (id: string) => {
  try {
    const user: any = await User.findById(id);
    return {
      ...user._doc,
      _id: user.id,
      createdAt: dateToString(user._doc.createdAt),
      updatedAt: dateToString(user._doc.updatedAt)
    };
  } catch (err) {
    throw err;
  }
};

/**
 * Get user object with schema typing
 * @param user
 */
const transformDocument = ($doc: any) => {
  return {
    ...$doc._doc,
    _id: $doc.id,
    createdAt: $doc._doc.createdAt ? dateToString($doc._doc.createdAt) : '',
    updatedAt: $doc._doc.updatedAt ? dateToString($doc._doc.updatedAt) : ''
  };
};

export { getUser, transformDocument };
