import {Controller, Headers, Sse} from '@nestjs/common';
import {Observable} from "rxjs";

@Controller()
export class AppController {
  constructor() {
  }

  @Sse('sse')
  sse(
    @Headers('1') data?: any,
  ) {
    return new Observable((subscriber) => {
      subscriber.next("data1")
      subscriber.next("data2");
      console.log(data??"no headers")
      subscriber.next(data);
      subscriber.complete();
    });
  }
}
