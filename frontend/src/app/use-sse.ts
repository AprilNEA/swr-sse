import useSWRSubscription from "swr/subscription";
import type {SWRSubscriptionOptions} from "swr/subscription";
import {EventSourcePolyfill} from 'event-source-polyfill';

export function useSSE() {

  const {data} = useSWRSubscription(
    "http://127.0.0.1:3001/sse",
    (url, {next}: SWRSubscriptionOptions<string>) => {
      const eventSource = new EventSourcePolyfill(url, {
        headers: {
          "1": "2"
        }
      });
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
