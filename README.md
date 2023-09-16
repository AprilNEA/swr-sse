# SSR-SSE-Example

SWR didn't give official example for SSE.
Here is an example for SSE with SWR.
You can run `pnpm install && turbo run dev`, open `http://127.0.0.1:3000` to see the demo.

```typescript
import useSWRSubscription from "swr/subscription";
import type {SWRSubscriptionOptions} from "swr/subscription";
// import {EventSourcePolyfill} from 'event-source-polyfill';

export function useSSE() {

  const {data} = useSWRSubscription(
    "http://127.0.0.1:3001/sse",
    (url, {next}: SWRSubscriptionOptions<string>) => {
      const eventSource = new EventSource(url)
      // const eventSource = new EventSourcePolyfill(url, {
      //   headers: {
      //     "1": "2"
      //   }
      // });
      eventSource.onmessage = (event) => {
        next(null, prev =>
          ((prev ?? "").concat(event.data))
        );
      };
      eventSource.onerror = (error) => {
        next(error)
        eventSource.close();
      };
      return () => {
        eventSource.close();
      };
    },
  );

  return {data};
}

```
