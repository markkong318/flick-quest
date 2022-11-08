import * as PIXI from 'pixi.js';

export class Texture {
  private textures: Map<string, PIXI.Texture>;

  constructor() {
    this.textures = new Map();

    const proxy = new Proxy(this, {
      get: function (oTarget, sKey, receiver) {
        console.log(String(oTarget))
        // const obj = Reflect.get(oTarget, sKey, receiver);
        // if (obj.bottle) {
        //   return obj();
        // }
        const descriptor = Object.getOwnPropertyDescriptor(oTarget, sKey);
        if (descriptor && descriptor.value && descriptor.value.bottle) {
          return descriptor.value();
        }

        // console.log(typeof obj)

        // if (typeof obj !== 'function'){
        //   return obj
        // }
        const prototypeDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(oTarget), sKey)
        // if (prototypeDescriptor.value) {
        //   return obj;
        // }
        debugger

        // if (prototypeDescriptor.value) {
        //   if (prototypeDescriptor.value.bottle) {
        //     return prototypeDescriptor.value();
        //   }
        //   // debugger
        //   // if ()
        // }


        if (prototypeDescriptor.get) {
          if (oTarget.textures.has(String(sKey))) {
            return oTarget.textures.get(String(sKey));
          }
          debugger
          const tt = prototypeDescriptor.get.bind(receiver)();
            //obj.bind(receiver)();

          console.log(tt);

          oTarget.textures.set(String(sKey), tt);

          return tt;
        }

        // obj = obj.bind(receiver)
        // console.log(obj.bind(receiver))
        // debugger

        // const obj = oTarget[sKey];

        // if (obj === undefined) {
        //   throw new Error(`Not a valid variable ${String(sKey)} in ${oTarget.constructor.name}`);
        // }

        // oTarget.textures.set(String(sKey), obj);

        // return tt;
        return Reflect.get(oTarget, sKey, receiver);
      },
    });

    return proxy;
  }

  init() {
    // const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    // console.log(names);
  }
}
