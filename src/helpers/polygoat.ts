
export function polygoat(fn:Function, cb?:Function):Promise<any> {
    if (cb) {
      fn(function (err, res) {
        cb(err, res)
      })
    } else {
      return new Promise(function (resolve, reject) {
        fn(function (err, res) {
          if (err !== null && err !== undefined) {
            reject(err)
          } else {
            resolve(res)
          }
        })
      })
    }
  }
