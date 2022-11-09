import {View} from './view';

export default new class Bottle {
  private map: Map<any, any>

  constructor() {
    this.map = new Map<any, any>()
  }

  setObject(obj) {
    if (obj.constructor.name === 'Function') {
      throw new Error('Argument is not a object');
    }

    console.log('[bottle] set object ' + obj.constructor.name)

    this.set(obj.constructor.name, obj)
  }

  getObject(obj) {
    if (!obj.name) {
      throw new Error('Argument is not a class');
    }

    console.log('[bottle] get object ' + obj.name)

    return this.get(obj.name);
  }

  set(key, vale) {
    console.log('[bottle] set ' + key);

    this.map.set(key,vale);
  }

  get(key) {
    console.log('[bottle] get ' + key);

    if (!this.map.has(key)) {
      throw new Error(`Could not find ${key}`);
    }

    return this.map.get(key);
  }

  inject(srcClass): any {
    const func = () => this.getObject(srcClass);
    func.bottle = true;

    return func;
  }

  singleton(srcClass): any {
    if (!srcClass.name) {
      throw new Error('Argument is not a class');
    }

    if (this.map.has(srcClass.name)) {
      throw new Error(`Key ${srcClass.name} is existed`);
    }

    const obj = new srcClass();
    obj.init();

    console.log('[bottle] set singleton ' + obj.constructor.name);

    this.map.set(srcClass.name, obj);

    return obj;
  }
}();
