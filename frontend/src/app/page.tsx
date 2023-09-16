"use client";

import {useSSE} from "@/app/use-sse";

export default function Home() {
  const {data} = useSSE()
  return (
    <div>{data}</div>
  )
}
