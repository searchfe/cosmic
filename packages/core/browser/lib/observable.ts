 type Subscriber = (...args: any) => any;

 export class Observer {
     private static instance: Observer;
     readonly topics: { [index: string]: Subscriber[]};

     private constructor() {
         this.topics = {};
     }

     /** 获取 Observer 单例 */
     static getObserver() {
         if (!Observer.instance) {
             Observer.instance = new Observer();
         }
         return Observer.instance;
     }

     /** 获取 publish事件 */
     publish(topic: string, message: Record<string, unknown>) {
         if (message && typeof message !== 'object') {
             throw new Error('message should be a object');
         }
         const cbs = this.topics[topic] || [];
         cbs.forEach(cb => {
             cb(message);
         });
     }

     /** 获取 subscribe事件 */
     subscribe(topic: string, cb: Subscriber) {
         if (topic && typeof cb === 'function') {
             if (this.topics[topic]) {
                 this.topics[topic].push(cb);
             }
             else {
                 this.topics[topic] = [cb];
             }
         }
         console.log(this.topics);
     }
 }
