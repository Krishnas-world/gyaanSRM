"use client"
import Loader from "@/components/Loader";
import { Suspense } from "react";
import LayoutComp from "./LayoutComp";



export default function Layout() {
  return (
    <Suspense fallback={<Loader />}>
      <LayoutComp />
    </Suspense>
  )
}